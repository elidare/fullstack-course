import { useState, useEffect } from "react";
import diaryService from "./services/diaries";
import type { DiaryEntry } from "../types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const data: DiaryEntry[] = await diaryService.getAllDiaries();
      setDiaries(data);
    };

    fetchDiaries();
  }, []);

  return (
    <>
      <h1>Diary entries</h1>
      <div>
        {diaries.map((d) => (
          <div key={d.id}>
            <p>
              <b>{d.date}</b>
            </p>
            <div>
              <div>Visibility: {d.visibility}</div>
              <div>Weather: {d.weather}</div>
              <div>
                Comment: <i>{d.comment}</i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
