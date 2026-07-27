import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  FileText, 
  X, 
  ChevronRight,
  AlertCircle,
  Check,
  Award,
  Building2,
  GraduationCap
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_ACTIVE_SCHOLARS = [
  { 
    id: 'SCH-2026-101', 
    name: 'Samantha Reyes', 
    email: 'samantha.r@example.com',
    school: 'Polytechnic University of the Philippines',
    course: 'BS Industrial Engineering (1st Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    stipend: '₱60,000 / year (₱5,000 / month)',
    cycle: 'AY 2026-2027 (2nd Semester)',
    requirementSubmitted: '1st Sem Transcript & COR',
    currentGwa: '1.25 (Maintained >= 2.00)',
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
    school: 'Cavite State University - Main Campus',
    course: 'BS Computer Science (2nd Year)',
    scholarship: 'CHED Merit Scholarship for STEM',
    scholarshipCode: 'CHED-STEM-26',
    stipend: '₱60,000 / year (₱5,000 / month)',
    cycle: 'AY 2026-2027 (2nd Semester)',
    requirementSubmitted: '1st Sem Transcript & Registration Form',
    currentGwa: '1.45 (Maintained >= 2.00)',
    date: 'Jan 22, 2026',
    status: 'Pending Review',
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
    stipend: '₱40,000 / year (₱4,000 / month)',
    cycle: 'AY 2026-2027 (2nd Semester)',
    requirementSubmitted: '1st Sem Grades & Project Report',
    currentGwa: '1.75 (Maintained >= 2.25)',
    date: 'Jan 20, 2026',
    status: 'Pending Review',
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
    stipend: '₱60,000 / year (₱5,000 / month)',
    cycle: 'AY 2026-2027 (2nd Semester)',
    requirementSubmitted: '1st Sem Grades & COR',
    currentGwa: '1.30 (Maintained >= 2.00)',
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
    stipend: '₱25,000 / year (₱2,000 / month)',
    cycle: 'AY 2026-2027 (2nd Semester)',
    requirementSubmitted: '1st Sem Report Card',
    currentGwa: '2.85 (Minimum 2.50 required)',
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
    stipend: '₱60,000 / year (₱5,000 / month)',
    cycle: 'AY 2026-2027 (2nd Semester)',
    requirementSubmitted: '1st Sem Grades & Registration',
    currentGwa: '1.50 (Maintained >= 2.00)',
    date: 'Jan 10, 2026',
    status: 'Compliant',
    fileName: 'Garcia_BatState_Grades.pdf',
    fileSize: '1.1 MB',
    remarks: 'Compliant. Cleared for disbursement.'
  }
];

const ProviderActiveScholars = () => {
  const [scholars, setScholars] = useState(MOCK_ACTIVE_SCHOLARS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('All scholarships');
  const [selectedCycle, setSelectedCycle] = useState('All cycles');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setScholars(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    if (selectedScholar && selectedScholar.id === id) {
      setSelectedScholar(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setOpenDropdownId(null);
    showToast(`Scholar status updated to ${newStatus}`);
  };

  // Distinct list of scholarships for filter dropdown
  const scholarshipOptions = Array.from(new Set(scholars.map(s => s.scholarship)));

  const filteredScholars = scholars.filter(s => {
    if (activeTab === 'Pending Review' && s.status !== 'Pending Review') return false;
    if (activeTab === 'Compliant' && s.status !== 'Compliant') return false;
    if (activeTab === 'Flagged' && s.status !== 'Flagged') return false;

    if (selectedScholarship !== 'All scholarships' && s.scholarship !== selectedScholarship) return false;
    if (selectedCycle !== 'All cycles' && !s.cycle.includes(selectedCycle)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.scholarship.toLowerCase().includes(q) ||
        s.scholarshipCode.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.school.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tabCounts = {
    All: scholars.length,
    Pending: scholars.filter(s => s.status === 'Pending Review').length,
    Compliant: scholars.filter(s => s.status === 'Compliant').length,
    Flagged: scholars.filter(s => s.status === 'Flagged').length
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
          <h2 className="programs-header-title">Active Scholars</h2>
          <p className="programs-header-subtitle">Accepted student beneficiaries enrolled in your active scholarship programs.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Active Scholars</span>
          <span className="kpi-number">{tabCounts.All}</span>
          <span className="kpi-subtext">Accepted grant beneficiaries</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Pending Audit</span>
          <span className="kpi-number" style={{ color: '#d97706' }}>{tabCounts.Pending}</span>
          <span className="kpi-subtext">Awaiting semester verification</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Compliant & Cleared</span>
          <span className="kpi-number" style={{ color: '#15803d' }}>{tabCounts.Compliant}</span>
          <span className="kpi-subtext">Cleared for disbursement</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Flagged / Action Needed</span>
          <span className="kpi-number" style={{ color: '#dc2626' }}>{tabCounts.Flagged}</span>
          <span className="kpi-subtext">GWA or document issues</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          {/* Status Tabs */}
          <div className="status-tabs-group">
            {[
              { label: `All Active (${tabCounts.All})`, val: 'All' },
              { label: `Pending Review (${tabCounts.Pending})`, val: 'Pending Review' },
              { label: `Compliant (${tabCounts.Compliant})`, val: 'Compliant' },
              { label: `Flagged (${tabCounts.Flagged})`, val: 'Flagged' }
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
                placeholder="Search scholar (e.g. Samantha)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter by Scholarship Program */}
            <select
              className="table-select-cycle"
              value={selectedScholarship}
              onChange={e => setSelectedScholarship(e.target.value)}
              style={{ fontWeight: 600 }}
            >
              <option value="All scholarships">Filter by Scholarship Program</option>
              {scholarshipOptions.map(sch => (
                <option key={sch} value={sch}>{sch}</option>
              ))}
            </select>

            <select
              className="table-select-cycle"
              value={selectedCycle}
              onChange={e => setSelectedCycle(e.target.value)}
            >
              <option value="All cycles">All Cycles</option>
              <option value="AY 2026-2027">AY 2026-2027</option>
              <option value="AY 2025-2026">AY 2025-2026</option>
            </select>

            <button className="btn-table-export" onClick={() => showToast('Exporting active scholars list to CSV...')}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Accepted Scholar</th>
                <th style={{ width: '32%' }}>Enrolled Scholarship Program</th>
                <th>Semester GWA</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScholars.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">
                    No active scholars found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredScholars.map(item => (
                  <tr 
                    key={item.id} 
                    className="program-table-row"
                    onClick={() => setSelectedScholar(item)}
                  >
                    {/* Scholar */}
                    <td>
                      <div className="program-title-cell">
                        <span className="program-main-title">{item.name}</span>
                        <span className="program-code-sub">{item.id} · {item.school}</span>
                        <span className="program-code-sub" style={{ color: '#475569' }}>{item.course}</span>
                      </div>
                    </td>

                    {/* Scholarship & Code */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold" style={{ color: '#082894', fontSize: '0.925rem' }}>
                          {item.scholarship}
                        </span>
                        <span className="program-code-sub" style={{ fontWeight: 600, color: '#3b82f6' }}>
                          Code: {item.scholarshipCode} • {item.stipend}
                        </span>
                        <span className="program-code-sub">{item.cycle}</span>
                      </div>
                    </td>

                    {/* Academic Status */}
                    <td>
                      <div className="program-title-cell">
                        <span className="table-text-bold" style={{ color: '#0f172a' }}>{item.currentGwa}</span>
                        <span className="program-code-sub">{item.requirementSubmitted}</span>
                      </div>
                    </td>

                    {/* Date Submitted */}
                    <td>
                      <span className="table-date-text">{item.date}</span>
                    </td>

                    {/* Status */}
                    <td onClick={e => e.stopPropagation()}>
                      <span className={`status-badge-pill ${
                        item.status === 'Compliant' 
                          ? 'status-published' 
                          : item.status === 'Flagged' 
                          ? 'status-paused' 
                          : 'status-draft'
                      }`} style={{
                        background: item.status === 'Compliant' ? '#dcfce7' : item.status === 'Flagged' ? '#fee2e2' : '#fef3c7',
                        color: item.status === 'Compliant' ? '#15803d' : item.status === 'Flagged' ? '#b91c1c' : '#d97706',
                        borderColor: item.status === 'Compliant' ? '#bbf7d0' : item.status === 'Flagged' ? '#fca5a5' : '#fde68a'
                      }}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <div className="table-actions-cell">
                        <button
                          className="btn-row-view"
                          onClick={() => setSelectedScholar(item)}
                          title="View details"
                        >
                          View <ChevronRight size={13} />
                        </button>

                        <div className="dropdown-action-wrapper">
                          <button
                            className="btn-dots-menu"
                            onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openDropdownId === item.id && (
                            <div className="action-dropdown-menu">
                              <button onClick={() => { setSelectedScholar(item); setOpenDropdownId(null); }}>
                                <Eye size={13} /> View scholar details
                              </button>
                              {item.status !== 'Compliant' && (
                                <button onClick={() => handleUpdateStatus(item.id, 'Compliant')}>
                                  <CheckCircle size={13} /> Approve & Clear
                                </button>
                              )}
                              {item.status !== 'Flagged' && (
                                <button 
                                  className="dropdown-delete-item"
                                  onClick={() => handleUpdateStatus(item.id, 'Flagged')}
                                >
                                  <AlertCircle size={13} /> Flag issue
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

      {/* Scholar Detail Modal */}
      {selectedScholar && (
        <div className="modal-overlay" onClick={() => setSelectedScholar(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <h3 className="modal-program-title">{selectedScholar.name}</h3>
                <p className="modal-program-sector">{selectedScholar.course} • {selectedScholar.school}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedScholar(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: 0 }}>
              {/* Attached Scholarship Card inside Modal */}
              <div className="modal-section-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <Award size={20} color="#082894" />
                  <h4 style={{ margin: 0, color: '#082894', fontSize: '1rem', fontWeight: 800 }}>
                    {selectedScholar.scholarship}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e40af', fontWeight: 600 }}>
                  Program Code: {selectedScholar.scholarshipCode} • Grant Stipend: {selectedScholar.stipend}
                </p>
                <span className="status-badge-pill status-published" style={{ marginTop: '0.6rem', fontSize: '0.75rem' }}>
                  Active Beneficiary • {selectedScholar.cycle}
                </span>
              </div>

              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">SCHOLAR ID</span>
                  <span className="modal-stat-val">{selectedScholar.id}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">SUBMITTED GWA</span>
                  <span className="modal-stat-val">{selectedScholar.currentGwa}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">SUBMISSION DATE</span>
                  <span className="modal-stat-val">{selectedScholar.date}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">STATUS</span>
                  <span className="modal-stat-val" style={{ 
                    color: selectedScholar.status === 'Compliant' ? '#15803d' : selectedScholar.status === 'Flagged' ? '#b91c1c' : '#d97706' 
                  }}>
                    {selectedScholar.status}
                  </span>
                </div>
              </div>

              {/* Submitted Document */}
              <div className="document-preview-card">
                <div className="doc-info">
                  <div className="doc-icon-wrapper">
                    <FileText size={22} />
                  </div>
                  <div className="doc-text">
                    <h5 style={{ margin: 0, fontWeight: 700 }}>{selectedScholar.fileName}</h5>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Size: {selectedScholar.fileSize} • {selectedScholar.requirementSubmitted}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-table-export">
                    <Download size={13} /> Download
                  </button>
                </div>
              </div>

              {/* Audit Remarks */}
              <div className="modal-section-box">
                <h4>Scholar Compliance Notes</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569' }}>
                  {selectedScholar.remarks}
                </p>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-modal-close" onClick={() => setSelectedScholar(null)}>
                Close
              </button>
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
                <button 
                  className="btn-modal-edit"
                  onClick={() => handleUpdateStatus(selectedScholar.id, 'Compliant')}
                >
                  <Check size={15} /> Approve & Clear
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
