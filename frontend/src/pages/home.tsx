import { useForm, type SubmitHandler } from "react-hook-form";

type FlightType = "returnFlight" | "oneWayFlight";

interface FormData {
  flightType: FlightType;
  departure: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  passengers: number;
}

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  const flightTypeToggle = watch("flightType");

  return (
    <main>
      {/* Main form for handling the flight bookings */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Choose your flight type</label>
          <select
            defaultValue={"oneWayFlight"}
            {...register("flightType", { required: true })}
          >
            <option value="returnFlight">Return</option>
            <option value="oneWayFlight">One way</option>
          </select>
        </div>

        <div>
          <label>Departure</label>
          <input {...register("departure", { required: true })} />
          {errors.departure && <span>This field is required</span>}

          <label>Destination</label>
          <input {...register("destination", { required: true })} />
          {errors.destination && <span>This field is required</span>}

          <label>
            {flightTypeToggle === "returnFlight"
              ? "Enter Departure Date"
              : "Enter Date"}
          </label>
          <input {...register("departureDate", { required: true })} />
          {errors.departureDate && <span>This field is required</span>}

          {flightTypeToggle === "returnFlight" && (
            <>
              <label>Enter arrival date</label>
              <input
                {...register("arrivalDate", {
                  required: flightTypeToggle === "returnFlight"
                })}
              />
              {errors.arrivalDate && <span>This field is required</span>}
            </>
          )}

          <label>Enter amount of passengers</label>
          <input {...register("passengers", { required: true })} />
          {errors.passengers && <span>This field is required</span>}
        </div>

        <input type="submit" />
      </form>
    </main>
  );
};

export default Home;
