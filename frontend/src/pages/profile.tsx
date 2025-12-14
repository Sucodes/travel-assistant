import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import { toast } from 'react-toastify';
import type { FlightDetail } from './booking-page';

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

  const deleteFlightBooking = async (id: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings/${id}`
      );
      setBookings((prev) => prev.filter((b) => b.id !== id));
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
              <div key={booking.id} className={styles.bookingCard}>
                <div className={styles.bookingCardHeader}>
                  <div className={styles.airlineInfo}>
                    <h2 className={styles.airlineName}>{booking.airline}</h2>
                    <p className={styles.flightNumber}>
                      Flight {booking.flight_number}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFlightBooking(booking.id)}
                    className={styles.deleteButton}
                  >
                    Delete Booking
                  </button>
                </div>

                <div className={styles.bookingCardBody}>
                  <div className={styles.routeInfo}>
                    <div className={styles.routePoint}>
                      <h3 className={styles.routeCode}>
                        {booking.departure_code}
                      </h3>
                      <p className={styles.routeTime}>
                        {booking.departure_time}
                      </p>
                    </div>
                    <div className={styles.routeArrow}>→</div>
                    <div className={styles.routePoint}>
                      <h3 className={styles.routeCode}>
                        {booking.arrival_code}
                      </h3>
                      <p className={styles.routeTime}>{booking.arrival_time}</p>
                    </div>
                  </div>

                  <div className={styles.bookingDetails}>
                    <div className={styles.detailItem}>
                      <p className={styles.detailLabel}>Passengers</p>
                      <p className={styles.detailValue}>{booking.passengers}</p>
                    </div>
                    <div className={styles.detailItem}>
                      <p className={styles.detailLabel}>Total Price</p>
                      <p className={styles.detailValue}>
                        <span className={styles.priceHighlight}>
                          €{booking.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
