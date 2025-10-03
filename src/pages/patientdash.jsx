import { useEffect, useState } from "react";
import { FileText, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logOut from "@/lib/logout";
import updateprofile from "@/lib/updateprofile";

export default function PatientDashboard() {
  const [active, setActive] = useState("diseases");
  const [diseases, setDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState("");

  // Patient profile states
  const [patientName, setPatientName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodgroup, setBloodgroup] = useState("O+");
  const [bloodpressure, setBloodpressure] = useState("");
  const [sugar, setSugar] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [pastConditions, setPastConditions] = useState("");

  const navigate = useNavigate();

  // Fetch patient data
  const getPatientData = async () => {
    try {
      const response = await axios.get(
        "https://digital-patient-card-backend-839268888277.asia-south1.run.app/patient/dashboard"
      );
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;

        // Map backend data to frontend states
        setPatientName(data.name || "");
        setUsername(data.username || "");
        setGender(data.gender || "");
        setHeight(data.height || "");
        setWeight(data.weight || "");
        setBloodgroup(data.bloodgroup || "O+");
        setBloodpressure(data.bloodpressure || "");
        setSugar(data.sugar || "");
        setSmoking(data.smoking || false);
        setAge(data.age || "");
        setPhoneNumber(data.phoneNumber || "");
        setAllergies(data.allergies || "");
        setPastConditions(data.pastconditions || "");
        setDiseases(data.diseases || []);
      }
    } catch (e) {
      console.error("Failed to fetch patient data:", e);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  // Add a disease
  const addDisease = async () => {
    if (!diseaseInput) return;

    try {
      const response = await axios.post(
        "https://digital-patient-card-backend-839268888277.asia-south1.run.app/patient/adddisease",
        null,
        { params: { description: diseaseInput } }
      );
      if (response.status >= 200 && response.status < 300) getPatientData();
      setDiseaseInput("");
    } catch (e) {
      console.error("Failed to add disease:", e);
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    if (!username) return alert("Username not available");

    try {
      const response = await axios.get(`http://localhost:8080/download/patient-pdf`, {
        params: { username },
        responseType: "blob",
      });
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
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md mb-2 transition-colors ${active === item.id ? "bg-cyan-500" : "hover:bg-cyan-600"
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-cyan-600">
          <button
            onClick={async () => await logOut("patient", navigate)}
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
            <div className="bg-white rounded-2xl shadow p-6 space-y-2 text-gray-700">
              <h2 className="text-xl font-semibold mb-4">My Info</h2>
              <p><span className="font-bold">Name:</span> {patientName || "N/A"}</p>
              <p><span className="font-bold">Age:</span> {age || "N/A"}</p>
              <p><span className="font-bold">Gender:</span> {gender || "N/A"}</p>
              <p><span className="font-bold">Height:</span> {height || "N/A"} cm</p>
              <p><span className="font-bold">Weight:</span> {weight || "N/A"} kg</p>
              <p><span className="font-bold">Blood Group:</span> {bloodgroup}</p>
              <p><span className="font-bold">Blood Pressure:</span> {bloodpressure || "N/A"}</p>
              <p><span className="font-bold">Sugar Level:</span> {sugar || "N/A"}</p>
              <p><span className="font-bold">Smoking:</span> {smoking ? "Yes" : "No"}</p>
              <p><span className="font-bold">Phone:</span> {phoneNumber || "N/A"}</p>
              <p><span className="font-bold">Allergies:</span> {allergies || "None"}</p>
              <p><span className="font-bold">Past Conditions:</span> {pastConditions || "None"}</p>
              <p>
                <span className="font-bold">Diseases:</span>{" "}
                {diseases.length > 0
                  ? diseases.map((d) => d.diseasename).join(", ")
                  : "None"}
              </p>
              <button
                onClick={downloadPDF}
                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Download PDF
              </button>
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
                      className={`text-sm px-2 py-1 rounded ${d.status ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
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
            <div className="bg-white rounded-2xl shadow p-6 max-w-md space-y-4">
              <h2 className="text-xl font-semibold mb-4">Edit My Info</h2>

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

              {/* Age */}
              <div>
                <label className="block text-gray-600 mb-1">Age</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-600 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="block text-gray-600 mb-1">Height (cm)</label>
                <input
                  type="number"
                  placeholder="Enter height in cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-gray-600 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="Enter weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-gray-600 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  placeholder="e.g., 120/80"
                  value={bloodpressure}
                  onChange={(e) => setBloodpressure(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
              {/* BloodGroup */}
              <div>
                <label className="block text-gray-600 mb-1">Blood Group</label>
                <select
                  onChange={(e) => setBloodgroup(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              {/* Sugar Level */}
              <div>
                <label className="block text-gray-600 mb-1">Sugar Level (mg/dL)</label>
                <input
                  type="text"
                  placeholder="e.g., 90 mg/dL"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              {/* Smoking */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={smoking}
                  onChange={(e) => setSmoking(e.target.checked)}
                />
                <label>Smoking</label>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>



              {/* Save Button */}
              <button
                onClick={async () => {
                  const data = {

                    "gender": gender,
                    "height": parseInt(height) || 0,
                    "weight": parseInt(weight) || 0,
                    "bloodgroup": bloodgroup,
                    "bloodpressure": bloodpressure,
                    "sugar": sugar,
                    "smoking": smoking,
                    "age": parseInt(age) || 0,
                    // "allergies": allergies,
                    // "pastconditions": pastconditions

                  }
                  await updateprofile(data);
                }}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
              >
                Save Changes
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
