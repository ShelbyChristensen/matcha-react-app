import { useState } from "react";

function MatchaItem({ drink, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(drink.price);

  const handleSaveClick = () => {
    fetch(`http://localhost:3002/matcha/${drink.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(newPrice) })
    })
      .then(res => {
        if (!res.ok) throw new Error("PATCH failed");
        return res.json();
      })
      .then(onUpdate)
      .catch(console.error);
    setIsEditing(false);
  };

  return (
    <div className="matcha-item">
      <h3>{drink.name}</h3>
      <p>{drink.description}</p>
      <p><strong>Origin:</strong> {drink.origin}</p>
      {isEditing ? (
        <>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={handleSaveClick} style={{ padding: "0.5rem", marginRight: "0.5rem" }}>
            Save
          </button>
        </>
      ) : (
        <>
          <p><strong>Price:</strong> ${drink.price.toFixed(2)}</p>
          <button onClick={() => setIsEditing(true)} style={{ padding: "0.5rem", marginRight: "0.5rem" }}>
            Edit Price
          </button>
        </>
      )}
      <button
        onClick={() => onDelete(drink.id)}
        style={{ padding: "0.5rem", backgroundColor: "#e57373", color: "#fff" }}
      >
        Delete
      </button>
    </div>
  );
}

export default MatchaItem;
