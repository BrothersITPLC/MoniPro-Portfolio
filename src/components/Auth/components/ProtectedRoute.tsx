import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Allow access to logout and comp-info routes
  if (
    location.pathname === "/logout" ||
    location.pathname === "/home/comp-info"
  ) {
    return <Outlet />;
  }

  // Redirect to comp-info if organization info is not completed
  // if (!userData.organization_info_completed) {
  //   return <Navigate to="/home/comp-info" replace />;
  // }

  return <Outlet />;
};
