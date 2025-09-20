import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/portfolio.jsx";
import LoginPage from "./pages/loginpage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        {/* example placeholders */}
        <Route path="/patient-dashboard" element={<div>Patient dashboard</div>} />
        <Route path="/doctor-dashboard" element={<div>Doctor dashboard</div>} />
      </Routes>
    </Router>
  );
}
