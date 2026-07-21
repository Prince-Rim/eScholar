import React from 'react';
import { LayoutDashboard, Compass, Sparkles, FolderCheck, Settings } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'browse', label: 'Browse Application', icon: Compass },
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles },
    { id: 'applications', label: 'My Applications', icon: FolderCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon size={19} />
            <span className="nav-text">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
