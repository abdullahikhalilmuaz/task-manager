import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      nav("/dashboard");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
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
            <span className="logo-text">TaskFlow</span>
          </div>
          <h2>Welcome Back</h2>
          <p className="auth-sub">Sign in to your account to continue your productivity journey.</p>

          <form onSubmit={submit} className="auth-form">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <div className="auth-row">
              <label className="check">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="link-sm">Forgot password?</a>
            </div>
            {err && <div className="error-msg">{err}</div>}
            <button className="btn-primary full" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="divider">or</div>
          <button className="btn-outline full">Continue with Google</button>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
        <div className="auth-right">
          <div className="auth-art">
            <h3>Small steps<br />make big progress</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
