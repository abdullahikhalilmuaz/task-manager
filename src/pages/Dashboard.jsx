import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClipboard, FiCheckCircle, FiClock, FiAlertTriangle, FiCalendar } from "react-icons/fi";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import StatCard from "../components/StatCard.jsx";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#7C3AED", "#2563EB", "#10B981", "#EF4444", "#F59E0B"];

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [d, t] = await Promise.all([
        api.get("/reports/dashboard"),
        api.get("/tasks"),
      ]);
      setData(d.data);
      setTasks(t.data.slice(0, 4));
    };
    load();
  }, []);

  if (!data) return <div className="loader">Loading dashboard...</div>;

  const { cards, productivity, level, statusDist, categoryDist, weekly } = data;

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Good morning, {user?.name?.split(" ")[0]} 👋</h1>
          <p>Here's what's happening with your tasks today.</p>
        </div>
        <Link to="/tasks/new" className="btn-primary">+ Create Task</Link>
      </div>

      <div className="stats-grid">
        <StatCard icon={<FiClipboard />} label="Total Tasks" value={cards.total} sub="+2 this week" color="purple" />
        <StatCard icon={<FiCheckCircle />} label="Completed" value={cards.completed} sub="+1 this week" color="green" />
        <StatCard icon={<FiClock />} label="Pending" value={cards.pending} sub="+3 this week" color="blue" />
        <StatCard icon={<FiAlertTriangle />} label="Overdue" value={cards.overdue} sub="-1 this week" color="red" />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-head">
            <h3>Weekly Productivity</h3>
            <span className="chip">{productivity}%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekly}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-head">
            <h3>Task Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {statusDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-head">
            <h3>Category Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryDist} dataKey="value" nameKey="name" outerRadius={80}>
                {categoryDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-card">
        <div className="chart-head">
          <h3>Today's Tasks</h3>
          <Link to="/tasks" className="link-sm">View All</Link>
        </div>
        <div className="recent-list">
          {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
          {tasks.map((t) => (
            <Link to={`/tasks/${t._id}`} key={t._id} className="task-row">
              <span className={`badge cat-${t.category?.toLowerCase()}`}>{t.category}</span>
              <span className="task-title">{t.title}</span>
              <span className={`badge status-${t.status.replace(/\s/g, "").toLowerCase()}`}>{t.status}</span>
              <span className={`badge pri-${t.priority.toLowerCase()}`}>{t.priority}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
