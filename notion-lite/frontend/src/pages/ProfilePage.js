import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashBoardLayout";
import { useEffect, useState } from "react";
import { getStats } from "../services/api";
import "./ProfilePage.css";

function ProfilePage(){

    const { user } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function loadStats() {    
            const data = await getStats();    
            setStats(data);
        }    
        loadStats();    
    }, []);

    return(
        <DashboardLayout>
        <div className="profile-page">
            <h1 className="my-profile">My Profile</h1>
            <div className="profile-card">
       <div className="profile-header">
         <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase()}
         </div>
       <div className="profile-details">
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
       </div>
    </div>
    {stats && (
        <div className="stats-section">
            <div className="stat-card">
                <p>Total Notes</p>
                <h3>{stats.totalNotes}</h3>
            </div>
            <div className="stat-card">
                <p>Pinned Notes</p>
                <h3>{stats.pinnedNotes}</h3>
            </div>
            <div className="stat-card">
                <p>Tags Used</p>
                <h3>{stats.totalTags}</h3>
            </div>
        </div>
    )}
    {user?.createdAt && (
        <p className="member-since"> Member Since: {" "} {new Date(user.createdAt).toLocaleDateString()}</p>
    )}
          </div>
        </div>
        </DashboardLayout>
    );
}

export default ProfilePage;