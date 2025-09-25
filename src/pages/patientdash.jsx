import { useState } from "react";
import { FileText, UploadCloud, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function PatientDashboard() {
  const [active, setActive] = useState("diseases");
  const [diseases, setDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState("");
  const [bloodGroup] = useState("O-");
  const [labReport, setLabReport] = useState(null);
  const navigate = useNavigate();

  const addDisease = () => {
    if (diseaseInput) {
      setDiseases([...diseases, { name: diseaseInput, verified: false }]);
      setDiseaseInput("");
    }
  };
  const handleLogout = () => {
    navigate("/login"); // navigate to login page
  };
  const handleFileChange = (e) => {
    setLabReport(e.target.files[0]);
  };

  const navItems = [
    { id: "my-info", label: "My Info", icon: <FileText size={18} /> },
    { id: "diseases", label: "Diseases", icon: <FileText size={18} /> },
    { id: "lab-reports", label: "Lab Reports", icon: <UploadCloud size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const logOut = async()=>{
      const response = await axios.post("http://localhost:8080/patient/logout")
      if(response.status>=200 && response.status<300){
          navigate("/");
      }   
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-cyan-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-cyan-600">Patient Dashboard</div>
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
            <LogOut onClick={
              logOut
            } size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          {active === "my-info" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">My Info</h2>
              <p>Blood Group: {bloodGroup}</p>
            </div>
          )}

          {active === "diseases" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Diseases</h2>
              <div className="flex gap-2 mb-4">
                <input
                  value={diseaseInput}
                  onChange={(e) => setDiseaseInput(e.target.value)}
                  placeholder="Enter disease"
                  className="px-3 py-2 border rounded-md flex-1"
                />
                <button onClick={addDisease} className="px-4 py-2 bg-cyan-600 text-white rounded-md">Add</button>
              </div>
              <ul>
                {diseases.map((d, idx) => (
                  <li key={idx} className="mb-1">
                    {d.name} - {d.verified ? "Verified" : "Unverified"}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "lab-reports" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Lab Reports</h2>
              <input type="file" onChange={handleFileChange} />
              {labReport && <p className="mt-2">Uploaded: {labReport.name}</p>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
