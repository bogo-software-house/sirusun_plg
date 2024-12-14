import React, { createContext, useState, useEffect } from "react";

// Membuat Context
const AuthContext = createContext();

// Komponen Provider untuk membungkus aplikasi dan menyediakan state global
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Menetapkan state loading false setelah token dan role diset
    if (token && role) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [token, role]);

  // Function untuk login, set token dan role
  const login = (newToken, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  // Function untuk logout, hapus token dan role
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return <AuthContext.Provider value={{ token, role, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
