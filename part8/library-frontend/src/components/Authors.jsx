import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import AuthorsEdit from "./AuthorsEdit";

const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <AuthorsEdit authors={authors} />}
    </div>
  );
};

export default Authors;
