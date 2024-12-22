import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Loginadmin from "./pages/login/Loginadmin";
import ProfilRusun from "./pages/landing/ProfilRusun";
import Formpengajuan from "./pages/landing/Formpengajuan";
import CekPermohonan from "./pages/landing/CekPermohonan";
import Admin from "./pages/admin/Admin";
import Pengajuan from "./pages/admin/Pengajuan";
import Penghuni from "./pages/admin/Penghuni";
import Bangunan from "./pages/admin/Bangunan";
import Pembayaran from "./pages/admin/Pembayaran";
import UserDashboard from "./pages/user/UserDashboard";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import UserProtectedRoute from "./components/protected/UserProtectedRoute";
import TransaksiReport from "./pages/admin/TransaksiReport";
import RoomReport from "./pages/admin/RoomsReport";
import Suggestion from "./pages/admin/Suggestion";

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
              path="/admin/dashboard/laporan"
              element={
                <ProtectedRoute>
                  <RoomReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/status-transaksi-history"
              element={
                <ProtectedRoute>
                  <TransaksiReport />
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
            <Route
              path="/admin/dashboard/suggestion"
              element={
                <ProtectedRoute>
                  <Suggestion />
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
