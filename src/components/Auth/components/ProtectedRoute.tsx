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
    location.pathname === "/reset-password" ||
    location.pathname.startsWith("/home/payment-verification/")
  ) {
    return <Outlet />;
  }

  if (
    location.pathname === "/home/comp-info" &&
    user?.organization_info_completed
  ) {
    return <Navigate to="/home/dashboard" replace />;
  }
  // Redirect to comp-info if organization info is not completed
  else if (!user?.organization_info_completed) {
    return <Navigate to="/home/comp-info" replace />;
  } else if (
    user.organization_info_completed &&
    user.user_have_completed_payment !== "success"
  ) {
    // Only redirect if not already on payment page or payment verification page
    if (!location.pathname.startsWith("/home/payment")) {
      return <Navigate to="/home/payment" replace />;
    }
    return <Outlet />;
  }

  // Check permissions for specific routes
  const hasPermissionForRoute = () => {
    if (location.pathname === "/home/team") {
      return !user?.is_private && user?.is_admin;
    }
    return true;
  };

  // Redirect to dashboard if user doesn't have permission for the current route
  if (!hasPermissionForRoute()) {
    return <Navigate to="/home/dashboard" replace />;
  }

  return <Outlet />;
};
