import React from 'react';
import { Bookmark, CheckCircle, Award, Users, Calendar } from 'lucide-react';

export default function ScholarshipCard({ 
  scholarship, 
  matchData, 
  onViewDetails, 
  onApply, 
  isBookmarked, 
  onToggleBookmark,
  hasApplied
}) {
  const { score } = matchData;

  let badgeStyle = {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white'
  };

  if (score < 80 && score >= 60) {
    badgeStyle = {
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: 'white'
    };
  } else if (score < 60) {
    badgeStyle = {
      background: 'linear-gradient(135deg, #64748b, #475569)',
      color: 'white'
    };
  }

  return (
    <div className="scholarship-card">
      <div className="card-header-row">
        <div>
          <span className="agency-tag">{scholarship.agency}</span>
          <h4 className="scholarship-title">{scholarship.title}</h4>
          <p className="scholarship-desc">{scholarship.description}</p>
        </div>

        <div className="match-badge" style={badgeStyle}>
          <div className="match-percentage">{score}%</div>
          <div className="match-label">Matched</div>
        </div>
      </div>

      <div className="details-row">
        <div className="detail-pill">
          <Award size={15} style={{ color: 'var(--primary)' }} />
          <span>₱{scholarship.tuitionCoverage.toLocaleString()}/yr tuition • ₱{scholarship.monthlyStipend.toLocaleString()} stipend</span>
        </div>

        <div className="detail-pill">
          <Users size={15} style={{ color: 'var(--accent)' }} />
          <span>{scholarship.slots} slots available</span>
        </div>

        <div className="detail-pill" style={{ color: scholarship.deadlineDaysLeft <= 14 ? '#ef4444' : 'inherit' }}>
          <Calendar size={15} />
          <span><strong>{scholarship.deadlineDaysLeft} days left</strong> ({scholarship.deadlineDate})</span>
        </div>
      </div>

      <div className="card-actions">
        {hasApplied ? (
          <button className="btn-secondary btn-full" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }} disabled>
            <CheckCircle size={16} />
            Application Submitted
          </button>
        ) : (
          <button className="btn-primary btn-full" onClick={() => onApply(scholarship)}>
            Apply Now
          </button>
        )}

        <button className="btn-secondary" onClick={() => onViewDetails(scholarship)}>
          View details
        </button>

        <button 
          className="icon-btn" 
          onClick={() => onToggleBookmark(scholarship.id)}
          style={{
            background: isBookmarked ? 'var(--primary-light)' : 'transparent',
            borderColor: isBookmarked ? 'var(--primary)' : 'var(--border-color)',
            color: isBookmarked ? 'var(--primary)' : 'var(--text-muted)'
          }}
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Scholarship'}
        >
          <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}
