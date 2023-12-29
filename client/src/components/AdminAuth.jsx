import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
  
    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : auth?.username ? (
      <Navigate
        to="/dash/employees/userview"
        state={{ from: location }}
        replace
      />
    ) : (
      <Navigate to="/" state={{ from: location }} replace></Navigate>
    );
}

export default AdminAuth