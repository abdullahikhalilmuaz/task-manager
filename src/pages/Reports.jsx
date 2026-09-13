import { useEffect, useState } from "react";
import api from "../api/axios.js";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#7C3AED", "#2563EB", "#10B981", "#EF4444", "#F59E0B"];

export default function Reports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/reports").then((r) => setData(r.data));
  }, []);

  if (!data) return <div className="loader">Loading reports...</div>;

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>View your productivity insights and performance.</p>
        </div>
        <select className="select"><option>Last 7 days</option></select>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Productivity Score</span>
          <span className="stat-value">{data.productivity}%</span>
          <span className="chip green">{data.level}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{data.cards.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{data.cards.completed}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Overdue</span>
          <span className="stat-value red">{data.cards.overdue}</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card wide">
          <h3>Task Completion Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.weekly}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#7C3AED" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.categoryDist} dataKey="value" nameKey="name" outerRadius={90}>
                {data.categoryDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
