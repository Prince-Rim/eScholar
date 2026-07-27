import React, { useState } from 'react';
import {
  Plus,
  Search,
  Download,
  MoreVertical,
  Users,
  CheckCircle,
  XCircle,
  PauseCircle,
  Edit,
  Trash2,
  Copy,
  ChevronRight
} from 'lucide-react';
import './ProviderPrograms.css';

export const MOCK_PROGRAMS = [
  {
    id: 'prog-1',
    code: 'CHED-STEM-26',
    title: 'CHED Merit Scholarship for STEM',
    sector: 'STEM',
    region: 'Region IV-A',
    status: 'Published',
    cycle: 'AY 2026-2027',
    slotsFilled: 342,
    totalSlots: 500,
    applicantsCount: 4820,
    stipend: 60000,
    monthlyAllowance: 5000,
    bookAllowance: 3000,
    budgetSpent: 12400000,
    budgetTotal: 30000000,
    startDate: 'Jan 15, 2026',
    endDate: 'Mar 30, 2026',
    gwa: '88% (GWA 1.75)',
    maxIncome: '₱300,000 / year',
    yearLevel: 'Incoming Freshmen',
    residency: 'Province of Laguna',
    description: 'Full financial subsidy and living allowance for priority STEM courses across Region IV-A. Covers full tuition, monthly living allowance, and book grants for qualified students.',
    documents: ['PSA Birth Certificate', 'Form 138 / Transcript of Records', 'Certificate of Good Moral Character', 'Parent ITR or Certificate of Indigency', 'Barangay Residency Certificate'],
    essayPrompts: ['Describe how this scholarship will change your community.', 'Why did you choose your STEM course and how will you use it to serve the Philippines?'],
    prioritySectors: ['PWD', '4Ps Beneficiary', 'Child of OFW']
  },
  {
    id: 'prog-2',
    code: 'LGU-CAV-TD',
    title: 'LGU Cavite Tulong Dunong Grant',
    sector: 'Indigent',
    region: 'Cavite',
    status: 'Closed',
    cycle: 'AY 2026-2027',
    slotsFilled: 250,
    totalSlots: 250,
    applicantsCount: 1980,
    stipend: 25000,
    monthlyAllowance: 2000,
    bookAllowance: 1500,
    budgetSpent: 4100000,
    budgetTotal: 6250000,
    startDate: 'Feb 1, 2026',
    endDate: 'Feb 28, 2026',
    gwa: '80% (GWA 2.25)',
    maxIncome: '₱150,000 / year',
    yearLevel: 'All Year Levels',
    residency: 'Province of Cavite',
    description: 'Local government education assistance for resident Caviteño students pursuing any undergraduate degree in accredited state universities.',
    documents: ['PSA Birth Certificate', 'Proof of Cavite Residency', 'Certificate of Indigency', 'Form 138'],
    essayPrompts: ['How will this grant help you achieve your academic goals?'],
    prioritySectors: ['4Ps Beneficiary', 'Solo Parent']
  },
  {
    id: 'prog-3',
    code: 'FDN-DIGI-26',
    title: 'Foundation Digital Skills Fellowship',
    sector: 'IT',
    region: 'Nationwide',
    status: 'Published',
    cycle: 'AY 2026-2027',
    slotsFilled: 48,
    totalSlots: 120,
    applicantsCount: 612,
    stipend: 40000,
    monthlyAllowance: 4000,
    bookAllowance: 2500,
    budgetSpent: 960000,
    budgetTotal: 4800000,
    startDate: 'Feb 20, 2026',
    endDate: 'Apr 15, 2026',
    gwa: '85% (GWA 2.00)',
    maxIncome: '₱250,000 / year',
    yearLevel: '2nd Year and Above',
    residency: 'Nationwide',
    description: 'Technology fellowship supporting computer science and software development majors with a focus on AI, cybersecurity, and web development.',
    documents: ['PSA Birth Certificate', 'Transcript of Records', 'Good Moral Certificate', 'Portfolio or GitHub Profile (optional)'],
    essayPrompts: ['Describe a technology project you have built or plan to build.', 'How will you contribute to the Philippine digital economy?'],
    prioritySectors: ['PWD', 'Indigenous People']
  },
  {
    id: 'prog-4',
    code: 'TESDA-SEP-26',
    title: 'TESDA Skills for Employment',
    sector: 'TVET',
    region: 'Nationwide',
    status: 'Draft',
    cycle: 'AY 2026-2027',
    slotsFilled: 0,
    totalSlots: 800,
    applicantsCount: 0,
    stipend: 15000,
    monthlyAllowance: 1500,
    bookAllowance: 1000,
    budgetSpent: 0,
    budgetTotal: 12000000,
    startDate: 'Apr 1, 2026',
    endDate: 'May 30, 2026',
    gwa: '75% (GWA 3.00)',
    maxIncome: '₱200,000 / year',
    yearLevel: 'All Levels (TVET)',
    residency: 'Nationwide',
    description: 'Technical-vocational grant for high-demand industrial skills training across TESDA-accredited institutions.',
    documents: ['PSA Birth Certificate', 'High School Diploma or ALS Certificate', 'Certificate of Good Moral Character'],
    essayPrompts: ['What technical skill do you want to master and why?'],
    prioritySectors: ['4Ps Beneficiary', 'Calamity-Affected']
  },
  {
    id: 'prog-5',
    code: 'DOST-JR-25',
    title: 'DOST Junior Science Scholarship',
    sector: 'Science',
    region: 'Nationwide',
    status: 'Paused',
    cycle: 'AY 2025-2026',
    slotsFilled: 205,
    totalSlots: 300,
    applicantsCount: 2140,
    stipend: 35000,
    monthlyAllowance: 3000,
    bookAllowance: 2000,
    budgetSpent: 6300000,
    budgetTotal: 10500000,
    startDate: 'Jul 10, 2025',
    endDate: 'Sep 30, 2025',
    gwa: '88% (GWA 1.75)',
    maxIncome: '₱300,000 / year',
    yearLevel: 'Grade 7-10',
    residency: 'Nationwide',
    description: 'Secondary science education stipend for young high-achieving STEM scholars entering Grades 7–10 in science high schools.',
    documents: ['PSA Birth Certificate', 'Report Card (Form 138)', 'Certificate of Good Moral Character', 'Parent ITR'],
    essayPrompts: ['Describe a science experiment you found fascinating and explain why.'],
    prioritySectors: ['Indigenous People', 'PWD']
  }
];

const ProviderPrograms = ({ setActiveView, setSelectedProgram }) => {
  const [programsList, setProgramsList] = useState(MOCK_PROGRAMS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('All cycles');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // KPI Calculations
  const publishedCount = programsList.filter(p => p.status === 'Published').length;
  const totalSlotsSum = programsList.reduce((s, p) => s + p.totalSlots, 0);
  const totalApplicantsSum = programsList.reduce((s, p) => s + p.applicantsCount, 0);
  const totalBudgetSum = programsList.reduce((s, p) => s + p.budgetTotal, 0);

  const filteredPrograms = programsList.filter(p => {
    if (activeTab !== 'All' && p.status !== activeTab) return false;
    if (selectedCycle !== 'All cycles' && p.cycle !== selectedCycle) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }
    return true;
  });

  const tabCounts = {
    All: programsList.length,
    Published: programsList.filter(p => p.status === 'Published').length,
    Draft: programsList.filter(p => p.status === 'Draft').length,
    Paused: programsList.filter(p => p.status === 'Paused').length,
    Closed: programsList.filter(p => p.status === 'Closed').length
  };

  const handleToggleStatus = (id, newStatus) => {
    setProgramsList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    setOpenDropdownId(null);
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDeleteProgram = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      setProgramsList(prev => prev.filter(p => p.id !== id));
      setOpenDropdownId(null);
      showToast('Program removed.');
    }
  };

  const handleDuplicate = (program) => {
    const copy = {
      ...program,
      id: `prog-${Date.now()}`,
      title: `${program.title} (Copy)`,
      code: `${program.code}-CPY`,
      status: 'Draft',
      slotsFilled: 0,
      applicantsCount: 0,
      budgetSpent: 0
    };
    setProgramsList([copy, ...programsList]);
    setOpenDropdownId(null);
    showToast('Program duplicated as draft.');
  };

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setActiveView('program-detail');
    setOpenDropdownId(null);
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
          <h2 className="programs-header-title">Scholarship Programs</h2>
          <p className="programs-header-subtitle">Manage, monitor, and publish your scholarship grants.</p>
        </div>
        <button className="btn-create-new-program" onClick={() => setActiveView('create-program')}>
          <Plus size={18} />
          <span>New Scholarship</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="summary-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Published programs</span>
          <span className="kpi-number">{publishedCount}</span>
          <span className="kpi-subtext">Currently accepting applicants</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Total slots offered</span>
          <span className="kpi-number">{totalSlotsSum.toLocaleString()}</span>
          <span className="kpi-subtext">Across all cycles</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Applicants received</span>
          <span className="kpi-number">{totalApplicantsSum.toLocaleString()}</span>
          <span className="kpi-subtext">All-time submissions</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Committed funding</span>
          <span className="kpi-number">₱{(totalBudgetSum / 1000000).toFixed(1)}M</span>
          <span className="kpi-subtext">Sum of all program budgets</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar">
          {/* Status Tabs */}
          <div className="status-tabs-group">
            {['All', 'Published', 'Draft', 'Paused', 'Closed'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? `All (${tabCounts.All})` : tab}
              </button>
            ))}
          </div>

          <div className="toolbar-controls-right">
            <div className="table-search-input-box">
              <Search size={15} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Search by title or code"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="table-select-cycle"
              value={selectedCycle}
              onChange={e => setSelectedCycle(e.target.value)}
            >
              <option value="All cycles">All cycles</option>
              <option value="AY 2026-2027">AY 2026-2027</option>
              <option value="AY 2025-2026">AY 2025-2026</option>
            </select>
            <button className="btn-table-export" onClick={() => showToast('Exporting to CSV...')}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Simplified Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>Program</th>
                <th>Status</th>
                <th>Slots</th>
                <th>Applicants</th>
                <th>Window</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">
                    No programs found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPrograms.map(program => {
                  const slotsPercent = Math.min(100, Math.round((program.slotsFilled / program.totalSlots) * 100));
                  return (
                    <tr
                      key={program.id}
                      className="program-table-row"
                      onClick={() => handleViewDetails(program)}
                    >
                      {/* Program */}
                      <td>
                        <div className="program-title-cell">
                          <span className="program-main-title">{program.title}</span>
                          <span className="program-code-sub">{program.code} · {program.sector} · {program.region}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td onClick={e => e.stopPropagation()}>
                        <span className={`status-badge-pill status-${program.status.toLowerCase()}`}>
                          {program.status}
                        </span>
                      </td>

                      {/* Slots */}
                      <td onClick={e => e.stopPropagation()}>
                        <div className="slots-progress-cell">
                          <span className="slots-fraction-text">
                            <strong>{program.slotsFilled}</strong>/{program.totalSlots}
                          </span>
                          <div className="mini-progress-track">
                            <div className="mini-progress-fill" style={{ width: `${slotsPercent}%` }} />
                          </div>
                        </div>
                      </td>

                      {/* Applicants */}
                      <td onClick={e => e.stopPropagation()}>
                        <div className="applicants-count-cell">
                          <Users size={13} color="#64748b" />
                          <span>{program.applicantsCount.toLocaleString()}</span>
                        </div>
                      </td>

                      {/* Application Window */}
                      <td onClick={e => e.stopPropagation()}>
                        <span className="table-date-text">
                          {program.startDate} → {program.endDate}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <div className="table-actions-cell">
                          <button
                            className="btn-row-view"
                            onClick={() => handleViewDetails(program)}
                            title="View details"
                          >
                            View <ChevronRight size={13} />
                          </button>

                          <div className="dropdown-action-wrapper">
                            <button
                              className="btn-dots-menu"
                              onClick={() => setOpenDropdownId(openDropdownId === program.id ? null : program.id)}
                            >
                              <MoreVertical size={16} />
                            </button>

                            {openDropdownId === program.id && (
                              <div className="action-dropdown-menu">
                                <button onClick={() => handleViewDetails(program)}>
                                  <ChevronRight size={13} /> View details
                                </button>
                                <button onClick={() => { setActiveView('create-program'); setOpenDropdownId(null); }}>
                                  <Edit size={13} /> Edit program
                                </button>
                                <button onClick={() => handleDuplicate(program)}>
                                  <Copy size={13} /> Duplicate
                                </button>
                                {program.status === 'Published' ? (
                                  <button onClick={() => handleToggleStatus(program.id, 'Paused')}>
                                    <PauseCircle size={13} /> Pause
                                  </button>
                                ) : (
                                  <button onClick={() => handleToggleStatus(program.id, 'Published')}>
                                    <CheckCircle size={13} /> Publish
                                  </button>
                                )}
                                {program.status !== 'Closed' && (
                                  <button onClick={() => handleToggleStatus(program.id, 'Closed')}>
                                    <XCircle size={13} /> Close
                                  </button>
                                )}
                                <button
                                  className="dropdown-delete-item"
                                  onClick={() => handleDeleteProgram(program.id, program.title)}
                                >
                                  <Trash2 size={13} /> Delete
                                </button>
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
      </div>
    </div>
  );
};

export default ProviderPrograms;
