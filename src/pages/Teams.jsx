import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import api from "../api/axios.js";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/teams").then((r) => setTeams(r.data));
  }, []);

  const create = async () => {
    if (!name) return;
    const { data } = await api.post("/teams", { name });
    setTeams([...teams, data]);
    setName("");
  };

  return (
    <div className="teams-page">
      <div className="page-header">
        <div>
          <h1>My Teams</h1>
          <p>Collaborate with your team members.</p>
        </div>
      </div>

      <div className="create-team">
        <input
          placeholder="New team name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn-primary" onClick={create}>+ Create Team</button>
      </div>

      <div className="teams-list">
        {teams.length === 0 && <p className="empty">No teams yet.</p>}
        {teams.map((t) => (
          <div key={t._id} className="team-card">
            <div className="team-icon"><FiUsers /></div>
            <div className="team-info">
              <h4>{t.name}</h4>
              <p>{t.members?.length || 0} members</p>
            </div>
            <button className="btn-outline">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}
