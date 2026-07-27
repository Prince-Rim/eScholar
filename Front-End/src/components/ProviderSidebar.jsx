import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  FileText,
  RefreshCw,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import Logo from './Logo';
import './ProviderSidebar.css';

const ProviderSidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="white-provider-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-header">
        <Logo size="normal" onClick={() => setActiveView && setActiveView('provider-dashboard')} style={{ cursor: 'pointer', marginLeft: '-3px' }} />
        <span className="brand-subtitle">Provider Portal</span>
      </div>

      {/* Navigation Menu */}
      <nav className="provider-nav-menu">
        <div className="nav-section-label">OVERVIEW</div>

        <button
          className={`provider-nav-item ${activeView === 'provider-dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('provider-dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <div className="nav-section-label" style={{ marginTop: '1.25rem' }}>PROGRAM MANAGEMENT</div>

        <button
          className={`provider-nav-item ${activeView === 'my-programs' || activeView === 'programs' || activeView === 'program-detail' ? 'active' : ''}`}
          onClick={() => setActiveView('my-programs')}
        >
          <BookOpen size={18} />
          <span>My Scholarships</span>
        </button>

        <button
          className={`provider-nav-item ${activeView === 'create-program' || activeView === 'provider-create' ? 'active' : ''}`}
          onClick={() => setActiveView('create-program')}
        >
          <PlusCircle size={18} />
          <span>Create Scholarship</span>
        </button>

        <div className="nav-section-label" style={{ marginTop: '1.25rem' }}>OPERATIONS & AUDIT</div>

        <button
          className={`provider-nav-item ${activeView === 'applicants' ? 'active' : ''}`}
          onClick={() => setActiveView('applicants')}
        >
          <FileText size={18} />
          <span>Applicant Pipeline</span>
        </button>

        <button
          className={`provider-nav-item ${activeView === 'active-scholars' ? 'active' : ''}`}
          onClick={() => setActiveView('active-scholars')}
        >
          <RefreshCw size={18} />
          <span>Active Scholars</span>
        </button>

        <button
          className={`provider-nav-item ${activeView === 'verification' ? 'active' : ''}`}
          onClick={() => setActiveView('verification')}
        >
          <ShieldCheck size={18} />
          <span>Provider Verification</span>
        </button>
      </nav>

      {/* User Profile Footer */}
      <div className="provider-sidebar-footer">
        <div className="user-profile-row">
          <div className="user-avatar-circle">DR</div>
          <div className="user-details">
            <span className="user-name">Divina Ramos</span>
            <span className="user-agency">CHED Region IV-A</span>
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

export default ProviderSidebar;
