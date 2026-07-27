import React from 'react';
import {
  ArrowLeft,
  Edit,
  Users,
  CalendarDays,
  BookOpen,
  FileText,
  CheckCircle,
  Award,
  MapPin,
  TrendingUp,
  Banknote,
  GraduationCap,
  ClipboardList,
  MessageSquare
} from 'lucide-react';
import './ProviderProgramDetail.css';

const ProviderProgramDetail = ({ program, setActiveView }) => {
  if (!program) {
    return (
      <div className="detail-empty-state">
        <p>No program selected.</p>
        <button onClick={() => setActiveView('my-programs')} className="btn-back-programs">
          Back to My Scholarships
        </button>
      </div>
    );
  }

  const slotsPercent = Math.min(100, Math.round((program.slotsFilled / program.totalSlots) * 100));
  const budgetPercent = Math.min(100, Math.round((program.budgetSpent / program.budgetTotal) * 100));

  return (
    <div className="program-detail-page">
      {/* Top Navigation Bar */}
      <div className="detail-topbar">
        <button className="btn-back-nav" onClick={() => setActiveView('my-programs')}>
          <ArrowLeft size={17} />
          <span>My Scholarships</span>
        </button>

        <div className="detail-topbar-actions">
          <span className={`status-badge-pill status-${program.status.toLowerCase()}`}>
            {program.status}
          </span>
          <button className="btn-detail-edit" onClick={() => setActiveView('create-program')}>
            <Edit size={15} />
            Edit Program
          </button>
        </div>
      </div>

      {/* Page Body */}
      <div className="detail-body">

        {/* Header Block */}
        <div className="detail-header-card">
          <div className="detail-header-meta">
            <span className="detail-program-code">{program.code}</span>
            <span className="detail-separator">·</span>
            <span className="detail-sector-tag">{program.sector} · {program.region}</span>
            <span className="detail-separator">·</span>
            <span className="detail-cycle-tag">{program.cycle}</span>
          </div>
          <h1 className="detail-program-title">{program.title}</h1>
          <p className="detail-program-desc">{program.description}</p>
        </div>

        {/* KPI Row */}
        <div className="detail-kpi-row">
          <div className="detail-kpi-tile">
            <div className="kpi-tile-icon"><Users size={18} color="#082894" /></div>
            <div className="kpi-tile-body">
              <span className="kpi-tile-label">Applicants</span>
              <span className="kpi-tile-value">{program.applicantsCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="detail-kpi-tile">
            <div className="kpi-tile-icon"><GraduationCap size={18} color="#082894" /></div>
            <div className="kpi-tile-body">
              <span className="kpi-tile-label">Slots Filled</span>
              <span className="kpi-tile-value">{program.slotsFilled} / {program.totalSlots}</span>
            </div>
          </div>

          <div className="detail-kpi-tile">
            <div className="kpi-tile-icon"><Banknote size={18} color="#082894" /></div>
            <div className="kpi-tile-body">
              <span className="kpi-tile-label">Stipend / Sem</span>
              <span className="kpi-tile-value">₱{program.stipend.toLocaleString()}</span>
            </div>
          </div>

          <div className="detail-kpi-tile">
            <div className="kpi-tile-icon"><TrendingUp size={18} color="#082894" /></div>
            <div className="kpi-tile-body">
              <span className="kpi-tile-label">Budget Utilized</span>
              <span className="kpi-tile-value">₱{(program.budgetSpent / 1000000).toFixed(1)}M / ₱{(program.budgetTotal / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        </div>

        {/* Two-Column Content Grid */}
        <div className="detail-content-grid">

          {/* LEFT COLUMN */}
          <div className="detail-left-col">

            {/* Slots Progress Card */}
            <div className="detail-section-card">
              <div className="detail-section-header">
                <GraduationCap size={17} color="#082894" />
                <h3>Slot Utilization</h3>
              </div>
              <div className="progress-detail-row">
                <div className="progress-labels">
                  <span>{program.slotsFilled} filled</span>
                  <span className="prog-percent-label">{slotsPercent}%</span>
                </div>
                <div className="detail-progress-track">
                  <div className="detail-progress-fill" style={{ width: `${slotsPercent}%` }} />
                </div>
                <span className="progress-sublabel">{program.totalSlots - program.slotsFilled} slots remaining</span>
              </div>
            </div>

            {/* Budget Utilization Card */}
            <div className="detail-section-card">
              <div className="detail-section-header">
                <TrendingUp size={17} color="#082894" />
                <h3>Budget Utilization</h3>
              </div>
              <div className="progress-detail-row">
                <div className="progress-labels">
                  <span>₱{(program.budgetSpent / 1000000).toFixed(2)}M used</span>
                  <span className="prog-percent-label">{budgetPercent}%</span>
                </div>
                <div className="detail-progress-track">
                  <div className="detail-progress-fill budget-fill" style={{ width: `${budgetPercent}%` }} />
                </div>
                <span className="progress-sublabel">Total: ₱{(program.budgetTotal / 1000000).toFixed(2)}M allocated</span>
              </div>
            </div>

            {/* Allowances Card */}
            <div className="detail-section-card">
              <div className="detail-section-header">
                <Banknote size={17} color="#082894" />
                <h3>Financial Benefits</h3>
              </div>
              <div className="benefit-list">
                <div className="benefit-row">
                  <span>Tuition Subsidy</span>
                  <strong>₱{program.stipend.toLocaleString()} / semester</strong>
                </div>
                <div className="benefit-row">
                  <span>Monthly Allowance</span>
                  <strong>₱{program.monthlyAllowance.toLocaleString()} / month</strong>
                </div>
                <div className="benefit-row">
                  <span>Book & Connectivity Allowance</span>
                  <strong>₱{program.bookAllowance.toLocaleString()} / year</strong>
                </div>
              </div>
            </div>

            {/* Documents Card */}
            <div className="detail-section-card">
              <div className="detail-section-header">
                <FileText size={17} color="#082894" />
                <h3>Required Documents</h3>
              </div>
              <ul className="doc-requirements-list">
                {program.documents.map((doc, i) => (
                  <li key={i} className="doc-req-item">
                    <CheckCircle size={14} color="#10b981" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="detail-right-col">

            {/* Eligibility Card */}
            <div className="detail-section-card">
              <div className="detail-section-header">
                <ClipboardList size={17} color="#082894" />
                <h3>Eligibility Criteria</h3>
              </div>
              <div className="eligibility-list">
                <div className="elig-row">
                  <Award size={14} color="#64748b" />
                  <div>
                    <span className="elig-label">Minimum GWA</span>
                    <strong className="elig-val">{program.gwa}</strong>
                  </div>
                </div>
                <div className="elig-row">
                  <Banknote size={14} color="#64748b" />
                  <div>
                    <span className="elig-label">Max Household Income</span>
                    <strong className="elig-val">{program.maxIncome}</strong>
                  </div>
                </div>
                <div className="elig-row">
                  <GraduationCap size={14} color="#64748b" />
                  <div>
                    <span className="elig-label">Year Level</span>
                    <strong className="elig-val">{program.yearLevel}</strong>
                  </div>
                </div>
                <div className="elig-row">
                  <MapPin size={14} color="#64748b" />
                  <div>
                    <span className="elig-label">Residency Requirement</span>
                    <strong className="elig-val">{program.residency}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Window Card */}
            <div className="detail-section-card">
              <div className="detail-section-header">
                <CalendarDays size={17} color="#082894" />
                <h3>Application Window</h3>
              </div>
              <div className="window-dates-row">
                <div className="window-date-block">
                  <span className="window-date-label">Opens</span>
                  <strong className="window-date-val">{program.startDate}</strong>
                </div>
                <div className="window-date-arrow">→</div>
                <div className="window-date-block">
                  <span className="window-date-label">Closes</span>
                  <strong className="window-date-val">{program.endDate}</strong>
                </div>
              </div>
            </div>

            {/* Priority Sectors Card */}
            {program.prioritySectors && program.prioritySectors.length > 0 && (
              <div className="detail-section-card">
                <div className="detail-section-header">
                  <Users size={17} color="#082894" />
                  <h3>Priority Sectors</h3>
                </div>
                <div className="sector-pills-wrap">
                  {program.prioritySectors.map((sector, i) => (
                    <span key={i} className="sector-pill">{sector}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Essay Prompts Card */}
            {program.essayPrompts && program.essayPrompts.length > 0 && (
              <div className="detail-section-card">
                <div className="detail-section-header">
                  <MessageSquare size={17} color="#082894" />
                  <h3>Essay Prompts</h3>
                </div>
                <ol className="essay-prompts-list">
                  {program.essayPrompts.map((prompt, i) => (
                    <li key={i} className="essay-prompt-item">
                      <span className="essay-num">{i + 1}</span>
                      <p>{prompt}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProgramDetail;
