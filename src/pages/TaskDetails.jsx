import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCalendar, FiUser, FiEdit2, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import api from "../api/axios.js";

export default function TaskDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    api.get("/tasks").then((r) => {
      const t = r.data.find((x) => x._id === id);
      setTask(t);
    });
  }, [id]);

  if (!task) return <div className="loader">Loading...</div>;

  const update = async (patch) => {
    const { data } = await api.put(`/tasks/${id}`, patch);
    setTask(data);
  };

  const remove = async () => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    nav("/tasks");
  };

  return (
    <div className="task-details">
      <button className="back-link" onClick={() => nav("/tasks")}>← Back</button>

      <div className="details-header">
        <div>
          <span className={`badge cat-${task.category?.toLowerCase()}`}>{task.category}</span>
          <h1>{task.title}</h1>
          <div className="details-tags">
            <span className={`badge pri-${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
            <span className="badge date">
              <FiCalendar /> {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No due"}
            </span>
          </div>
        </div>
      </div>

      <div className="details-card">
        <h3>Description</h3>
        <p>{task.description || "No description provided."}</p>

        <h3>Progress</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${task.progress}%` }} />
        </div>
        <span className="progress-label">{task.progress}%</span>

        <h3>Status</h3>
        <select
          value={task.status}
          onChange={(e) => update({ status: e.target.value })}
          className="select"
        >
          {["Pending", "In Progress", "Completed", "Overdue"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <h3>Assigned To</h3>
        <p className="assigned"><FiUser /> {task.assignedTo?.name || "You"}</p>
      </div>

      <div className="details-actions">
        <button className="btn-outline" onClick={() => nav(`/tasks/${id}/edit`)}><FiEdit2 /> Edit</button>
        <button className="btn-success" onClick={() => update({ status: "Completed", progress: 100 })}>
          <FiCheckCircle /> Mark Complete
        </button>
        <button className="btn-danger" onClick={remove}><FiTrash2 /> Delete</button>
      </div>
    </div>
  );
}
