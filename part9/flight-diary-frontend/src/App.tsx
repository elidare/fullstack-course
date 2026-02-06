import { useState, useEffect } from "react";
import type { DiaryEntry, NewDiaryEntry } from "./../types";
import diaryService from "./services/diaries";
import DiariesList from "./components/DiariesList";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchDiaries = async () => {
      const data: DiaryEntry[] = await diaryService.getAllDiaries();
      setDiaries(data);
    };

    fetchDiaries();
  }, []);

  const addDiary = async (newDiary: NewDiaryEntry) => {
    try {
      const savedEntry = await diaryService.addDiary(newDiary);
      setDiaries(diaries.concat(savedEntry));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotification(error.message);
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <h1>Flight diary</h1>
      <DiaryForm
        handleSubmit={addDiary}
        notification={notification}
      ></DiaryForm>
      <DiariesList diaries={diaries}></DiariesList>
    </>
  );
};

export default App;
