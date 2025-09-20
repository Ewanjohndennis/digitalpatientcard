import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, FileText, Settings, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "patients", label: "Patients", icon: <Users size={18} /> },
    { id: "doctors", label: "Doctors", icon: <Users size={18} /> },
    { id: "reports", label: "Reports", icon: <FileText size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    navigate("/login"); // navigate to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-cyan-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-cyan-600">Digital Patient Card</div>
        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md mb-2 transition-colors ${
                active === item.id ? "bg-cyan-500" : "hover:bg-cyan-600"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-cyan-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-cyan-600 rounded-md"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-cyan-800">{active.charAt(0).toUpperCase() + active.slice(1)}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
            <img src="https://i.pravatar.cc/40" alt="avatar" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {active === "dashboard" && <p>Welcome to your dashboard! Here’s a quick overview.</p>}
          {active === "patients" && <p>Manage patient records here.</p>}
          {active === "doctors" && <p>View and manage doctors here.</p>}
          {active === "reports" && <p>Generate and view reports.</p>}
          {active === "settings" && <p>Configure system preferences.</p>}
        </main>
      </div>
    </div>
  );
}
