import React from "react";
import { useState, SyntheticEvent } from "react";
import {
  Diagnosis,
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
} from "../../types";
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
  SelectChangeEvent,
  Alert,
  Box,
  Chip,
} from "@mui/material";
import { assertNever } from "../../utils";

interface ExtensionProps {
  entryType: EntryType;
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (value: HealthCheckRating) => void;
  dischargeDate: string;
  setDischargeDate: (value: string) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (value: string) => void;
  employerName: string;
  setEmployerName: (value: string) => void;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: (value: string) => void;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: (value: string) => void;
}

interface Props {
  diagnoses: Diagnosis[];
  notification: string;
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
  (v) => ({
    value: v,
    label: v.toString(),
  }),
);

interface HealthRatingOption {
  value: number;
  label: string;
}

const healthCheckOptions: HealthRatingOption[] = Object.keys(HealthCheckRating)
  .filter((key) => isNaN(Number(key))) // Numeric enums doubles values
  .map((k) => ({
    value: HealthCheckRating[k as keyof typeof HealthCheckRating],
    label: k,
  }));

const EntryExtension = ({
  entryType,
  healthCheckRating,
  setHealthCheckRating,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate,
}: ExtensionProps) => {
  let content: React.JSX.Element = <></>;

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();

    const value = Number(event.target.value);

    if (Object.values(HealthCheckRating).includes(value)) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  switch (entryType) {
    case EntryType.HealthCheck:
      content = (
        <>
          <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
          <Select<number>
            label="Health Rating"
            fullWidth
            value={healthCheckRating}
            onChange={onHealthCheckRatingChange}
          >
            {healthCheckOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      );
      break;
    case EntryType.Hospital:
      content = (
        <>
          <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Discharge criteria</InputLabel>
          <TextField
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      );
      break;
    case EntryType.OccupationalHealthcare:
      content = (
        <>
          <InputLabel style={{ marginTop: 20 }}>Employer name</InputLabel>
          <TextField
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>
            Sick leave start date
          </InputLabel>
          <TextField
            type="date"
            fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Sick leave end date</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
        </>
      );
      break;
    default:
      return assertNever(entryType);
  }

  return content;
};

const NewEntryForm = ({
  diagnoses,
  notification,
  onSubmit,
  onCancel,
}: Props) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  // Diagnoses codes
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  // Hospital
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (e) => e.toString() === value,
      );
      if (entryType) {
        setEntryType(entryType);
      }
    }
  };

  const onSelectedDiagnosesChange = (
    event: SelectChangeEvent<typeof selectedDiagnoses>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnoses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case EntryType.HealthCheck:
        newEntry = {
          description,
          date,
          specialist,
          type: entryType,
          diagnosisCodes: selectedDiagnoses,
          healthCheckRating,
        };
        break;
      case EntryType.Hospital:
        newEntry = {
          description,
          date,
          specialist,
          type: entryType,
          diagnosisCodes: selectedDiagnoses,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case EntryType.OccupationalHealthcare:
        newEntry = {
          description,
          date,
          specialist,
          type: entryType,
          diagnosisCodes: selectedDiagnoses,
          employerName,
          ...(sickLeaveStartDate !== "" && sickLeaveEndDate !== ""
            ? {
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                },
              }
            : {}),
        };
        break;
      default:
        return assertNever(entryType);
    }

    onSubmit(newEntry);
  };

  return (
    <>
      {notification && <Alert severity="error">{notification}</Alert>}
      <div className="entry-form">
        <form onSubmit={addEntry}>
          <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
          <Select
            label="Entry type"
            fullWidth
            value={entryType}
            onChange={onEntryTypeChange}
          >
            {entryTypeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
          <TextField
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
          <TextField
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Diagnoses</InputLabel>
          <Select
            multiple
            fullWidth
            value={selectedDiagnoses}
            onChange={onSelectedDiagnosesChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}:&nbsp;{d.name}
              </MenuItem>
            ))}
          </Select>
          <EntryExtension
            entryType={entryType}
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStartDate={sickLeaveStartDate}
            setSickLeaveStartDate={setSickLeaveStartDate}
            sickLeaveEndDate={sickLeaveEndDate}
            setSickLeaveEndDate={setSickLeaveEndDate}
          />
          <Grid style={{ display: "flex", marginTop: "16px" }}>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginRight: "auto" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              style={{
                marginLeft: "auto",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default NewEntryForm;
