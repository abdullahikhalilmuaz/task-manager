import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();
  const [tab, setTab] = useState("info");

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [infoMsg, setInfoMsg] = useState("");

  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const saveInfo = async (e) => {
    e.preventDefault();
    setInfoMsg("");
    try {
      await updateProfile(name, email);
      setInfoMsg("Profile updated ✅");
    } catch (err) {
      setInfoMsg(err.response?.data?.message || "Update failed");
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwdMsg("");
    if (newPwd !== confirmPwd) return setPwdMsg("New passwords do not match");
    if (newPwd.length < 6)
      return setPwdMsg("Password must be at least 6 chars");
    try {
      await changePassword(curPwd, newPwd);
      setPwdMsg("Password changed ✅");
      setCurPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } catch (err) {
      setPwdMsg(err.response?.data?.message || "Change failed");
    }
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <h2>{user?.name}</h2>
        <p className="muted">{user?.email}</p>
        <p className="muted">Role: {user?.role}</p>
      </div>

      <div className="profile-sections">
        <aside className="profile-tabs">
          <button
            className={"tab" + (tab === "info" ? " active" : "")}
            onClick={() => setTab("info")}
          >
            Personal Info
          </button>
          <button
            className={"tab" + (tab === "pwd" ? " active" : "")}
            onClick={() => setTab("pwd")}
          >
            Change Password
          </button>
        </aside>

        <div className="profile-content">
          {tab === "info" ? (
            <form onSubmit={saveInfo}>
              <h3>Personal Info</h3>
              <div className="form-grid">
                <div>
                  <label>Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Email Address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Role</label>
                  <input value={user?.role} disabled />
                </div>
              </div>
              {infoMsg && <p className="muted">{infoMsg}</p>}
              <button className="btn-primary">Update Profile</button>
            </form>
          ) : (
            <form onSubmit={savePassword}>
              <h3>Change Password</h3>
              <div className="form-grid">
                <div>
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={curPwd}
                    onChange={(e) => setCurPwd(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    required
                  />
                </div>
              </div>
              {pwdMsg && <p className="muted">{pwdMsg}</p>}
              <button className="btn-primary">Change Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
