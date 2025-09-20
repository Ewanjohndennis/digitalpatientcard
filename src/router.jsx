import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import AddPatient from "./pages/AddPatient";
import VerifyDetails from "./pages/VerifyDetails";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/patients", element: <Patients /> },
  { path: "/doctors", element: <Doctors /> },
  { path: "/add-patient", element: <AddPatient /> },
  { path: "/verify/:id", element: <VerifyDetails /> },
]);
