import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRole.includes(role)) ? (
    <Outlet />
  ) : auth?.usernameInput ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
