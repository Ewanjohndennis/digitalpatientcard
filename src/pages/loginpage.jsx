import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import login from "@/lib/Login";
import LoadingModal from "@/components/spinner";

export default function LoginPage() {
  const [role, setRole] = useState("patient"); // patient/doctor/admin
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminpin, setadminpin] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (role === "doctor") {
      login('doctor', username, password, navigate, setloading);
    }
    else if (role === "admin") {
      login('admin', username, password, navigate, setloading, adminpin);
    }
    else {
      const res = login('patient', username, password, navigate, setloading);
    }
  };

  const handleHome = () => {
    navigate("/"); // navigate to home page
  }

  return (
    <div className="min-h-screen flex">
      {/* This line correctly renders the modal as an overlay when loading is true */}
      {loading && <LoadingModal message="Logging in..." />}
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-neutral-900 text-white px-8 md:px-12 py-16">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Digital Patient Card</h1>
          <button onClick={handleHome} className="mb-4 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black transition-colors">
            Home </button>

          {/* Role selection */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["patient", "doctor", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-md ${role === r ? "bg-cyan-600 text-white" : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              required
            />
            {role === "admin" && (
              <input
                value={adminpin}
                onChange={(e) => setadminpin(e.target.value)}
                type="password"
                placeholder="Adminpin"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                required
              />
            )}
            <button
              type="submit"
              className="mt-2 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-300 text-black font-semibold text-lg"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-gray-400">
              New here?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-cyan-400 cursor-pointer hover:underline"
              >
                Get Started
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-r from-cyan-500 via-neutral-200 to-cyan-400 text-black px-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <FlickeringGrid />
        </div>
        <div className="relative max-w-lg text-center">
          <h2 className="text-4xl font-semibold mb-4">Welcome Back</h2>
          <p className="text-lg leading-relaxed">
            Log in to access your health records and manage your account.
          </p>
        </div>
      </div>
    </div>
  );

}
