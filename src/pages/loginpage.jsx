import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [role, setRole] = useState("patient"); // for login
  const [registrationRole, setRegistrationRole] = useState("patient"); // for registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "login") {
      console.log("Login submit", { role, username });
      if (role === "doctor") navigate("/doctor-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/patient-dashboard");
    } else {
      console.log("Register submit", { registrationRole, username });
      // TODO: call registration API
      if (registrationRole === "doctor") navigate("/doctor-dashboard");
      else navigate("/patient-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-neutral-900 text-white px-8 md:px-12 py-16">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Digital Patient Card</h1>

          {/* Mode switch */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              type="button"
              onClick={() => { setMode("login"); setRole("patient"); }}
              className={`px-4 py-2 rounded-md ${
                mode === "login" && role === "patient"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Patient
            </button>

            <button
              type="button"
              onClick={() => { setMode("login"); setRole("doctor"); }}
              className={`px-4 py-2 rounded-md ${
                mode === "login" && role === "doctor"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Doctor
            </button>

            <button
              type="button"
              onClick={() => { setMode("login"); setRole("admin"); }}
              className={`px-4 py-2 rounded-md ${
                mode === "login" && role === "admin"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Admin
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`px-4 py-2 rounded-md ${
                mode === "register"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Registration role buttons (no Admin here) */}
          {mode === "register" && (
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                type="button"
                onClick={() => setRegistrationRole("patient")}
                className={`px-4 py-2 rounded-md ${
                  registrationRole === "patient"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Register as Patient
              </button>

              <button
                type="button"
                onClick={() => setRegistrationRole("doctor")}
                className={`px-4 py-2 rounded-md ${
                  registrationRole === "doctor"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Register as Doctor
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-300 transition-colors ease-in-out duration-300 text-black font-semibold text-lg"
            >
              {mode === "register"
                ? `Register as ${registrationRole}`
                : `Login as ${role}`}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-r from-emerald-500 via-neutral-200 to-emerald-400 text-black px-12">
        {/* Flickering Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FlickeringGrid />
        </div>

        {/* Foreground Content */}
        <div className="relative max-w-lg text-center">
          <h2 className="text-4xl font-semibold mb-4">
            Welcome to Digital Patient Card
          </h2>
          <p className="text-lg leading-relaxed">
            A secure platform for managing health records. Patients can access their
            details, doctors can review reports, and new users can get started by registering.
          </p>
        </div>
      </div>
    </div>
  );
}
