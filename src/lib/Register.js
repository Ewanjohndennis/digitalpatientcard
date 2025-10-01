import axios from "axios";


const register = async (user, formData, navigate) => {
    const response = await axios.post(`https://digital-patient-card-backend-839268888277.asia-south1.run.app/${user}/register`, {
        "username": formData.username,
        "password": formData.password,
        "name": formData.name,
        "address": "",
        "email": "",
        "phoneNumber": formData.phoneNumber,
        "age": formData.age
    })
    if (response.status >= 200 && response.status < 300) {
        alert(`${user} Registered Successfully!!`);
        navigate(`/${user}-dashboard`);
    }
}

export default register;