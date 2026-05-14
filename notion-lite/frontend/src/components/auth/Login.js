import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import './Auth.css';

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error , setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(){
        try{
         const data = await loginUser({email,password});
         if(data.message){
            setError(data.message);
            return;
         }
         setError("");
         localStorage.setItem("token",data.token);
         navigate("/dashboard");
         console.log("logged in");
        }catch(error){
           setError("Login failed");
        }
    }
    return(
        <div className="auth-page">    
            <div className="auth-card">    
                <h1 className="auth-title">
                    Welcome Back
                </h1>    
                <p className="auth-subtitle">
                    Login to continue to your workspace
                </p>    
                <div className="auth-form-group">    
                    <label>Email</label>    
                    <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                </div>    
                <div className="auth-form-group">    
                    <label>Password</label>
                    <input type="password" value={password} placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)}/>
                </div>    
                <button className="auth-btn" onClick={handleLogin}>Login</button>    
                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}
                <p className="auth-switch"> Don't have an account?
               <span onClick={() => navigate("/register")}>Register</span></p>    
            </div>    
        </div>
    );
}
export default Login;