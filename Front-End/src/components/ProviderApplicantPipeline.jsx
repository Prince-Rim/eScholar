import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  XCircle, 
  FileText, 
  X, 
  ChevronRight,
  User,
  GraduationCap,
  Check,
  Building2,
  Award
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_PROVIDER_APPLICANTS = [
  { 
    id: 'APP-2026-001', 
    name: 'Jeremiah Madronio', 
    email: 'jeremiah.m@example.com',
    school: 'Cavite State University - Main Campus',
    course: 'BS Computer Science (2nd Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    category: 'STEM · Region IV-A',
    gwa: '1.45 (94.5%)',
    income: '₱180,000 / year',
    date: 'Jan 18, 2026',
    status: 'Under Review',
    documents: ['Form 138 / TOR Transcript', 'Certificate of Indigency (Barangay)', 'PSA Birth Certificate', 'Good Moral Clearance']
  },
  { 
    id: 'APP-2026-002', 
    name: 'Samantha Reyes', 
    email: 'samantha.r@example.com',
    school: 'Polytechnic University of the Philippines',
    course: 'BS Industrial Engineering (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    category: 'STEM · Region IV-A',
    gwa: '1.25 (96.0%)',
    income: '₱220,000 / year',
    date: 'Jan 15, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR Transcript', 'Certificate of Good Moral Character', 'PSA Birth Certificate', 'Parent ITR 2025']
  },
  { 
    id: 'APP-2026-003', 
    name: 'Miguel Santos', 
    email: 'miguel.s@example.com',
    school: 'De La Salle University - Dasmariñas',
    course: 'BS Information Technology (3rd Year)',
    scholarship: 'Foundation Digital Skills Fellowship',
    scholarshipCode: 'FDN-DIGI-26',
    category: 'IT · Nationwide',
    gwa: '1.75 (90.0%)',
    income: '₱120,000 / year',
    date: 'Jan 12, 2026',
    status: 'Under Review',
    documents: ['Official Transcript of Records', 'Proof of Cavite Residency', 'Certificate of Indigency']
  },
  { 
    id: 'APP-2026-004', 
    name: 'Chloe Lim', 
    email: 'chloe.l@example.com',
    school: 'University of the Philippines - Los Baños',
    course: 'BS Agricultural Chemistry (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    category: 'STEM · Region IV-A',
    gwa: '1.30 (95.5%)',
    income: '₱250,000 / year',
    date: 'Jan 10, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR Transcript', 'Good Moral Certificate', 'Parent ITR 2025']
  },
  { 
    id: 'APP-2026-005', 
    name: 'Alexander Cruz', 
    email: 'alex.cruz@example.com',
    school: 'Emilio Aguinaldo College - Cavite',
    course: 'BS Nursing (2nd Year)',
    scholarship: 'LGU Cavite Tulong Dunong Grant',
    scholarshipCode: 'LGU-CAV-TD',
    category: 'Indigent · Cavite',
    gwa: '2.50 (83.0%)',
    income: '₱350,000 / year',
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
    scholarshipCode: 'CHED-STEM-26',
    category: 'STEM · Region IV-A',
    gwa: '1.50 (93.5%)',
    income: '₱190,000 / year',
    date: 'Jan 05, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR Transcript', 'Good Moral Certificate', 'Barangay Clearance']
  }
];

const ProviderApplicantPipeline = () => {
  const [applicants, setApplicants] = useState(MOCK_PROVIDER_APPLICANTS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('All scholarships');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setOpenDropdownId(null);
    showToast(`Applicant status updated to ${newStatus}`);
  };

  const filteredApplicants = applicants.filter(a => {
    if (activeTab === 'Under Review' && a.status !== 'Under Review') return false;
    if (activeTab === 'Approved' && a.status !== 'Approved') return false;
    if (activeTab === 'Rejected' && a.status !== 'Rejected') return false;

    if (selectedScholarship !== 'All scholarships' && a.scholarship !== selectedScholarship) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.school.toLowerCase().includes(q) ||
        a.scholarship.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tabCounts = {
    All: applicants.length,
    Review: applicants.filter(a => a.status === 'Under Review').length,
    Approved: applicants.filter(a => a.status === 'Approved').length,
    Rejected: applicants.filter(a => a.status === 'Rejected').length
  };

  return (
    <div className="provider-programs-container">
      {toastMessage && (
        <div className="toast-notification-banner">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="programs-header-row">
        <div>
          <h2 className="programs-header-title">Applicant Pipeline</h2>
          <p className="programs-header-subtitle">Evaluate and award students who applied to your active scholarship grants.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total Applicants</span>
          <span className="kpi-number">{tabCounts.All}</span>
          <span className="kpi-subtext">Received this active cycle</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Under Evaluation</span>
          <span className="kpi-number" style={{ color: '#d97706' }}>{tabCounts.Review}</span>
          <span className="kpi-subtext">Awaiting provider review</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Grants Awarded</span>
          <span className="kpi-number" style={{ color: '#15803d' }}>{tabCounts.Approved}</span>
          <span className="kpi-subtext">Approved for stipend</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Rejected</span>
          <span className="kpi-number" style={{ color: '#dc2626' }}>{tabCounts.Rejected}</span>
          <span className="kpi-subtext">Did not meet criteria</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          {/* Status Tabs */}
          <div className="status-tabs-group">
            {[
              { label: `All Applicants (${tabCounts.All})`, val: 'All' },
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

          {/* Right Controls */}
          <div className="toolbar-controls-right">
            <div className="table-search-input-box">
              <Search size={15} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Search student or school"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="table-select-cycle"
              value={selectedScholarship}
              onChange={e => setSelectedScholarship(e.target.value)}
            >
              <option value="All scholarships">All scholarships</option>
              <option value="CHED Merit Scholarship for STEM">CHED Merit for STEM</option>
              <option value="LGU Cavite Tulong Dunong Grant">LGU Cavite Tulong Dunong</option>
              <option value="Foundation Digital Skills Fellowship">Digital Skills Fellowship</option>
            </select>
            <button className="btn-table-export" onClick={() => showToast('Exporting applicant pipeline to CSV...')}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>Applicant & University</th>
                <th>Applied Scholarship</th>
                <th>Academic GWA</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">
                    No applicants found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map(app => (
                  <tr 
                    key={app.id} 
                    className="program-table-row"
                    onClick={() => setSelectedApplicant(app)}
                  >
                    {/* Applicant & University */}
                    <td>
                      <div className="program-title-cell">
                        <span className="program-main-title">{app.name}</span>
                        <span className="program-code-sub">{app.id} · {app.school}</span>
                      </div>
                    </td>

                    {/* Applied Scholarship */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold">{app.scholarship}</span>
                        <span className="program-code-sub">{app.course}</span>
                      </div>
                    </td>

                    {/* Academic GWA */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold" style={{ color: '#082894' }}>{app.gwa}</span>
                        <span className="program-code-sub">Inc: {app.income}</span>
                      </div>
                    </td>

                    {/* Date Applied */}
                    <td>
                      <span className="table-date-text">{app.date}</span>
                    </td>

                    {/* Status */}
                    <td onClick={e => e.stopPropagation()}>
                      <span className={`status-badge-pill ${
                        app.status === 'Approved' 
                          ? 'status-published' 
                          : app.status === 'Rejected' 
                          ? 'status-paused' 
                          : 'status-draft'
                      }`} style={{
                        background: app.status === 'Approved' ? '#dcfce7' : app.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                        color: app.status === 'Approved' ? '#15803d' : app.status === 'Rejected' ? '#b91c1c' : '#d97706',
                        borderColor: app.status === 'Approved' ? '#bbf7d0' : app.status === 'Rejected' ? '#fca5a5' : '#fde68a'
                      }}>
                        {app.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <div className="table-actions-cell">
                        <button
                          className="btn-row-view"
                          onClick={() => setSelectedApplicant(app)}
                          title="View details"
                        >
                          View <ChevronRight size={13} />
                        </button>

                        <div className="dropdown-action-wrapper">
                          <button
                            className="btn-dots-menu"
                            onClick={() => setOpenDropdownId(openDropdownId === app.id ? null : app.id)}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openDropdownId === app.id && (
                            <div className="action-dropdown-menu">
                              <button onClick={() => { setSelectedApplicant(app); setOpenDropdownId(null); }}>
                                <Eye size={13} /> View application
                              </button>
                              {app.status !== 'Approved' && (
                                <button onClick={() => handleUpdateStatus(app.id, 'Approved')}>
                                  <CheckCircle size={13} /> Approve grant
                                </button>
                              )}
                              {app.status !== 'Rejected' && (
                                <button 
                                  className="dropdown-delete-item"
                                  onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                                >
                                  <XCircle size={13} /> Reject
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="modal-overlay" onClick={() => setSelectedApplicant(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <h3 className="modal-program-title">{selectedApplicant.name}</h3>
                <p className="modal-program-sector">{selectedApplicant.course} • {selectedApplicant.school}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedApplicant(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">APPLIED SCHOLARSHIP</span>
                  <span className="modal-stat-val" style={{ fontSize: '0.95rem' }}>{selectedApplicant.scholarship}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">ACADEMIC GWA</span>
                  <span className="modal-stat-val">{selectedApplicant.gwa}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">ANNUAL HOUSEHOLD INCOME</span>
                  <span className="modal-stat-val">{selectedApplicant.income}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">DATE SUBMITTED</span>
                  <span className="modal-stat-val">{selectedApplicant.date}</span>
                </div>
              </div>

              {/* Submitted Requirements Checklist */}
              <div className="modal-section-box">
                <h4>Submitted Requirements Checklist</h4>
                <div className="modal-criteria-list">
                  {selectedApplicant.documents.map((doc, idx) => (
                    <div key={idx} className="criteria-row" style={{ alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FileText size={15} color="#082894" /> {doc}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700 }}>Verified & Attached</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-modal-close" onClick={() => setSelectedApplicant(null)}>
                Close
              </button>
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
                <button 
                  className="btn-modal-edit"
                  onClick={() => handleUpdateStatus(selectedApplicant.id, 'Approved')}
                >
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
