import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";

type TDashBoardRedirect = {
  children: ReactNode;
};

const DashboardRedirect = ({ children }: TDashBoardRedirect) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (user.role === "admin" && location.pathname === "/dashboard/admin") {
    return children;
  }
  if (user.role === "customer" && location.pathname === "/dashboard/user") {
    return children;
  }

  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/"
  ) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard/admin/profile" replace={true} />;
    }
    if (user.role === "customer") {
      return <Navigate to="/dashboard/user/profile" replace={true} />;
    }
  }

  if (
    location.pathname === "/dashboard/user" ||
    location.pathname === "/dashboard/user/"
  ) {
    if (user.role === "customer") {
      return <Navigate to="/dashboard/user/profile" replace={true} />;
    }
  }

  if (
    location.pathname === "/dashboard/admin" ||
    location.pathname === "/dashboard/admin/"
  ) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard/admin/profile" replace={true} />;
    }
  }

  // Default case: render the children components
  return children;
};

export default DashboardRedirect;
