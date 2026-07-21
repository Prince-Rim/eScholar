import React from 'react';
import { Sparkles, Upload, Filter } from 'lucide-react';

export default function AIMatchedEnginePanel({ profile, healthStats, onOpenProfileModal, activeFilter, setActiveFilter }) {
  return (
    <div className="ai-engine-panel">
      <div className="ai-engine-header">
        <Sparkles size={20} className="sparkle-icon" />
        <div>
          <h4 className="engine-title">AI Matched Engine</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time recommendation vector</span>
        </div>
      </div>

      <div className="match-health-box">
        <div className="health-score">{healthStats.healthScore}%</div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>
          Profile Match Health
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
          Matched with {healthStats.matchedCount} high-value grants
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
          Active Matching Vector
        </div>
        <div className="criteria-list">
          <div className="criteria-item">
            <span className="criteria-key">GWA / GPA:</span>
            <span className="criteria-val" style={{ color: '#10b981' }}>{profile.gpa} ({profile.gpaEquivalent})</span>
          </div>

          <div className="criteria-item">
            <span className="criteria-key">Course Field:</span>
            <span className="criteria-val">{profile.course} ({profile.category})</span>
          </div>

          <div className="criteria-item">
            <span className="criteria-key">Household Income:</span>
            <span className="criteria-val">₱{profile.householdIncome.toLocaleString()}/yr</span>
          </div>

          <div className="criteria-item">
            <span className="criteria-key">Year Level:</span>
            <span className="criteria-val">{profile.yearLevel}</span>
          </div>
        </div>
      </div>

      <div className="booster-box">
        <div className="booster-title">
          <Upload size={16} />
          Match Booster Opportunity
        </div>
        <p>Upload your official grade transcript & recommendation letter to gain +12% AI match verification score.</p>
        <button 
          className="btn-secondary" 
          onClick={onOpenProfileModal}
          style={{ width: '100%', fontSize: '0.8rem', padding: '6px 12px', justifyContent: 'center' }}
        >
          Update Profile & Upload
        </button>
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Filter size={14} /> Quick Engine Preset
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            { id: 'ALL', label: 'All Matched' },
            { id: 'GOVT', label: 'Govt (DOST/CHED)' },
            { id: 'STEM', label: 'STEM Priority' },
            { id: 'STIPEND', label: 'Stipend > ₱5k' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                background: activeFilter === f.id ? 'var(--primary)' : 'var(--bg-app)',
                color: activeFilter === f.id ? 'white' : 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
