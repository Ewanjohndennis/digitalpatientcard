import axios from "axios";


const register = async (user, formData, navigate) => {
    const response = await axios.post(`http://localhost:8080/${user}/register`, {
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