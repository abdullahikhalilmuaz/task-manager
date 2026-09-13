import { Link } from "react-router-dom";
import {
  FiCheckCircle, FiTrendingUp, FiUsers, FiPieChart,
  FiTarget, FiZap, FiClipboard,
} from "react-icons/fi";

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="brand">
          <span className="logo-mark">✓</span>
          <span className="logo-text">TaskFlow</span>
        </div>
        <div className="landing-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="landing-actions">
          <Link to="/login" className="btn-text">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-left">
          <h1>Plan Smarter<br /><span>Get More Done</span></h1>
          <p>
            The intelligent task planning and productivity management system
            that helps you stay organized, focused and achieve your goals.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <a href="#features" className="btn-outline">Learn More</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-illustration">
            <div className="float-card c1"><FiCheckCircle /> Task added</div>
            <div className="float-card c2"><FiTrendingUp /> Productivity</div>
            <div className="float-card c3"><FiTarget /> Goals</div>
            <div className="hero-blob" />
          </div>
        </div>
      </section>

      <section className="features" id="features">
        {[
          { icon: <FiZap />, title: "Smart Priorities", desc: "Focus on what matters most with intelligent suggestions." },
          { icon: <FiTrendingUp />, title: "Track Progress", desc: "Monitor your tasks and measure your productivity." },
          { icon: <FiUsers />, title: "Team Collaboration", desc: "Work together and achieve more as a team." },
          { icon: <FiPieChart />, title: "Beautiful Analytics", desc: "Get insights and improve your performance." },
        ].map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
