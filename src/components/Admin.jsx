import React, { useState, useId, useRef, useEffect } from "react";

function Admin({ addMatcha }) {
  // Track form input values
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: ""
  });

  // Generate unique IDs for accessibility
  const nameId = useId();
  const descId = useId();
  const originId = useId();
  const priceId = useId();

  // Ref to auto-focus the first input
  const nameInputRef = useRef(null);

  // Focus the name input on component mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Update form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDrink = {
      ...formData,
      price: parseFloat(formData.price)
    };

    fetch("http://localhost:3002/matcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDrink)
    })
      .then((res) => res.json())
      .then((data) => {
        addMatcha(data);
        setFormData({ name: "", description: "", origin: "", price: "" });
        nameInputRef.current?.focus(); // Refocus after submit
      })
      .catch((err) => console.error("Failed to add matcha:", err));
  };

  return (
    <div className="admin">
      <h2>Add a New Matcha Drink</h2>
      <form className="add-matcha-form" onSubmit={handleSubmit}>
        <label htmlFor={nameId}>Name:</label>
        <input
          ref={nameInputRef}
          id={nameId}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor={descId}>Description:</label>
        <input
          id={descId}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor={originId}>Origin:</label>
        <input
          id={originId}
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />

        <label htmlFor={priceId}>Price:</label>
        <input
          id={priceId}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
        />

        <button type="submit">Add Drink</button>
      </form>
    </div>
  );
}

export default Admin;
