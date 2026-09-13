import { FiSearch, FiBell } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

export default function Topbar() {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U";

  return (
    <header className="topbar">
      <div className="search-box">
        <FiSearch />
        <input placeholder="Search anything..." />
      </div>
      <div className="topbar-right">
        <button className="icon-btn"><FiBell /></button>
        <div className="user-chip">
          <div className="avatar">{initials}</div>
          <div className="user-meta">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role || "User"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
