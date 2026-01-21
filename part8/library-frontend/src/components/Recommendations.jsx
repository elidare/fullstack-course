import { useQuery, useSubscription } from "@apollo/client/react";
import { ME, ALL_BOOKS, BOOK_ADDED } from "../queries";

const Recommendations = () => {
  const me = useQuery(ME);

  const favoriteGenre = me.data?.me.favoriteGenre || "";

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded;
      window.alert(`New book added: ${book.title}`);

      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: { genre: favoriteGenre },
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(book),
          };
        },
      );
    },
  });

  if (me.loading || booksResult.loading) {
    return <div>Loading...</div>;
  }

  const books = booksResult.data?.allBooks || [];

  return (
    <div>
      <h2>Recommendations</h2>

      <div>
        Books in your favorite genre <b>{favoriteGenre}</b>
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
    </div>
  );
};

export default Recommendations;
