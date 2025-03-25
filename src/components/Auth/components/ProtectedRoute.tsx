import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
export const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Allow access to logout and comp-info routes
  if (
    location.pathname === "/logout" ||
    location.pathname === "/home/comp-info" ||
    location.pathname === "/home/private-info" ||
    location.pathname === "/reset-password"
  ) {
    return <Outlet />;
  }

  // Redirect to comp-info if organization info is not completed
  if (!user?.organization_info_completed && user?.is_private) {
    return <Navigate to="/home/private-info" replace />;
  } else if (!user?.organization_info_completed) {
    return <Navigate to="/home/comp-info" replace />;
  }

  return <Outlet />;
};
