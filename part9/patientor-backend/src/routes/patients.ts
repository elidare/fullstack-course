import { z } from "zod";
import { Response } from "express";
import {
  EntryWithoutId,
  NonSensitivePatientEntry,
  PatientEntry,
  Entry,
} from "../types";
import {
  newPatientEntrySchema,
  newHealthCheckEntrySchema,
  newHospitalEntrySchema,
  newOccupationalHealthcareEntrySchema,
} from "../schemas";

import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res: Response<PatientEntry>) => {
  const patient = patientService.findById(req.params.id);

  if (patient && !patient.entries) {
    patient["entries"] = [];
  }

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res: Response<NonSensitivePatientEntry | object>) => {
  try {
    const newPatientEntry = newPatientEntrySchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "Unknown error" });
    }
  }
});

router.post("/:id/entries", (req, res: Response<Entry | object>) => {
  try {
    const patientId: string = req.params.id;
    let newEntry!: EntryWithoutId;
    switch (req.body.type) {
      case "HealthCheck":
        newEntry = newHealthCheckEntrySchema.parse(req.body);
        break;
      case "Hospital":
        newEntry = newHospitalEntrySchema.parse(req.body);
        break;
      case "OccupationalHealthcare":
        newEntry = newOccupationalHealthcareEntrySchema.parse(req.body);
        break;
      default:
        res.status(400).send({ error: "Unknown type" });
        break;
    }

    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "Unknown error" });
    }
  }
});

export default router;
