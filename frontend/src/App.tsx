import { RouterProvider } from 'react-router';
import router from './routes';
import { ToastContainer } from 'react-toastify'; //www.npmjs.com/package/react-toastify
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        closeButton={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
        theme="colored"
        toastStyle={{
          borderRadius: "0.25rem",
          borderTop: "0.063rem solid #E4E7EC",
          borderRight: "0.063rem solid #E4E7EC",
          borderBottom: "0.063rem solid #E4E7EC",
        }}
      />
    </>
  );
}

export default App
