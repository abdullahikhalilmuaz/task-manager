import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (form.password !== form.confirm) return setErr("Passwords do not match");

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      nav("/dashboard");
    } catch (e) {
      setErr(e.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="brand">
            <span className="logo-mark">✓</span>
            <span className="logo-text">taskflux</span>
          </div>
          <h2>Create Your Account</h2>
          <p className="auth-sub">
            Join us and start managing your tasks efficiently.
          </p>

          <form onSubmit={submit} className="auth-form">
            <label>Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create a password"
              required
            />
            <label>Confirm Password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Confirm your password"
              required
            />
            {err && <div className="error-msg">{err}</div>}
            <button className="btn-primary full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className="auth-right">
          <div className="auth-art">
            <h3>
              Better Planning
              <br />
              Better Results
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
