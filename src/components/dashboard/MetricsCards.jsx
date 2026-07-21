import React from 'react';
import { Award, Clock, DollarSign } from 'lucide-react';

export default function MetricsCards({ matchedCount, submittedCount, totalPotentialFunding, urgentDeadlinesCount }) {
  const formatNum = (num) => num < 10 ? `0${num}` : `${num}`;

  return (
    <div className="metrics-row">
      <div className="metric-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="metric-number">{formatNum(matchedCount)}</div>
            <div className="metric-title">Matched Scholarships</div>
            <div className="metric-subtitle">AI matched to your profile criteria</div>
          </div>
          <div style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: 8,
            borderRadius: 10
          }}>
            <Award size={20} />
          </div>
        </div>
      </div>

      <div className="metric-card card-success">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="metric-number">{formatNum(submittedCount)}</div>
            <div className="metric-title">Application Submitted</div>
            <div className="metric-subtitle">{formatNum(submittedCount)} Pending verification</div>
          </div>
          <div style={{
            background: 'var(--success-light)',
            color: 'var(--success)',
            padding: 8,
            borderRadius: 10
          }}>
            <Clock size={20} />
          </div>
        </div>
      </div>

      <div className="metric-card card-accent">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="metric-number" style={{ fontSize: '1.7rem', color: 'var(--accent)' }}>
              ₱{totalPotentialFunding.toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>/yr</span>
            </div>
            <div className="metric-title">Potential Funding Value</div>
            <div className="metric-subtitle" style={{ color: '#d97706', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              ⚡ {urgentDeadlinesCount} Deadlines closing within 14 days
            </div>
          </div>
          <div style={{
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            padding: 8,
            borderRadius: 10
          }}>
            <DollarSign size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
