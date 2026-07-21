import React from 'react';
import { Moon, Sun, User } from 'lucide-react';

export default function SettingsView({ profile, theme, toggleTheme, onOpenProfileModal }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
      <div>
        <h2 style={{ fontSize: '1.4rem' }}>Portal Settings & Notifications</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Manage your account preferences, display appearance, and automated AI match alerts.
        </p>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
          <div>
            <h4 style={{ fontSize: '1rem' }}>Interface Theme</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Toggle between light mode and executive dark mode</p>
          </div>
          <button className="btn-secondary" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
          <div>
            <h4 style={{ fontSize: '1rem' }}>Student Profile Data</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Name: {profile.name} • {profile.course}</p>
          </div>
          <button className="btn-primary" onClick={onOpenProfileModal}>
            <User size={16} /> Edit Profile
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h4 style={{ fontSize: '1rem' }}>Notification Preferences</h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Email alerts when new high-match scholarships (≥90%) are posted</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Deadline reminder notifications 7 days before application close</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>DOST & CHED official examination venue updates</span>
          </label>
        </div>
      </div>
    </div>
  );
}
