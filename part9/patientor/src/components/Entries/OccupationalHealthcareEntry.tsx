import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}
const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry-block">
      {entry.date}&nbsp;{entry.employerName}
      <br />
      <i>{entry.description}</i>
      <br />
      diagnose by {entry.specialist}
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes?.map((c) => (
            <li key={c}>
              {c}&nbsp;
              {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
        </ul>
      )}
      {entry.sickLeave &&
        `Sick leave: from ${entry.sickLeave?.startDate} to ${entry.sickLeave?.endDate}`}
    </div>
  );
};

export default OccupationalHealthcareEntry;
