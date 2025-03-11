import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const NASA_API_KEY = "DEMO_KEY"; // Replace with your own NASA API Key

function App() {
  const [apod, setApod] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        setApod(response.data);
      } catch (err) {
        setError("Failed to fetch data from NASA API");
      }
    };

    fetchApod();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>NASA Astronomy Picture of the Day</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {apod ? (
        <div>
          <h2>{apod.title}</h2>
          {apod.media_type === "image" ? (
            <img
              src={apod.url}
              alt={apod.title}
              style={{ width: "80%", maxWidth: "800px", borderRadius: "10px" }}
            />
          ) : (
            <iframe
              title="NASA Video"
              src={apod.url}
              frameBorder="0"
              allowFullScreen
              width="80%"
              height="400px"
            ></iframe>
          )}
          <p>{apod.explanation}</p>
          <p>
            <strong>Date:</strong> {apod.date}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
