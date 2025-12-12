import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type FlightType = "returnFlight" | "oneWayFlight";

interface FormData {
  flightType: FlightType;
  departureId: string;
  arrivalId: string;
  outboundDate: string | null;
  inboundDate: string | null;
  passengers: string;
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
      outboundDate: null,
      inboundDate: null,
      arrivalId: "",
      departureId: "",
      passengers: "",
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
                      "outboundDate",
                      startDate.toISOString().split("T")[0]
                    );
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
    </main>
  );
};

export default Home;
