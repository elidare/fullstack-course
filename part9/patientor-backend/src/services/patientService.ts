import patients from "../../data/patients";

import { NonSensitivePatientEntry, PatientEntry } from "../types";

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

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
};
