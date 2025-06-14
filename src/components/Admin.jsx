// Admin.jsx
import React, { useState, useId, useRef, useEffect } from "react";


// Form for admin to add a new matcha drink
function Admin({ addMatcha }) {
  const idPrefix = useId();
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: ""
  });

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Track input changes and update local state
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Submit new drink to JSON Server and update state via prop
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
      .then(res => res.json())
      .then(newDrink => {
        addMatcha(newDrink);
        setFormData({ name: "", description: "", origin: "", price: "" });
      })
      .catch(err => console.error("Failed to add matcha:", err));
  }

  return (
    <div className="admin">
      <h2>Admin Portal</h2>
      <form onSubmit={handleSubmit} className="add-matcha-form">
        <label htmlFor={`${idPrefix}-name`}>Name:</label>
        <input
          ref={nameInputRef}
          id={`${idPrefix}-name`}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor={`${idPrefix}-description`}>Description:</label>
        <input
          id={`${idPrefix}-description`}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor={`${idPrefix}-origin`}>Origin:</label>
        <input
          id={`${idPrefix}-origin`}
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />

        <label htmlFor={`${idPrefix}-price`}>Price:</label>
        <input
          id={`${idPrefix}-price`}
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit">Add Matcha</button>
      </form>
    </div>
  );
}

export default Admin;
