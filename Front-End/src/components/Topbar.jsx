import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Placeholder for potential search or breadcrumbs */}
      </div>
      <div className="topbar-right">
        <button className="notification-btn">
          <Bell size={24} />
        </button>
        <div className="user-profile">
          <UserCircle size={36} strokeWidth={1.5} style={{ color: '#94a3b8' }} />
          <span className="user-name">Fransee Azucena</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
