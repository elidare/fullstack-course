import { Response } from "express";
import { NonSensitivePatientEntry } from "../types";

import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
