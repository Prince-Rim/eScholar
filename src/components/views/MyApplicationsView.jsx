import React from 'react';
import { Clock } from 'lucide-react';
import { calculateMatchScore } from '../../utils/matchingEngine';

export default function MyApplicationsView({ 
  scholarships, 
  profile, 
  appliedIds, 
  bookmarkedIds, 
  onViewDetails,
  onApply
}) {
  const appliedScholarships = scholarships.filter(s => appliedIds.includes(s.id));
  const bookmarkedScholarships = scholarships.filter(s => bookmarkedIds.includes(s.id));

  const totalValueApplied = appliedScholarships.reduce((acc, s) => {
    return acc + s.tuitionCoverage + (s.monthlyStipend * 10) + (s.annualBookAllowance || 0);
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: '1.4rem' }}>My Applications & Saved Grants</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Track application statuses, upload document attachments, and monitor pending approvals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        <div className="metric-card">
          <div className="metric-number">{appliedScholarships.length}</div>
          <div className="metric-title">Active Applications</div>
          <div className="metric-subtitle">Submitted and under verification</div>
        </div>

        <div className="metric-card card-success">
          <div className="metric-number">{bookmarkedScholarships.length}</div>
          <div className="metric-title">Saved / Bookmarked</div>
          <div className="metric-subtitle">Shortlisted opportunities</div>
        </div>

        <div className="metric-card card-accent">
          <div className="metric-number" style={{ fontSize: '1.6rem', color: 'var(--accent)' }}>
            ₱{totalValueApplied.toLocaleString()}
          </div>
          <div className="metric-title">Total Applied Funding</div>
          <div className="metric-subtitle">Cumulative annual value</div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>Submitted Applications</h3>
        {appliedScholarships.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 30,
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            You haven't submitted any applications yet. Browse recommendations and click "Apply Now" to get started!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {appliedScholarships.map(s => {
              const match = calculateMatchScore(profile, s);
              return (
                <div key={s.id} className="scholarship-card" style={{ borderLeft: '4px solid #10b981' }}>
                  <div className="card-header-row">
                    <div>
                      <span className="agency-tag">{s.agency}</span>
                      <h4 className="scholarship-title">{s.title}</h4>
                      <p className="scholarship-desc">Submitted on July 21, 2026 • Reference #: ES-2026-{s.id.toUpperCase()}</p>
                    </div>

                    <div style={{
                      background: '#ecfdf5',
                      color: '#059669',
                      border: '1px solid #a7f3d0',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <Clock size={16} /> Pending Evaluation
                    </div>
                  </div>

                  <div className="details-row">
                    <span>₱{s.tuitionCoverage.toLocaleString()}/yr Tuition Grant</span>
                    <span>₱{s.monthlyStipend.toLocaleString()}/mo Stipend</span>
                    <span>AI Match Score: <strong>{match.score}%</strong></span>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={() => onViewDetails(s)}>
                      View Application Summary
                    </button>
                    <a href={s.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
                      Agency Tracker Portal
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>Saved Grants (Shortlist)</h3>
        {bookmarkedScholarships.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 30,
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            No saved scholarships. Click the bookmark icon on any scholarship card to save it here for later.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bookmarkedScholarships.map(s => {
              const match = calculateMatchScore(profile, s);
              return (
                <div key={s.id} className="scholarship-card">
                  <div className="card-header-row">
                    <div>
                      <span className="agency-tag">{s.agency}</span>
                      <h4 className="scholarship-title">{s.title}</h4>
                      <p className="scholarship-desc">Deadline: {s.deadlineDate} ({s.deadlineDaysLeft} days left)</p>
                    </div>

                    <div className="match-badge">
                      <div className="match-percentage">{match.score}%</div>
                      <div className="match-label">Match</div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="btn-primary btn-full" onClick={() => onApply(s)}>
                      Apply Now
                    </button>
                    <button className="btn-secondary" onClick={() => onViewDetails(s)}>
                      View details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
