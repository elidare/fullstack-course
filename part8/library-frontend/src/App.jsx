import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
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
          <Link className="navbar-link" to="/add">
            Add book
          </Link>
        </div>

        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
