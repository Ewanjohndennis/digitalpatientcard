import axios from "axios";
import { useNavigate } from "react-router-dom";

const login = async (user, username, password, navigate) => {
    try {
        const response = await axios.post(`https://digital-patient-card-backend-839268888277.asia-south1.run.app/${user}/login`, null, {
            params: {
                username,
                password
            }
        });
        if (response.status >= 200 && response.status < 300) {
            navigate(`/${user}-dashboard`);
        }
    } catch (err) {
        console.log("Error from backend:", err.response?.data || err.message);
        alert(err.response?.data || "Login failed");
    }
}

export default login;