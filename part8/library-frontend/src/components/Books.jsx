import { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client/react";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const result = useQuery(ALL_BOOKS);
  const DEFAULT_GENRE = "all genres";

  const books = result.data?.allBooks || [];

  useEffect(() => {
    if (result.data) {
      let uniqueGenres = [
        ...new Set(books.flatMap((b) => b.genres)),
        DEFAULT_GENRE,
      ];

      setGenres(uniqueGenres);
      setSelectedGenre(DEFAULT_GENRE);
    }
  }, [result.data]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded;
      window.alert(`New book added: ${book.title}`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(book),
        };
      });
    },
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const filteredBooks =
    selectedGenre === DEFAULT_GENRE
      ? books
      : books.filter((b) => b.genres.includes(selectedGenre));

  return (
    <div>
      <h2>Books</h2>

      <div>
        Genre: <b>{selectedGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        {genres.map((g) => (
          <button
            key={g}
            className={selectedGenre === g ? "active" : ""}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
