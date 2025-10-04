import { useEffect, useState } from "react";
import { Users, FileText, Calendar, Settings as SettingsIcon, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logOut from "@/lib/logout";
import axios from "axios";

export default function DoctorDashboard() {
  const [active, setActive] = useState("patients");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [doctorDetails, setDoctorDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [referral, setReferral] = useState({ name: "", referredDoctorUsername: "", patientusername: "", remarks: "" });
  const [patients, setpatients] = useState([]);
  const [doctors, setDoctors] = useState([]);



  const doctordashboard = async () => {
    try {
      const response = await axios.get("https://digital-patient-card-backend-839268888277.asia-south1.run.app/doctor/dashboard");
      if (response.status >= 200 && response.status < 300) {
        console.log(await response.data);
        setDoctorDetails(response.data);
      }

    }
    catch (e) {
      console.log(e.response?.data || "Error");
    }
  }

  const findpatients = async () => {
    try {
      const response = await axios.post("https://digital-patient-card-backend-839268888277.asia-south1.run.app/admin/patients/all");
      if (response.status >= 200 && response.status < 300) {
        console.log(await response.data);
        setpatients(response.data);
      }
    } catch (e) {
      console.log(e.response?.data || "Error fetching patients!!");
    }
  }

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

  useEffect(() => {
    findpatients();
  }, [])

  useEffect(() => {
    doctordashboard();
  }, [])



  const filteredPatients = patients.filter(
    (p) =>
      p.username.toLowerCase().includes(searchTerm.toLowerCase())
    // ||   p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifyDisease = async (patientId, diseaseid) => {
    try {
      const response = await axios.post("https://digital-patient-card-backend-839268888277.asia-south1.run.app/doctor/verify", null, {
        params: {
          patientId: patientId,
          diseaseid: diseaseid
        }
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        findpatients();
      }
    } catch (e) {
      console.log(e.response?.data || "Error , Cant verify patient disease!");
    }


  };

  const handleDoctorUpdate = () => {
    setEditMode(false);
    alert("Doctor details updated (placeholder)");
  };

  const handleReferralSubmit = async () => {
    try {
      console.log(referral);
      const response = await axios.post(`https://digital-patient-card-backend-839268888277.asia-south1.run.app/doctor/refer?patientusername=${patientusername}&referredDoctorUsername=${referredDoctorUsername}&remarks=${remarks}`);
      console.log(await response.data);
      alert(`Doctor : ${referredDoctorUsername} Refered Successfully !`)
      setReferral({ name: "", referredDoctorUsername: "", patientusername: "", remarks: "" });

    } catch (e) {
      console.log(e.response?.data || "Error Refering doctor!");
    }
  };

  const navItems = [
    { id: "patients", label: "Patients", icon: <Users size={18} /> },
    { id: "reports", label: "Reports", icon: <FileText size={18} /> },
    { id: "appointments", label: "Appointments", icon: <Calendar size={18} /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon size={18} /> },
    { id: "referral", label: "Referral", icon: <UserPlus size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-700 text-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
        <nav className="flex-1 flex flex-col space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-2 p-2 rounded-md w-full text-left transition-colors ${active === item.id ? "bg-cyan-700 text-white" : "hover:bg-cyan-500"
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={async () => await logOut("doctor", navigate)}
          className="mt-auto flex items-center gap-2 p-2 w-full rounded-md hover:bg-cyan-500 text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Patients Section */}
        {active === "patients" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Assigned Patients</h3>
            <input
              type="text"
              placeholder="Search patients by username "
              className="w-full mb-4 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredPatients.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPatients.map((p) => (
                  <div key={p.id} className="p-4 bg-white rounded-lg shadow-sm border">
                    <p className="font-medium text-lg">{p.name}</p>
                    <p className="text-sm text-gray-500">ID: {p.id}</p>
                    <p className="text-sm text-gray-500">Age: {p.age}</p>
                    <p className="text-sm text-gray-500">Username: {p.username}</p>
                    <div className="space-y-1">
                      {p.diseases.map((d) => (
                        <div key={d.id} className="flex items-center justify-between">
                          <span
                            className={`text-sm ${d.status ? "text-green-600" : "text-red-600"}`}
                          >
                            {d.diseasename} ({d.status ? "Verified" : "Unverified"})
                          </span>
                          {!d.status && (
                            <button
                              onClick={() => verifyDisease(p.id, d.id)}
                              className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-400"
                            >
                              Verify
                            </button>
                          )}
                          {d.status && (
                            <button
                              onClick={() => verifyDisease(p.id, d.id)}
                              className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-green-400"
                            >
                              Unverify
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No matching patients found.</p>
            )}
          </div>
        )}

        {/* Reports Section */}
        {/* {active === "reports" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Reports</h3>
            {reports.length > 0 ? (
              <ul className="space-y-3">
                {reports.map((r) => (
                  <li
                    key={r.id}
                    className="p-3 bg-white rounded-lg shadow-sm border flex justify-between"
                  >
                    <span>{r.title}</span>
                    <a
                      href={r.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No reports available.</p>
            )}
          </div>
        )} */}

        {/* Appointments Section */}
        {/* {active === "appointments" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Appointments</h3>
            {appointments.length > 0 ? (
              <ul className="space-y-3">
                {appointments.map((a) => (
                  <li
                    key={a.id}
                    className="p-3 bg-white rounded-lg shadow-sm border"
                  >
                    <p className="font-medium">{a.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(a.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No appointments scheduled.</p>
            )}
          </div>
        )} */}

        {/* Settings Section */}
        {active === "settings" && (
          <div className="max-w-md bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Doctor Details</h3>
            <div className="space-y-3">
              {["name", "specialization", "email", "phoneNumber"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <span className="font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </span>
                  {editMode ? (
                    <input
                      className="border px-2 py-1 rounded-md"
                      value={doctorDetails[field]}
                      onChange={(e) =>
                        setDoctorDetails({
                          ...doctorDetails,
                          [field]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{doctorDetails[field]}</span>
                  )}
                </div>
              ))}
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                onClick={editMode ? handleDoctorUpdate : () => setEditMode(true)}
              >
                {editMode ? "Save Changes" : "Edit Details"}
              </button>
            </div>
          </div>
        )}

        {/* Referral Section */}
        {active === "referral" && (
          <div className="max-w-md bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Refer a Doctor</h3>
            <div className="space-y-3">
              {["name", "referredDoctorUsername", "patientusername", "remarks"].map((field) => (
                <input
                  key={field}
                  type={"text"}
                  placeholder={field === "referredDoctorUsername" ? "Enter the username of the doctor to Refer" : field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-2 border rounded-md"
                  value={referral[field]}
                  onChange={(e) =>
                    setReferral({ ...referral, [field]: e.target.value })
                  }
                />
              ))}
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-400"
                onClick={handleReferralSubmit}
              >
                Refer Doctor
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
