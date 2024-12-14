import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Loginadmin from "./pages/login/Loginadmin";
import ProfilRusun from "./pages/ProfilRusun";
import Formpengajuan from "./pages/Formpengajuan";
import CekPermohonan from "./pages/CekPermohonan";
import Admin from "./pages/Admin";
import Pengajuan from "./pages/admin/Pengajuan";
import Penghuni from "./pages/admin/Penghuni";
import Bangunan from "./pages/admin/Bangunan";
import Unit from "./pages/admin/Unit";
import Pembayaran from "./pages/admin/Pembayaran";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
     
        <Routes>
          {/* Halaman Umum */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginadmin" element={<Loginadmin />} />
          <Route path="/Formpengajuan" element={<Formpengajuan />} />
          <Route path="/ProfilRusun/:id" element={<ProfilRusun />} />
          <Route path="/CekPermohonan" element={<CekPermohonan />} />
          

          {/* Dashboard Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Admin /> {/* Layout untuk Dashboard Admin */}
              </ProtectedRoute>
            }
          >
            {/* Halaman Default Setelah Login Admin */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Penghuni />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/pengajuan"
              element={
                <ProtectedRoute>
                  <Pengajuan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/penghuni"
              element={
                <ProtectedRoute>
                  <Penghuni />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/pembayaran"
              element={
                <ProtectedRoute>
                  <Pembayaran />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/unit"
              element={
                <ProtectedRoute>
                  <Unit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/bangunan"
              element={
                <ProtectedRoute>
                  <Bangunan />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Dashboard User */}
          <Route
            path="/user/dashboard"
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
