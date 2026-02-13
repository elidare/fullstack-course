import patients from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
  EntryWithoutId,
  Entry,
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

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  addPatient,
  addEntry,
  getNonSensitiveEntries,
  findById,
};
