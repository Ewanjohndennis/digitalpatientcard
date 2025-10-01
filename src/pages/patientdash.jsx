import { useEffect, useState } from "react";
import { FileText, UploadCloud, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logOut from "@/lib/logout";

export default function PatientDashboard() {
  const [active, setActive] = useState("diseases");
  const [diseases, setDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState("");
  const [bloodGroup] = useState("O-");
  const [labReport, setLabReport] = useState(null);

  const [patientName, setPatientName] = useState(""); // editable
  const [phoneNumber, setPhoneNumber] = useState(""); // editable

  const navigate = useNavigate();

  const getdiseases = async () => {
    try {
      const response = await axios.get("http://localhost:8080/patient/dashboard");
      if (response.status >= 200 && response.status < 300) {
        setDiseases(response.data.diseases);
        setPatientName(response.data.name || ""); // optional: fetch from backend
        setPhoneNumber(response.data.phone || ""); // optional: fetch from backend
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getdiseases();
  }, []);

  const addDisease = async () => {
    if (diseaseInput) {
      const response = await axios.post(
        "http://localhost:8080/patient/adddisease",
        null,
        { params: { description: diseaseInput } }
      );
      if (response.status >= 200 && response.status < 300) {
        getdiseases();
      }
      setDiseaseInput("");
    }
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-cyan-600">
          Patient Dashboard
        </div>
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
            onClick={async () => {
              await logOut("patient", navigate);
            }}
            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-cyan-600 rounded-md"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-y-auto">
          {/* My Info */}
          {active === "my-info" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">My Info</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Blood Group:</span> {bloodGroup}
                </p>
              </div>
            </div>
          )}

          {/* Diseases */}
          {active === "diseases" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Diseases</h2>
              <div className="flex gap-2 mb-6">
                <input
                  value={diseaseInput}
                  onChange={(e) => setDiseaseInput(e.target.value)}
                  placeholder="Enter disease"
                  className="px-3 py-2 border rounded-lg flex-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button
                  onClick={addDisease}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {diseases.map((d) => (
                  <li
                    key={d.id}
                    className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <span>{d.diseasename}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        d.status
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {d.status ? "Verified" : "Unverified"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lab Reports */}
          {active === "lab-reports" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Lab Reports</h2>
              <div className="flex flex-col items-start space-y-3">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-cyan-600 file:text-white
                    hover:file:bg-cyan-700"
                />
                {labReport && (
                  <p className="text-gray-700 text-sm">
                    Uploaded: <span className="font-medium">{labReport.name}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Settings */}
          {active === "settings" && (
            <div className="bg-white rounded-2xl shadow p-6 max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit My Info</h2>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-gray-600 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={bloodGroup}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={async () => {
                    // Placeholder for API call to update patient info
                    alert("Patient info updated! (placeholder)");
                  }}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
