import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || (role !== "admin" && role !== "staff")) {
    return <Navigate to="/" />; // Redirect to login if no token or role is not admin/staff
  }

  return children; // Render the children if the user is authenticated and has the correct role
};

export default ProtectedRoute;
