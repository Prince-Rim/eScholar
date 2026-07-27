import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Search, CheckCircle, Clock, XCircle, 
  Eye, Download, ChevronRight, X, AlertCircle, FileCheck, Award, ArrowRight,
  Send, Shield, Check, GraduationCap, MoreVertical
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';
import './ProviderDashboard.css';

export const MOCK_STUDENT_APPLICATIONS = [
  {
    id: 'APP-2026-001',
    title: 'CHED Merit Scholarship for STEM',
    code: 'CHED-STEM-26',
    provider: 'Commission on Higher Education',
    stipend: '₱5,000 / mo',
    dateSubmitted: 'Jan 22, 2026',
    status: 'Under Review',
    gwa: '1.45',
    remarks: 'Your application packet has been received and is currently under evaluation by the scholarship provider. Notifications will be sent upon review completion.',
    documents: ['Form 138 / TOR Transcript', 'Certificate of Indigency', 'Good Moral Certificate']
  },
  {
    id: 'APP-2026-002',
    title: 'Foundation Digital Skills Fellowship',
    code: 'FDN-DIGI-26',
    provider: 'Ayala Foundation',
    stipend: '₱4,000 / mo',
    dateSubmitted: 'Jan 18, 2026',
    status: 'Approved',
    gwa: '1.45',
    remarks: 'Congratulations! Your scholarship application has been officially approved for AY 2026-2027. You are now an active scholar beneficiary.',
    documents: ['Academic Transcript', 'Portfolio Certificate', 'Indigency Certificate']
  },
  {
    id: 'APP-2026-003',
    title: 'LGU Cavite Tulong Dunong Grant',
    code: 'LGU-CAV-TD',
    provider: 'LGU Cavite – PESO',
    stipend: '₱2,000 / mo',
    dateSubmitted: 'Feb 3, 2026',
    status: 'Under Review',
    gwa: '1.45',
    remarks: 'Application documents received and currently queued for evaluation by the provincial scholarship committee.',
    documents: ['PSA Birth Certificate', 'Proof of Cavite Residency', 'Certificate of Indigency']
  }
];

const MyApplications = ({ setActiveView }) => {
  const [applications] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('escholar_student_applications') || '[]');
      return saved.length > 0 ? saved : MOCK_STUDENT_APPLICATIONS;
    } catch {
      return MOCK_STUDENT_APPLICATIONS;
    }
  });
  const [activeTab, setActiveTab] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdownId(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const filteredApps = applications.filter(a => {
    if (activeTab === 'Under Review' && a.status !== 'Under Review') return false;
    if (activeTab === 'Approved' && a.status !== 'Approved') return false;
    if (activeTab === 'Rejected' && a.status !== 'Rejected') return false;
    return true;
  });

  const tabCounts = {
    All: applications.length,
    Review: applications.filter(a => a.status === 'Under Review').length,
    Approved: applications.filter(a => a.status === 'Approved').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length
  };

  const steps = ['Submitted', 'Under Review', 'Decision'];

  return (
    <div className="pd-page">
      {/* Header */}
      <div className="pd-header">
        <div>
          <h2 className="pd-title">My Scholarship Applications</h2>
          <p className="pd-subtitle">Track evaluation status and decision updates for your submitted applications.</p>
        </div>
      </div>

      {/* KPI Cards — Exact Provider Theme */}
      <div className="pd-kpi-grid">
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><Send size={19} /></div>
          <div>
            <p className="pd-kpi-label">Total Submitted</p>
            <p className="pd-kpi-value">{tabCounts.All}</p>
            <p className="pd-kpi-sub">Active applications</p>
          </div>
        </div>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><Clock size={19} /></div>
          <div>
            <p className="pd-kpi-label">Under Review</p>
            <p className="pd-kpi-value" style={{ color: '#d97706' }}>{tabCounts.Review}</p>
            <p className="pd-kpi-sub">Evaluation in progress</p>
          </div>
        </div>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><Award size={19} /></div>
          <div>
            <p className="pd-kpi-label">Grants Awarded</p>
            <p className="pd-kpi-value" style={{ color: '#15803d' }}>{tabCounts.Approved}</p>
            <p className="pd-kpi-sub">Active scholar beneficiary</p>
          </div>
        </div>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><XCircle size={19} /></div>
          <div>
            <p className="pd-kpi-label">Rejected / Closed</p>
            <p className="pd-kpi-value" style={{ color: '#dc2626' }}>{tabCounts.Rejected}</p>
            <p className="pd-kpi-sub">Not qualified</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          <div className="status-tabs-group">
            {[
              { label: `All (${tabCounts.All})`, val: 'All' },
              { label: `Under Review (${tabCounts.Review})`, val: 'Under Review' },
              { label: `Approved (${tabCounts.Approved})`, val: 'Approved' },
              { label: `Rejected (${tabCounts.Rejected})`, val: 'Rejected' }
            ].map(tab => (
              <button
                key={tab.val}
                className={`tab-btn ${activeTab === tab.val ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.val)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>Scholarship Program</th>
                <th>Provider Agency</th>
                <th>Monthly Grant</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">No applications found in this category.</td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr key={app.id} className="program-table-row" onClick={() => setSelectedApp(app)}>
                    <td>
                      <div className="program-title-cell">
                        <span className="program-main-title">{app.title}</span>
                        <span className="program-code-sub">{app.id} · Code: {app.code}</span>
                      </div>
                    </td>
                    <td>
                      <span className="table-text-bold" style={{ fontSize: '0.82rem' }}>{app.provider}</span>
                    </td>
                    <td>
                      <span className="table-text-bold" style={{ color: '#082894' }}>{app.stipend}</span>
                    </td>
                    <td>
                      <span className="table-date-text">{app.dateSubmitted}</span>
                    </td>
                    <td>
                      <span className={`status-badge-pill ${app.status === 'Approved' ? 'status-published' : 'status-draft'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      {/* Three-dots menu icon matching Provider modules */}
                      <div className="dropdown-action-wrapper" style={{ display: 'inline-block' }}>
                        <button 
                          className="btn-dots-menu" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === app.id ? null : app.id);
                          }}
                          title="Actions"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openDropdownId === app.id && (
                          <div className="action-dropdown-menu" style={{ minWidth: '170px' }}>
                            <button 
                              className="dropdown-item" 
                              onClick={() => { setSelectedApp(app); setOpenDropdownId(null); }}
                            >
                              <Eye size={14} /> View Details
                            </button>
                            {app.status === 'Approved' && (
                              <button 
                                className="dropdown-item" 
                                onClick={() => { 
                                  setOpenDropdownId(null); 
                                  if (setActiveView) setActiveView('compliance');
                                }}
                              >
                                <Award size={14} color="#15803d" /> My Compliance
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal — Clean Flexbox Layout (No Cutoffs / Overlaps) */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '680px',
              width: '92%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1.5px solid #cbd5e1',
              boxShadow: '0 20px 50px -10px rgba(8, 40, 148, 0.25)',
              background: '#ffffff'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1.5px solid #e2e8f0',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'flex-start',
              background: '#ffffff',
              flexShrink: 0
            }}>
              <div>
                <span className="verified-provider-badge" style={{ marginBottom: '0.35rem', fontSize: '0.72rem' }}>
                  {selectedApp.provider}
                </span>
                <h3 style={{ margin: '0 0 0.2rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedApp.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  Application Code: {selectedApp.code} · ID: {selectedApp.id}
                </p>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.2rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              
              {/* Approved Banner */}
              {selectedApp.status === 'Approved' && (
                <div style={{ 
                  background: '#f0fdf4', 
                  border: '1.5px solid #bbf7d0', 
                  borderRadius: '10px', 
                  padding: '1rem 1.25rem', 
                  marginBottom: '1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justify: 'space-between', 
                  flexWrap: 'wrap', 
                  gap: '0.75rem' 
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803d', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      <Award size={18} /> Scholarship Approved
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#166534' }}>
                      You are an active scholar. Submit your semester credentials under My Compliance to maintain your grant.
                    </p>
                  </div>
                  <button 
                    className="pd-primary-btn" 
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', boxShadow: 'none' }}
                    onClick={() => {
                      setSelectedApp(null);
                      if (setActiveView) setActiveView('compliance');
                    }}
                  >
                    My Compliance <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Stepper Progress */}
              <div className="builder-stepper-card" style={{ marginBottom: '1.25rem', padding: '0.85rem 1.25rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', justifyContent: 'flex-start' }}>
                {steps.map((s, i) => {
                  const statusIdx = selectedApp.status === 'Approved' ? 2 : 1;
                  const isDone = i <= statusIdx;
                  return (
                    <React.Fragment key={i}>
                      <div className={`step-item ${isDone ? 'completed' : ''}`}>
                        <div className="step-circle" style={{ width: '26px', height: '26px', fontSize: '0.75rem' }}>
                          {isDone ? <CheckCircle size={13} /> : i + 1}
                        </div>
                        <div className="step-label-group">
                          <span className="step-title" style={{ fontSize: '0.8rem' }}>{s}</span>
                        </div>
                      </div>
                      {i < steps.length - 1 && <div className={`step-line ${isDone ? 'filled' : ''}`} />}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* 4 Key Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">APPLICATION ID</span>
                  <span className="modal-stat-val" style={{ fontSize: '0.85rem' }}>{selectedApp.id}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">MONTHLY STIPEND</span>
                  <span className="modal-stat-val" style={{ fontSize: '0.85rem' }}>{selectedApp.stipend}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">VERIFIED GWA</span>
                  <span className="modal-stat-val" style={{ fontSize: '0.85rem' }}>{selectedApp.gwa}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">DATE SUBMITTED</span>
                  <span className="modal-stat-val" style={{ fontSize: '0.8rem' }}>{selectedApp.dateSubmitted}</span>
                </div>
              </div>

              {/* Evaluation Remarks */}
              <div className="modal-section-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe', marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#082894', margin: '0 0 0.35rem', fontSize: '0.875rem' }}>Evaluation Remarks</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#1e40af', lineHeight: 1.55 }}>
                  {selectedApp.remarks}
                </p>
              </div>

              {/* Submitted Requirements */}
              <div className="modal-section-box" style={{ margin: 0 }}>
                <h4 style={{ margin: '0 0 0.65rem', fontSize: '0.875rem', color: '#0f172a' }}>Submitted Requirements Packet</h4>
                <div className="modal-criteria-list">
                  {selectedApp.documents.map((doc, idx) => (
                    <div key={idx} className="criteria-row" style={{ alignItems: 'center', padding: '0.5rem 0', borderBottom: idx < selectedApp.documents.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                        <FileText size={15} color="#082894" /> {doc}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#15803d', fontWeight: 700, background: '#f0fdf4', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1.5px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              justify: 'flex-end',
              flexShrink: 0
            }}>
              <button 
                className="btn-modal-close" 
                onClick={() => setSelectedApp(null)}
                style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
