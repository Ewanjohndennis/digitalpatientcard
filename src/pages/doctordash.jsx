import { useEffect, useState } from "react";
import { Users, FileText, Calendar, Settings as SettingsIcon, LogOut, UserPlus, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logOut from "@/lib/logout";
import axios from "axios";
import LoadingModal from "@/components/spinner";

export default function DoctorDashboard() {
    const [active, setActive] = useState("patients");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [doctorDetails, setDoctorDetails] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [referral, setReferral] = useState({ name: "", referredDoctorUsername: "", patientusername: "", remarks: "" });
    const [patients, setpatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setloading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
    
    const doctordashboard = async () => {
        setloading(true);
        try {
            const response = await axios.get("https://digital-patient-card-backend-839268888277.asia-south1.run.app/doctor/dashboard");
            if (response.status >= 200 && response.status < 300) {
                console.log(await response.data);
                setDoctorDetails(response.data);
                setloading(false);
            }
        }
        catch (e) {
            console.log(e.response?.data || "Error");
            alert("Error Occured !");
            setloading(false);
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
        doctordashboard();
        getDoctors();
    }, [])

    const filteredPatients = patients.filter(
        (p) =>
            p.username.toLowerCase().includes(searchTerm.toLowerCase())
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
            const response = await axios.post("https://digital-patient-card-backend-839268888277.asia-south1.run.app/doctor/refer", null, {
                params: {
                    patientusername: referral["patientusername"],
                    referredDoctorUsername: referral["referredDoctorUsername"],
                    remarks: referral["remarks"]
                }
            });
            console.log(await response.data);
            alert(`Doctor referred:\nUsername: ${referral.referredDoctorUsername}\nPatient: ${referral.patientusername}\n`);
        } catch (e) {
            console.log(e.response?.data || "Error Refering doctor!");
        }
        setReferral({ name: "", referredDoctorUsername: "", patientusername: "", remarks: "" });
    };

    const navItems = [
        { id: "patients", label: "Patients", icon: <Users size={18} /> },
        { id: "reports", label: "Reports", icon: <FileText size={18} /> },
        { id: "appointments", label: "Appointments", icon: <Calendar size={18} /> },
        { id: "referral", label: "Referral", icon: <UserPlus size={18} /> },
        { id: "settings", label: "Settings", icon: <SettingsIcon size={18} /> },  
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
            {loading && (<LoadingModal message="Loading Dashboard...."></LoadingModal>)}

            {/* Mobile Header */}
            <header className="relative md:hidden flex justify-between items-center p-4 bg-cyan-700 text-white shadow-md z-30">
                <h2 className="text-xl font-bold">Doctor</h2>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu size={24} />
                </button>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full right-4 mt-2 w-64 bg-cyan-700 text-white p-4 z-50 rounded-md shadow-lg">
                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActive(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-2 p-2 rounded-md w-full text-left transition-colors ${active === item.id
                                            ? "bg-cyan-600 text-white"
                                            : "hover:bg-cyan-500"
                                        }`}
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </nav>
                        <div className="mt-4 pt-4 border-t border-cyan-600 flex justify-center">
                            <button
                                onClick={async () => {
                                    setIsMenuOpen(false);
                                    await logOut("doctor", navigate);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-cyan-500"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex w-64 bg-cyan-700 text-white shadow-md p-6 flex-col">
                <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
                <nav className="flex-1 flex flex-col space-y-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`flex items-center gap-2 p-2 rounded-md w-full text-left transition-colors ${active === item.id ? "bg-cyan-600 text-white" : "hover:bg-cyan-500"
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
                {active === "patients" && (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-semibold">
                                Welcome Dr.{doctorDetails.name}
                            </span>
                            <img
                                width={20}
                                height={20}
                                style={{ marginTop: "2px" }}
                                src={doctorDetails.status ? 'check.png' : 'xmark.png'}
                                alt="Status icon"
                            />
                        </div>
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
                                                    <button
                                                        onClick={() => verifyDisease(p.id, d.id)}
                                                        className={`px-2 py-1 text-xs rounded-md text-white ${d.status ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}`}
                                                    >
                                                        {d.status ? "Unverify" : "Verify"}
                                                    </button>
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

                {/* Placeholder for other sections */}
                {active === "reports" && <div className="text-center text-gray-500">Reports Section Coming Soon</div>}
                {active === "appointments" && <div className="text-center text-gray-500">Appointments Section Coming Soon</div>}

                {active === "settings" && (
                    <div className="max-w-md bg-white p-6 rounded-lg shadow-md border">
                        <h3 className="text-xl font-semibold mb-4">Doctor Details</h3>
                        <div className="space-y-3">
                            {["name", "specialization", "email", "phoneNumber"].map((field) => (
                                <div key={field} className="flex justify-between items-center">
                                    <span className="font-medium capitalize">
                                        {field.replace(/([A-Z])/g, ' $1')}:
                                    </span>
                                    {editMode ? (
                                        <input
                                            className="border px-2 py-1 rounded-md"
                                            value={doctorDetails[field] || ''}
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

{active === "referral" && (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md border space-y-6">
        <h3 className="text-xl font-semibold mb-4">Doctor Referrals</h3>

        {/* Existing Referrals */}
        {doctorDetails.referrals && doctorDetails.referrals.length > 0 ? (
            <div className="space-y-3">
                {doctorDetails.referrals.map((r) => (
                    <div key={r.id} className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-medium">{r.patientUsername}</p>
                            <p className="text-sm text-gray-500">
                                Referred by: {r.referringDoctor} | To: {r.referredDoctor}
                            </p>
                            <p className="text-sm text-gray-500">Reason: {r.reason}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">No referrals found.</p>
        )}

        {/* New Referral Form */}
        <div className="mt-4 space-y-3">
            <h4 className="font-semibold">Refer a New Patient</h4>
            <select
                className="w-full p-2 border rounded-md"
                value={referral.patientUsername}
                onChange={(e) => setReferral({ ...referral, patientUsername: e.target.value })}
            >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                    <option key={p.id} value={p.username}>
                        {p.name} ({p.username})
                    </option>
                ))}
            </select>

            <select
                className="w-full p-2 border rounded-md"
                value={referral.referredDoctorUsername}
                onChange={(e) => setReferral({ ...referral, referredDoctorUsername: e.target.value })}
            >
                <option value="">Select Doctor</option>
                {doctors
                    .filter((d) => d.username !== doctorDetails.username)
                    .map((d) => (
                        <option key={d.id} value={d.username}>
                            {d.name} ({d.username})
                        </option>
                    ))}
            </select>

            <input
                type="text"
                placeholder="Reason for referral"
                className="w-full p-2 border rounded-md"
                value={referral.remarks}
                onChange={(e) => setReferral({ ...referral, remarks: e.target.value })}
            />

            <button
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-400"
                onClick={handleReferralSubmit}
            >
                Refer Patient
            </button>
        </div>
    </div>
)}
            </main >
        </div >
    );
}
