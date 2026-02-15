import diagnoses from "../../data/diagnoses";

import { DiagnosisEntry } from "../types";

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
