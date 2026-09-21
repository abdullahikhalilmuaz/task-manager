import { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Topbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const ref = useRef();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    api.get("/tasks").then((r) => {
      const urgent = r.data
        .filter((t) => t.status !== "Completed")
        .sort((a, b) => {
          const pri = { High: 0, Medium: 1, Low: 2 };
          return pri[a.priority] - pri[b.priority];
        })
        .slice(0, 5);
      setTasks(urgent);
    });
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-open");
  };

  return (
    <header className="topbar">
      <button
        className="hamburger"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <FiMenu />
      </button>

      <div className="search-box">
        <FiSearch />
        <input placeholder="Search anything..." />
      </div>

      <div className="topbar-right">
        <div className="notif-wrap" ref={ref}>
          <button className="icon-btn" onClick={() => setOpen(!open)}>
            <FiBell />
            {tasks.length > 0 && (
              <span className="notif-dot">{tasks.length}</span>
            )}
          </button>
          {open && (
            <div className="notif-panel">
              <div className="notif-head">Notifications</div>
              {tasks.length === 0 ? (
                <p className="notif-empty">All caught up 🎉</p>
              ) : (
                tasks.map((t) => (
                  <Link
                    to={`/tasks/${t._id}`}
                    key={t._id}
                    className="notif-item"
                    onClick={() => setOpen(false)}
                  >
                    <span className={`badge pri-${t.priority.toLowerCase()}`}>
                      {t.priority}
                    </span>
                    <span className="notif-title">{t.title}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

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
