export default function Settings() {
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
          <select className="select"><option>English</option></select>

          <label>Time Zone</label>
          <select className="select"><option>(GMT+00:00) UTC</option></select>

          <label>Email Notifications</label>
          <div className="switch-row">
            <span>Receive task reminders and updates</span>
            <input type="checkbox" defaultChecked />
          </div>

          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
