import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import api from "../api/axios.js";

const FILTERS = ["All", "Pending", "In Progress", "Completed", "Overdue"];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/tasks").then((r) => setTasks(r.data));
  }, []);

  const filtered = tasks.filter((t) => {
    const matchFilter = filter === "All" || t.status === filter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <Link to="/tasks/new" className="btn-primary">+ Create Task</Link>
      </div>

      <div className="tasks-toolbar">
        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={"tab" + (filter === f ? " active" : "")}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <input
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="select">
            <option>All Categories</option>
          </select>
          <select className="select">
            <option>Sort by: Due Date</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {filtered.length === 0 && <p className="empty">No tasks found.</p>}
        {filtered.map((t) => (
          <Link to={`/tasks/${t._id}`} key={t._id} className="task-card">
            <div className="task-card-main">
              <div className="task-checkbox" />
              <div className="task-info">
                <h4>{t.title}</h4>
                <div className="task-tags">
                  <span className={`badge cat-${t.category?.toLowerCase()}`}>{t.category}</span>
                  <span className={`badge pri-${t.priority.toLowerCase()}`}>{t.priority}</span>
                  <span className="badge date">
                    <FiCalendar /> {t.deadline ? new Date(t.deadline).toLocaleDateString() : "No due"}
                  </span>
                </div>
              </div>
            </div>
            <span className={`badge status-${t.status.replace(/\s/g, "").toLowerCase()}`}>{t.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
