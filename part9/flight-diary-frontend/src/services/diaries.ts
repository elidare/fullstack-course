import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../../types";

const baseUrl = "/api/diaries";

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addDiary = async (newDiary: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    // Narrowing Axious error
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      throw new Error(error.response?.data);
    } else {
      console.error(error);
      throw new Error("Something went wrong");
    }
  }
};

export default { getAllDiaries, addDiary };
