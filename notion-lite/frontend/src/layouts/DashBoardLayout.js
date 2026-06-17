import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useState} from "react";
import "./DashBoardLayout.css";

function DashboardLayout({ children }) {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="dashboard-layout">
            <header className="dashboard-header">
                <div className="app-brand">
                    <h2>Personal Knowledge Hub</h2>
                </div>
                <div className="user-section">
                    <span className="welcome-user">
                        Welcome, {user?.username}
                    </span>
                    <button className="user-menu-btn" onClick={() => setShowMenu(!showMenu)}>👤 </button>
                    {showMenu && (
                        <div className="user-dropdown">
                            <p>
                                {user?.email}
                            </p>
                            <button className = "logout-btn" onClick={handleLogout}> Logout </button>
                        </div>
                    )}
                </div>
            </header>
            <main className="dashboard-content"> {children} </main>
        </div>
    );
}

export default DashboardLayout;