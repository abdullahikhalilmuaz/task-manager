import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiPlus, FiArrowRight } from "react-icons/fi";
import api from "../api/axios.js";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = () => {
      api
        .get("/teams")
        .then((r) => setTeams(r.data))
        .catch(() => {});
    };
    load();
    const timer = setInterval(load, 15000); // refresh every 15s
    return () => clearInterval(timer);
  }, []);

  const create = async (e) => {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("Enter a team name");

    setCreating(true);
    try {
      const { data } = await api.post("/teams", { name: name.trim() });
      setTeams([data, ...teams]);
      setName("");
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to create");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="teams-page">
      <div className="page-header">
        <div>
          <h1>My Teams</h1>
          <p>Collaborate with your team members.</p>
        </div>
      </div>

      <form className="create-team" onSubmit={create}>
        <input
          type="text"
          placeholder="New team name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={creating}>
          <FiPlus /> {creating ? "Creating..." : "Create Team"}
        </button>
      </form>

      {err && <p className="error-msg">{err}</p>}

      <div className="teams-list">
        {teams.length === 0 && (
          <p className="empty">No teams yet. Create one above.</p>
        )}
        {teams.map((t) => (
          <Link to={`/teams/${t._id}`} key={t._id} className="team-card">
            <div className="team-icon">
              <FiUsers />
            </div>
            <div className="team-info">
              <h4>{t.name}</h4>
              <p>
                {t.members?.length || 0} members · Owned by{" "}
                {t.owner?.name || "you"}
              </p>
            </div>
            <FiArrowRight className="team-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}
