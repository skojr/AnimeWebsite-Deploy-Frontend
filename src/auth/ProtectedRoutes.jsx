import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./AuthService"; // Adjust path as needed
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    toast.info("Please log in to access this page.", {
      autoClose: 3000,
    });
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }

  return children;
};

export default ProtectedRoute;
