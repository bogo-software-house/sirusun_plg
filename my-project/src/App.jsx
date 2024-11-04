import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProfilRusun from "./Pages/ProfilRusun";
import Formpengajuan from "./Pages/Formpengajuan";


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Formpengajuan" element={<Formpengajuan />} />
          <Route path="/ProfilRusun" element={<ProfilRusun />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
