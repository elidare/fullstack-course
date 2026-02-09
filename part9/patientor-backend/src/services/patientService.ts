import patients from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const id = uuid();

  const newPatientEntry = {
    id,
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);

  // Excluding ssn
  const nonSensitiveEntry = (({ ssn, ...entry }) => entry)(newPatientEntry);

  return nonSensitiveEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
};
