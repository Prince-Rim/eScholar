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
  Check
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_COMPLIANCES = [
  { 
    id: 'CMP-23423', 
    name: 'Jeremiah Madronio', 
    email: 'jeremiah.m@example.com',
    scholarship: 'DOST-SEI Merit', 
    requirement: '1st Sem Grades', 
    academicYear: 'AY 2025-2026',
    status: 'Pending Review', 
    date: 'Oct 24, 2025',
    fileName: '1st_Sem_Grades_Madronio.pdf',
    fileSize: '1.4 MB',
    remarks: 'GWA: 1.45 - Awaiting official registrar validation stamp.'
  },
  { 
    id: 'CMP-23424', 
    name: 'Samantha Reyes', 
    email: 'samantha.r@example.com',
    scholarship: 'CHED Half-Merit', 
    requirement: 'Registration Form (COR)', 
    academicYear: 'AY 2025-2026',
    status: 'Approved', 
    date: 'Oct 23, 2025',
    fileName: 'COR_2ndSem_Reyes.pdf',
    fileSize: '890 KB',
    remarks: 'Validated with University Registrar database.'
  },
  { 
    id: 'CMP-23425', 
    name: 'Miguel Santos', 
    email: 'miguel.s@example.com',
    scholarship: 'LGU Assist', 
    requirement: '1st Sem Grades', 
    academicYear: 'AY 2025-2026',
    status: 'Pending Review', 
    date: 'Oct 22, 2025',
    fileName: 'Santos_Grades_2025.pdf',
    fileSize: '2.1 MB',
    remarks: 'Submitted via scholar portal. Needs GWA verification.'
  },
  {
    id: 'CMP-23426',
    name: 'Chloe Lim',
    email: 'chloe.l@example.com',
    scholarship: 'DOST-SEI Merit',
    requirement: 'Certificate of Good Moral',
    academicYear: 'AY 2025-2026',
    status: 'Approved',
    date: 'Oct 20, 2025',
    fileName: 'Good_Moral_Lim.pdf',
    fileSize: '650 KB',
    remarks: 'Issued by Office of Student Affairs.'
  },
  {
    id: 'CMP-23427',
    name: 'Alexander Cruz',
    email: 'alex.cruz@example.com',
    scholarship: 'OWWA Scholarship',
    requirement: '2nd Sem Reg. Form',
    academicYear: 'AY 2025-2026',
    status: 'Rejected',
    date: 'Oct 18, 2025',
    fileName: 'Unclear_Scan_COR.pdf',
    fileSize: '410 KB',
    remarks: 'Document scan is blurry and unreadable. Scholar notified.'
  }
];

const AdminCompliance = () => {
  const [compliances, setCompliances] = useState(MOCK_COMPLIANCES);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('All scholarships');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCompliances(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedCompliance && selectedCompliance.id === id) {
      setSelectedCompliance(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setOpenDropdownId(null);
    showToast(`Submission updated to ${newStatus}`);
  };

  const filteredCompliances = compliances.filter(c => {
    if (activeTab === 'Pending Review' && c.status !== 'Pending Review') return false;
    if (activeTab === 'Approved' && c.status !== 'Approved') return false;
    if (activeTab === 'Rejected' && c.status !== 'Rejected') return false;
    
    if (selectedScholarship !== 'All scholarships' && c.scholarship !== selectedScholarship) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.scholarship.toLowerCase().includes(q) ||
        c.requirement.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tabCounts = {
    All: compliances.length,
    Pending: compliances.filter(c => c.status === 'Pending Review').length,
    Approved: compliances.filter(c => c.status === 'Approved').length,
    Rejected: compliances.filter(c => c.status === 'Rejected').length
  };

  const totalItems = filteredCompliances.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompliances = filteredCompliances.slice(indexOfFirstItem, indexOfLastItem);

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
          <h2 className="programs-header-title">Compliance Tracking</h2>
          <p className="programs-header-subtitle">Review, verify, and track ongoing scholar requirement submissions.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total Submissions</span>
          <span className="kpi-number">{tabCounts.All}</span>
          <span className="kpi-subtext">Received this cycle</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Pending Verification</span>
          <span className="kpi-number" style={{ color: '#d97706' }}>{tabCounts.Pending}</span>
          <span className="kpi-subtext">Awaiting admin review</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Approved & Cleared</span>
          <span className="kpi-number" style={{ color: '#15803d' }}>{tabCounts.Approved}</span>
          <span className="kpi-subtext">Verified documents</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Rejected / Action Needed</span>
          <span className="kpi-number" style={{ color: '#dc2626' }}>{tabCounts.Rejected}</span>
          <span className="kpi-subtext">Invalid or missing</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          {/* Status Tabs */}
          <div className="status-tabs-group">
            {[
              { label: `All (${tabCounts.All})`, val: 'All' },
              { label: `Pending Review (${tabCounts.Pending})`, val: 'Pending Review' },
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
                placeholder="Search scholar or requirement"
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
              <option value="DOST-SEI Merit">DOST-SEI Merit</option>
              <option value="CHED Half-Merit">CHED Half-Merit</option>
              <option value="LGU Assist">LGU Assist</option>
              <option value="OWWA Scholarship">OWWA Scholarship</option>
            </select>
            <button className="btn-table-export" onClick={() => showToast('Exporting compliance report CSV...')}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Scholar & Submission ID</th>
                <th>Scholarship & Year</th>
                <th>Requirement Submitted</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCompliances.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">
                    No compliance records found matching your filters.
                  </td>
                </tr>
              ) : (
                currentCompliances.map(item => (
                  <tr 
                    key={item.id} 
                    className="program-table-row"
                    onClick={() => setSelectedCompliance(item)}
                  >
                    {/* Scholar */}
                    <td>
                      <div className="program-title-cell">
                        <span className="program-main-title">{item.name}</span>
                        <span className="program-code-sub">{item.id} · {item.email}</span>
                      </div>
                    </td>

                    {/* Scholarship & AY */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold">{item.scholarship}</span>
                        <span className="program-code-sub">{item.academicYear}</span>
                      </div>
                    </td>

                    {/* Requirement */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold" style={{ color: '#082894' }}>{item.requirement}</span>
                        <span className="program-code-sub">{item.fileName} ({item.fileSize})</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td>
                      <span className="table-date-text">{item.date}</span>
                    </td>

                    {/* Status */}
                    <td onClick={e => e.stopPropagation()}>
                      <span className={`status-badge-pill ${
                        item.status === 'Approved' 
                          ? 'status-published' 
                          : item.status === 'Rejected' 
                          ? 'status-paused' 
                          : 'status-draft'
                      }`} style={{
                        background: item.status === 'Approved' ? '#dcfce7' : item.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                        color: item.status === 'Approved' ? '#15803d' : item.status === 'Rejected' ? '#b91c1c' : '#d97706',
                        borderColor: item.status === 'Approved' ? '#bbf7d0' : item.status === 'Rejected' ? '#fca5a5' : '#fde68a'
                      }}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <div className="table-actions-cell">
                        <div className="dropdown-action-wrapper">
                          <button
                            className="btn-dots-menu"
                            onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openDropdownId === item.id && (
                            <div className="action-dropdown-menu">
                              <button onClick={() => { setSelectedCompliance(item); setOpenDropdownId(null); }}>
                                <Eye size={13} /> View details
                              </button>
                              {item.status !== 'Approved' && (
                                <button onClick={() => handleUpdateStatus(item.id, 'Approved')}>
                                  <CheckCircle size={13} /> Approve
                                </button>
                              )}
                              {item.status !== 'Rejected' && (
                                <button 
                                  className="dropdown-delete-item"
                                  onClick={() => handleUpdateStatus(item.id, 'Rejected')}
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

      {/* Document Verification Modal */}
      {selectedCompliance && (
        <div className="modal-overlay" onClick={() => setSelectedCompliance(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <h3 className="modal-program-title">{selectedCompliance.requirement}</h3>
                <p className="modal-program-sector">Submitted by {selectedCompliance.name} • {selectedCompliance.scholarship}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedCompliance(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">SUBMISSION ID</span>
                  <span className="modal-stat-val">{selectedCompliance.id}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">DATE SUBMITTED</span>
                  <span className="modal-stat-val">{selectedCompliance.date}</span>
                </div>
              </div>

              {/* Document File Preview */}
              <div className="document-preview-card">
                <div className="doc-info">
                  <div className="doc-icon-wrapper">
                    <FileText size={22} />
                  </div>
                  <div className="doc-text">
                    <h5 style={{ margin: 0, fontWeight: 700 }}>{selectedCompliance.fileName}</h5>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Size: {selectedCompliance.fileSize}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-table-export">
                    <Download size={13} /> Download
                  </button>
                </div>
              </div>

              {/* Remarks */}
              <div className="modal-section-box">
                <h4>Verification Notes</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569' }}>
                  {selectedCompliance.remarks}
                </p>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-modal-close" onClick={() => setSelectedCompliance(null)}>
                Close
              </button>
              {selectedCompliance.status !== 'Rejected' && (
                <button 
                  className="btn-modal-close" 
                  style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }}
                  onClick={() => handleUpdateStatus(selectedCompliance.id, 'Rejected')}
                >
                  <XCircle size={15} /> Reject
                </button>
              )}
              {selectedCompliance.status !== 'Approved' && (
                <button 
                  className="btn-modal-edit"
                  onClick={() => handleUpdateStatus(selectedCompliance.id, 'Approved')}
                >
                  <Check size={15} /> Approve Requirement
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompliance;
