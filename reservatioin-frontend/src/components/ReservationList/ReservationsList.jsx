import { useEffect, useState } from "react";
import "./ReservationsList.css"; // ✅ Добавяме CSS файл

function ReservationsList() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Добавяме loading state

  useEffect(() => {
    console.log("Starting fetch...");
    setLoading(true);
    
    fetch("http://localhost:8080/api/reservations/all")
      .then((response) => {
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setReservations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Full error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading reservations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>❌ Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="empty-container">
        <h3>📋 No Reservations Found</h3>
        <p>There are no reservations in the system yet.</p>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <h2>📋 All Reservations</h2>
      <div className="reservations-grid">
        {reservations.map((res) => (
          <div key={res.id} className="reservation-card">
            <h3>Reservation #{res.id}</h3>
            <div className="reservation-details">
              <p><strong>👤 User ID:</strong> {res.userId}</p>
              <p><strong>🏨 Room ID:</strong> {res.roomId}</p>
              <p><strong>📅 Check-in:</strong> {res.checkIn}</p>
              <p><strong>📅 Check-out:</strong> {res.checkOut}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationsList;
