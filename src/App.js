import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
