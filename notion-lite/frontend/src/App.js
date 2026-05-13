import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/dashboard" element={isLoggedIn ? (<DashboardPage setIsLoggedIn={setIsLoggedIn}/>) 
                : ( <Navigate to="/login" /> )}/>
                <Route path="*" element={<Navigate to="/login" />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;