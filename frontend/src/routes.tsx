import { createBrowserRouter } from "react-router";
import Home from './pages/home';
import BookingPage from './pages/booking-page';
import Profile from './pages/profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/flight-booking/:id",
    element: <BookingPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]);

export default router;