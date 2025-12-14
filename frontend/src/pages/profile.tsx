import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import { toast } from "react-toastify";
import type { FlightDetail } from "./booking-page";
import FlightBookingCard from "../components/flight-booking-card";

const Profile = () => {
  const [bookings, setBookings] = useState<FlightDetail[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllFlightBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings`
      );
      setBookings(res.data);
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

  const deleteFlightBooking = async (id: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings/${id}`
      );
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast("flight booking has been deleted successfully!");
    } catch (err) {
      console.error(err);
      toast("Failed to delete booking");
    }
  };

  return (
    <div className={styles.profileMain}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileHeaderTop}>
            <div className={styles.profileHeaderContent}>
              <div className={styles.profileTitle}>
                <h1>My Flight Bookings</h1>
                <p>Manage your upcoming trips and reservations</p>
              </div>
              <Link to="/" className={styles.backButton}>
                ← Back to Search
              </Link>
            </div>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingState}>Loading your bookings...</div>
        )}

        {!loading && bookings.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No bookings yet</h3>
            <p>Start searching for flights to make your first booking!</p>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className={styles.bookingsList}>
            {bookings.map((booking) => (
              <div key={booking.id}>
                <FlightBookingCard
                  booking={booking}
                  onClick={() => deleteFlightBooking(booking.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
