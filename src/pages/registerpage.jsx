import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import register from "@/lib/Register";

export default function RegisterPage() {
  const [registrationRole, setRegistrationRole] = useState("patient");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",         // patient
    age: "",          // patient
    phoneNumber: "",   // patient
    specialization: "",
    email: "",
    address: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    //console.log("Register data:", registrationRole, formData);

    if (registrationRole === "doctor") {
      await register('doctor', formData, navigate);
    }
    else {
      await register('patient', formData, navigate);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-neutral-900 text-white px-8 md:px-12 py-16">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Get Started</h1>

          {/* Role selection */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["patient", "doctor"].map((role) => (
              <button
                key={role}
                onClick={() => setRegistrationRole(role)}
                className={`px-4 py-2 rounded-md ${registrationRole === role
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <input
              value={formData.username}
              name="username"
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <input
              value={formData.password}
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <input
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />

            <input
              value={formData.address}
              name="address"
              onChange={handleChange}
              placeholder="address"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />

            <input
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />

            {/* Patient-specific fields */}
            {registrationRole === "patient" && (
              <>
                <input
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <input
                  value={formData.age}
                  name="age"
                  onChange={handleChange}
                  type="number"
                  placeholder="Age"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <input
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  placeholder="PhoneNumber"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </>
            )}

            {/* Doctor-specific fields */}
            {registrationRole === "doctor" && (
              <>
                <input
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />

                <input
                  value={formData.specialization}
                  name="specialization"
                  onChange={handleChange}
                  placeholder="specialization"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <input
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  placeholder="PhoneNumber"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />



              </>
            )}

            <button
              type="submit"
              className="mt-2 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-300 transition-colors duration-300 text-black font-semibold text-lg"
            >
              Register as {registrationRole.charAt(0).toUpperCase() + registrationRole.slice(1)}
            </button>

            <p className="mt-4 text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-cyan-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section: FlickeringGrid */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-r from-cyan-500 via-neutral-200 to-cyan-400 text-black px-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <FlickeringGrid />
        </div>
        <div className="relative max-w-lg text-center">
          <h2 className="text-4xl font-semibold mb-4">Welcome to Digital Patient Card</h2>
          <p className="text-lg leading-relaxed">
            Fill in your details to get started. Patients can manage their health records, and doctors can manage patients efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}
