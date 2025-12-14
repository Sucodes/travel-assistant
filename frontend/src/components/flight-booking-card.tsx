import styles from "./flight-booking-card.module.css";
import type { FlightDetail } from "../pages/booking-page";
import { useNavigate } from 'react-router-dom';

type FlightBookingCardProps = {
  onClick: (id: number) => void;
  booking: FlightDetail;
};

const flightBookingCard = ({ booking, onClick }: FlightBookingCardProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  return (
    <div className={styles.bookingCard}>
      <div className={styles.bookingCardHeader}>
        <div className={styles.airlineInfo}>
          <h2 className={styles.airlineName}>{booking.airline}</h2>
          <p className={styles.flightNumber}>Flight {booking.flight_number}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate(`/flight-booking/${booking.id}`)}
            style={{
              marginRight: "2rem",
              borderRadius: "8px",
              padding: "8px 10px",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onClick(booking.id)}
            className={styles.deleteButton}
          >
            Delete Booking
          </button>
        </div>
      </div>

      <div className={styles.bookingCardBody}>
        <div className={styles.routeInfo}>
          <div className={styles.routePoint}>
            <h3 className={styles.routeCode}>{booking.departure_code}</h3>
            <p className={styles.routeTime}>{booking.departure_time}</p>
          </div>
          <div className={styles.routeArrow}>→</div>
          <div className={styles.routePoint}>
            <h3 className={styles.routeCode}>{booking.arrival_code}</h3>
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
              <span className={styles.priceHighlight}>€{booking.price}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default flightBookingCard;
