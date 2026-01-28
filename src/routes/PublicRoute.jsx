import { Navigate, Outlet } from "react-router";
import { getAuth } from "../utils/auth";

const PublicRoute = () => {
  const auth = getAuth();

  // User already logged in → go to dashboard
  if (auth) {
    return <Navigate to={`/${auth.role}`} replace />;
  }

  // Not logged in → allow public pages
  return <Outlet />;
};

export default PublicRoute;
