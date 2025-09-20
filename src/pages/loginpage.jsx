import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Full-page Login (split-screen). Use as a route target (e.g. /login).
 */
export default function LoginPage() {
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your auth API here
    console.log("login submit", { role, username });
    // example redirect after successful login:
    if (role === "doctor") navigate("/doctor-dashboard");
    else navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side = full-page form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-neutral-900 text-white px-8 md:px-12 py-16">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Digital Patient Card</h1>

          {/* Role switch */}
          <div className="flex gap-3 mb-8">
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={`px-4 py-2 rounded-md ${
                role === "patient"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Patient
            </button>

            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={`px-4 py-2 rounded-md ${
                role === "doctor"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Doctor
            </button>

            <button
              type="button"
              onClick={() => setRole("register")}
              className={`px-4 py-2 rounded-md ${
                role === "register"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Form (fills the left half) */}
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

            {role === "register" && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
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
              {role === "register" ? "Register" : `Login as ${role}`}
            </button>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
              <button
                type="button"
                className="underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-300" />
                Remember me
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Right side = gradient info (hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-r from-emerald-500 via-neutral-200 to-emerald-400 text-black px-12">
        <div className="max-w-lg text-center">
          <h2 className="text-4xl font-semibold mb-4">Welcome to Digital Patient Card</h2>
          <p className="text-lg leading-relaxed">
            A secure platform for managing health records. Patients can access their
            details, doctors can review reports, and new users can get started by registering.
          </p>
        </div>
      </div>
    </div>
  );
}
