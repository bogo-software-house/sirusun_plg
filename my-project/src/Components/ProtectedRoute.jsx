// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    // Jika tidak ada token atau role bukan admin, redirect ke login
    return <Navigate to="/loginadmin" />;
  }

  return children;
};

export default ProtectedRoute;
