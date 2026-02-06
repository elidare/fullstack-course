import { useState, useEffect } from "react";
import type { DiaryEntry } from "./../types";
import diaryService from "./services/diaries";
import DiariesList from "./components/DiariesList";

const App = () => {
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
      <h1>Flight diary</h1>
      <DiariesList diaries={diaries}></DiariesList>
    </>
  );
};

export default App;
