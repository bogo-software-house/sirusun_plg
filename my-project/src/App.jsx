import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfilRusun from "./pages/ProfilRusun";
import Formpengajuan from "./pages/Formpengajuan";
import Admin from "./pages/Admin";


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Formpengajuan" element={<Formpengajuan />} />
          <Route path="/ProfilRusun" element={<ProfilRusun />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
