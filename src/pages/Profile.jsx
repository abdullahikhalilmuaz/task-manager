import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <h2>{user?.name}</h2>
        <p className="muted">{user?.email}</p>
        <p className="muted">Member Since Sept 2025</p>
      </div>

      <div className="profile-sections">
        <aside className="profile-tabs">
          <button className="tab active">Personal Info</button>
          <button className="tab">Change Password</button>
        </aside>

        <div className="profile-content">
          <h3>Personal Info</h3>
          <div className="form-grid">
            <div>
              <label>Full Name</label>
              <input defaultValue={user?.name} />
            </div>
            <div>
              <label>Email Address</label>
              <input defaultValue={user?.email} />
            </div>
            <div>
              <label>Role</label>
              <input defaultValue={user?.role} disabled />
            </div>
          </div>
          <button className="btn-primary">Update Profile</button>
        </div>
      </div>
    </div>
  );
}
