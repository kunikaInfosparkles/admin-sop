import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const check = true
  return check ? <Outlet /> : <Navigate to="/" />;
};

export const PublicRoute = () => {
  const check = true
  return check ? <Outlet /> : <Navigate to="/" />;
};
