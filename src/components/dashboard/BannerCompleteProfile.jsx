import React from 'react';
import { UserCheck, ChevronRight } from 'lucide-react';

export default function BannerCompleteProfile({ healthScore, onOpenProfileModal }) {
  return (
    <div className="complete-profile-banner">
      <div className="banner-info">
        <h3>Complete your information</h3>
        <p>A complete profile improves AI recommendation accuracy and unlocks high-match government & private grants.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${healthScore}%` }}></div>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
            {healthScore}% Complete
          </span>
        </div>
      </div>

      <button className="btn-primary" onClick={onOpenProfileModal}>
        <UserCheck size={16} />
        Complete Profile
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
