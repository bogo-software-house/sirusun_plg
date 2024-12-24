import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // Pastikan ini benar
import ProtectedRoute from "./components/protected/ProtectedRoute";
import UserProtectedRoute from "./components/protected/UserProtectedRoute";
import Spinner from "./components/ui/spinner/Spinner";

// Landing Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Loginadmin = lazy(() => import("./pages/login/Loginadmin"));
const ProfilRusun = lazy(() => import("./pages/landing/ProfilRusun"));
const Formpengajuan = lazy(() => import("./pages/landing/Formpengajuan"));
const CekPermohonan = lazy(() => import("./pages/landing/CekPermohonan"));

// Admin Pages
const Admin = lazy(() => import("./pages/admin/Admin"));
const Pengajuan = lazy(() => import("./pages/admin/Pengajuan"));
const Penghuni = lazy(() => import("./pages/admin/Penghuni"));
const Bangunan = lazy(() => import("./pages/admin/Bangunan"));
const Pembayaran = lazy(() => import("./pages/admin/Pembayaran"));
const TransaksiReport = lazy(() => import("./pages/admin/TransaksiReport"));
const RoomReport = lazy(() => import("./pages/admin/RoomsReport"));
const Suggestion = lazy(() => import("./pages/admin/Suggestion"));

// User Pages
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Spinner text="Loading..." />
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginadmin" element={<Loginadmin />} />
            <Route path="/Formpengajuan" element={<Formpengajuan />} />
            <Route path="/ProfilRusun/:id" element={<ProfilRusun />} />
            <Route path="/CekPermohonan" element={<CekPermohonan />} />

            {/* Admin Dashboard Routes */}
            <Route
              path="/admin/dashboard/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route index element={<Penghuni />} /> {/* Default Page */}
              <Route path="pengajuan" element={<Pengajuan />} />
              <Route path="penghuni" element={<Penghuni />} />
              <Route path="pembayaran" element={<Pembayaran />} />
              <Route path="laporan" element={<RoomReport />} />
              <Route path="status-transaksi-history" element={<TransaksiReport />} />
              <Route path="bangunan" element={<Bangunan />} />
              <Route path="suggestion" element={<Suggestion />} />
            </Route>

            {/* User Dashboard Routes */}
            <Route
              path="/user/dashboard"
              element={
                <UserProtectedRoute>
                  <UserDashboard />
                </UserProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
