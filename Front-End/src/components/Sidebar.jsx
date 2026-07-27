import React from 'react';
import { LayoutDashboard, Search, FileText, Settings, LogOut, ClipboardCheck } from 'lucide-react';
import Logo from './Logo';

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="sidebar">
      <div style={{ padding: '1.5rem', marginBottom: '1rem' }}>
        <Logo color="#1e3a8a" size="normal" />
      </div>
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

        <button 
          className={`nav-item ${activeView === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveView('applications')}
        >
          <FileText size={20} />
          Applications
        </button>
        <button 
          className={`nav-item ${activeView === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveView('compliance')}
        >
          <ClipboardCheck size={20} />
          Compliance
        </button>
        <button className="nav-item">
          <Settings size={20} />
          Settings
        </button>
        <button 
          className="nav-item"
          onClick={() => {
             localStorage.removeItem('escholar_2fa_session');
             localStorage.removeItem('escholar_user_role');
             setActiveView('login');
          }}
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
