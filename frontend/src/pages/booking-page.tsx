import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formattedDate } from "../utilities/formattedDate";
import styles from "./booking-page.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';

export type FlightDetail = {
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

interface FormData {
  passengers: string;
}

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<FlightDetail | null>(null);
  const [editBooking, setEditBooking] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      passengers: booking !== null ? String(booking.passengers) : "",
    },
  });

  useEffect(() => {
    const getFlightBooking = async (bookingId: string) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/flight-bookings/${bookingId}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast("Could not load booking");
      }
    };

    if (id) getFlightBooking(id);
  }, [id]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!booking) return;
    try {
      setSaving(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings/${
          booking.id
        }`,
        { passengers: Number(data.passengers) }
      );
      setBooking(res.data);
      setEditBooking(false);
      navigate("/profile");
    } catch (err) {
      console.log("Error:", err);
      toast("Could not update passengers, try again");
    } finally {
      setSaving(false);
    }
  }

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

      {!editBooking ? (
        <button className={styles.button} onClick={() => setEditBooking(true)}>
          Edit passengers
        </button>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: ".5rem" }}>
            Passengers
          </label>
          <input
            {...register("passengers")}
            style={{ width: "100%", padding: "10px" }}
          />

          <button
            className={styles.button}
            style={{ marginTop: "1rem" }}
            onClick={handleSubmit(onSubmit)}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save and go to Profile"}
          </button>

          <button
            className={styles.button}
            style={{ marginTop: ".5rem" }}
            onClick={() => {
              setEditBooking(false);
            }}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      )}

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
