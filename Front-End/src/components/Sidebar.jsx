import React from 'react';
import { LayoutDashboard, Search, Sparkles, FileText, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">eScholar</div>
      <nav className="nav-menu">
        <button 
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>
        <button 
          className={`nav-item ${activeView === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveView('browse')}
        >
          <Search size={20} />
          Browse Application
        </button>
        <button className="nav-item">
          <Sparkles size={20} />
          Recommendations
        </button>
        <button 
          className={`nav-item ${activeView === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveView('applications')}
        >
          <FileText size={20} />
          My Applications
        </button>
        <button className="nav-item">
          <Settings size={20} />
          Settings
        </button>
        <button 
          className="nav-item"
          onClick={() => setActiveView('login')}
          style={{ marginTop: 'auto', color: '#ef4444' }}
        >
          <LogOut size={20} />
          Log Out
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
