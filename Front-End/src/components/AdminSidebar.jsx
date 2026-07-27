import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ClipboardCheck, 
  PlusCircle, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';
import './ProviderSidebar.css';

const AdminSidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="white-provider-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-header">
        <Logo size="normal" onClick={() => setActiveView && setActiveView('dashboard')} style={{ cursor: 'pointer', marginLeft: '-3px' }} />
        <span className="brand-subtitle">Admin Portal</span>
      </div>

      {/* Navigation Menu */}
      <nav className="provider-nav-menu">
        <div className="nav-section-label">MAIN NAVIGATION</div>

        <button 
          className={`provider-nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`provider-nav-item ${activeView === 'verifications' ? 'active' : ''}`}
          onClick={() => setActiveView('verifications')}
        >
          <ShieldCheck size={18} />
          <span>Verifications</span>
        </button>

        <button 
          className={`provider-nav-item ${activeView === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveView('reports')}
        >
          <BarChart3 size={18} />
          <span>Reports</span>
        </button>

        <div className="nav-section-label" style={{ marginTop: '1.25rem' }}>SYSTEM</div>

        <button 
          className={`provider-nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      {/* User Profile Footer */}
      <div className="provider-sidebar-footer">
        <div className="user-profile-row">
          <div className="user-avatar-circle">FA</div>
          <div className="user-details">
            <span className="user-name">Fransee Azucena</span>
            <span className="user-agency">System Administrator</span>
          </div>
        </div>

        <button 
          className="logout-nav-item"
          onClick={() => {
            localStorage.removeItem('escholar_2fa_session');
            localStorage.removeItem('escholar_user_role');
            setActiveView('login');
          }}
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
