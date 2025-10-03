import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, FileText, Settings, LogOut } from "lucide-react";
import axios from "axios";
import logOut from "@/lib/logout";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch patients from backend
  const getPatients = async () => {
    try {
      const response = await axios.post("https://digital-patient-card-backend-839268888277.asia-south1.run.app/admin/patients/all"); // placeholder URL
      if (response.status >= 200 && response.status < 300) {
        setPatients(response.data);
        console.log(response.data);
      }
    } catch (e) {
      console.log("Error fetching patients:", e);
    }
  };

  // Fetch doctors from backend
  const getDoctors = async () => {
    try {
      const response = await axios.post("https://digital-patient-card-backend-839268888277.asia-south1.run.app/admin/doctors/all"); // placeholder URL
      if (response.status >= 200 && response.status < 300) {
        setDoctors(response.data);
      }
    } catch (e) {
      console.log("Error fetching doctors:", e);
    }
  };

  // Delete patient via backend
  const deleteDoctor = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete doctor ${name}?`)) return;
    try {
      const response = await axios.delete(`https://digital-patient-card-backend-839268888277.asia-south1.run.app/admin/doctor/${id}`); // placeholder
      if (response.status >= 200 && response.status < 300) {
        getDoctors();
        alert("Doctor Deleted SuccessFully !");
      }
    } catch (e) {
      console.log("Error deleting doctor:", e.message || e.response?.data);
    }
  };

  const deletePatient = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete patient ${name}?`)) return;
    try {
      const response = await axios.delete(`https://digital-patient-card-backend-839268888277.asia-south1.run.app/admin/patient/${id}`); // placeholder
      if (response.status >= 200 && response.status < 300) {
        getPatients();
        alert("Patient Deleted SuccessFully !");
      }
    } catch (e) {
      console.log("Error deleting patient:", e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getPatients();
    getDoctors();
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "patients", label: "Patients", icon: <Users size={18} /> },
    { id: "doctors", label: "Doctors", icon: <Users size={18} /> },
    { id: "reports", label: "Reports", icon: <FileText size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Digital Patient Card</h2>
        <nav className="flex-1 flex flex-col space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-2 p-2 rounded-md w-full text-left transition-colors ${active === item.id ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={async () => await logOut("admin", navigate)}
          className="mt-auto flex items-center gap-2 p-2 w-full rounded-md hover:bg-gray-100 text-red-500"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Dashboard */}
        {active === "dashboard" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Welcome, Admin!</h3>
            <p>Quick overview of your system (placeholder).</p>
          </div>
        )}

        {/* Patients */}
        {active === "patients" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">All Patients</h3>
            {patients.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {patients.map((p) => (
                  <div key={p.id} className="p-4 bg-white rounded-lg shadow border">
                    <p className="font-medium text-lg">{p.name}</p>
                    <p className="text-sm text-gray-500">ID: {p.id}</p>
                    <p className="text-sm text-gray-500">Age: {p.age}</p>
                    <p className="text-sm text-gray-500">Blood Group: {p.bloodgroup}</p>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
                      onClick={() => deletePatient(p.id, p.name)}
                    >
                      Delete Patient
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No patients found.</p>
            )}
          </div>
        )}

        {/* Doctors */}
        {active === "doctors" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">All Doctors</h3>
            {doctors.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {doctors.map((d) => (
                  <div key={d.id} className="p-4 bg-white rounded-lg shadow border">
                    <p className="font-medium text-lg">{d.name}</p>
                    <p className="text-sm text-gray-500">ID: {d.id}</p>
                    <p className="text-sm text-gray-500">Specialization: {d.specialization ? d.specialization : "No Specialization Found"}</p>
                    <p className="text-sm text-gray-500">Email: {d.email ? d.email : "No Email Found"}</p>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
                      onClick={() => deleteDoctor(d.id, d.name)}
                    >
                      Delete Doctor
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No doctors found.</p>
            )}
          </div>
        )}

        {/* Reports */}
        {active === "reports" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Reports</h3>
            <p>Generate and view reports here (placeholder).</p>
          </div>
        )}

        {/* Settings */}
        {active === "settings" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <p>Configure system preferences here (placeholder).</p>
          </div>
        )}
      </main>
    </div>
  );
}
