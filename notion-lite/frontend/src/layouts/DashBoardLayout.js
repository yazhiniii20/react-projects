import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useState,useRef,useEffect} from "react";
import { toast } from "react-toastify";
import "./DashBoardLayout.css";

function DashboardLayout({ children }) {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {    
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {    
                setShowMenu(false);
            }
        }    
        document.addEventListener("mousedown", handleClickOutside);    
        return () => {    
            document.removeEventListener("mousedown",handleClickOutside);
        };
    
    }, []);

    function handleLogout() {
        logout();
        toast.info("Logged out successfully");
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
                    <button className="user-menu-btn" onClick={() => setShowMenu(!showMenu)}>
                       {user?.username?.charAt(0).toUpperCase()} </button>
                    {showMenu && (
                        <div ref={dropdownRef} className="user-dropdown">                    
                        <div className="profile-section">                    
                            {/* <div className="profile-avatar">                    
                                {user?.username?.charAt(0).toUpperCase()}                    
                            </div>                     */}
                            <div>                    
                                <h4>{user?.username}</h4>                    
                                <p>{user?.email}</p>                    
                            </div>                    
                        </div>                    
                        <hr/>
                        <button onClick={() => {
                            navigate("/profile");
                            setShowMenu(false); }}> Profile </button>                    
                        <button onClick={handleLogout}> Logout </button>                    
                    </div>
                    )}
                </div>
            </header>
            <main className="dashboard-content"> {children} </main>
        </div>
    );
}

export default DashboardLayout;