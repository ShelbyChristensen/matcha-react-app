// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MatchaList from "./components/MatchaList";
import Admin from "./components/Admin";
import useMatchaData from "./hooks/useMatchaData";
import './App.css';

function App() {
  // Local state to hold all matcha drink data
  const [matchaDrinks, setMatchaDrinks] = useMatchaData("http://localhost:3002/matcha");

  const addMatcha = (newDrink) => {
    setMatchaDrinks([...matchaDrinks, newDrink]);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/menu">Matcha Menu</Link>
        <Link className="nav-link" to="/admin">Admin Portal</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <MatchaList
              matchaDrinks={matchaDrinks}
              setMatchaDrinks={setMatchaDrinks}
            />
          }
        />
        <Route path="/admin" element={<Admin addMatcha={addMatcha} />} />
      </Routes>
    </Router>
  );
}

export default App;
