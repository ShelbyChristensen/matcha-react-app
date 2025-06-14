import { useState } from "react";

function MatchaItem({ drink, onUpdate, onDelete }) {
  // Track edit mode and price input
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(drink.price);

  // Toggle edit form on/off
  function handleEditClick() {
    setIsEditing(true);
  }

  // Track new price input
  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  // Send PATCH request to update price
  function handleSaveClick() {
  fetch(`http://localhost:3002/matcha/${drink.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ price: parseFloat(newPrice) }),
})
  .then((res) => {
    console.log("PATCH response status:", res.status);
    return res.json();
  })
  .then((updatedDrink) => {
    console.log("Updated drink from server:", updatedDrink);
    onUpdate(updatedDrink);
    setIsEditing(false);
  })
  .catch((err) => console.error("PATCH error:", err));

}

  // Send DELETE request to remove drink
  function handleDeleteClick() {
    fetch(`http://localhost:3002/matcha/${drink.id}`, {
      method: "DELETE"
    })
      .then(() => onDelete(drink.id)) // Call back to parent to update list
      .catch(err => console.error("Failed to delete:", err));
  }

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
      onChange={handlePriceChange}
    />
    <button onClick={handleSaveClick}>Save</button>
  </>
) : (
  <>
    <p><strong>Price:</strong> ${drink.price.toFixed(2)}</p>
    <button onClick={handleEditClick} style={{ marginRight: "0.5rem" }}>
      Edit Price
    </button>
  </>
)}

<button
  onClick={handleDeleteClick}
  style={{
    backgroundColor: "#e57373",
    color: "#fff",
    marginTop: "0.5rem"
  }}
>
  Delete
</button>

    </div>
  );
}

export default MatchaItem;
