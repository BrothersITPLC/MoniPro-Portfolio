import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/home/dashboard" replace />;
  }

  return <Outlet />;
};
