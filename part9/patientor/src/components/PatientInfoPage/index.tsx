import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Typography } from "@mui/material";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";

import patientService from "../../services/patients";

const PatientInfoPage = () => {
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
    </div>
  );
};

export default PatientInfoPage;
