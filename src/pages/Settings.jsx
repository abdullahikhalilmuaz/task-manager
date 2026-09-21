import { useState, useEffect } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    language: "English",
    timezone: "(GMT+00:00) UTC",
    emailNotifications: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("taskflow_settings") || "null",
    );
    if (stored) setSettings(stored);
  }, []);

  const save = () => {
    localStorage.setItem("taskflow_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-layout">
        <aside className="settings-tabs">
          <button className="tab active">General</button>
          <button className="tab">Notifications</button>
          <button className="tab">Appearance</button>
          <button className="tab">Security</button>
        </aside>

        <div className="settings-content">
          <h3>General Settings</h3>

          <label>Language</label>
          <select
            className="select"
            value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>Arabic</option>
            <option>Hausa</option>
          </select>

          <label>Time Zone</label>
          <select
            className="select"
            value={settings.timezone}
            onChange={(e) =>
              setSettings({ ...settings, timezone: e.target.value })
            }
          >
            <option>(GMT+00:00) UTC</option>
            <option>(GMT+01:00) Lagos</option>
            <option>(GMT-05:00) New York</option>
            <option>(GMT+03:00) Nairobi</option>
          </select>

          <label>Email Notifications</label>
          <div className="switch-row">
            <span>Receive task reminders and updates</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailNotifications: e.target.checked,
                })
              }
            />
          </div>

          {saved && <p className="muted">Saved ✅</p>}
          <button className="btn-primary" onClick={save}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
