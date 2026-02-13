import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import { Typography } from "@mui/material";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";

import patientService from "../../services/patients";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

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
      {patient.entries.map((e) => (
        <div key={e.id}>
          <div>
            {e.date}&nbsp;<i>{e.description}</i>
          </div>
          <ul>
            {e.diagnosisCodes?.map((c) => (
              <li key={c}>
                {c}&nbsp;
                {diagnoses.find((d) => d.code === c)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;
