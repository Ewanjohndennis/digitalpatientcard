import { useEffect, useState } from "react";
import { FileText, UploadCloud, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logOut from "@/lib/logout";

export default function PatientDashboard() {
  const [active, setActive] = useState("diseases");
  const [diseases, setDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState("");
  const [bloodGroup, setBloodGroup] = useState(""); // will fetch
  const [labReport, setLabReport] = useState(null);

  const [patientName, setPatientName] = useState(""); // editable
  const [username, setUsername] = useState(""); // for PDF download

  const navigate = useNavigate();

  // Fetch patient info from remote host
  const getPatientData = async () => {
    try {
      const response = await axios.get(
        "https://digital-patient-card-backend-839268888277.asia-south1.run.app/patient/dashboard"
      );
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setPatientName(data.name);
        setUsername(data.username); // save username for PDF
        setBloodGroup(data.bloodgroup || "O-");
        setDiseases(data.diseases || []);
      }
    } catch (e) {
      console.error("Failed to fetch patient data:", e);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const addDisease = async () => {
    if (diseaseInput) {
      try {
        const response = await axios.post(
          "https://digital-patient-card-backend-839268888277.asia-south1.run.app/patient/adddisease",
          null,
          {
            params: { description: diseaseInput },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          getPatientData();
        }
        setDiseaseInput("");
      } catch (e) {
        console.error("Failed to add disease:", e);
      }
    }
  };

  const handleFileChange = (e) => {
    setLabReport(e.target.files[0]);
  };

  const downloadPDF = async () => {
    if (!username) return alert("Username not available");

    try {
      const response = await axios.get(
        `http://localhost:8080/download/patient-pdf`,
        {
          params: { username }, // send username to local backend
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "patient.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download PDF:", err);
      alert("Failed to download PDF");
    }
  };

  const navItems = [
    { id: "my-info", label: "My Info", icon: <FileText size={18} /> },
    { id: "diseases", label: "Diseases", icon: <FileText size={18} /> },
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
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-bold">Name:</span> {patientName}
                </p>
                <p>
                  <span className="font-bold">Blood Group:</span> {bloodGroup}
                </p>
                <p>
                  <span className="font-bold">Diseases:</span>{" "}
                  {diseases.length > 0
                    ? diseases.map((d) => d.diseasename).join(", ")
                    : "None"}
                </p>

                {/* Download PDF Button */}
                <div className="mt-4">
                  <button
                    onClick={downloadPDF}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Download PDF
                  </button>
                </div>
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

          {/* Settings */}
          {active === "settings" && (
            <div className="bg-white rounded-2xl shadow p-6 max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit My Info</h2>
              <div className="space-y-4">
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

                <div>
                  <label className="block text-gray-600 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={bloodGroup}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={async () => {
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
