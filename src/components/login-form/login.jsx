import { useState } from "react";
import { useNavigate } from "react-router";
import { verifyLoginDetails } from "../../apis/apis";

export default function LoginForm() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    async function verifyLogin() {
    try {
        const res = await verifyLoginDetails(formData);  // axios response
        
        if (res.status === 200) {
            const data = res.data;
            setUserData(data);
            sessionStorage.setItem("user", JSON.stringify(data));

            if (data.role === "OWNER") navigate("/owner/dashboard");
            else if (data.role === "TENANT") navigate("/tenant/dashboard");
            else alert("Unknown role");
        }

    } catch (error) {
        // Axios error handling
        if (error.response) {
            // server returned 4xx or 5xx
            alert(error.response.data.message || "Login failed");
        } else {
            // network failure
            alert("Network error");
        }
    }
}


    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.email || !formData.password) return;
        verifyLogin();
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <h2>Login</h2>

            <input 
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
            />

            <input 
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
            />

            <button>Login</button>
            <p>example login credentials</p>
            <br />
            <p>tenant login credentials : </p>
            <p>email : tenant@gmail.com</p>
            <p>password : tenant123</p>
            <br />
            <p>owner login credentials : </p>
            <p>email : owner@gmail.com</p>
            <p>password : owner123</p>
        </form>
    );
}
