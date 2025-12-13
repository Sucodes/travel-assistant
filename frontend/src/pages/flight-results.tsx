import styles from "./flight-results.module.css";

export interface FlightResultsProps {
  id?: number;
  departure: {
    city: string;
    code: string;
    time: string;
  };
  arrival: {
    city: string;
    code: string;
    time: string;
  };
  duration: number;
  airline: string;
  airline_logo: string;
  flight_number: string;
  price: string;
  stops: number;
}

const FlightResults = ({
  airline,
  departure,
  arrival,
  duration,
  stops,
  price,
}: FlightResultsProps) => {
  return (
    <div className={styles.flightsList}>
      <div className={styles.flightCard}>
        <div className={styles.flightHeader}>
          <div className={styles.airlineInfo}>
            <span className={styles.airlineName}>{airline}</span>
          </div>
          <div className={styles.flightPrice}>${price}</div>
        </div>

        <div className={styles.flightDetails}>
          <div className={styles.timeLocation}>
            <div className={styles.flightTime}>{departure.time}</div>
            <div className={styles.airportCode}>{departure.code}</div>
          </div>

          <div className={styles.flightDurationInfo}>
            <div className={styles.durationBadge}>{duration}</div>
            <div className={`stops-badge ${stops > 0 ? "has-stops" : ""}`}>
              {stops === 0 ? "Non-stop" : `${stops} stop`}
            </div>
          </div>

          <div className={styles.timeLocation}>
            <div className={styles.flightTime}>{arrival.time}</div>
            <div className={styles.airportCode}>{arrival.code}</div>
          </div>
        </div>

        <button className={styles.selectButton}>Select Flight</button>
      </div>
    </div>
  );
};

export default FlightResults;
