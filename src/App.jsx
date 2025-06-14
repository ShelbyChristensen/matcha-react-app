import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MatchaList from "./components/MatchaList";
import Home from "./components/Home";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  const [matchaDrinks, setMatchaDrinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/matcha")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched matcha drinks:", data);
        setMatchaDrinks(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addMatcha = (newDrink) => {
    setMatchaDrinks([...matchaDrinks, newDrink]);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/menu">Matcha Menu</Link>
        <Link className="nav-link" to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MatchaList matchaDrinks={matchaDrinks} setMatchaDrinks={setMatchaDrinks} />} />
        <Route path="/admin" element={<Admin addMatcha={addMatcha} />} />
      </Routes>
    </Router>
  );
}

export default App;
