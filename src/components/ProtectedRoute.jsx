import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { token, role, loading } = useContext(AuthContext);

  // Tampilkan loading jika data belum siap
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika token atau role tidak valid, arahkan ke halaman login admin
  if (!token || role !== "admin") {
    return <Navigate to="/loginadmin" />;
  }

  return children;
};

export default ProtectedRoute;
