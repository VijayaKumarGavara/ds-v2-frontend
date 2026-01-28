import { Navigate, Outlet } from "react-router";
import { getAuth } from "../utils/auth";

const ProtectedRoute = ({ allowedRole }) => {
  const auth = getAuth();

  // Not logged in → go to landing
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  // Logged in but wrong role → redirect to correct dashboard
  if (auth.role !== allowedRole) {
    return <Navigate to={`/${auth.role}`} replace />;
  }

  // Authorized
  return <Outlet />;
};

export default ProtectedRoute;
