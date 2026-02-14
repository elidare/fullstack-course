import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, Entry, EntryWithoutId } from "../../types";
import { Typography, Button } from "@mui/material";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";

import patientService from "../../services/patients";

import HealthCheckEntry from "../Entries/HealthCheckEntry";
import HospitalEntry from "../Entries/HospitalEntry";
import OccupationalHealthcareEntry from "../Entries/OccupationalHealthcareEntry";
import NewEntryForm from "../Entries/NewEntryForm";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [entryFormShown, setEntryFormShown] = useState<Boolean>(false);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

  const addNewEntry = (entry: EntryWithoutId) => {
    // send to server
    console.log(entry);
  };

  if (!patient) {
    return <div>Sorry, no such patient exists</div>;
  }

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          marginBottom: "0.5em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {patient.name}
        {patient.gender === "female" && (
          <FemaleSharpIcon fontSize="large"></FemaleSharpIcon>
        )}
        {patient.gender === "male" && (
          <MaleSharpIcon fontSize="large"></MaleSharpIcon>
        )}
      </Typography>
      <div>
        SSN: {patient.ssn}
        <br />
        Occupation: {patient.occupation}
      </div>
      <Typography
        variant="h5"
        style={{
          marginTop: "0.5em",
        }}
      >
        Entries
      </Typography>
      {entryFormShown && (
        <NewEntryForm
          diagnoses={diagnoses}
          onSubmit={addNewEntry}
          onCancel={() => setEntryFormShown(false)}
        />
      )}
      {!entryFormShown && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEntryFormShown(true)}
        >
          Add new Entry
        </Button>
      )}
      {patient.entries.map((e) => (
        <div key={e.id}>
          <EntryDetails entry={e} diagnoses={diagnoses} />
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;
