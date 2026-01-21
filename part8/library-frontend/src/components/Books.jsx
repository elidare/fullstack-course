import { useState } from "react";
import { useQuery, useSubscription } from "@apollo/client/react";
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from "../queries";

const Books = () => {
  const DEFAULT_GENRE = "all genres";
  const [selectedGenre, setSelectedGenre] = useState(DEFAULT_GENRE);

  const booksResult = useQuery(ALL_BOOKS, {
    variables: selectedGenre === DEFAULT_GENRE ? {} : { genre: selectedGenre },
  });

  const genresResult = useQuery(ALL_GENRES);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded;
      window.alert(`New book added: ${book.title}`);

      const update = ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(book),
        };
      };

      client.cache.updateQuery({ query: ALL_BOOKS }, update);

      if (
        selectedGenre !== DEFAULT_GENRE &&
        book.genres.includes(selectedGenre)
      ) {
        client.cache.updateQuery(
          {
            query: ALL_BOOKS,
            variables: { genre: selectedGenre },
          },
          update,
        );
      }
    },
  });

  if (booksResult.loading || genresResult.loading) {
    return <div>Loading...</div>;
  }

  const books = booksResult.data?.allBooks || [];

  const genres = [...genresResult.data.allGenres, DEFAULT_GENRE];

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
          {books.map((a) => (
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
