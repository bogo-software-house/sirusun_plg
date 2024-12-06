// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "user") {
    // Jika tidak ada token atau role bukan admin, redirect ke login
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserProtectedRoute;
