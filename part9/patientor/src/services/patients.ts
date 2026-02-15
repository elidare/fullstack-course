import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  try {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
  } catch (error) {
    // Narrowing Axious error
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      throw new Error(error.response?.data.error[0].message);
    } else {
      console.error(error);
      throw new Error("Something went wrong");
    }
  }
};

const getPatient = async (id: string) => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return data;
  } catch (error) {
    // Narrowing Axious error
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      throw new Error(error.response?.data.error[0].message);
    } else {
      console.error(error);
      throw new Error("Something went wrong");
    }
  }
};

const create = async (newPatient: PatientFormValues) => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      newPatient,
    );

    return data;
  } catch (error) {
    // Narrowing Axious error
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      throw new Error(error.response?.data.error[0].message);
    } else {
      console.error(error);
      throw new Error("Something went wrong");
    }
  }
};

const addEntry = async (patientId: string, newEntry: EntryWithoutId) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      newEntry,
    );

    return data;
  } catch (error) {
    // Narrowing Axious error
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data.error[0].message);
    } else {
      console.error(error);
      throw new Error("Something went wrong");
    }
  }
};

export default {
  getAll,
  create,
  getPatient,
  addEntry,
};
