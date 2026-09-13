import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function CreateTask() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Personal",
    priority: "Medium",
    deadline: "",
    progress: 0,
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    nav("/tasks");
  };

  return (
    <div className="create-task">
      <div className="page-header">
        <div>
          <h1>Create New Task</h1>
          <p>Add a new task to stay on track.</p>
        </div>
      </div>

      <form className="task-form" onSubmit={submit}>
        <label>Task Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter task title"
          required
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe your task..."
          rows={4}
        />

        <div className="form-row">
          <div>
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {["Academic", "Work", "Personal", "Health", "Religious"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              {["Low", "Medium", "High"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <label>Deadline</label>
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <label>Progress — {form.progress}%</label>
        <input
          type="range"
          min={0}
          max={100}
          step={25}
          value={form.progress}
          onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
        />

        <div className="form-actions">
          <button type="button" className="btn-outline" onClick={() => nav(-1)}>Cancel</button>
          <button className="btn-primary">Create Task</button>
        </div>
      </form>
    </div>
  );
}
