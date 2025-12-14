import { createBrowserRouter } from "react-router";
import Home from './pages/home';
import BookingPage from './pages/booking-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/flight-booking/:id",
    element: <BookingPage />,
  },
]);

export default router;