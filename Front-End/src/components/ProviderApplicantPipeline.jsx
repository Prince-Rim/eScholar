import React, { useState } from 'react';
import {
  Search, Download, MoreVertical, Eye, CheckCircle,
  XCircle, FileText, X, ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_PROVIDER_APPLICANTS = [
  {
    id: 'APP-2026-001',
    name: 'Jeremiah Madronio',
    email: 'jeremiah.m@example.com',
    school: 'Cavite State University',
    course: 'BS Computer Science (2nd Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    gwa: '1.45',
    monthlyIncome: '₱15,000 / mo',
    date: 'Jan 22, 2026',
    status: 'Under Review',
    documents: ['Form 138 / TOR Transcript', 'Certificate of Indigency', 'Good Moral Certificate']
  },
  {
    id: 'APP-2026-002',
    name: 'Samantha Reyes',
    email: 'samantha.r@example.com',
    school: 'Polytechnic Univ. of the Philippines',
    course: 'BS Industrial Engineering (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    gwa: '1.25',
    monthlyIncome: '₱18,000 / mo',
    date: 'Jan 20, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR Transcript', 'Barangay Indigency Certificate', 'Good Moral Certificate']
  },
  {
    id: 'APP-2026-003',
    name: 'Miguel Santos',
    email: 'miguel.s@example.com',
    school: 'De La Salle University - Dasmariñas',
    course: 'BS Information Technology (3rd Year)',
    scholarship: 'Foundation Digital Skills Fellowship',
    gwa: '1.75',
    monthlyIncome: '₱11,500 / mo',
    date: 'Jan 18, 2026',
    status: 'Under Review',
    documents: ['Academic Transcript', 'Portfolio Certificate', 'Indigency Certificate']
  },
  {
    id: 'APP-2026-004',
    name: 'Chloe Lim',
    email: 'chloe.l@example.com',
    school: 'University of the Philippines - Los Baños',
    course: 'BS Agricultural Chemistry (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    gwa: '1.30',
    monthlyIncome: '₱13,000 / mo',
    date: 'Jan 12, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR Transcript', 'Good Moral Certificate']
  },
  {
    id: 'APP-2026-005',
    name: 'Alexander Cruz',
    email: 'alex.cruz@example.com',
    school: 'Emilio Aguinaldo College - Cavite',
    course: 'BS Nursing (2nd Year)',
    scholarship: 'LGU Cavite Tulong Dunong Grant',
    gwa: '2.50',
    monthlyIncome: '₱29,000 / mo',
    date: 'Jan 08, 2026',
    status: 'Rejected',
    documents: ['Barangay Certificate of Indigency', 'Form 138']
  },
  {
    id: 'APP-2026-006',
    name: 'Isabella Garcia',
    email: 'isabella.g@example.com',
    school: 'Batangas State University',
    course: 'BS Mechanical Engineering (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    gwa: '1.50',
    monthlyIncome: '₱15,800 / mo',
    date: 'Jan 05, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR Transcript', 'Good Moral Certificate', 'Barangay Clearance']
  }
];

const STATUS_STYLE = {
  'Approved':     { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' },
  'Under Review': { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
  'Rejected':     { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' },
};

const ProviderApplicantPipeline = () => {
  const [applicants, setApplicants] = useState(MOCK_PROVIDER_APPLICANTS);
  const [activeTab, setActiveTab]   = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('All scholarships');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3000); };

  const handleUpdateStatus = (id, newStatus) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApplicant?.id === id) setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    setOpenDropdownId(null);
    showToast(`Status updated to "${newStatus}"`);
  };

  const filtered = applicants.filter(a => {
    if (activeTab !== 'All' && a.status !== activeTab) return false;
    if (selectedScholarship !== 'All scholarships' && a.scholarship !== selectedScholarship) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.school.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {
    All:          applicants.length,
    'Under Review': applicants.filter(a => a.status === 'Under Review').length,
    Approved:     applicants.filter(a => a.status === 'Approved').length,
    Rejected:     applicants.filter(a => a.status === 'Rejected').length,
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated  = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="provider-programs-container">
      {toastMessage && (
        <div className="toast-notification-banner"><CheckCircle size={16} /> {toastMessage}</div>
      )}

      {/* Header */}
      <div className="programs-header-row">
        <div>
          <h2 className="programs-header-title">Applicant Pipeline</h2>
          <p className="programs-header-subtitle">Review students who applied to your scholarship programs.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        {[
          { label: 'Total Applicants', value: counts.All,            color: '#082894', sub: 'Current active cycle' },
          { label: 'Under Review',     value: counts['Under Review'], color: '#d97706', sub: 'Awaiting your decision' },
          { label: 'Approved',         value: counts.Approved,        color: '#15803d', sub: 'Grants awarded' },
          { label: 'Rejected',         value: counts.Rejected,        color: '#dc2626', sub: 'Did not meet criteria' },
        ].map(({ label, value, color, sub }) => (
          <div key={label} className="kpi-card">
            <span className="kpi-label">{label}</span>
            <span className="kpi-number" style={{ color }}>{value}</span>
            <span className="kpi-subtext">{sub}</span>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          {/* Status Tabs */}
          <div className="status-tabs-group">
            {[
              { label: `All (${counts.All})`,                   val: 'All' },
              { label: `Under Review (${counts['Under Review']})`, val: 'Under Review' },
              { label: `Approved (${counts.Approved})`,          val: 'Approved' },
              { label: `Rejected (${counts.Rejected})`,          val: 'Rejected' },
            ].map(t => (
              <button
                key={t.val}
                className={`tab-btn ${activeTab === t.val ? 'active' : ''}`}
                onClick={() => { setActiveTab(t.val); setCurrentPage(1); }}
              >{t.label}</button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="toolbar-controls-right">
            <div className="table-search-input-box">
              <Search size={15} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Search name, school, or ID"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <select
              className="table-select-cycle"
              value={selectedScholarship}
              onChange={e => { setSelectedScholarship(e.target.value); setCurrentPage(1); }}
            >
              <option value="All scholarships">All scholarships</option>
              <option value="CHED Merit Scholarship for STEM">CHED Merit Scholarship</option>
              <option value="LGU Cavite Tulong Dunong Grant">LGU Cavite Tulong Dunong</option>
              <option value="Foundation Digital Skills Fellowship">Digital Skills Fellowship</option>
            </select>
            <button className="btn-table-export" onClick={() => showToast('Exporting to CSV...')}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Applicant</th>
                <th>Scholarship</th>
                <th>GWA</th>
                <th>Monthly Income</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan="7" className="empty-table-cell">No applicants found.</td></tr>
              ) : (
                paginated.map(app => {
                  const s = STATUS_STYLE[app.status] || STATUS_STYLE['Under Review'];
                  return (
                    <tr key={app.id} className="program-table-row" onClick={() => setSelectedApplicant(app)}>
                      <td>
                        <div className="program-title-cell">
                          <span className="program-main-title">{app.name}</span>
                          <span className="program-code-sub">{app.id} · {app.school}</span>
                        </div>
                      </td>
                      <td>
                        <span className="table-text-bold" style={{ fontSize: '0.82rem' }}>{app.scholarship}</span>
                      </td>
                      <td>
                        <span className="table-text-bold" style={{ color: '#082894' }}>{app.gwa}</span>
                      </td>
                      <td>
                        <span className="table-text-bold">{app.monthlyIncome}</span>
                      </td>
                      <td>
                        <span className="table-date-text">{app.date}</span>
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <span className="status-badge-pill" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <div className="table-actions-cell">
                          <div className="dropdown-action-wrapper">
                            <button className="btn-dots-menu" onClick={() => setOpenDropdownId(openDropdownId === app.id ? null : app.id)}>
                              <MoreVertical size={16} />
                            </button>
                            {openDropdownId === app.id && (
                              <div className="action-dropdown-menu">
                                <button onClick={() => { setSelectedApplicant(app); setOpenDropdownId(null); }}>
                                  <Eye size={13} /> View details
                                </button>
                                {app.status !== 'Approved' && (
                                  <button onClick={() => handleUpdateStatus(app.id, 'Approved')}>
                                    <CheckCircle size={13} /> Approve
                                  </button>
                                )}
                                {app.status !== 'Rejected' && (
                                  <button className="dropdown-delete-item" onClick={() => handleUpdateStatus(app.id, 'Rejected')}>
                                    <XCircle size={13} /> Reject
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="table-pagination">
          <span className="pagination-info">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
          </span>
          <div className="pagination-controls">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApplicant && (
        <div className="modal-overlay" onClick={() => setSelectedApplicant(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <h3 className="modal-program-title">{selectedApplicant.name}</h3>
                <p className="modal-program-sector">{selectedApplicant.course} · {selectedApplicant.school}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedApplicant(null)}><X size={20} /></button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">SCHOLARSHIP</span>
                  <span className="modal-stat-val" style={{ fontSize: '0.9rem' }}>{selectedApplicant.scholarship}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">GWA</span>
                  <span className="modal-stat-val">{selectedApplicant.gwa}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">MONTHLY HOUSEHOLD INCOME</span>
                  <span className="modal-stat-val">{selectedApplicant.monthlyIncome}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">DATE SUBMITTED</span>
                  <span className="modal-stat-val">{selectedApplicant.date}</span>
                </div>
              </div>

              <div className="modal-section-box">
                <h4>Submitted Documents</h4>
                <div className="modal-criteria-list">
                  {selectedApplicant.documents.map((doc, i) => (
                    <div key={i} className="criteria-row" style={{ alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FileText size={15} color="#082894" /> {doc}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700 }}>Attached</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-modal-close" onClick={() => setSelectedApplicant(null)}>Close</button>
              {selectedApplicant.status !== 'Rejected' && (
                <button
                  className="btn-modal-close"
                  style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }}
                  onClick={() => handleUpdateStatus(selectedApplicant.id, 'Rejected')}
                >
                  <XCircle size={15} /> Reject
                </button>
              )}
              {selectedApplicant.status !== 'Approved' && (
                <button className="btn-modal-edit" onClick={() => handleUpdateStatus(selectedApplicant.id, 'Approved')}>
                  <Check size={15} /> Approve Grant
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderApplicantPipeline;
