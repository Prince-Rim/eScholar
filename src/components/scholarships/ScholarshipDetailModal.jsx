import React from 'react';
import { X, CheckCircle, XCircle, ExternalLink, Check } from 'lucide-react';

export default function ScholarshipDetailModal({ scholarship, matchData, onClose, onApply, hasApplied }) {
  if (!scholarship) return null;

  const { score, matchedReasons, missingReasons, totalAnnualValue } = matchData;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="agency-tag">{scholarship.agency}</span>
            <h3 className="modal-title">{scholarship.title}</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{scholarship.agencyName}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Match Breakdown Summary */}
        <div style={{
          background: 'var(--bg-banner)',
          border: '1px solid var(--bg-banner-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>
              AI Eligibility Assessment
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>
              {score >= 80 ? '🎉 Excellent Match! You meet core requirements.' : '⚡ Qualified Match with additional verification steps.'}
            </div>
          </div>
          <div className="match-badge" style={{ padding: '10px 18px' }}>
            <div className="match-percentage" style={{ fontSize: '1.4rem' }}>{score}%</div>
            <div className="match-label">AI Score</div>
          </div>
        </div>

        {/* Financial Coverage Grid */}
        <div>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 10 }}>Financial Benefits & Grant Coverage</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tuition Allowance</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>
                ₱{scholarship.tuitionCoverage.toLocaleString()} <span style={{ fontSize: '0.75rem' }}>/yr</span>
              </div>
            </div>
            <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Monthly Living Stipend</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success)', marginTop: 2 }}>
                ₱{scholarship.monthlyStipend.toLocaleString()} <span style={{ fontSize: '0.75rem' }}>/mo</span>
              </div>
            </div>
            <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. Total Annual Grant</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: 2 }}>
                ₱{totalAnnualValue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* AI Rule-by-Rule Analysis */}
        <div>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 10 }}>AI Match Breakdown</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {matchedReasons.map((reason, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{reason}</span>
              </div>
            ))}
            {missingReasons.map((reason, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <XCircle size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Documents */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Eligibility Criteria</h4>
            <ul style={{ paddingLeft: 18, fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {scholarship.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Required Documents</h4>
            <ul style={{ paddingLeft: 18, fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {scholarship.documentsNeeded.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Footer */}
        <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border-color)', paddingTop: 16, marginTop: 4 }}>
          {hasApplied ? (
            <button className="btn-secondary" style={{ flex: 1, background: '#ecfdf5', color: '#059669' }} disabled>
              <Check size={18} /> Application Submitted
            </button>
          ) : (
            <button className="btn-primary" style={{ flex: 1 }} onClick={() => { onApply(scholarship); onClose(); }}>
              Apply Now via eServices
            </button>
          )}

          <a 
            href={scholarship.applyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={16} /> Official Agency Portal
          </a>
        </div>
      </div>
    </div>
  );
}
