import React, { useState, useEffect } from 'react';
import {
  Search, CheckCircle, XCircle, Clock, Eye,
  FileText, Building2, User, ChevronDown, X, MessageSquare
} from 'lucide-react';
import './AdminVerifications.css';

/* ── Seed mock data on first load ─────────────────────── */
const MOCK_APPS = [
  {
    id: 'VER-001',
    orgName: 'University of the Philippines Los Baños',
    providerType: 'State University / HEI',
    representative: 'Dr. Jose Reyes',
    designation: 'University President',
    email: 'vp.academic@uplb.edu.ph',
    contactNumber: '+63 49 536 2251',
    tin: '123-456-789-000',
    address: 'UPLB Campus, College, Los Baños, Laguna 4031',
    submittedAt: '2026-07-10T08:00:00Z',
    status: 'Under Review',
    adminNotes: '',
    updatedAt: null,
    registrationDoc: 'UPLB_Charter.pdf',
    birDoc: 'UPLB_BIR2303.pdf',
    govIdDoc: 'DrJoseReyes_ID.pdf',
  },
  {
    id: 'VER-002',
    orgName: 'Laguna Community Foundation, Inc.',
    providerType: 'Private Foundation / NGO',
    representative: 'Maria Santos',
    designation: 'Executive Director',
    email: 'director@lagunafoundation.org',
    contactNumber: '+63 917 234 5678',
    tin: '234-567-890-111',
    address: 'Unit 4B Cityland Tower, Sta. Cruz, Laguna',
    submittedAt: '2026-07-15T10:30:00Z',
    status: 'Pending',
    adminNotes: '',
    updatedAt: null,
    registrationDoc: 'LCF_SEC_Registration.pdf',
    birDoc: 'LCF_BIR2303.pdf',
    govIdDoc: 'MSantos_Passport.pdf',
  },
  {
    id: 'VER-003',
    orgName: 'Municipality of Biñan Scholarship Office',
    providerType: 'Local Government Unit (LGU)',
    representative: 'Atty. Ramon Estrella',
    designation: 'Municipal Administrator',
    email: 'scholarship@binan.gov.ph',
    contactNumber: '+63 49 511 0001',
    tin: '345-678-901-222',
    address: 'Biñan City Hall, Biñan, Laguna 4024',
    submittedAt: '2026-07-01T09:00:00Z',
    status: 'Approved',
    adminNotes: 'All documents verified. Organization is in good standing with DILG records.',
    updatedAt: '2026-07-05T14:00:00Z',
    registrationDoc: 'Binan_AgencyCharter.pdf',
    birDoc: 'Binan_BIR2303.pdf',
    govIdDoc: 'RamonEstrella_UMID.pdf',
  },
  {
    id: 'VER-004',
    orgName: 'GenTech Foundation Philippines',
    providerType: 'Corporate CSR Program',
    representative: 'Angela Cruz',
    designation: 'CSR Director',
    email: 'csr@gentech.com.ph',
    contactNumber: '+63 2 8888 0000',
    tin: '456-789-012-333',
    address: '32F GT Tower, Ayala Ave., Makati City',
    submittedAt: '2026-07-18T13:00:00Z',
    status: 'Rejected',
    adminNotes: 'SEC registration document is expired. Please resubmit with updated documents.',
    updatedAt: '2026-07-20T09:00:00Z',
    registrationDoc: 'GenTech_SEC.pdf',
    birDoc: 'GenTech_BIR2303.pdf',
    govIdDoc: 'AngelaCruz_Passport.pdf',
  },
];

const STATUS_COLORS = {
  Pending:       { bg: '#fef9c3', color: '#a16207' },
  'Under Review': { bg: '#dbeafe', color: '#1d4ed8' },
  Approved:      { bg: '#dcfce7', color: '#15803d' },
  Rejected:      { bg: '#fee2e2', color: '#dc2626' },
};

/* ── AdminVerifications Component ───────────────────────── */
const AdminVerifications = () => {
  const [apps, setApps] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);   // detail modal
  const [actionModal, setActionModal] = useState(null);    // { app, action: 'approve'|'reject' }
  const [remarks, setRemarks] = useState('');
  const [toast, setToast] = useState('');

  /* Load from localStorage, seed with mock data if empty */
  useEffect(() => {
    const stored = localStorage.getItem('admin_verif_apps');
    if (stored) {
      const parsed = JSON.parse(stored);
      setApps(parsed.length ? parsed : MOCK_APPS);
    } else {
      setApps(MOCK_APPS);
      localStorage.setItem('admin_verif_apps', JSON.stringify(MOCK_APPS));
    }
  }, []);

  const save = (updated) => {
    setApps(updated);
    localStorage.setItem('admin_verif_apps', JSON.stringify(updated));
    // Sync back to provider side if matching
    const providerApp = JSON.parse(localStorage.getItem('provider_verification') || 'null');
    if (providerApp) {
      const match = updated.find(a => a.id === providerApp.id);
      if (match) localStorage.setItem('provider_verification', JSON.stringify(match));
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDecision = (action) => {
    const updated = apps.map(a =>
      a.id === actionModal.app.id
        ? { ...a, status: action === 'approve' ? 'Approved' : 'Rejected', adminNotes: remarks, updatedAt: new Date().toISOString() }
        : a
    );
    save(updated);
    setActionModal(null);
    setRemarks('');
    showToast(action === 'approve' ? `✓ Application approved.` : `✗ Application rejected.`);
    if (selectedApp?.id === actionModal.app.id) {
      setSelectedApp(updated.find(a => a.id === actionModal.app.id));
    }
  };

  const handleSetUnderReview = (app) => {
    const updated = apps.map(a =>
      a.id === app.id ? { ...a, status: 'Under Review', updatedAt: new Date().toISOString() } : a
    );
    save(updated);
    showToast('Status updated to Under Review.');
    if (selectedApp?.id === app.id) setSelectedApp({ ...app, status: 'Under Review' });
  };

  /* Filter */
  const filtered = apps.filter(a => {
    if (activeTab !== 'All' && a.status !== activeTab) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return a.orgName.toLowerCase().includes(q) || a.representative.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {
    All: apps.length,
    Pending: apps.filter(a => a.status === 'Pending').length,
    'Under Review': apps.filter(a => a.status === 'Under Review').length,
    Approved: apps.filter(a => a.status === 'Approved').length,
    Rejected: apps.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div className="admin-verif-container">
      {toast && (
        <div className="admin-verif-toast"><CheckCircle size={15} />{toast}</div>
      )}

      {/* Header */}
      <div className="admin-verif-header">
        <div>
          <h2 className="admin-verif-title">Provider Verifications</h2>
          <p className="admin-verif-subtitle">Review and manage scholarship provider accreditation requests.</p>
        </div>
        <div className="admin-verif-kpis">
          <div className="verif-kpi-chip pending-chip">
            <Clock size={14} /> {counts.Pending} Pending
          </div>
          <div className="verif-kpi-chip review-chip">
            <Eye size={14} /> {counts['Under Review']} Under Review
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-verif-toolbar">
        <div className="verif-tabs">
          {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map(tab => (
            <button
              key={tab}
              className={`verif-tab-btn ${activeTab === tab ? 'verif-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {tab === 'All' ? `(${counts.All})` : counts[tab] > 0 ? `(${counts[tab]})` : ''}
            </button>
          ))}
        </div>
        <div className="verif-search-box">
          <Search size={14} className="verif-search-icon" />
          <input
            type="text"
            placeholder="Search by organization, representative..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-verif-table-card">
        <table className="admin-verif-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Provider Type</th>
              <th>Representative</th>
              <th>Submitted</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="verif-table-empty">No applications match your filters.</td>
              </tr>
            ) : filtered.map(app => (
              <tr key={app.id} className="verif-table-row" onClick={() => setSelectedApp(app)}>
                <td>
                  <div className="verif-org-cell">
                    <span className="verif-org-name">{app.orgName}</span>
                    <span className="verif-ref">{app.id}</span>
                  </div>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <span className="verif-type-text">{app.providerType}</span>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <div className="verif-rep-cell">
                    <span>{app.representative}</span>
                    <span className="verif-desg">{app.designation}</span>
                  </div>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <span className="verif-date-text">
                    {new Date(app.submittedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <span
                    className="verif-status-pill"
                    style={{ background: STATUS_COLORS[app.status]?.bg, color: STATUS_COLORS[app.status]?.color }}
                  >
                    {app.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                  <div className="verif-row-actions">
                    <button className="btn-verif-view" onClick={() => setSelectedApp(app)}>
                      View
                    </button>
                    {app.status === 'Pending' && (
                      <button className="btn-verif-review" onClick={() => handleSetUnderReview(app)}>
                        Start Review
                      </button>
                    )}
                    {(app.status === 'Pending' || app.status === 'Under Review') && (
                      <>
                        <button className="btn-verif-approve" onClick={() => { setActionModal({ app, action: 'approve' }); setRemarks(''); }}>
                          Approve
                        </button>
                        <button className="btn-verif-reject" onClick={() => { setActionModal({ app, action: 'reject' }); setRemarks(''); }}>
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Detail Modal ── */}
      {selectedApp && (
        <div className="verif-modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="verif-modal-box" onClick={e => e.stopPropagation()}>
            <div className="verif-modal-header">
              <div>
                <h3>{selectedApp.orgName}</h3>
                <span className="verif-ref">{selectedApp.id}</span>
              </div>
              <div className="modal-header-right">
                <span
                  className="verif-status-pill"
                  style={{ background: STATUS_COLORS[selectedApp.status]?.bg, color: STATUS_COLORS[selectedApp.status]?.color }}
                >
                  {selectedApp.status}
                </span>
                <button className="btn-close-modal" onClick={() => setSelectedApp(null)}>
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="verif-modal-body">
              {/* Organization Details */}
              <div className="modal-section">
                <div className="modal-section-title"><Building2 size={14} color="#082894" /> Organization Profile</div>
                <div className="modal-detail-grid">
                  {[
                    ['Provider Type', selectedApp.providerType],
                    ['TIN', selectedApp.tin],
                    ['Authorized Representative', selectedApp.representative],
                    ['Designation', selectedApp.designation],
                    ['Official Email', selectedApp.email],
                    ['Contact Number', selectedApp.contactNumber],
                  ].map(([l, v]) => (
                    <div key={l} className="modal-detail-row">
                      <span>{l}</span>
                      <strong>{v}</strong>
                    </div>
                  ))}
                  <div className="modal-detail-row full-row">
                    <span>Office Address</span>
                    <strong>{selectedApp.address}</strong>
                  </div>
                </div>
              </div>

              {/* Submitted Documents */}
              <div className="modal-section">
                <div className="modal-section-title"><FileText size={14} color="#082894" /> Submitted Documents</div>
                <div className="modal-docs-chips">
                  {[selectedApp.registrationDoc, selectedApp.birDoc, selectedApp.govIdDoc]
                    .filter(Boolean)
                    .map((d, i) => (
                      <span key={i} className="doc-chip"><FileText size={12} />{d}</span>
                    ))}
                </div>
              </div>

              {/* Admin Remarks (if any) */}
              {selectedApp.adminNotes && (
                <div className="modal-section">
                  <div className="modal-section-title"><MessageSquare size={14} color="#082894" /> Admin Remarks</div>
                  <p className="modal-admin-notes">{selectedApp.adminNotes}</p>
                </div>
              )}

              {/* Timeline */}
              <div className="modal-section">
                <div className="modal-section-title"><Clock size={14} color="#082894" /> Timeline</div>
                <div className="modal-timeline">
                  <div className="modal-tl-row">
                    <span>Submitted</span>
                    <strong>{new Date(selectedApp.submittedAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</strong>
                  </div>
                  {selectedApp.updatedAt && (
                    <div className="modal-tl-row">
                      <span>Last Updated</span>
                      <strong>{new Date(selectedApp.updatedAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {(selectedApp.status === 'Pending' || selectedApp.status === 'Under Review') && (
              <div className="verif-modal-footer">
                {selectedApp.status === 'Pending' && (
                  <button
                    className="btn-modal-review"
                    onClick={() => { handleSetUnderReview(selectedApp); setSelectedApp({ ...selectedApp, status: 'Under Review' }); }}
                  >
                    Start Review
                  </button>
                )}
                <button
                  className="btn-modal-approve"
                  onClick={() => { setActionModal({ app: selectedApp, action: 'approve' }); setRemarks(''); setSelectedApp(null); }}
                >
                  <CheckCircle size={14} /> Approve
                </button>
                <button
                  className="btn-modal-reject"
                  onClick={() => { setActionModal({ app: selectedApp, action: 'reject' }); setRemarks(''); setSelectedApp(null); }}
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Decision Confirmation Modal ── */}
      {actionModal && (
        <div className="verif-modal-overlay" onClick={() => setActionModal(null)}>
          <div className="action-modal-box" onClick={e => e.stopPropagation()}>
            <div className="action-modal-header">
              {actionModal.action === 'approve' ? (
                <><CheckCircle size={20} color="#15803d" /><h3>Approve Application</h3></>
              ) : (
                <><XCircle size={20} color="#dc2626" /><h3>Reject Application</h3></>
              )}
              <button className="btn-close-modal" onClick={() => setActionModal(null)}><X size={16} /></button>
            </div>

            <p className="action-modal-desc">
              {actionModal.action === 'approve'
                ? `You are approving the verification application for `
                : `You are rejecting the verification application for `}
              <strong>{actionModal.app.orgName}</strong>.
            </p>

            <div className="action-remarks-field">
              <label>{actionModal.action === 'approve' ? 'Remarks (optional)' : 'Rejection Reason *'}</label>
              <textarea
                rows={3}
                placeholder={actionModal.action === 'approve'
                  ? 'Add any notes for the provider...'
                  : 'Explain why the application was not approved...'}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
              />
            </div>

            <div className="action-modal-footer">
              <button className="btn-action-cancel" onClick={() => setActionModal(null)}>Cancel</button>
              <button
                className={`btn-action-confirm ${actionModal.action === 'approve' ? 'btn-confirm-approve' : 'btn-confirm-reject'}`}
                onClick={() => {
                  if (actionModal.action === 'reject' && !remarks.trim()) {
                    alert('Please provide a rejection reason.');
                    return;
                  }
                  handleDecision(actionModal.action);
                }}
              >
                {actionModal.action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerifications;
