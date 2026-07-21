import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, ClipboardCheck, PlusCircle, BarChart3 } from 'lucide-react';

const AdminSidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="sidebar admin-sidebar">
      <div className="sidebar-logo" style={{ color: 'black' }}>eScholar</div>
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
          className={`nav-item ${activeView === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveView('compliance')}
        >
          <ClipboardCheck size={20} />
          Compliance
        </button>
        <button 
          className={`nav-item ${activeView === 'create-program' ? 'active' : ''}`}
          onClick={() => setActiveView('create-program')}
        >
          <PlusCircle size={20} />
          Create Program
        </button>
        <button 
          className={`nav-item ${activeView === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveView('reports')}
        >
          <BarChart3 size={20} />
          Reports
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

export default AdminSidebar;
