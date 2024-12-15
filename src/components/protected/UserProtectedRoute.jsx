import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const UserProtectedRoute = ({ children }) => {
  const { token, role, loading } = useContext(AuthContext);

  // Tampilkan loading jika data belum siap
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika token tidak ada atau role bukan "user", arahkan ke halaman login
  if (!token || role !== "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserProtectedRoute;
