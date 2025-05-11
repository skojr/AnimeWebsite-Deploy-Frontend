import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./AuthService"; // Adjust path as needed

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
