import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<Navigate to="/login" />}/>
                <Route path="/profile"  element={
                        <ProtectedRoute>
                           <ProfilePage />
                        </ProtectedRoute>
                 }/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;