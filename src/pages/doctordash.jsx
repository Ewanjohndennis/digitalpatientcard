import { useState } from "react";
import { Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function DoctorDashboard() {
  const [active, setActive] = useState("patients");
  const [patients, setPatients] = useState([
    { id: "P001", name: "John Doe", diseases: ["Flu"], verified: [true] },
    { id: "P002", name: "Jane Smith", diseases: ["Diabetes"], verified: [false] },
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // navigate to login page
  };

  const verifyDisease = (patientIndex, diseaseIndex) => {
    const newPatients = [...patients];
    newPatients[patientIndex].verified[diseaseIndex] = true;
    setPatients(newPatients);
  };

  const navItems = [
    { id: "patients", label: "Patients", icon: <Users size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-cyan-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-cyan-600">Doctor Dashboard</div>
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
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-cyan-600 rounded-md">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          {active === "patients" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Patients</h2>
              <table className="min-w-full bg-white rounded-md shadow">
                <thead>
                  <tr className="bg-cyan-700 text-white">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Diseases</th>
                    <th className="px-4 py-2">Verified</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, idx) => (
                    <tr key={p.id} className="text-center border-b">
                      <td className="px-4 py-2">{p.id}</td>
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">{p.diseases.join(", ")}</td>
                      <td className="px-4 py-2">{p.verified.map(v => v ? "Yes" : "No").join(", ")}</td>
                      <td className="px-4 py-2">
                        {p.diseases.map((disease, i) => (
                          !p.verified[i] && (
                            <button
                              key={i}
                              className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-400 mr-2 mb-1"
                              onClick={() => verifyDisease(idx, i)}
                            >
                              Verify {disease}
                            </button>
                          )
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
