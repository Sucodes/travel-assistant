import styles from "./flight-results.module.css";

const FlightResults = () => {
    // Dummy data for flight results
  const flights = [
    {
      id: 1,
      airline: "Delta Airlines",
      departure: { time: "08:00", city: "New York", code: "JFK" },
      arrival: { time: "11:30", city: "Los Angeles", code: "LAX" },
      duration: "5h 30m",
      stops: 0,
      price: 289,
    },
    {
      id: 2,
      airline: "United Airlines",
      departure: { time: "10:15", city: "New York", code: "JFK" },
      arrival: { time: "13:45", city: "Los Angeles", code: "LAX" },
      duration: "5h 30m",
      stops: 0,
      price: 315,
    },
  ];

  return (
    <div className={styles.flightResultsContainer}>
      <div className={styles.resultsHeader}>
        <h1>Available Flights</h1>
        <p className={styles.routeInfo}>New York (JFK) → Los Angeles (LAX)</p>
      </div>

      <div className={styles.flightsList}>
        {flights.map((flight) => (
          <div key={flight.id} className={styles.flightCard}>
            <div className={styles.flightHeader}>
              <div className={styles.airlineInfo}>
                <span className={styles.airlineName}>{flight.airline}</span>
              </div>
              <div className={styles.flightPrice}>${flight.price}</div>
            </div>

            <div className={styles.flightDetails}>
              <div className={styles.timeLocation}>
                <div className={styles.flightTime}>{flight.departure.time}</div>
                <div className={styles.airportCode}>
                  {flight.departure.code}
                </div>
              </div>

              <div className={styles.flightDurationInfo}>
                <div className={styles.durationBadge}>{flight.duration}</div>
                <div
                  className={`stops-badge ${
                    flight.stops > 0 ? "has-stops" : ""
                  }`}
                >
                  {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                </div>
              </div>

              <div className={styles.timeLocation}>
                <div className={styles.flightTime}>{flight.arrival.time}</div>
                <div className={styles.airportCode}>{flight.arrival.code}</div>
              </div>
            </div>

            <button className={styles.selectButton}>Select Flight</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
