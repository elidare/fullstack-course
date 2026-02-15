import { useState } from "react";
import type { NewDiaryEntry } from "../../types";
import { Weather, Visibility } from "../../types";

type DiaryFormProps = {
  handleSubmit: (entry: NewDiaryEntry) => void;
  notification: string;
};

const DiaryForm = ({ handleSubmit, notification }: DiaryFormProps) => {
  const [diaryDate, setDiaryDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [comment, setComment] = useState("");

  const submitForm = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!visibility || !weather) {
      return;
    }

    handleSubmit({
      date: diaryDate,
      visibility,
      weather,
      comment,
    });

    setDiaryDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new diary</h2>
      {notification && <div style={{ color: "red" }}>{notification}</div>}
      <form onSubmit={submitForm}>
        <label>
          Date&nbsp;
          <input
            type="date"
            value={diaryDate}
            onChange={({ target }) => setDiaryDate(target.value)}
          />
        </label>
        <br />
        Visibility&nbsp;
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              id={v}
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            {v}
          </label>
        ))}
        <br />
        Weather&nbsp;
        {Object.values(Weather).map((w) => (
          <label key={w}>
            <input
              type="radio"
              id={w}
              name="weather"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            {w}
          </label>
        ))}
        <br />
        <label>
          Comment&nbsp;
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
