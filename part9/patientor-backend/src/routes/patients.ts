import { z } from "zod";
import { Response } from "express";
import { NonSensitivePatientEntry } from "../types";
import { newEntrySchema } from "../utils";

import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res: Response<NonSensitivePatientEntry>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res: Response<NonSensitivePatientEntry | object>) => {
  try {
    const newPatientEntry = newEntrySchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
