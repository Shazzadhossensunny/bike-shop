import {
  logout,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtected = {
  children: ReactNode;
  role?: string | string[];
};

export const ProtectedRoute = ({ children, role }: TProtected) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  let user;
  if (token) {
    user = verifyToken(token);
  }
  // Check if user is active
  if (user && !(user as TUser)) {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Handle role-based access
  if (role) {
    const roles = Array.isArray(role) ? role : [role];
    if (!roles.includes((user as TUser)?.role)) {
      dispatch(logout());
      return (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
      );
    }
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
