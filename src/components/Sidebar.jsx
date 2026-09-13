import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiPlusSquare,
  FiBarChart2,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: "/tasks", label: "Tasks", icon: <FiList /> },
    { to: "/tasks/new", label: "Create Task", icon: <FiPlusSquare /> },
    { to: "/reports", label: "Reports", icon: <FiBarChart2 /> },
    { to: "/teams", label: "Teams", icon: <FiUsers /> },
    { to: "/profile", label: "Profile", icon: <FiUser /> },
    { to: "/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">✓</span>
        <span className="logo-text">taskflux</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/tasks"}
            className={({ isActive }) =>
              "nav-item" + (isActive ? " active" : "")
            }
          >
            <span className="nav-icon">{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        <span className="nav-icon">
          <FiLogOut />
        </span>{" "}
        Logout
      </button>
    </aside>
  );
}
