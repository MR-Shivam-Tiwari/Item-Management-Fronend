import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_URL = "http://localhost:3001/api/items"; // Replace with your actual backend URL

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    // Fetch items from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editItem) {
      // Edit the existing item
      fetch(`${API_URL}/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedItems = items.map((item) =>
            item.id === data.id ? data : item
          );
          setItems(updatedItems);
          setEditItem(null);
        })
        .catch((error) => console.error("Error editing item:", error));
    } else {
      // Add a new item to the API
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((data) => setItems([...items, data]))
        .catch((error) => console.error("Error adding item:", error));
    }

    // Clear the form
    setNewItem({ title: "", description: "" });
  };

  const handleEdit = (item) => {
    setNewItem({ title: item.title, description: item.description });
    setEditItem(item);
  };

  const handleDelete = (itemId) => {
    // Delete an item from the API
    fetch(`${API_URL}/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Item Management App</h1>

      <div className="row justify-content-center">
        {/* Add Item Form */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={newItem.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-center w-100"
                >
                  {editItem ? "Edit Item" : "Add Item"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* List Display */}
      {items.map((item) => (
        <div key={item.id} className=" mb-4">
          <div className="card h-100">
            <div className="card-body mb-2 d-flex align-items-center justify-content-between">
              <div className=" ">
                <h5 className="card-title">Name : {item.title}</h5>
                <p className="card-text w-75">
                  {" "}
                  <strong>Description:</strong> &nbsp;
                  {item.description}
                </p>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
