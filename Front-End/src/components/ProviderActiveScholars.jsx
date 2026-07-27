import React, { useState } from 'react';
import {
  Search, Download, MoreVertical, Eye, CheckCircle,
  FileText, X, ChevronRight, ChevronLeft,
  AlertCircle, Check, Award
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_ACTIVE_SCHOLARS = [
  {
    id: 'SCH-2026-101',
    name: 'Samantha Reyes',
    email: 'samantha.r@example.com',
    school: 'Polytechnic Univ. of the Philippines',
    course: 'BS Industrial Engineering (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    monthlyStipend: '₱5,000 / mo',
    cycle: 'AY 2026-2027',
    requirementSubmitted: '1st Sem Transcript & COR',
    currentGwa: '1.25',
    date: 'Jan 24, 2026',
    status: 'Compliant',
    fileName: 'Reyes_2ndSem_COR_Grades.pdf',
    fileSize: '1.2 MB',
    remarks: 'GWA exceeds merit threshold. Cleared for 2nd Semester stipend disbursement.'
  },
  {
    id: 'SCH-2026-102',
    name: 'Jeremiah Madronio',
    email: 'jeremiah.m@example.com',
    school: 'Cavite State University',
    course: 'BS Computer Science (2nd Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    monthlyStipend: '₱5,000 / mo',
    cycle: 'AY 2026-2027',
    requirementSubmitted: '1st Sem Transcript & Registration Form',
    currentGwa: '1.45',
    date: 'Jan 22, 2026',
    status: 'Docs Pending',
    fileName: 'Madronio_Sem1_Grades.pdf',
    fileSize: '1.8 MB',
    remarks: 'Awaiting verified seal from University Registrar.'
  },
  {
    id: 'SCH-2026-103',
    name: 'Miguel Santos',
    email: 'miguel.s@example.com',
    school: 'De La Salle University - Dasmariñas',
    course: 'BS Information Technology (3rd Year)',
    scholarship: 'Foundation Digital Skills Fellowship',
    scholarshipCode: 'FDN-DIGI-26',
    monthlyStipend: '₱4,000 / mo',
    cycle: 'AY 2026-2027',
    requirementSubmitted: '1st Sem Grades & Project Report',
    currentGwa: '1.75',
    date: 'Jan 20, 2026',
    status: 'Docs Pending',
    fileName: 'Santos_Academic_Summary.pdf',
    fileSize: '950 KB',
    remarks: 'Submitted via portal. Reviewing project repository link.'
  },
  {
    id: 'SCH-2026-104',
    name: 'Chloe Lim',
    email: 'chloe.l@example.com',
    school: 'University of the Philippines - Los Baños',
    course: 'BS Agricultural Chemistry (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    monthlyStipend: '₱5,000 / mo',
    cycle: 'AY 2026-2027',
    requirementSubmitted: '1st Sem Grades & COR',
    currentGwa: '1.30',
    date: 'Jan 19, 2026',
    status: 'Compliant',
    fileName: 'Lim_2ndSem_Proof.pdf',
    fileSize: '780 KB',
    remarks: 'Grades verified cleanly. Renewal granted.'
  },
  {
    id: 'SCH-2026-105',
    name: 'Alexander Cruz',
    email: 'alex.cruz@example.com',
    school: 'Emilio Aguinaldo College - Cavite',
    course: 'BS Nursing (2nd Year)',
    scholarship: 'LGU Cavite Tulong Dunong Grant',
    scholarshipCode: 'LGU-CAV-TD',
    monthlyStipend: '₱2,500 / mo',
    cycle: 'AY 2026-2027',
    requirementSubmitted: '1st Sem Report Card',
    currentGwa: '2.85',
    date: 'Jan 15, 2026',
    status: 'Flagged',
    fileName: 'Cruz_ReportCard_Unclear.pdf',
    fileSize: '410 KB',
    remarks: 'GWA is below maintenance requirement. Scholar requested appeal.'
  },
  {
    id: 'SCH-2026-106',
    name: 'Isabella Garcia',
    email: 'isabella.g@example.com',
    school: 'Batangas State University',
    course: 'BS Mechanical Engineering (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    monthlyStipend: '₱5,000 / mo',
    cycle: 'AY 2026-2027',
    requirementSubmitted: '1st Sem Grades & Registration',
    currentGwa: '1.50',
    date: 'Jan 10, 2026',
    status: 'Compliant',
    fileName: 'Garcia_BatState_Grades.pdf',
    fileSize: '1.1 MB',
    remarks: 'Compliant. Cleared for disbursement.'
  }
];

/* Status → badge colors */
const STATUS_STYLE = {
  'Compliant':    { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' },
  'Docs Pending': { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
  'Flagged':      { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' },
};

const ProviderActiveScholars = () => {
  const [scholars, setScholars]     = useState(MOCK_ACTIVE_SCHOLARS);
  const [activeTab, setActiveTab]   = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('All scholarships');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3000); };

  const handleUpdateStatus = (id, newStatus) => {
    setScholars(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    if (selectedScholar?.id === id) setSelectedScholar(prev => prev ? { ...prev, status: newStatus } : null);
    setOpenDropdownId(null);
    showToast(`Scholar status updated to "${newStatus}"`);
  };

  const scholarshipOptions = Array.from(new Set(scholars.map(s => s.scholarship)));

  const filtered = scholars.filter(s => {
    if (activeTab !== 'All' && s.status !== activeTab) return false;
    if (selectedScholarship !== 'All scholarships' && s.scholarship !== selectedScholarship) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.school.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {
    All:           scholars.length,
    'Docs Pending': scholars.filter(s => s.status === 'Docs Pending').length,
    Compliant:     scholars.filter(s => s.status === 'Compliant').length,
    Flagged:       scholars.filter(s => s.status === 'Flagged').length,
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
          <h2 className="programs-header-title">Active Scholars</h2>
          <p className="programs-header-subtitle">Accepted beneficiaries enrolled in your scholarship programs this cycle.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        {[
          { label: 'Total Scholars',  value: counts.All,             color: '#082894', sub: 'Active grantees this cycle' },
          { label: 'Docs Pending',    value: counts['Docs Pending'],  color: '#d97706', sub: 'Awaiting semester documents' },
          { label: 'Compliant',       value: counts.Compliant,        color: '#15803d', sub: 'Cleared for disbursement' },
          { label: 'Flagged',         value: counts.Flagged,          color: '#dc2626', sub: 'GWA or document issue' },
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
              { label: `All (${counts.All})`,                    val: 'All' },
              { label: `Docs Pending (${counts['Docs Pending']})`, val: 'Docs Pending' },
              { label: `Compliant (${counts.Compliant})`,         val: 'Compliant' },
              { label: `Flagged (${counts.Flagged})`,             val: 'Flagged' },
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
                placeholder="Search scholar name or ID"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <select
              className="table-select-cycle"
              value={selectedScholarship}
              onChange={e => { setSelectedScholarship(e.target.value); setCurrentPage(1); }}
            >
              <option value="All scholarships">All Scholarships</option>
              {scholarshipOptions.map(sch => (
                <option key={sch} value={sch}>{sch}</option>
              ))}
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
                <th style={{ width: '28%' }}>Scholar</th>
                <th>Scholarship Program</th>
                <th>Monthly Stipend</th>
                <th>GWA</th>
                <th>Enrolled Since</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan="7" className="empty-table-cell">No scholars found.</td></tr>
              ) : (
                paginated.map(item => {
                  const s = STATUS_STYLE[item.status] || STATUS_STYLE['Docs Pending'];
                  return (
                    <tr key={item.id} className="program-table-row" onClick={() => setSelectedScholar(item)}>
                      <td>
                        <div className="program-title-cell">
                          <span className="program-main-title">{item.name}</span>
                          <span className="program-code-sub">{item.id} · {item.school}</span>
                        </div>
                      </td>
                      <td>
                        <div className="program-title-cell">
                          <span className="table-text-bold" style={{ fontSize: '0.82rem' }}>{item.scholarship}</span>
                          <span className="program-code-sub">{item.cycle}</span>
                        </div>
                      </td>
                      <td>
                        <span className="table-text-bold" style={{ color: '#082894' }}>{item.monthlyStipend}</span>
                      </td>
                      <td>
                        <span className="table-text-bold">{item.currentGwa}</span>
                      </td>
                      <td>
                        <span className="table-date-text">{item.date}</span>
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <span className="status-badge-pill" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <div className="table-actions-cell">
                          <div className="dropdown-action-wrapper">
                            <button className="btn-dots-menu" onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}>
                              <MoreVertical size={16} />
                            </button>
                            {openDropdownId === item.id && (
                              <div className="action-dropdown-menu">
                                <button onClick={() => { setSelectedScholar(item); setOpenDropdownId(null); }}>
                                  <Eye size={13} /> View details
                                </button>
                                {item.status !== 'Compliant' && (
                                  <button onClick={() => handleUpdateStatus(item.id, 'Compliant')}>
                                    <CheckCircle size={13} /> Mark Compliant
                                  </button>
                                )}
                                {item.status !== 'Flagged' && (
                                  <button className="dropdown-delete-item" onClick={() => handleUpdateStatus(item.id, 'Flagged')}>
                                    <AlertCircle size={13} /> Flag Issue
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
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedScholar && (
        <div className="modal-overlay" onClick={() => setSelectedScholar(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <h3 className="modal-program-title">{selectedScholar.name}</h3>
                <p className="modal-program-sector">{selectedScholar.course} · {selectedScholar.school}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedScholar(null)}><X size={20} /></button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              {/* Scholarship header */}
              <div className="modal-section-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <Award size={20} color="#082894" />
                  <h4 style={{ margin: 0, color: '#082894', fontSize: '1rem', fontWeight: 800 }}>
                    {selectedScholar.scholarship}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e40af', fontWeight: 600 }}>
                  Code: {selectedScholar.scholarshipCode} · Monthly Stipend: {selectedScholar.monthlyStipend}
                </p>
                <span className="status-badge-pill status-published" style={{ marginTop: '0.6rem', fontSize: '0.75rem' }}>
                  Active · {selectedScholar.cycle}
                </span>
              </div>

              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">SCHOLAR ID</span>
                  <span className="modal-stat-val">{selectedScholar.id}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">CURRENT GWA</span>
                  <span className="modal-stat-val">{selectedScholar.currentGwa}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">ENROLLED SINCE</span>
                  <span className="modal-stat-val">{selectedScholar.date}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">COMPLIANCE STATUS</span>
                  <span className="modal-stat-val" style={{ color: STATUS_STYLE[selectedScholar.status]?.color }}>
                    {selectedScholar.status}
                  </span>
                </div>
              </div>

              {/* Submitted Document */}
              <div className="document-preview-card">
                <div className="doc-info">
                  <div className="doc-icon-wrapper"><FileText size={22} /></div>
                  <div className="doc-text">
                    <h5 style={{ margin: 0, fontWeight: 700 }}>{selectedScholar.fileName}</h5>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                      {selectedScholar.fileSize} · {selectedScholar.requirementSubmitted}
                    </p>
                  </div>
                </div>
                <button className="btn-table-export"><Download size={13} /> Download</button>
              </div>

              {/* Compliance notes */}
              <div className="modal-section-box">
                <h4>Compliance Notes</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569' }}>{selectedScholar.remarks}</p>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-modal-close" onClick={() => setSelectedScholar(null)}>Close</button>
              {selectedScholar.status !== 'Flagged' && (
                <button
                  className="btn-modal-close"
                  style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }}
                  onClick={() => handleUpdateStatus(selectedScholar.id, 'Flagged')}
                >
                  <AlertCircle size={15} /> Flag Issue
                </button>
              )}
              {selectedScholar.status !== 'Compliant' && (
                <button className="btn-modal-edit" onClick={() => handleUpdateStatus(selectedScholar.id, 'Compliant')}>
                  <Check size={15} /> Mark Compliant
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderActiveScholars;
