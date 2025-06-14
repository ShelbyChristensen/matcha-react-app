import { useState } from "react";
import MatchaItem from "./MatchaItem";

function MatchaList({ matchaDrinks, setMatchaDrinks }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpdateDrink = (updatedDrink) => {
    const updatedList = matchaDrinks.map((drink) =>
      drink.id === updatedDrink.id ? updatedDrink : drink
    );
    setMatchaDrinks(updatedList);
  };

  const handleDeleteDrink = (id) => {
    fetch(`http://localhost:3002/matcha/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedList = matchaDrinks.filter((drink) => drink.id !== id);
        setMatchaDrinks(updatedList);
      })
      .catch((err) => console.error("Failed to delete:", err));
  };

  const filteredDrinks = matchaDrinks.filter((drink) =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drink.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="matcha-list">
      <h2>Matcha Menu</h2>
      <input
        type="text"
        placeholder="Search by name or origin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredDrinks.length === 0 ? (
        <p>No matcha drinks found.</p>
      ) : (
        filteredDrinks.map((drink) => (
          <MatchaItem
            key={drink.id}
            drink={drink}
            onUpdate={handleUpdateDrink} 
            onDelete={handleDeleteDrink}
          />
        ))
      )}
    </div>
  );
}

export default MatchaList;
