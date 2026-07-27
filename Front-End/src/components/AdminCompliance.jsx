import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  Clock, 
  AlertCircle, 
  X, 
  Download,
  ExternalLink,
  Check
} from 'lucide-react';

const AdminCompliance = () => {
  const [compliances, setCompliances] = useState([
    { 
      id: 'CMP-23423', 
      name: 'Jeremiah Madronio', 
      email: 'jeremiah.m@example.com',
      scholarship: 'DOST-SEI Merit', 
      requirement: '1st Sem Grades', 
      status: 'Pending Review', 
      date: 'Oct 24, 2025',
      fileName: '1st_Sem_Grades_Madronio.pdf',
      fileSize: '1.4 MB',
      remarks: 'GWA: 1.45 - Awaiting official seal verification'
    },
    { 
      id: 'CMP-23424', 
      name: 'Samantha Reyes', 
      email: 'samantha.r@example.com',
      scholarship: 'CHED Half-Merit', 
      requirement: 'Reg. Form', 
      status: 'Approved', 
      date: 'Oct 23, 2025',
      fileName: 'COR_2ndSem_Reyes.pdf',
      fileSize: '890 KB',
      remarks: 'Validated with Registrar database'
    },
    { 
      id: 'CMP-23425', 
      name: 'Miguel Santos', 
      email: 'miguel.s@example.com',
      scholarship: 'LGU Assist', 
      requirement: '1st Sem Grades', 
      status: 'Pending Review', 
      date: 'Oct 22, 2025',
      fileName: 'Santos_Grades_2025.pdf',
      fileSize: '2.1 MB',
      remarks: 'Submitted via scholar portal'
    },
    {
      id: 'CMP-23426',
      name: 'Chloe Lim',
      email: 'chloe.l@example.com',
      scholarship: 'DOST-SEI Merit',
      requirement: 'Certificate of Good Moral',
      status: 'Approved',
      date: 'Oct 20, 2025',
      fileName: 'Good_Moral_Lim.pdf',
      fileSize: '650 KB',
      remarks: 'Issued by Dean of Student Affairs'
    },
    {
      id: 'CMP-23427',
      name: 'Alexander Cruz',
      email: 'alex.cruz@example.com',
      scholarship: 'OWWA Scholarship',
      requirement: '2nd Sem Reg. Form',
      status: 'Rejected',
      date: 'Oct 18, 2025',
      fileName: 'Unclear_Scan_COR.pdf',
      fileSize: '410 KB',
      remarks: 'Document scan is blurry. Scholar notified to re-upload.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCompliance, setSelectedCompliance] = useState(null);

  // Status Handlers
  const handleUpdateStatus = (id, newStatus) => {
    setCompliances(prev => 
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
    if (selectedCompliance && selectedCompliance.id === id) {
      setSelectedCompliance(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Filter Logic
  const filteredCompliances = compliances.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scholarship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && item.status === activeTab;
  });

  // Summary Metrics
  const totalCount = compliances.length;
  const pendingCount = compliances.filter(c => c.status === 'Pending Review').length;
  const approvedCount = compliances.filter(c => c.status === 'Approved').length;
  const rejectedCount = compliances.filter(c => c.status === 'Rejected').length;

  return (
    <div className="admin-compliance-container">
      {/* Page Header */}
      <div className="compliance-header">
        <h2>Compliance Tracking</h2>
        <p>Review and verify ongoing academic and enrollment requirements submitted by active scholars.</p>
      </div>

      {/* Summary Cards */}
      <div className="compliance-stats-grid">
        <div className="compliance-stat-card">
          <div className="stat-icon-box blue">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <h3>{totalCount}</h3>
            <p>Total Requirements</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <div className="stat-icon-box yellow">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>{pendingCount}</h3>
            <p>Pending Review</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <div className="stat-icon-box green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{approvedCount}</h3>
            <p>Approved Submissions</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <div className="stat-icon-box red">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{rejectedCount}</h3>
            <p>Rejected / Resubmit</p>
          </div>
        </div>
      </div>

      {/* Search & Top Action Bar */}
      <div className="applicants-top-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by scholar name, requirement, or scholarship..." 
            className="applicants-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="applicants-tabs">
        <button 
          className={`applicants-tab ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All Submissions ({totalCount})
        </button>
        <button 
          className={`applicants-tab ${activeTab === 'Pending Review' ? 'active' : ''}`}
          onClick={() => setActiveTab('Pending Review')}
        >
          Pending Review ({pendingCount})
        </button>
        <button 
          className={`applicants-tab ${activeTab === 'Approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('Approved')}
        >
          Approved ({approvedCount})
        </button>
        <button 
          className={`applicants-tab ${activeTab === 'Rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('Rejected')}
        >
          Rejected ({rejectedCount})
        </button>
      </div>

      {/* Main Data Table Card */}
      <div className="applicants-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="applicants-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Submission ID</th>
                <th>Scholar Name</th>
                <th>Scholarship</th>
                <th>Requirement</th>
                <th style={{ width: '130px' }}>Date Submitted</th>
                <th style={{ width: '150px' }}>Status</th>
                <th style={{ textAlign: 'right', paddingRight: '2rem', width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompliances.length > 0 ? (
                filteredCompliances.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{item.id}</td>
                    <td>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-main)' }}>{item.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.email}</span>
                      </div>
                    </td>
                    <td>{item.scholarship}</td>
                    <td>{item.requirement}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`status-badge ${
                        item.status === 'Approved' 
                          ? 'status-approved' 
                          : item.status === 'Rejected' 
                          ? 'status-rejected' 
                          : 'status-pending'
                      }`}>
                        {item.status === 'Approved' && <CheckCircle size={14} />}
                        {item.status === 'Pending Review' && <Clock size={14} />}
                        {item.status === 'Rejected' && <AlertCircle size={14} />}
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                      <div className="action-buttons-group">
                        <button 
                          className="btn-action-outline"
                          title="View Details & Document"
                          onClick={() => setSelectedCompliance(item)}
                        >
                          <Eye size={15} />
                        </button>
                        {item.status === 'Pending Review' && (
                          <>
                            <button 
                              className="btn-action-outline text-green"
                              title="Approve Submission"
                              onClick={() => handleUpdateStatus(item.id, 'Approved')}
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button 
                              className="btn-action-outline text-red"
                              title="Reject Submission"
                              onClick={() => handleUpdateStatus(item.id, 'Rejected')}
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    No requirements found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="table-pagination">
          <span className="pagination-info">
            Showing {filteredCompliances.length > 0 ? 1 : 0} to {filteredCompliances.length} of {compliances.length} entries
          </span>
          <div className="pagination-controls">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Document Verification Modal */}
      {selectedCompliance && (
        <div className="modal-overlay" onClick={() => setSelectedCompliance(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Verify Submitted Requirement</h3>
              <button className="modal-close-btn" onClick={() => setSelectedCompliance(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Submission ID</label>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{selectedCompliance.id}</span>
                </div>
                <div className="detail-item">
                  <label>Date Submitted</label>
                  <span>{selectedCompliance.date}</span>
                </div>
                <div className="detail-item">
                  <label>Scholar Name</label>
                  <span>{selectedCompliance.name}</span>
                </div>
                <div className="detail-item">
                  <label>Scholarship Program</label>
                  <span>{selectedCompliance.scholarship}</span>
                </div>
                <div className="detail-item">
                  <label>Requirement</label>
                  <span>{selectedCompliance.requirement}</span>
                </div>
                <div className="detail-item">
                  <label>Status</label>
                  <div>
                    <span className={`status-badge ${
                      selectedCompliance.status === 'Approved' 
                        ? 'status-approved' 
                        : selectedCompliance.status === 'Rejected' 
                        ? 'status-rejected' 
                        : 'status-pending'
                    }`}>
                      {selectedCompliance.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Document File Preview Card */}
              <div className="document-preview-card">
                <div className="doc-info">
                  <div className="doc-icon-wrapper">
                    <FileText size={24} />
                  </div>
                  <div className="doc-text">
                    <h5>{selectedCompliance.fileName}</h5>
                    <p>Size: {selectedCompliance.fileSize} • Uploaded by scholar</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-action-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Download size={14} /> Download
                  </button>
                  <button className="btn-action-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ExternalLink size={14} /> Preview
                  </button>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="detail-item" style={{ marginTop: '1rem' }}>
                <label>Verification Notes / Remarks</label>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  border: '1px solid var(--border-color)', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)'
                }}>
                  {selectedCompliance.remarks}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setSelectedCompliance(null)}>
                Close
              </button>
              {selectedCompliance.status !== 'Rejected' && (
                <button 
                  className="btn-modal-reject"
                  onClick={() => {
                    handleUpdateStatus(selectedCompliance.id, 'Rejected');
                    setSelectedCompliance(null);
                  }}
                >
                  <XCircle size={16} /> Reject
                </button>
              )}
              {selectedCompliance.status !== 'Approved' && (
                <button 
                  className="btn-modal-approve"
                  onClick={() => {
                    handleUpdateStatus(selectedCompliance.id, 'Approved');
                    setSelectedCompliance(null);
                  }}
                >
                  <Check size={16} /> Approve Requirement
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
