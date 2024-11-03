import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Formpengajuan from "./Pages/Formpengajuan";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Formpengajuan" element={<Formpengajuan />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
