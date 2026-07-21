import React from 'react';
import { Bell, Moon, Sun, Award, UserCheck } from 'lucide-react';

export default function Header({ profile, theme, toggleTheme, onOpenProfileModal }) {
  return (
    <header className="header-navbar">
      <div className="brand-logo">
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
        }}>
          <Award size={22} />
        </div>
        <span>eServices</span>
        <span className="brand-badge">Scholar AI</span>
      </div>

      <div className="header-right">
        <button 
          className="icon-btn" 
          onClick={toggleTheme} 
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile-badge" onClick={onOpenProfileModal} title="Click to view/edit profile">
          <div className="avatar-circle">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="user-name">{profile.name}</span>
          <UserCheck size={14} style={{ color: '#10b981' }} />
        </div>
      </div>
    </header>
  );
}
