import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./DashBoardLayout.css";

function DashboardLayout({ children }) {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div>
            <header className="dashboard-header">
                <div className = "user-info">
                    <h2>
                        Welcome, {user?.username}
                    </h2>
                    <p>
                        {user?.email}
                    </p>
                </div>
                <button className = "logout-btn" onClick={handleLogout}>Logout </button>
            </header>            
            <main> {children} </main>
        </div>
    );
}

export default DashboardLayout;