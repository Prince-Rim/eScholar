import React, { useState } from 'react';
import { 
  Building2, Users, GraduationCap, ArrowRight, Eye, CheckCircle, 
  XCircle, Clock, ShieldCheck, Activity, UserPlus, UserCheck, KeyRound, AlertCircle,
  FileText, Server, Database, Lock
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';
import './ProviderDashboard.css';

const MOCK_RECENT_ONBOARDINGS = [
  { id: 'prov-1', code: 'LE', name: 'Lumina Education Foundation', rep: 'Catherine Reyes', email: 'c.reyes@lumina.org', date: 'May 28, 2026', status: 'Active', programs: 4 },
  { id: 'prov-2', code: 'BS', name: 'Bayanihan Scholarship Fund', rep: 'Miguel Santos', email: 'm.santos@bayanihan.ph', date: 'May 24, 2026', status: 'Active', programs: 6 },
  { id: 'prov-3', code: 'NA', name: 'NextGen Academic Trust', rep: 'Andrea Lim', email: 'andrea@nextgen.edu', date: 'May 19, 2026', status: 'Disabled', programs: 2 },
  { id: 'prov-4', code: 'PY', name: 'Pacific Youth Initiative', rep: 'Daniel Cruz', email: 'd.cruz@pacificyouth.org', date: 'May 14, 2026', status: 'Active', programs: 3 },
];

const MOCK_LATEST_ACTIVITY = [
  { id: 1, action: 'Created provider account', target: 'Lumina Education Foundation', actor: 'Jeremiah Madronio', time: 'May 28, 2026 · 09:14', type: 'provider' },
  { id: 2, action: 'Deactivated provider account', target: 'NextGen Academic Trust', actor: 'Jeremiah Madronio', time: 'May 26, 2026 · 16:02', type: 'provider' },
  { id: 3, action: 'Suspended user account', target: 'Janelle Dela Cruz', actor: 'Jeremiah Madronio', time: 'May 24, 2026 · 11:37', type: 'user' },
  { id: 4, action: 'Sent password reset link', target: 'Rafael Garcia', actor: 'Jeremiah Madronio', time: 'May 22, 2026 · 08:51', type: 'account' },
];

const AdminDashboard = ({ setActiveView }) => {
  const [selectedOrg, setSelectedOrg] = useState(null);

  return (
    <div className="pd-page">
      {/* Header */}
      <div className="pd-header">
        <div>
          <h2 className="pd-title">Admin Dashboard</h2>
          <p className="pd-subtitle">Platform governance overview, provider onboardings, and system activity.</p>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="pd-kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><Building2 size={20} /></div>
          <div>
            <p className="pd-kpi-label">Total Providers</p>
            <p className="pd-kpi-value">4</p>
            <p className="pd-kpi-sub">3 active organizations</p>
          </div>
        </div>

        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><Users size={20} /></div>
          <div>
            <p className="pd-kpi-label">Registered Students</p>
            <p className="pd-kpi-value">3,450</p>
            <p className="pd-kpi-sub">Verified accounts</p>
          </div>
        </div>

        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><GraduationCap size={20} /></div>
          <div>
            <p className="pd-kpi-label">Active Programs</p>
            <p className="pd-kpi-value">18</p>
            <p className="pd-kpi-sub">Published nationwide</p>
          </div>
        </div>

        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><FileText size={20} /></div>
          <div>
            <p className="pd-kpi-label">Total Applications</p>
            <p className="pd-kpi-value">12,102</p>
            <p className="pd-kpi-sub">2,450 pending evaluation</p>
          </div>
        </div>
      </div>

      {/* System Governance & Health Alert Strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '12px',
        padding: '0.85rem 1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Server size={18} />
          </div>
          <div>
            <p style={{ margin: '0 0 0.1rem', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
              System Status: Operational (100% Uptime)
            </p>
            <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748b' }}>
              All core services online · Automated database backups active · 2FA Security Enforced
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-table-export" 
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            onClick={() => setActiveView && setActiveView('audit')}
          >
            Audit Logs <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Main Content Grid (2 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.25rem', alignItems: 'flex-start' }}>

        {/* Left Column: Recent Provider Onboardings */}
        <div className="pd-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
            <div>
              <p className="pd-card-title">Recent provider onboardings</p>
              <p className="pd-card-sub" style={{ margin: 0 }}>Latest organizations added to the platform.</p>
            </div>
            <button 
              className="btn-table-export" 
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
              onClick={() => setActiveView && setActiveView('providers')}
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-responsive-wrapper">
            <table className="programs-data-table">
              <thead>
                <tr>
                  <th>Provider Name</th>
                  <th>Date Added</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RECENT_ONBOARDINGS.map(org => (
                  <tr key={org.id} className="program-table-row" onClick={() => setSelectedOrg(org)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '7px',
                          background: '#eff6ff', border: '1px solid #bfdbfe',
                          color: '#082894', fontWeight: 800, fontSize: '0.78rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                          {org.code}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.86rem', color: '#0f172a' }}>
                          {org.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="table-date-text">{org.date}</span>
                    </td>
                    <td>
                      <span className={`status-badge-pill ${org.status === 'Active' ? 'status-published' : 'status-draft'}`}>
                        {org.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <button className="btn-table-export" style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }} onClick={() => setSelectedOrg(org)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Latest Activity */}
        <div className="pd-card" style={{ padding: '1.25rem 1.5rem' }}>
          <p className="pd-card-title">Latest activity</p>
          <p className="pd-card-sub">Recorded administrative actions.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '0.5rem' }}>
            {MOCK_LATEST_ACTIVITY.map(act => (
              <div 
                key={act.id} 
                style={{ 
                  padding: '0.75rem 0', 
                  borderBottom: act.id < MOCK_LATEST_ACTIVITY.length ? '1px solid #f1f5f9' : 'none' 
                }}
              >
                <p style={{ margin: '0 0 0.15rem', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  {act.action}
                </p>
                <p style={{ margin: '0 0 0.2rem', fontSize: '0.8rem', color: '#082894', fontWeight: 600 }}>
                  {act.target}
                </p>
                <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8' }}>
                  {act.actor} · {act.time}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Provider Details Quick Modal */}
      {selectedOrg && (
        <div className="modal-overlay" onClick={() => setSelectedOrg(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            maxWidth: '460px', width: '92%', borderRadius: '14px', border: '1.5px solid #cbd5e1', background: '#fff', padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', color: '#082894', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedOrg.code}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{selectedOrg.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{selectedOrg.email}</p>
                </div>
              </div>
              <span className={`status-badge-pill ${selectedOrg.status === 'Active' ? 'status-published' : 'status-draft'}`}>
                {selectedOrg.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Representative:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedOrg.rep}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Active Programs:</span>
                <span style={{ fontWeight: 700, color: '#082894' }}>{selectedOrg.programs} Programs</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Date Onboarded:</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedOrg.date}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button className="btn-modal-close" onClick={() => setSelectedOrg(null)}>Close</button>
              <button className="pd-primary-btn" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} onClick={() => { setSelectedOrg(null); setActiveView('providers'); }}>
                Manage in Providers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
