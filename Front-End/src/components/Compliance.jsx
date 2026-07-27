import React, { useState, useRef } from 'react';
import { 
  CheckCircle, FileText, Upload, AlertCircle, Clock,
  Award, Eye, RefreshCw, Lock, X, FileCheck, AlertTriangle,
  GraduationCap, CalendarDays, ShieldCheck, ListChecks
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';
import './ProviderDashboard.css';

export const MOCK_STUDENT_GRANTS = [
  {
    id: 'SCH-2026-102',
    program: 'Foundation Digital Skills Fellowship',
    code: 'FDN-DIGI-26',
    provider: 'Ayala Foundation',
    stipend: '₱4,000 / mo',
    cycle: 'AY 2026-2027 – 2nd Sem',
    gwa: '1.45',
    deadline: 'March 30, 2026',
    daysLeft: 12,
    requirements: [
      { id: 1, name: '1st Semester Official Grade Sheet / TOR', status: 'Approved', date: 'Jan 20, 2026', file: 'Azucena_Sem1_TOR.pdf' },
      { id: 2, name: 'Certificate of Registration (2nd Semester)', status: 'Pending Review', date: 'Jan 22, 2026', file: 'Azucena_2ndSem_COR.pdf' },
      { id: 3, name: 'Proof of Good Moral Character (Annual)', status: 'Action Needed', date: null, file: null },
    ],
  },
  {
    id: 'SCH-2026-087',
    program: 'LGU Cavite Tulong Dunong Grant',
    code: 'LGU-CAV-26',
    provider: 'LGU Cavite – PESO',
    stipend: '₱3,000 / mo',
    cycle: 'AY 2026-2027 – 2nd Sem',
    gwa: '1.45',
    deadline: 'April 15, 2026',
    daysLeft: 28,
    requirements: [
      { id: 1, name: 'Certificate of Enrollment (2nd Semester)', status: 'Approved', date: 'Jan 18, 2026', file: 'Azucena_COE_2ndSem.pdf' },
      { id: 2, name: 'Community Service Completion Certificate', status: 'Action Needed', date: null, file: null },
    ],
  }
];

const Compliance = () => {
  const [grants] = useState(MOCK_STUDENT_GRANTS);
  const [selectedGrantId, setSelectedGrantId] = useState(MOCK_STUDENT_GRANTS[0].id);
  const [toastMessage, setToastMessage] = useState('');
  const [uploadModalReq, setUploadModalReq] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const activeGrant = grants.find(g => g.id === selectedGrantId);
  const approved = activeGrant.requirements.filter(r => r.status === 'Approved').length;
  const total = activeGrant.requirements.length;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFile) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadModalReq(null);
      setUploadedFile(null);
      showToast('Document submitted. Pending provider review.');
    }, 1400);
  };

  const statusBadge = (status) => {
    if (status === 'Approved')       return { dot: '#15803d', text: '#15803d', label: 'Approved' };
    if (status === 'Pending Review') return { dot: '#d97706', text: '#d97706', label: 'Pending Review' };
    return                                  { dot: '#dc2626', text: '#dc2626', label: 'Action Needed' };
  };

  return (
    <div className="pd-page">
      {toastMessage && (
        <div className="toast-notification-banner">
          <CheckCircle size={15} /> {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="pd-header">
        <div>
          <h2 className="pd-title">My Compliance</h2>
          <p className="pd-subtitle">Upload your required semester credentials to maintain your active scholarship.</p>
        </div>
        {grants.length > 1 && (
          <select
            className="table-select-cycle"
            value={selectedGrantId}
            onChange={e => setSelectedGrantId(e.target.value)}
            style={{ minWidth: '230px' }}
          >
            {grants.map(g => <option key={g.id} value={g.id}>{g.program}</option>)}
          </select>
        )}
      </div>

      {/* KPI Cards — exact pd-kpi-grid pattern */}
      <div className="pd-kpi-grid">
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><Award size={19} /></div>
          <div>
            <p className="pd-kpi-label">Scholar ID</p>
            <p className="pd-kpi-value" style={{ fontSize: '1.1rem' }}>{activeGrant.id}</p>
            <p className="pd-kpi-sub">{activeGrant.provider}</p>
          </div>
        </div>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><CalendarDays size={19} /></div>
          <div>
            <p className="pd-kpi-label">Academic Cycle</p>
            <p className="pd-kpi-value" style={{ fontSize: '0.9rem' }}>{activeGrant.cycle}</p>
            <p className="pd-kpi-sub">Current semester</p>
          </div>
        </div>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><GraduationCap size={19} /></div>
          <div>
            <p className="pd-kpi-label">Verified GWA</p>
            <p className="pd-kpi-value">{activeGrant.gwa}</p>
            <p className="pd-kpi-sub">Meets grant threshold</p>
          </div>
        </div>
        <div className="pd-kpi-card">
          <div className="pd-kpi-icon"><ListChecks size={19} /></div>
          <div>
            <p className="pd-kpi-label">Submitted</p>
            <p className="pd-kpi-value" style={{ color: approved === total ? '#15803d' : '#d97706' }}>
              {approved}/{total}
            </p>
            <p className="pd-kpi-sub">Requirements done</p>
          </div>
        </div>
      </div>

      {/* Deadline notice — only when close */}
      {activeGrant.daysLeft <= 14 && (
        <div className="pd-attn-row" style={{ marginBottom: '1.25rem', cursor: 'default' }}>
          <AlertTriangle size={14} color="#d97706" style={{ flexShrink: 0 }} />
          <div>
            <p className="pd-attn-prog">Submission Deadline: {activeGrant.deadline}</p>
            <p className="pd-attn-note">{activeGrant.daysLeft} days remaining — submit pending documents before the deadline.</p>
          </div>
        </div>
      )}

      {/* Requirements card — pd-card style */}
      <div className="pd-card">
        <p className="pd-card-title">Semester Requirements Checklist</p>
        <p className="pd-card-sub">{approved} of {total} requirements completed for this cycle.</p>

        {/* Slot-style progress bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>Completion Progress</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#082894' }}>
              {Math.round((approved / total) * 100)}%
            </span>
          </div>
          <div className="pd-slot-track">
            <div className="pd-slot-fill" style={{ width: `${(approved / total) * 100}%` }} />
          </div>
        </div>

        {/* Requirements list — pd-slot-row / deadline-row pattern */}
        <div className="pd-slot-list" style={{ gap: '0' }}>
          {activeGrant.requirements.map((req, idx) => {
            const badge = statusBadge(req.status);
            return (
              <div
                key={req.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 0',
                  borderBottom: idx < activeGrant.requirements.length - 1 ? '1px solid #f1f5f9' : 'none',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                {/* Left: icon + info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '34px', height: '34px', flexShrink: 0, background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#082894' }}>
                    <FileText size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: '0 0 0.15rem', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                      {req.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                      {req.file ? `${req.file} · Uploaded ${req.date}` : 'No document uploaded yet'}
                    </p>
                  </div>
                </div>

                {/* Right: status dot + label + actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: badge.dot, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: badge.text }}>{badge.label}</span>
                  </div>

                  {/* Actions */}
                  {req.status === 'Approved' && (
                    <>
                      <button className="btn-table-export" style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                        onClick={() => showToast(`Viewing ${req.file}`)}>
                        <Eye size={13} /> View
                      </button>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#94a3b8', padding: '0.25rem 0.5rem', border: '1px dashed #e2e8f0', borderRadius: '6px', cursor: 'not-allowed', userSelect: 'none' }}
                        title="Approved documents cannot be changed">
                        <Lock size={11} /> Locked
                      </span>
                    </>
                  )}
                  {req.status === 'Pending Review' && (
                    <>
                      <button className="btn-table-export" style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                        onClick={() => showToast(`Viewing ${req.file}`)}>
                        <Eye size={13} /> View
                      </button>
                      <button className="btn-table-export" style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                        onClick={() => { setUploadModalReq(req); setUploadedFile(null); }}>
                        <RefreshCw size={13} /> Update
                      </button>
                    </>
                  )}
                  {req.status === 'Action Needed' && (
                    <button className="pd-primary-btn" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem', boxShadow: 'none' }}
                      onClick={() => { setUploadModalReq(req); setUploadedFile(null); }}>
                      <Upload size={13} /> Upload
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalReq && (
        <div className="modal-overlay" onClick={() => { setUploadModalReq(null); setUploadedFile(null); }}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '420px', width: '92%',
              display: 'flex', flexDirection: 'column',
              maxHeight: '80vh', overflow: 'hidden',
              borderRadius: '14px',
              border: '1.5px solid #cbd5e1',
              boxShadow: '0 12px 32px -6px rgba(8,40,148,0.15)',
              background: '#ffffff'
            }}
          >
            <div style={{ padding: '1rem 1.35rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <p style={{ margin: '0 0 0.1rem', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                  {uploadModalReq.status === 'Action Needed' ? 'Upload Document' : 'Update Document'}
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{uploadModalReq.name}</p>
              </div>
              <button onClick={() => { setUploadModalReq(null); setUploadedFile(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.1rem 1.35rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${uploadedFile ? '#bfdbfe' : '#e2e8f0'}`,
                    borderRadius: '10px',
                    background: uploadedFile ? '#eff6ff' : '#f8fafc',
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {uploadedFile ? (
                    <>
                      <FileCheck size={24} color="#082894" style={{ marginBottom: '0.35rem' }} />
                      <p style={{ margin: '0 0 0.1rem', fontSize: '0.85rem', fontWeight: 700, color: '#082894' }}>{uploadedFile.name}</p>
                      <p style={{ margin: 0, fontSize: '0.73rem', color: '#64748b' }}>Click to replace</p>
                    </>
                  ) : (
                    <>
                      <Upload size={24} color="#94a3b8" style={{ marginBottom: '0.35rem' }} />
                      <p style={{ margin: '0 0 0.1rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Click to browse</p>
                      <p style={{ margin: 0, fontSize: '0.73rem', color: '#94a3b8' }}>PDF, PNG, JPG · Max 10MB</p>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" required accept=".pdf,.png,.jpg,.jpeg"
                  style={{ display: 'none' }} onChange={e => setUploadedFile(e.target.files[0] || null)} />
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.55 }}>
                  Submitted documents will be reviewed by your provider within 3–5 business days.
                </p>
              </div>

              <div style={{ padding: '0.85rem 1.35rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', flexShrink: 0, background: '#ffffff' }}>
                <button className="btn-modal-close" type="button"
                  onClick={() => { setUploadModalReq(null); setUploadedFile(null); }}>
                  Cancel
                </button>
                <button className="btn-modal-edit" type="submit"
                  disabled={isUploading || !uploadedFile}
                  style={{ opacity: !uploadedFile ? 0.5 : 1 }}>
                  {isUploading ? 'Uploading...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compliance;
