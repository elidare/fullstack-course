import { z } from "zod";
import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
import diagnoses from "../data/diagnoses";

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientEntrySchema.parse(object);
};

const DiagnosisCodeSchema = z.enum(
  diagnoses.map((d) => d.code) as [string, ...string[]],
);

const baseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisCodeSchema).optional(),
});

export const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const newHealthCheckEntrySchema = healthCheckEntrySchema.omit({
  id: true,
});

export const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const newHospitalEntrySchema = hospitalEntrySchema.omit({
  id: true,
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const newOccupationalHealthcareEntrySchema =
  occupationalHealthcareEntrySchema.omit({
    id: true,
  });

export const newEntrySchema = z.discriminatedUnion("type", [
  newHealthCheckEntrySchema,
  newHospitalEntrySchema,
  newOccupationalHealthcareEntrySchema,
]);
