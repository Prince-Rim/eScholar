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
  ChevronLeft,
  Trash2,
  Check
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_APPLICATIONS = [
  { 
    id: 'APP-99485', 
    name: 'Samantha Reyes', 
    email: 'samantha.r@example.com',
    scholarship: 'CHED Merit Scholarship for STEM',
    category: 'STEM · Region IV-A',
    gwa: '1.25 (96.0%)',
    income: '₱220,000 / year',
    date: 'Jan 24, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR', 'Certificate of Indigency', 'Good Moral Certificate']
  },
  { 
    id: 'APP-99484', 
    name: 'Jeremiah Madronio', 
    email: 'jeremiah.m@example.com',
    scholarship: 'CHED Merit Scholarship for STEM',
    category: 'STEM · Region IV-A',
    gwa: '1.45 (94.5%)',
    income: '₱180,000 / year',
    date: 'Jan 22, 2026',
    status: 'Under Review',
    documents: ['Form 138 / TOR', 'Barangay Indigency', 'Good Moral Certificate']
  },
  { 
    id: 'APP-99483', 
    name: 'Miguel Santos', 
    email: 'miguel.s@example.com',
    scholarship: 'Foundation Digital Skills Fellowship',
    category: 'IT & Data · CALABARZON',
    gwa: '1.75 (91.0%)',
    income: '₱140,000 / year',
    date: 'Jan 18, 2026',
    status: 'Under Review',
    documents: ['Academic Transcript', 'Portfolio Certificate', 'Indigency Certificate']
  },
  { 
    id: 'APP-99482', 
    name: 'Chloe Lim', 
    email: 'chloe.l@example.com',
    scholarship: 'CHED Merit Scholarship for STEM',
    category: 'STEM · Region IV-A',
    gwa: '1.30 (95.0%)',
    income: '₱160,000 / year',
    date: 'Jan 12, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR', 'Good Moral Certificate']
  },
  { 
    id: 'APP-99481', 
    name: 'Alexander Cruz', 
    email: 'alex.cruz@example.com',
    scholarship: 'OWWA Scholarship',
    category: 'OFW Dependent · Region IV-A',
    gwa: '2.50 (83.0%)',
    income: '₱350,000 / year',
    date: 'Jan 08, 2026',
    status: 'Rejected',
    documents: ['OFW Employment Contract', 'Form 138']
  },
  { 
    id: 'APP-99480', 
    name: 'Isabella Garcia', 
    email: 'isabella.g@example.com',
    scholarship: 'CHED Merit Scholarship',
    category: 'Arts & Humanities · Nationwide',
    gwa: '1.50 (93.5%)',
    income: '₱190,000 / year',
    date: 'Jan 05, 2026',
    status: 'Approved',
    documents: ['Form 138 / TOR', 'Good Moral Certificate']
  }
];

const AdminApplications = () => {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('All scholarships');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setOpenDropdownId(null);
    showToast(`Application status updated to ${newStatus}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove application for ${name}?`)) {
      setApplications(prev => prev.filter(a => a.id !== id));
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication(null);
      }
      setOpenDropdownId(null);
      showToast('Application removed');
    }
  };

  const filteredApplications = applications.filter(a => {
    if (activeTab === 'Under Review' && a.status !== 'Under Review') return false;
    if (activeTab === 'Approved' && a.status !== 'Approved') return false;
    if (activeTab === 'Rejected' && a.status !== 'Rejected') return false;

    if (selectedScholarship !== 'All scholarships' && a.scholarship !== selectedScholarship) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.scholarship.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tabCounts = {
    All: applications.length,
    Review: applications.filter(a => a.status === 'Under Review').length,
    Approved: applications.filter(a => a.status === 'Approved').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length
  };

  const totalItems = filteredApplications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="provider-programs-container">
      {toastMessage && (
        <div className="toast-notification-banner">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <div className="programs-header-row">
        <div>
          <h2 className="programs-header-title">Application Management</h2>
          <p className="programs-header-subtitle">Evaluate, verify, and approve scholarship grant applications.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total Applications</span>
          <span className="kpi-number">{tabCounts.All}</span>
          <span className="kpi-subtext">Received across programs</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Under Review</span>
          <span className="kpi-number" style={{ color: '#d97706' }}>{tabCounts.Review}</span>
          <span className="kpi-subtext">Pending evaluation</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Approved Grants</span>
          <span className="kpi-number" style={{ color: '#15803d' }}>{tabCounts.Approved}</span>
          <span className="kpi-subtext">Scholarships awarded</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Rejected</span>
          <span className="kpi-number" style={{ color: '#dc2626' }}>{tabCounts.Rejected}</span>
          <span className="kpi-subtext">Did not meet eligibility</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          {/* Status Tabs */}
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
                onClick={() => { setActiveTab(tab.val); setCurrentPage(1); }}
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
                placeholder="Search applicant or ID"
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
              <option value="CHED Merit Scholarship for STEM">CHED Merit</option>
              <option value="Foundation Digital Skills Fellowship">Digital Skills Fellowship</option>
              <option value="OWWA Scholarship">OWWA Scholarship</option>
            </select>
            <button className="btn-table-export" onClick={() => showToast('Exporting applications CSV...')}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Applicant Name & ID</th>
                <th>Target Scholarship</th>
                <th>Academic GWA</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">
                    No applications found matching your filters.
                  </td>
                </tr>
              ) : (
                currentApplications.map(app => (
                  <tr 
                    key={app.id} 
                    className="program-table-row"
                    onClick={() => setSelectedApplication(app)}
                  >
                    {/* Applicant */}
                    <td>
                      <div className="program-title-cell">
                        <span className="program-main-title">{app.name}</span>
                        <span className="program-code-sub">{app.id} · {app.email}</span>
                      </div>
                    </td>

                    {/* Scholarship */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold">{app.scholarship}</span>
                        <span className="program-code-sub">{app.category}</span>
                      </div>
                    </td>

                    {/* GWA */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold" style={{ color: '#082894' }}>{app.gwa}</span>
                        <span className="program-code-sub">Income: {app.income}</span>
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
                        <div className="dropdown-action-wrapper">
                          <button
                            className="btn-dots-menu"
                            onClick={() => setOpenDropdownId(openDropdownId === app.id ? null : app.id)}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openDropdownId === app.id && (
                            <div className="action-dropdown-menu">
                              <button onClick={() => { setSelectedApplication(app); setOpenDropdownId(null); }}>
                                <Eye size={13} /> View details
                              </button>
                              {app.status !== 'Approved' && (
                                <button onClick={() => handleUpdateStatus(app.id, 'Approved')}>
                                  <CheckCircle size={13} /> Approve
                                </button>
                              )}
                              {app.status !== 'Rejected' && (
                                <button onClick={() => handleUpdateStatus(app.id, 'Rejected')}>
                                  <XCircle size={13} /> Reject
                                </button>
                              )}
                              <button 
                                className="dropdown-delete-item"
                                onClick={() => handleDelete(app.id, app.name)}
                              >
                                <Trash2 size={13} /> Remove
                              </button>
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

        {/* Table Pagination */}
        <div className="table-pagination">
          <span className="pagination-info">
            Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
          </span>
          <div className="pagination-controls">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="modal-overlay" onClick={() => setSelectedApplication(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <h3 className="modal-program-title">{selectedApplication.name}</h3>
                <p className="modal-program-sector">Application for {selectedApplication.scholarship}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedApplication(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">APPLICATION ID</span>
                  <span className="modal-stat-val">{selectedApplication.id}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">ACADEMIC GWA</span>
                  <span className="modal-stat-val">{selectedApplication.gwa}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">FAMILY INCOME</span>
                  <span className="modal-stat-val">{selectedApplication.income}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">DATE APPLIED</span>
                  <span className="modal-stat-val">{selectedApplication.date}</span>
                </div>
              </div>

              {/* Submitted Documents Section */}
              <div className="modal-section-box">
                <h4>Submitted Requirements Checklist</h4>
                <div className="modal-criteria-list">
                  {selectedApplication.documents.map((doc, idx) => (
                    <div key={idx} className="criteria-row" style={{ alignItems: 'center' }}>
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
              <button className="btn-modal-close" onClick={() => setSelectedApplication(null)}>
                Close
              </button>
              {selectedApplication.status !== 'Rejected' && (
                <button 
                  className="btn-modal-close" 
                  style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }}
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'Rejected')}
                >
                  <XCircle size={15} /> Reject
                </button>
              )}
              {selectedApplication.status !== 'Approved' && (
                <button 
                  className="btn-modal-edit"
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'Approved')}
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

export default AdminApplications;
