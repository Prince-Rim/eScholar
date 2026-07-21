import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

const AdminSidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ color: 'black' }}>eServices</div>
      <nav className="nav-menu">
        <button 
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>
        <button 
          className={`nav-item ${activeView === 'applicants' ? 'active' : ''}`}
          onClick={() => setActiveView('applicants')}
        >
          <Users size={20} />
          Applicants
        </button>

        <button 
          className={`nav-item ${activeView === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveView('applications')}
        >
          <FileText size={20} />
          Applications
        </button>
        <button 
          className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <Settings size={20} />
          Settings
        </button>
        
        <button 
          className="nav-item"
          onClick={() => {
             localStorage.removeItem('eservices_2fa_session');
             localStorage.removeItem('eservices_user_role');
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

export default AdminSidebar;
