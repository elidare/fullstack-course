import { z } from "zod";
import {
  newEntrySchema,
  newPatientEntrySchema,
  hospitalEntrySchema,
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
} from "./schemas";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type HealthCheckEntry = z.infer<typeof healthCheckEntrySchema>;

export type HospitalEntry = z.infer<typeof hospitalEntrySchema>;

export type OccupationalHealthcareEntry = z.infer<
  typeof occupationalHealthcareEntrySchema
>;

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

export interface PatientEntry extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type EntryWithoutId = z.infer<typeof newEntrySchema>;
