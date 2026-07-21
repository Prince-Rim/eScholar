import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { calculateMatchScore } from '../../utils/matchingEngine';

export default function AIRecommendationsView({ 
  scholarships, 
  profile, 
  onViewDetails, 
  onApply,
  onOpenProfileModal
}) {
  const evaluated = scholarships.map(s => ({
    scholarship: s,
    matchData: calculateMatchScore(profile, s)
  })).sort((a, b) => b.matchData.score - a.matchData.score);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={24} className="sparkle-icon" />
          AI Recommendation Vector Analysis
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Real-time algorithmic matching powered by eServices Scholar engine matching GPA, course priority, income tiers, and document verification.
        </p>
      </div>

      <div style={{
        background: 'var(--bg-banner)',
        border: '1px solid var(--bg-banner-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Evaluated Profile</span>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: 2 }}>{profile.name}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{profile.course}</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>GWA / GPA Vector</span>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10b981', marginTop: 2 }}>{profile.gpa} (GWA)</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Equiv {profile.gpaEquivalent} / 4.0</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Income Bracket</span>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: 2 }}>₱{profile.householdIncome.toLocaleString()}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Under ₱250k Priority Tag</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Verification Level</span>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', marginTop: 2 }}>
            {profile.transcriptUploaded ? 'Verified Transcript' : 'Pending Verification'}
          </div>
          <button onClick={onOpenProfileModal} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
            Update Profile Data →
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ fontSize: '1.15rem' }}>Top Ranked Matches for Your Profile</h3>

        {evaluated.map(({ scholarship, matchData }) => (
          <div key={scholarship.id} className="scholarship-card">
            <div className="card-header-row">
              <div>
                <span className="agency-tag">{scholarship.agency}</span>
                <h4 className="scholarship-title">{scholarship.title}</h4>
                <p className="scholarship-desc">{scholarship.description}</p>
              </div>

              <div className="match-badge">
                <div className="match-percentage">{matchData.score}%</div>
                <div className="match-label">AI Match Score</div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Rule Engine Breakdown
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: '0.82rem' }}>
                {matchData.matchedReasons.map((reason, i) => (
                  <span key={i} style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={14} /> {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button className="btn-primary btn-full" onClick={() => onApply(scholarship)}>
                Apply Now
              </button>
              <button className="btn-secondary" onClick={() => onViewDetails(scholarship)}>
                Inspect Criteria Rules
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
