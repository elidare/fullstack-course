import type { DiaryEntry } from "../../types";

const DiariesList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary entries</h2>
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
};

export default DiariesList;
