import { useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(
    window.localStorage.getItem("phonebook-user-token")
  );
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("phonebook-user-token");
    client.resetStore();
  };

  return (
    <Router>
      <div>
        <div className="navbar">
          <Link className="navbar-link" to="/authors">
            Authors
          </Link>
          <Link className="navbar-link" to="/books">
            Books
          </Link>
          {!token && (
            <Link className="navbar-link" to="/login">
              Log in
            </Link>
          )}
          {token && (
            <>
              <Link className="navbar-link" to="/add">
                Add book
              </Link>
              <Link className="navbar-link" onClick={() => logout()}>
                Log out
              </Link>
            </>
          )}
        </div>

        <Routes>
          <Route path="/authors" element={<Authors token={token} />} />
          <Route path="/books" element={<Books />} />
          {token && <Route path="/add" element={<NewBook />} />}
          {!token && (
            <Route path="login" element={<LoginForm setToken={setToken} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
