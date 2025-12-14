import { formattedDate } from "../utilities/formattedDate";
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
  duration_label: string;
  airline: string;
  airline_logo: string;
  flight_number: string;
  price: number;
  stops: number;
  passengers: string;
}

type FlightDataProps = {
  flight: FlightResultsProps;
  onSelect: (flight: FlightResultsProps) => void;
};

const FlightResults = ({ flight, onSelect }: FlightDataProps) => {
  const { airline, departure, arrival, duration, stops, price } = flight;
  return (
    <div className={styles.flightCard}>
      <div className={styles.flightHeader}>
        <div className={styles.airlineInfo}>
          <span className={styles.airlineName}>{airline}</span>
        </div>
        <div className={styles.flightPrice}>${price}</div>
      </div>

      <div className={styles.flightDetails}>
        <div className={styles.timeLocation}>
          <div className={styles.flightTime}>
            {formattedDate(departure.time, "MMM D")}
          </div>
          <div className={styles.airportCode}>{departure.code}</div>
        </div>

        <div className={styles.flightDurationInfo}>
          <div className={styles.durationBadge}>{duration}</div>
          <div className={`stops-badge ${stops > 0 ? "has-stops" : ""}`}>
            {stops === 0 ? "Non-stop" : `${stops} stop`}
          </div>
        </div>

        <div className={styles.timeLocation}>
          <div className={styles.flightTime}>
            {formattedDate(arrival.time, "MMM D")}
          </div>
          <div className={styles.airportCode}>{arrival.code}</div>
        </div>
      </div>

      <button
        className={styles.selectButton}
        onClick={() => onSelect(flight)}
      >
        Select Flight
      </button>
    </div>
  );
};

export default FlightResults;
