import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

type Booking = {
  id: number;
  airline: string;
  flight_number: string;
  departure_code: string;
  arrival_code: string;
  departure_time: string;
  arrival_time: string;
  price: string | number;
  passengers: number;
};

const Profile = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllFlightBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings`
      );
      setBookings(res.data);
      toast("flights has been displayed successfully!");
    } catch (err) {
      console.error(err);
      toast("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFlightBookings();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Profile</h2>

        <Link to="/" style={{ textDecoration: "none" }}>
          <button style={{ padding: "8px 12px", cursor: "pointer" }}>
            Back to Home
          </button>
        </Link>
      </div>

      <p style={{ marginTop: 0, opacity: 0.8 }}>Your booked flights</p>

      {loading ? <div>Loading…</div> : null}

      {!loading && bookings.length === 0 ? (
        <div style={{ padding: 12, border: "1px solid #ddd" }}>
          No bookings yet.
        </div>
      ) : null}

      <div style={{ display: "grid", gap: 10 }}>
        {bookings.map((b) => (
          <div key={b.id} style={{ border: "1px solid #ddd", padding: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div>
                <strong>{b.airline}</strong> {b.flight_number}
                <div style={{ fontSize: 14, opacity: 0.8 }}>
                  {b.departure_code} to {b.arrival_code}
                </div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Departs: {b.departure_time}, Arrives: {b.arrival_time}
                </div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Passengers: {b.passengers}, Price: £{b.price}
                </div>
              </div>

              <button
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  border: "1px solid #c00",
                  background: "#fff",
                  fontWeight: 700,
                  height: "fit-content",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
