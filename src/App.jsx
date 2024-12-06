import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Loginadmin from "./pages/login/Loginadmin";
import ProfilRusun from "./pages/ProfilRusun";
import Formpengajuan from "./pages/Formpengajuan";
import CekPermohonan from "./pages/CekPermohonan";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginadmin" element={<Loginadmin />} />
          <Route path="/Formpengajuan" element={<Formpengajuan />} />
          <Route path="/ProfilRusun" element={<ProfilRusun />} />
          <Route path="/CekPermohonan" element={<CekPermohonan />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
