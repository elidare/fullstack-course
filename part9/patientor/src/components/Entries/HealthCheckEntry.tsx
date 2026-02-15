import type { HealthCheckEntry, Diagnosis } from "../../types";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry-block">
      {entry.date}&nbsp;
      <i>{entry.description}</i>
      <br />
      Health risk level: {entry.healthCheckRating}
      <br />
      diagnose by {entry.specialist}
      <br />
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
    </div>
  );
};

export default HealthCheckEntry;
