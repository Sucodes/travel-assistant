import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type FlightType = "returnFlight" | "oneWayFlight";

interface FormData {
  flightType: FlightType;
  departure: string;
  destination: string;
  departureDate: string | null;
  arrivalDate: string | null;
  passengers: number;
}

const Home = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      flightType: "oneWayFlight",
      departureDate: null,
      arrivalDate: null,
      destination: "",
      departure: "",
      passengers: 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

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
              <label>Departure</label>
              <input {...register("departure", { required: true })} />
              {errors.departure && (
                <span className={styles.errorMessage}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Destination</label>
              <input {...register("destination", { required: true })} />
              {errors.destination && (
                <span className={styles.errorMessage}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>
                {flightTypeToggle === "returnFlight"
                  ? "Enter Departure Date"
                  : "Enter Date"}
              </label>
              <DatePicker
                placeholderText="Click to select a date"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (startDate)
                    setValue(
                      "departureDate",
                      startDate.toISOString().split("T")[0]
                    );
                }}
              />
              {errors.departureDate && (
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
                        "arrivalDate",
                        endDate.toISOString().split("T")[0]
                      );
                  }}
                />
                {errors.arrivalDate && (
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
    </main>
  );
};

export default Home;
