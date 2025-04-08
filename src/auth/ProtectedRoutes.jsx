import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
