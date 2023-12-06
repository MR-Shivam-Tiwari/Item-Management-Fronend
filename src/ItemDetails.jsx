import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api/items'; // Replace with your actual backend URL

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch item details by ID
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error('Error fetching item details:', error));
  }, [id]);

  return (
    <div>
      <Link to="/" className="btn btn-primary mb-3">
        Back to List
      </Link>

      {item ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetails;
