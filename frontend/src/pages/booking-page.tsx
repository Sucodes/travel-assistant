import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formattedDate } from "../utilities/formattedDate";
import styles from "./booking-page.module.css";

type FlightDetail = {
  id: number;
  airline: string;
  flight_number: string;
  departure_time: string;
  departure_city: string;
  departure_code: string;
  arrival_time: string;
  arrival_city: string;
  arrival_code: string;
  duration: number;
  stops: number;
  price: number;
  passengers: number;
};

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<FlightDetail | null>(null);

  useEffect(() => {
    const getFlightBooking = async (id: string) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings/${id}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    if (id) getFlightBooking(id);
  }, [id]);

  if (!booking) return <p>Loading booking...</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Review flight information</h1>

      <div className={styles.card}>
        <div className={styles.header}>
          <strong className={styles.airline}>{booking.airline}</strong>
          <span className={styles.flightNumber}>{booking.flight_number}</span>
        </div>

        <div className={styles.route}>
          <div className={styles.location}>
            <p>{formattedDate(booking.departure_time, "MMM D HH:mm")}</p>
            <p>
              {booking.departure_city} ({booking.departure_code})
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p>{formattedDate(booking.arrival_time, "MMM D HH:mm")}</p>
            <p className={styles.city}>
              {booking.arrival_city} ({booking.arrival_code})
            </p>
          </div>
        </div>

        <div className={styles.details}>
          <span>
            {booking.stops === 0 ? "Non-stop" : `${booking.stops} stop(s)`}
          </span>
          <span>{booking.duration} mins</span>
        </div>

        <div className={styles.total}>Total: €{booking.price}</div>
      </div>

      <button
        className={styles.button}
        onClick={() => navigate(`/booking/${id}/update`)}
      >
        Next
      </button>
      <button
        className={styles.button}
        style={{ marginTop: "2rem" }}
        onClick={() => navigate(`/`)}
      >
        Back
      </button>
    </main>
  );
};

export default BookingPage;
