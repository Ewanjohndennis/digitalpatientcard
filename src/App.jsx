import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/portfolio.jsx";
import LoginPage from "./pages/loginpage.jsx";
import RegisterPage from "./pages/registerpage.jsx";
import AdminDashboard from "./pages/admindash.jsx";
import PatientDashboard from "./pages/patientdash.jsx";
import DoctorDashboard from "./pages/doctordash.jsx";
import AboutPage from "./pages/about.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        {/* example placeholders */}
        <Route path="/patient-dashboard" element={<PatientDashboard/>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
}
