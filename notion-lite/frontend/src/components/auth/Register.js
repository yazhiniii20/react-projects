import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Auth.css";

function Register({ setShowLogin }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    async function handleRegister(){

        try{
            const response = await fetch(
                "http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );
            const data = await response.json();
            if(!response.ok){
                setError(data.message);
                return;
            }
            setSuccess("Registration successful");
            setError("");
            setUsername("");
            setEmail("");
            setPassword("");
        } catch(error){
            setError("Registration failed");
        }
    }
    return(
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">
                    Create Account
                </h1>
                <p className="auth-subtitle">
                    Start organizing your notes
                </p>
                <div className="auth-form-group">
                    <label>Username</label>
                    <input type="text" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="auth-form-group">
                    <label>Email</label>
                    <input type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="auth-form-group">
                    <label>Password</label>
                    <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="auth-btn" onClick={handleRegister}>Register </button>

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="auth-success">
                        {success}
                    </p>
                )}
                <p className="auth-switch">
                    Already have an account?
                    <span onClick={() => navigate("/login")}> Login </span>
                </p>
            </div>
        </div>
    );
}
export default Register;