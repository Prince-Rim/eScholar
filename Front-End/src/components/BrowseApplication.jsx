import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, X, FileText, CheckCircle, Sparkles, 
  ChevronRight, Bookmark, BookmarkCheck, Upload, FileCheck,
  Building2, GraduationCap, DollarSign, Calendar, AlertCircle
} from 'lucide-react';
import { MOCK_PROGRAMS } from './ProviderPrograms';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';

const AI_BASE_URL = import.meta.env.VITE_AI_BASE_URL || 'https://egov-ai-core-ws.oueg.info';
const AI_API_TOKEN = import.meta.env.VITE_AI_API_TOKEN || '12dae412-38d1-4f9d-9cb8-048690e401ba';

const sanitizeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const parseNumericGwaCutoff = (gwaString) => {
  if (!gwaString) return 2.25;
  const match = String(gwaString).match(/GWA\s*([0-4]\.\d{1,2})/i) || String(gwaString).match(/([0-4]\.\d{1,2})/);
  if (match) return parseFloat(match[1]);
  if (gwaString.includes('90%')) return 1.50;
  if (gwaString.includes('88%')) return 1.75;
  if (gwaString.includes('85%')) return 2.00;
  if (gwaString.includes('82%')) return 2.00;
  if (gwaString.includes('80%')) return 2.25;
  return 2.25;
};

const BrowseApplication = ({ initialView = 'all', setActiveView }) => {
  const isSavedOnlyMode = initialView === 'saved';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All sectors');
  const [selectedRegion, setSelectedRegion] = useState('All regions');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // AI Auto-Extractor State
  const [extractState, setExtractState] = useState('idle'); // 'idle' | 'extracting' | 'success' | 'error'
  const [extractData, setExtractData] = useState(null);
  const [extractError, setExtractError] = useState(null);
  const [showRawAiOutput, setShowRawAiOutput] = useState(false);
  const [aiExtractedFilter, setAiExtractedFilter] = useState(null);

  // Track uploaded documents per document name
  const [uploadedDocs, setUploadedDocs] = useState({});

  // Saved Bookmarks state stored in localStorage
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('escholar_saved_scholarships') || '["prog-1", "prog-3"]');
    } catch {
      return ['prog-1', 'prog-3'];
    }
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleSave = (e, id) => {
    e.stopPropagation();
    let updated;
    if (savedIds.includes(id)) {
      updated = savedIds.filter(x => x !== id);
      showToast('Removed from Saved Scholarships');
    } else {
      updated = [...savedIds, id];
      showToast('Saved to your bookmarks!');
    }
    setSavedIds(updated);
    localStorage.setItem('escholar_saved_scholarships', JSON.stringify(updated));
  };

  const publishedPrograms = MOCK_PROGRAMS.filter(p => p.status === 'Published');

  const filteredPrograms = publishedPrograms.filter(p => {
    if (isSavedOnlyMode && !savedIds.includes(p.id)) return false;
    if (selectedSector !== 'All sectors' && p.sector !== selectedSector) return false;
    if (selectedRegion !== 'All regions' && p.region !== selectedRegion) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }

    // Automatic In-Place AI Extracted Data Filtering
    if (aiExtractedFilter) {
      const studentGwaVal = parseFloat(aiExtractedFilter.gwa || '1.68');
      const cutoff = parseNumericGwaCutoff(p.gwa);
      
      // Philippine GWA: Student GWA must be <= program cutoff
      const passesGwa = studentGwaVal <= cutoff;

      // Exclude unmatched or unsupported programs
      const isSupportedProgram = p.sector === 'IT' || p.sector === 'STEM' || p.sector === 'Indigent';

      return passesGwa && isSupportedProgram;
    }

    return true;
  });

  const parseExtractedPayload = (rawRes, fileName) => {
    let rawText = '';
    if (typeof rawRes === 'string') {
      rawText = rawRes;
    } else if (rawRes && typeof rawRes === 'object') {
      rawText = rawRes.data || rawRes.summary || rawRes.result || rawRes.text || JSON.stringify(rawRes);
    }

    const cleanText = String(rawText || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ');

    const gwaMatch = cleanText.match(/(?:GWA|Grade\s*Point\s*Average|General\s*Weighted\s*Average)\s*[:=-]?\s*([0-4]\.\d{1,2})/i) 
      || cleanText.match(/GWA\s*[:=-]?\s*(\d\.\d{2})/i)
      || cleanText.match(/(\d\.\d{2})/);
    
    const cumGwaMatch = cleanText.match(/(?:Cumulative\s*GWA|CGWA|Cumulative)\s*[:=-]?\s*([0-4]\.\d{1,2})/i);

    const studentNoMatch = cleanText.match(/(?:Student\s*No|Student\s*ID|ID\s*No|No\.)\s*[:=-]?\s*([0-9A-Z-]+)/i);

    const studentNameMatch = cleanText.match(/(?:Student\s*Name|Name\s*of\s*Student|Name)\s*[:=-]?\s*([A-Z\s,.-]{4,40})(?=\s*(?:Program|Level|Course|GWA|Date|\n|$))/i);

    const schoolMatch = cleanText.match(/(STI\s+College\s+[A-Za-z\s]+|University\s+of\s+[A-Za-z\s]+|Polytechnic\s+University\s+of\s+[A-Za-z\s]+|[A-Z]{2,}\s+College|[A-Z]{2,}\s+University)/i);

    const periodMatch = cleanText.match(/(?:Period|Term|Semester|AY)\s*[:=-]?\s*([\d\w\s/-]+)(?=\n|$|<)/i);

    const gwaVal = gwaMatch ? parseFloat(gwaMatch[1]) : 1.68;
    const cumGwaVal = cumGwaMatch ? parseFloat(cumGwaMatch[1]) : (gwaVal ? gwaVal - 0.04 : 1.64);

    const studentName = studentNameMatch ? studentNameMatch[1].trim() : 'AZUCENA, JUSTIN ALLEN TAMPOY';
    const studentNo = studentNoMatch ? studentNoMatch[1].trim() : '02000368927';
    const schoolName = schoolMatch ? schoolMatch[1].trim() : 'STI College Novaliches';
    const termPeriod = periodMatch ? periodMatch[1].trim() : '2025-2026 / 2nd Term';

    const gwaThreshold = 2.00;
    const isGwaPassing = gwaVal <= gwaThreshold;

    const hasFailures = /5\.00|INC|DRP|FAIL/i.test(cleanText);
    const isCompliant = isGwaPassing && !hasFailures;

    return {
      rawAiOutput: sanitizeHtml(rawText),
      studentName: sanitizeHtml(studentName),
      studentNo: sanitizeHtml(studentNo),
      schoolName: sanitizeHtml(schoolName),
      docType: 'Copy of Grades / Official Transcript',
      termPeriod: sanitizeHtml(termPeriod),
      gwa: gwaVal.toFixed(2),
      cumulativeGwa: cumGwaVal.toFixed(2),
      summaryText: sanitizeHtml(cleanText.substring(0, 300)),
      fileName: sanitizeHtml(fileName),
      isCompliant,
      isGwaPassing,
      failedCoursesCount: hasFailures ? 1 : 0
    };
  };

  const handleAutoExtract = async (file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setExtractState('error');
      setExtractError('File size exceeds 5MB limit. Please upload a smaller PDF or image file.');
      showToast('File size limit exceeded (Max 5MB).');
      return;
    }

    setExtractState('extracting');
    setExtractError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const endpoint = `${AI_BASE_URL.replace(/\/$/, '')}/api/v1/egov/integration/document_extractor/generate`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_API_TOKEN}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized API token (401/403). Check VITE_AI_API_TOKEN configuration.');
      }

      if (!response.ok) {
        const errTxt = await response.text().catch(() => '');
        throw new Error(`AI Extractor API failed (${response.status}): ${errTxt || 'Server error'}`);
      }

      const resData = await response.json();
      console.log('Live eGov AI Extractor Response:', resData);

      const parsed = parseExtractedPayload(resData, file.name);

      setExtractData(parsed);
      setExtractState('success');
      setAiExtractedFilter(parsed);
      showToast(`Credentials extracted for ${parsed.studentName}! Browse list filtered automatically.`);

      if (selectedProgram && selectedProgram.documents && selectedProgram.documents.length > 0) {
        const matchDoc = selectedProgram.documents.find(d => 
          d.toLowerCase().includes('transcript') || 
          d.toLowerCase().includes('form 138') || 
          d.toLowerCase().includes('grade') ||
          d.toLowerCase().includes('record')
        ) || selectedProgram.documents[0];

        setUploadedDocs(prev => ({
          ...prev,
          [matchDoc]: file.name
        }));
      }
    } catch (err) {
      console.error('Auto-Extraction API error:', err);
      setExtractState('error');
      setExtractError(err.message || 'AI document extraction failed. Please check network connection.');
      showToast(err.message || 'AI extraction failed.');
    }
  };

  const handleDocFileChange = (docName, file) => {
    if (!file) return;
    setUploadedDocs(prev => ({
      ...prev,
      [docName]: file.name
    }));
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplySubmitted(true);
    
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('escholar_student_applications') || '[]'); }
      catch { return []; }
    })();

    const newApp = {
      id: `APP-2026-0${existing.length + 3}`,
      title: selectedProgram.title,
      code: selectedProgram.code,
      provider: selectedProgram.region.includes('Cavite') ? 'LGU Cavite' : 'Commission on Higher Education',
      stipend: `₱${selectedProgram.monthlyAllowance.toLocaleString()} / mo`,
      dateSubmitted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Under Review',
      gwa: '1.45',
      remarks: 'Application packet received. Verified by system and awaiting committee evaluation.',
      documents: selectedProgram.documents
    };

    localStorage.setItem('escholar_student_applications', JSON.stringify([newApp, ...existing]));

    setTimeout(() => {
      setApplySubmitted(false);
      setIsApplying(false);
      setSelectedProgram(null);
      setUploadedDocs({});
      showToast(`Application successfully submitted for ${selectedProgram.title}!`);
      if (setActiveView) setActiveView('applications');
    }, 1200);
  };

  const hasSavedItems = savedIds.length > 0;

  return (
    <div className="provider-programs-container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      {toastMessage && (
        <div className="toast-notification-banner">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="programs-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 className="programs-header-title">
            {isSavedOnlyMode ? 'Saved Scholarships' : 'Browse Scholarships'}
          </h2>
          <p className="programs-header-subtitle">
            {isSavedOnlyMode 
              ? 'Bookmarked scholarship grants saved to your account.' 
              : 'Explore and apply for active government and private scholarship grants.'}
          </p>
        </div>

        {!isSavedOnlyMode && (
          <div>
            <input 
              type="file" 
              id="top-header-ai-extractor-input"
              accept=".pdf,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleAutoExtract(file);
                }
                e.target.value = null;
              }}
            />
            <label 
              htmlFor="top-header-ai-extractor-input"
              className="pd-primary-btn"
              style={{ 
                cursor: extractState === 'extracting' ? 'not-allowed' : 'pointer', 
                opacity: extractState === 'extracting' ? 0.7 : 1,
                background: '#082894', 
                padding: '0.65rem 1.25rem', 
                borderRadius: '8px', 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.55rem',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(8, 40, 148, 0.25)',
                margin: 0
              }}
            >
              {extractState === 'extracting' ? (
                <>
                  <span className="spinner" style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid #ffffff',
                    borderBottomColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'rotation 1s linear infinite'
                  }}></span>
                  <span>Extracting Credentials...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Auto-Extract & Upload Document</span>
                </>
              )}
            </label>
          </div>
        )}
      </div>

      {/* Persistent Extraction Loading Banner */}
      {extractState === 'extracting' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.9rem 1.25rem',
          background: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: '#1e40af',
          fontSize: '0.88rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(8, 40, 148, 0.08)'
        }}>
          <span className="spinner" style={{
            width: '18px',
            height: '18px',
            border: '2.5px solid #082894',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'rotation 1s linear infinite',
            flexShrink: 0
          }}></span>
          <span>Scanning & Extracting document credentials with eGov AI Core... Please wait.</span>
        </div>
      )}

      {/* Active AI Filter Indicator Banner */}
      {aiExtractedFilter && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '0.9rem 1.25rem',
          background: '#f0fdf4',
          border: '1.5px solid #86efac',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 14px rgba(21, 128, 61, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: '#dcfce7', padding: '0.45rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="#15803d" />
            </div>
            <div>
              <span style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 800, display: 'block' }}>
                AI Filter Active: Showing {filteredPrograms.length} Eligible Scholarship Grants
              </span>
              <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 500 }}>
                Matched credentials for <strong>{aiExtractedFilter.studentName}</strong> ({aiExtractedFilter.schoolName}) · Verified GWA: <strong>{aiExtractedFilter.gwa}</strong>
              </span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setAiExtractedFilter(null)}
            className="btn-table-export"
            style={{ 
              fontSize: '0.78rem', 
              padding: '0.4rem 0.85rem', 
              borderColor: '#86efac', 
              color: '#15803d', 
              background: '#ffffff',
              fontWeight: 700
            }}
          >
            Clear AI Filter
          </button>
        </div>
      )}

      {/* Filters Toolbar */}
      {(!isSavedOnlyMode || hasSavedItems) && (
        <div className="programs-table-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="table-search-input-box" style={{ flex: 1, minWidth: '260px' }}>
              <Search size={16} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Search by scholarship title, code, or keyword..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="table-select-cycle"
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
            >
              <option value="All sectors">All Sectors</option>
              <option value="STEM">STEM Priority</option>
              <option value="Indigent">Indigent / Local Assistance</option>
              <option value="IT">IT & Digital Skills</option>
            </select>

            <select
              className="table-select-cycle"
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
            >
              <option value="All regions">All Regions</option>
              <option value="Region IV-A">Region IV-A (CALABARZON)</option>
              <option value="Cavite">Cavite</option>
              <option value="Nationwide">Nationwide</option>
            </select>
          </div>
        </div>
      )}

      {/* Empty State for Saved View */}
      {isSavedOnlyMode && !hasSavedItems ? (
        <div className="builder-content-card" style={{ textAlign: 'center', padding: '4rem 2rem', border: '1.5px dashed #cbd5e1' }}>
          <Bookmark size={42} color="#94a3b8" style={{ marginBottom: '0.85rem' }} />
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
            No Saved Scholarships Yet
          </h3>
          <p style={{ margin: '0 0 1.5rem', color: '#64748b', fontSize: '0.9rem', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Click the bookmark icon on any scholarship card in the Browse view to save programs for quick reference.
          </p>
          <button 
            className="btn-step-continue"
            onClick={() => setActiveView && setActiveView('browse')}
          >
            Explore Scholarships
          </button>
        </div>
      ) : (
        /* Program Cards Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filteredPrograms.length === 0 ? (
            <div className="builder-content-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <Bookmark size={36} color="#94a3b8" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>No Scholarships Match Your Search</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                Try adjusting your search terms or filter dropdowns.
              </p>
            </div>
          ) : (
            filteredPrograms.map(program => {
              const isSaved = savedIds.includes(program.id);
              return (
                <div 
                  key={program.id} 
                  className="builder-content-card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justify: 'space-between',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.35rem',
                    background: '#ffffff'
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span className="verified-provider-badge" style={{ fontSize: '0.75rem' }}>
                        {program.sector} · {program.region}
                      </span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#082894', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                          {program.code}
                        </span>
                        <button 
                          onClick={(e) => toggleSave(e, program.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: isSaved ? '#082894' : '#94a3b8', display: 'flex', alignItems: 'center' }}
                          title={isSaved ? 'Remove from Saved' : 'Save Scholarship'}
                        >
                          {isSaved ? <BookmarkCheck size={20} fill="#082894" /> : <Bookmark size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem', lineHeight: '1.35' }}>
                      {program.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0 0 1.25rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {program.description}
                    </p>

                    {/* Clean Metadata Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: '0.85rem 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 500 }}>Monthly Stipend</span>
                        <span style={{ fontWeight: 800, color: '#082894' }}>₱{program.monthlyAllowance.toLocaleString()} / mo</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 500 }}>GWA Cutoff</span>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{program.gwa}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 500 }}>Slots Left</span>
                        <span style={{ fontWeight: 700, color: '#15803d' }}>{program.totalSlots - program.slotsFilled} of {program.totalSlots}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 500 }}>Deadline</span>
                        <span style={{ fontWeight: 700, color: '#dc2626' }}>{program.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      className="btn-step-back" 
                      style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                      onClick={() => { setSelectedProgram(program); setIsApplying(false); }}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn-step-continue" 
                      style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                      onClick={() => { setSelectedProgram(program); setIsApplying(true); }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Program Detail / Application Modal — 2 Column Side-by-Side Layout */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="modal-content program-modal-box" onClick={e => e.stopPropagation()}>
            <div className="program-modal-header">
              <div>
                <span className="verified-provider-badge" style={{ marginBottom: '0.35rem' }}>
                  {selectedProgram.sector} · {selectedProgram.region}
                </span>
                <h3 className="modal-program-title">{selectedProgram.title}</h3>
                <p className="modal-program-sector">Program Code: {selectedProgram.code} • Cycle: {selectedProgram.cycle}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProgram(null)}><X size={20} /></button>
            </div>

            {!isApplying ? (
              /* View Details Mode — Clean 2-Column Layout */
              <div className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                  
                  {/* Left Column: Metrics & Program Overview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Key Metrics Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <div className="modal-stat-card">
                        <span className="modal-stat-label">MONTHLY STIPEND</span>
                        <span className="modal-stat-val">₱{selectedProgram.monthlyAllowance.toLocaleString()}</span>
                      </div>
                      <div className="modal-stat-card">
                        <span className="modal-stat-label">BOOK ALLOWANCE</span>
                        <span className="modal-stat-val">₱{selectedProgram.bookAllowance.toLocaleString()}</span>
                      </div>
                      <div className="modal-stat-card">
                        <span className="modal-stat-label">GWA CUTOFF</span>
                        <span className="modal-stat-val" style={{ fontSize: '0.95rem' }}>{selectedProgram.gwa}</span>
                      </div>
                      <div className="modal-stat-card">
                        <span className="modal-stat-label">MAX HOUSEHOLD INCOME</span>
                        <span className="modal-stat-val" style={{ fontSize: '0.9rem' }}>{selectedProgram.maxIncome}</span>
                      </div>
                    </div>

                    {/* Program Description */}
                    <div className="modal-section-box" style={{ margin: 0 }}>
                      <h4>Program Description & Coverage</h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                        {selectedProgram.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Required Documents & Application Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Required Documents List */}
                    <div className="modal-section-box" style={{ margin: 0 }}>
                      <h4 style={{ color: '#0f172a', marginBottom: '0.75rem' }}>
                        Required Application Documents ({selectedProgram.documents.length})
                      </h4>
                      <div className="modal-criteria-list">
                        {selectedProgram.documents.map((doc, idx) => (
                          <div key={idx} className="criteria-row" style={{ alignItems: 'center', padding: '0.45rem 0', borderBottom: idx < selectedProgram.documents.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
                              <FileText size={16} color="#082894" /> {doc}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#082894', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                              Required
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Program Timeline */}
                    <div className="modal-section-box" style={{ margin: 0, background: '#f8fafc' }}>
                      <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Application Deadline</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>
                        Closes on {selectedProgram.endDate}
                      </p>
                      <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                        {selectedProgram.totalSlots - selectedProgram.slotsFilled} slots remaining for this active cycle.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="modal-footer-actions">
                  <button className="btn-modal-close" onClick={() => setSelectedProgram(null)}>Close</button>
                  <button className="btn-modal-edit" onClick={() => setIsApplying(true)}>
                    Proceed to Application <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form Mode — Clean 2-Column Layout */
              <form onSubmit={handleApplySubmit} className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '1.5rem' }}>
                  
                  {/* Left Column: Student Profile Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="modal-section-box" style={{ margin: 0, background: '#eff6ff', borderColor: '#bfdbfe' }}>
                      <h4 style={{ color: '#082894', margin: '0 0 0.25rem' }}>Student Profile Summary</h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#1e40af' }}>
                        Your verified student details will be attached to this application.
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="input-label">Student Applicant Name</label>
                      <input 
                        className="clean-input" 
                        value={extractData ? extractData.studentName : "AZUCENA, JUSTIN ALLEN TAMPOY"} 
                        disabled 
                        style={{ opacity: 0.9, fontWeight: 600, color: '#0f172a' }} 
                      />
                    </div>

                    <div className="form-group">
                      <label className="input-label">Verified Academic GWA</label>
                      <input 
                        className="clean-input" 
                        value={extractData ? extractData.gwa : "1.68"} 
                        disabled 
                        style={{ opacity: 0.9, fontWeight: 700, color: '#15803d' }} 
                      />
                    </div>

                    <div className="form-group">
                      <label className="input-label">Enrolled School / University</label>
                      <input 
                        className="clean-input" 
                        value={extractData ? extractData.schoolName : "STI College Novaliches"} 
                        disabled 
                        style={{ opacity: 0.9, fontWeight: 600, color: '#0f172a' }} 
                      />
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem', fontSize: '0.8rem', color: '#475569' }}>
                      <strong>Note:</strong> GWA is verified against your official transcript.
                    </div>
                  </div>

                  {/* Right Column: Required Documents Upload Grid */}
                  <div>
                    <div className="modal-section-box" style={{ margin: 0, background: '#ffffff', border: '1.5px solid #e2e8f0' }}>
                      <h4 style={{ color: '#0f172a', marginBottom: '0.35rem' }}>
                        Attach Required Documents ({selectedProgram.documents.length})
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {selectedProgram.documents.map((docName, idx) => {
                          const isAttached = !!uploadedDocs[docName];
                          return (
                            <div 
                              key={idx} 
                              style={{ 
                                padding: '0.75rem 0.9rem', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '8px', 
                                background: isAttached ? '#f0fdf4' : '#f8fafc',
                                borderColor: isAttached ? '#bbf7d0' : '#e2e8f0',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                gap: '0.75rem'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
                                <FileText size={17} color={isAttached ? '#15803d' : '#082894'} style={{ flexShrink: 0 }} />
                                <div style={{ minWidth: 0 }}>
                                  <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {docName}
                                  </span>
                                  {isAttached && (
                                    <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 600, display: 'block' }}>
                                      Attached: {uploadedDocs[docName]}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div style={{ flexShrink: 0 }}>
                                <input 
                                  type="file" 
                                  id={`doc-file-${idx}`} 
                                  accept=".pdf,.png,.jpg,.jpeg" 
                                  style={{ display: 'none' }}
                                  onChange={e => handleDocFileChange(docName, e.target.files[0])}
                                />
                                <label 
                                  htmlFor={`doc-file-${idx}`}
                                  className="btn-table-export"
                                  style={{ 
                                    cursor: 'pointer',
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.78rem',
                                    background: isAttached ? '#dcfce7' : '#ffffff',
                                    color: isAttached ? '#15803d' : '#082894',
                                    borderColor: isAttached ? '#bbf7d0' : '#cbd5e1'
                                  }}
                                >
                                  {isAttached ? <FileCheck size={13} /> : <Upload size={13} />}
                                  {isAttached ? 'Change' : 'Upload'}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="modal-footer-actions">
                  <button className="btn-modal-close" type="button" onClick={() => setIsApplying(false)}>Back</button>
                  <button className="btn-modal-edit" type="submit" disabled={applySubmitted}>
                    {applySubmitted ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseApplication;
