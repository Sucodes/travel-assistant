import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import FlightResults, { type FlightResultsProps } from "./flight-results";

type FlightType = "returnFlight" | "oneWayFlight";

interface FormData {
  flightType: FlightType;
  departureId: string;
  arrivalId: string;
  outboundDate: string | null;
  inboundDate: string | null;
  passengers: string;
}

type FlightData = {
  flights: [
    {
      departure_airport: {
        airport_name: string;
        airport_code: string;
        time: string;
      };
      arrival_airport: {
        airport_name: string;
        airport_code: string;
        time: string;
      };
    }
  ];
  duration_label: string;
  duration: number;
  airline: string;
  airline_logo: string;
  flight_number: string;
  price: string;
  stops: number;
};

const Home = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const [flightData, setFlightData] = useState<FlightResultsProps[] | null>(
    null
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      flightType: "oneWayFlight",
      outboundDate: null,
      inboundDate: null,
      arrivalId: "",
      departureId: "",
      passengers: "",
    },
  });

  const fetch = async (data: FormData) => {
    // TODO: Persist the fetched data to local storage so it is not lost when page is refreshed
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/flights", {
        params: {
          departure_id: data.departureId,
          arrival_id: data.arrivalId,
          outbound_date: data.outboundDate,
          adults: data.passengers,
        },
      });
      const newData = res.data.data.itineraries.topFlights.map(
        (flightDetail: FlightData, index: number) => {
          const {
            flights,
            duration_label,
            airline,
            airline_logo,
            flight_number,
            price,
            stops,
          } = flightDetail;

          return {
            id: index + 1,
            departure: {
              time: flights[0].departure_airport.time,
              city: flights[0].departure_airport.airport_name,
              code: flights[0].departure_airport.airport_code,
            },
            arrival: {
              time: flights[0].arrival_airport.time,
              city: flights[0].arrival_airport.airport_name,
              code: flights[0].arrival_airport.airport_code,
            },
            duration: duration_label,
            airline,
            airline_logo,
            flight_number,
            price,
            stops,
          };
        }
      );
      setFlightData(newData);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => fetch(data);

  const flightTypeToggle = watch("flightType");

  return (
    <main className={styles.main}>
      {/* Main form for handling the flight bookings */}

      <div className={styles.promoBar}>
        ✈️ Book now and save up to 20% on selected routes!
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>Find Your Perfect Flight</h1>
          <p>Your travel assistance, we've got you covered when plans change</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.flightTypeSection}>
            <label>Choose your flight type</label>
            <select
              defaultValue={"oneWayFlight"}
              {...register("flightType", { required: true })}
            >
              <option value="returnFlight">Return</option>
              <option value="oneWayFlight">One way</option>
            </select>
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label>Departure_id</label>
              <input {...register("departureId", { required: true })} />
              {errors.departureId && (
                <span className={styles.errorMessage}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>arrivalId</label>
              <input {...register("arrivalId", { required: true })} />
              {errors.arrivalId && (
                <span className={styles.errorMessage}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>
                {flightTypeToggle === "returnFlight"
                  ? "Enter Departure_id Date"
                  : "Enter Date"}
              </label>
              <DatePicker
                placeholderText="Click to select a date"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    setStartDate(date);
                    setValue("outboundDate", date.toISOString().split("T")[0]);
                  }
                }}
              />
              {errors.outboundDate && (
                <span className={styles.errorMessage}>
                  This field is required
                </span>
              )}
            </div>

            {flightTypeToggle === "returnFlight" && (
              <div className={styles.inputGroup}>
                <label>Enter arrival date</label>
                <DatePicker
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    if (endDate)
                      setValue(
                        "inboundDate",
                        endDate.toISOString().split("T")[0]
                      );
                  }}
                />
                {errors.inboundDate && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label>Enter amount of passengers</label>
              <input {...register("passengers", { required: true })} />
              {errors.passengers && (
                <span className={styles.errorMessage}>
                  This field is required
                </span>
              )}
            </div>
          </div>

          <input type="submit" className={styles.submitButton} />
        </form>
      </div>

      {flightData && flightData.length > 0 && (
        <div>
          {flightData.map((flight) => (
            <FlightResults
              key={flight.id}
              airline={flight.airline}
              airline_logo={flight.airline_logo}
              flight_number={flight.flight_number}
              departure={flight.departure}
              arrival={flight.arrival}
              duration={flight.duration}
              stops={flight.stops}
              price={flight.price}
            />
          ))}
        </div>
      )}

      {flightData && flightData.length == 0 && (
        <p>No flights found for the selected criteria.</p>
      )}
    </main>
  );
};

export default Home;
