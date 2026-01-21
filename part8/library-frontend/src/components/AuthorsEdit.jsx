import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CHANGE_AUTHOR, ALL_AUTHORS } from "../queries";

const AuthorsEdit = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeAuthor] = useMutation(CHANGE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    changeAuthor({ variables: { name, setBornTo: born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option value="" disabled>
            Select an author
          </option>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default AuthorsEdit;
