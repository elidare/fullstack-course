import type { HospitalEntry, Diagnosis } from "../../types";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry-block">
      {entry.date}&nbsp;
      <i>{entry.description}</i>
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
      <br />
      Discharge: {entry.discharge.date} <i>{entry.discharge.criteria}</i>
    </div>
  );
};

export default HospitalEntry;
