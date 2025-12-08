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
    <div>
      <div>
        <h1>Available Flights</h1>
        <p>New York (JFK) - Los Angeles (LAX)</p>
      </div>

      <div>
        {flights.map((flight) => (
          <div key={flight.id}>
            <div>
              <div>
                <span>{flight.airline}</span>
              </div>
              <div>${flight.price}</div>
            </div>

            <div>
              <div>
                <div>
                  {flight.departure.time}
                </div>
                <div>
                  {flight.departure.code}
                </div>
              </div>

              <div>
                <div>{flight.duration}</div>
                <div
                  className={`stops-badge ${
                    flight.stops > 0 ? "has-stops" : ""
                  }`}
                >
                  {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                </div>
              </div>

              <div>
                <div>
                  {flight.arrival.time}
                </div>
                <div>
                  {flight.arrival.code}
                </div>
              </div>
            </div>

            <button>Select Flight</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
