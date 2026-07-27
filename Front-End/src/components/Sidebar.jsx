import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Bookmark,
  FileText, 
  ClipboardCheck, 
  Settings, 
  LogOut 
} from 'lucide-react';
import Logo from './Logo';
import './ProviderSidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="white-provider-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-header">
        <Logo size="normal" onClick={() => setActiveView && setActiveView('dashboard')} style={{ cursor: 'pointer', marginLeft: '-3px' }} />
        <span className="brand-subtitle">Student Portal</span>
      </div>

      {/* Navigation Menu */}
      <nav className="provider-nav-menu">
        <div className="nav-section-label">OVERVIEW</div>

        <button 
          className={`provider-nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <div className="nav-section-label" style={{ marginTop: '1.25rem' }}>SCHOLARSHIP DISCOVERY</div>

        <button 
          className={`provider-nav-item ${activeView === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveView('browse')}
        >
          <Search size={18} />
          <span>Browse Scholarships</span>
        </button>

        <button 
          className={`provider-nav-item ${activeView === 'saved' || activeView === 'bookmarks' ? 'active' : ''}`}
          onClick={() => setActiveView('saved')}
        >
          <Bookmark size={18} />
          <span>Saved Scholarships</span>
        </button>

        <div className="nav-section-label" style={{ marginTop: '1.25rem' }}>MY SCHOLARSHIPS</div>

        <button 
          className={`provider-nav-item ${activeView === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveView('applications')}
        >
          <FileText size={18} />
          <span>My Applications</span>
        </button>

        <button 
          className={`provider-nav-item ${activeView === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveView('compliance')}
        >
          <ClipboardCheck size={18} />
          <span>Grant Compliance</span>
        </button>
      </nav>

      {/* User Profile Footer */}
      <div className="provider-sidebar-footer">
        <div className="user-profile-row">
          <div className="user-avatar-circle">FA</div>
          <div className="user-details">
            <span className="user-name">Fransee Azucena</span>
            <span className="user-agency">Student Applicant</span>
          </div>
        </div>

        {/* Settings — bottom, above logout */}
        <button
          className={`provider-nav-item ${activeView === 'settings' ? 'active' : ''}`}
          style={{ width: '100%', marginBottom: '0.25rem' }}
          onClick={() => setActiveView && setActiveView('settings')}
        >
          <Settings size={16} />
          <span>Account Settings</span>
        </button>

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

export default Sidebar;
