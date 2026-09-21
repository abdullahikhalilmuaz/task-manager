import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiUserPlus,
  FiTrash2,
  FiArrowLeft,
  FiUser,
} from "react-icons/fi";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function TeamDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [team, setTeam] = useState(null);
  const [progress, setProgress] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const t = await api.get(`/teams/${id}`);
      setTeam(t.data);
    } catch (err) {
      console.error(
        "Team load failed:",
        err.response?.status,
        err.response?.data,
      );
      setTeam({ _id: id, name: "Team not found", members: [], owner: {} });
    }

    try {
      const p = await api.get(`/teams/${id}/progress`);
      setProgress(p.data);
    } catch (err) {
      console.error(
        "Progress load failed:",
        err.response?.status,
        err.response?.data,
      );
      setProgress({ perMember: [] });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!team) return <div className="loader">Loading team...</div>;

  const isOwner = team.owner?._id === user?._id;

  const invite = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post(`/teams/${id}/members`, {
        email: inviteEmail,
      });
      setTeam(data);
      setInviteEmail("");
      setMsg("Member added ✅");
      load(); // refresh progress
    } catch (err) {
      setMsg(err.response?.data?.message || "Invite failed");
    }
  };

  const remove = async (userId) => {
    if (!confirm("Remove this member?")) return;
    try {
      const { data } = await api.delete(`/teams/${id}/members/${userId}`);
      setTeam(data);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Remove failed");
    }
  };

  const deleteTeam = async () => {
    if (!confirm("Delete this team permanently?")) return;
    await api.delete(`/teams/${id}`);
    nav("/teams");
  };

  return (
    <div className="team-details">
      <button className="back-link" onClick={() => nav("/teams")}>
        <FiArrowLeft /> Back to Teams
      </button>

      <div className="page-header">
        <div>
          <h1>{team.name}</h1>
          <p>Owned by {team.owner?.name}</p>
        </div>
        {isOwner && (
          <button className="btn-danger" onClick={deleteTeam}>
            <FiTrash2 /> Delete Team
          </button>
        )}
      </div>

      <div className="team-detail-grid">
        <div className="team-members-card">
          <div className="chart-head">
            <h3>
              <FiUsers /> Members ({team.members.length})
            </h3>
          </div>

          {isOwner && (
            <form className="invite-row" onSubmit={invite}>
              <input
                placeholder="Invite by email..."
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                type="email"
                required
              />
              <button className="btn-primary">
                <FiUserPlus /> Invite
              </button>
            </form>
          )}

          {msg && <p className="muted">{msg}</p>}

          <div className="members-list">
            {team.members.map((m) => (
              <div className="member-row" key={m._id}>
                <div className="member-avatar">
                  {m.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="member-info">
                  <h4>
                    {m.name}{" "}
                    {m._id === team.owner?._id && (
                      <span className="badge cat-work">Owner</span>
                    )}
                  </h4>
                  <p>{m.email}</p>
                </div>
                {isOwner && m._id !== team.owner?._id && (
                  <button
                    className="icon-btn danger"
                    onClick={() => remove(m._id)}
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="team-progress-card">
          <div className="chart-head">
            <h3>Progress by Member</h3>
          </div>
          {progress?.perMember?.map((row) => (
            <div className="progress-row" key={row.user._id}>
              <div className="progress-name">
                <FiUser /> {row.user.name}
              </div>
              <div className="progress-stats">
                <span className="badge status-completed">
                  {row.completed} done
                </span>
                <span className="badge status-pending">
                  {row.pending} pending
                </span>
                <span className="badge status-overdue">
                  {row.overdue} overdue
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
