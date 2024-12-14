import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Log values to check if they are correct
  console.log("Token:", token);
  console.log("Role:", role);

  if (!token || role !== "admin") {
    return <Navigate to="/" />; // Redirect to login if no token or role is not admin
  }

  return children; // Render the children if the user is authenticated and has the admin role
};

export default ProtectedRoute;
