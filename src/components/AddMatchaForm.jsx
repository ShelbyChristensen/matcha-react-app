// src/components/AddMatchaForm.jsx
import { useState } from "react";

function AddMatchaForm({ onAddMatcha }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3002/matcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price)
      })
    })
      .then((res) => res.json())
      .then((newDrink) => {
        onAddMatcha(newDrink);
        setFormData({ name: "", description: "", origin: "", price: "" });
      })
      .catch((err) => console.error("Failed to add matcha:", err));
  }

  return (
    <form onSubmit={handleSubmit} className="add-matcha-form">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" />
      <button type="submit">Add Matcha Drink</button>
    </form>
  );
}

export default AddMatchaForm;
