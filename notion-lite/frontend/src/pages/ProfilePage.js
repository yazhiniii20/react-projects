import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashBoardLayout";

function ProfilePage(){

    const { user } = useAuth();

    return(
        <DashboardLayout>
        <div className="profile-page">
            <h1>My Profile</h1>
            <div className="profile-card">
                <div className="profile-avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
                <h2>{user?.username}</h2>
                <p>{user?.email}</p>
            </div>
        </div>
        </DashboardLayout>
    );
}

export default ProfilePage;