import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formattedDate } from "../utilities/formattedDate";

type FlightDetail = {
  id: number;
  airline: string;
  flight_number: string;
  departure_time: string;
  departure_city: string;
  departure_code: string;
  arrival_time: string;
  arrival_city: string;
  arrival_code: string;
  duration: number;
  stops: number;
  price: number;
  passengers: number;
};

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<FlightDetail | null>(null);

  useEffect(() => {
    const getFlightBooking = async (id: string) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/flight-bookings/${id}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    if (id) getFlightBooking(id);
  }, [id]);

  if (!booking) return <p>Loading booking...</p>;

  return (
    <main>
      <h1>Review flight information</h1>

      <div>
        <div>
          <strong>{booking.airline}</strong>
          <span>{booking.flight_number}</span>
        </div>

        <div>
          <div>
            <p>{formattedDate(booking.departure_time, "MMM D HH:mm")}</p>
            <p>
              {booking.departure_city} ({booking.departure_code})
            </p>
          </div>

          <div>
            <p>{formattedDate(booking.arrival_time, "MMM D HH:mm")}</p>
            <p>
              {booking.arrival_city} ({booking.arrival_code})
            </p>
          </div>
        </div>

        <div>
          <span>
            {booking.stops === 0 ? "Non-stop" : `${booking.stops} stop(s)`}
          </span>
          <span>{booking.duration} mins</span>
        </div>

        <div>Total: €{booking.price}</div>
      </div>

      <button>
        Next
      </button>
    </main>
  );
};

export default BookingPage;
