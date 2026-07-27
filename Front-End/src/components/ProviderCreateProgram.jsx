import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  Search, 
  Bell, 
  ShieldCheck, 
  Save, 
  Plus, 
  Trash2, 
  Calendar, 
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Sliders,
  FileCheck,
  Building2,
  FileText
} from 'lucide-react';
import './ProviderCreateProgram.css';

const ProviderCreateProgram = ({ setActiveView }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false);
  const [saveDraftMessage, setSaveDraftMessage] = useState('');

  // Step 1 State: Metadata
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    slots: '',
    startDate: '',
    endDate: '',
    tuitionSubsidy: '',
    monthlyAllowance: '',
    bookAllowance: ''
  });

  // Step 2 State: Eligibility Engine
  const [eligibility, setEligibility] = useState({
    enforceMinGwa: false,
    minGwaPercent: 88,
    targetCourse: 'STEM / Computer Science & IT',
    maxIncome: '',
    yearLevel: 'Incoming freshmen',
    residency: 'Province of Laguna',
    prioritySectors: {
      pwd: false,
      fourPs: false,
      indigenous: false,
      soloParent: false,
      ofwChild: false,
      calamity: false
    }
  });

  // Step 3 State: Required Documents
  const [documents, setDocuments] = useState({
    psaBirth: false,
    form138: false,
    goodMoral: false,
    itrParent: false,
    indigency: false,
    barangayResidency: false,
    enrollmentCert: false,
    idPhoto: false,
    philSysId: false
  });
  const [customDocName, setCustomDocName] = useState('');
  const [customDocsList, setCustomDocsList] = useState([]);

  // Step 4 State: Essay Prompts
  const [essayPrompts, setEssayPrompts] = useState([]);
  const [newPromptText, setNewPromptText] = useState('');

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    setSaveDraftMessage('Draft saved successfully!');
    setTimeout(() => setSaveDraftMessage(''), 3000);
  };

  const handlePublishProgram = () => {
    setIsPublished(true);
    setTimeout(() => {
      setIsPublished(false);
      if (setActiveView) setActiveView('dashboard');
    }, 2500);
  };

  const handleAddPrompt = () => {
    if (newPromptText.trim() && essayPrompts.length < 5) {
      setEssayPrompts([...essayPrompts, newPromptText.trim()]);
      setNewPromptText('');
    }
  };

  const handleDeletePrompt = (index) => {
    setEssayPrompts(essayPrompts.filter((_, idx) => idx !== index));
  };

  const handleAddCustomDoc = () => {
    if (customDocName.trim()) {
      setCustomDocsList([...customDocsList, { name: customDocName.trim(), checked: true }]);
      setCustomDocName('');
    }
  };

  const calculateGwaScale = (percent) => {
    // 75% = 3.00 passing, 100% = 1.00 perfect
    const gwa = 3.00 - ((percent - 75) / 25) * 2.00;
    return gwa.toFixed(2);
  };

  return (
    <div className="provider-builder-wrapper">
      {/* Program Builder Header Banner */}
      <div className="program-builder-header">
        <div className="builder-title-group">
          <h2>Create a Scholarship</h2>
          <span className="builder-subtitle">Program Builder · Draft saved 2 minutes ago</span>
        </div>

        <div className="builder-header-actions">
          <div className="verified-provider-badge">
            <ShieldCheck size={16} className="badge-icon" />
            <span>Verified Provider</span>
          </div>

          <button className="btn-draft-save" onClick={handleSaveDraft}>
            <Save size={15} />
            <span>Save draft</span>
          </button>
        </div>
      </div>

      {saveDraftMessage && (
        <div className="draft-toast-banner">
          <Check size={16} /> {saveDraftMessage}
        </div>
      )}

      {/* Multi-Step Wizard Progress Bar */}
      <div className="builder-stepper-card">
        <div className={`step-item ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-circle" onClick={() => setCurrentStep(1)}>
            {currentStep > 1 ? <Check size={16} /> : '1'}
          </div>
          <div className="step-label-group">
            <span className="step-title">Metadata</span>
            <span className="step-desc">Title, slots & funding</span>
          </div>
        </div>

        <div className={`step-line ${currentStep > 1 ? 'filled' : ''}`}></div>

        <div className={`step-item ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-circle" onClick={() => setCurrentStep(2)}>
            {currentStep > 2 ? <Check size={16} /> : '2'}
          </div>
          <div className="step-label-group">
            <span className="step-title">Eligibility Engine</span>
            <span className="step-desc">Automated screening rules</span>
          </div>
        </div>

        <div className={`step-line ${currentStep > 2 ? 'filled' : ''}`}></div>

        <div className={`step-item ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>
          <div className="step-circle" onClick={() => setCurrentStep(3)}>
            {currentStep > 3 ? <Check size={16} /> : '3'}
          </div>
          <div className="step-label-group">
            <span className="step-title">Requirements</span>
            <span className="step-desc">Document checklist</span>
          </div>
        </div>

        <div className={`step-line ${currentStep > 3 ? 'filled' : ''}`}></div>

        <div className={`step-item ${currentStep === 4 ? 'active' : ''}`}>
          <div className="step-circle" onClick={() => setCurrentStep(4)}>
            4
          </div>
          <div className="step-label-group">
            <span className="step-title">Essay Prompts</span>
            <span className="step-desc">Custom questions & review</span>
          </div>
        </div>
      </div>

      {/* Main Step Content Card */}
      <div className="builder-content-card">
        {/* STEP 1: METADATA */}
        {currentStep === 1 && (
          <div className="step-panel">
            <div className="panel-header">
              <h3>Program Metadata</h3>
              <p>Public information shown to applicants across the eScholar network.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="input-label">Program Title</label>
                <input 
                  type="text" 
                  className="clean-input" 
                  value={metadata.title}
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                  placeholder="e.g. Laguna STEM Excellence Grant 2027"
                />
              </div>

              <div className="form-group full-width">
                <label className="input-label">Description</label>
                <textarea 
                  className="clean-textarea" 
                  rows={4}
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="Purpose, coverage and obligations of the grant..."
                />
              </div>

              <div className="form-group">
                <label className="input-label">Slots Available</label>
                <input 
                  type="number" 
                  className="clean-input" 
                  value={metadata.slots}
                  onChange={(e) => setMetadata({ ...metadata, slots: e.target.value })}
                  placeholder="500"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Application Start Date</label>
                <div className="date-input-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input 
                    type="date" 
                    className="clean-input with-icon" 
                    value={metadata.startDate}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    onChange={(e) => setMetadata({ ...metadata, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Application End Date</label>
                <div className="date-input-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input 
                    type="date" 
                    className="clean-input with-icon" 
                    value={metadata.endDate}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    onChange={(e) => setMetadata({ ...metadata, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Tuition Subsidy (per semester)</label>
                <div className="currency-input-wrapper">
                  <span className="currency-prefix">₱</span>
                  <input 
                    type="text" 
                    className="clean-input currency-input" 
                    value={metadata.tuitionSubsidy}
                    onChange={(e) => setMetadata({ ...metadata, tuitionSubsidy: e.target.value })}
                    placeholder="40,000.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Monthly Allowance</label>
                <div className="currency-input-wrapper">
                  <span className="currency-prefix">₱</span>
                  <input 
                    type="text" 
                    className="clean-input currency-input" 
                    value={metadata.monthlyAllowance}
                    onChange={(e) => setMetadata({ ...metadata, monthlyAllowance: e.target.value })}
                    placeholder="5,000.00"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label className="input-label">Book & Connectivity Allowance (optional)</label>
                <div className="currency-input-wrapper">
                  <span className="currency-prefix">₱</span>
                  <input 
                    type="text" 
                    className="clean-input currency-input" 
                    value={metadata.bookAllowance}
                    onChange={(e) => setMetadata({ ...metadata, bookAllowance: e.target.value })}
                    placeholder="3,000.00"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ELIGIBILITY ENGINE */}
        {currentStep === 2 && (
          <div className="step-panel">
            <div className="panel-header">
              <h3>Eligibility Engine</h3>
              <p>Applications are auto-screened against these rules before human review.</p>
            </div>

            <div className="toggle-card">
              <div className="toggle-info">
                <h4>Enforce minimum GWA</h4>
                <p>Applicants below the grade threshold are auto-declined.</p>
              </div>
              <label className="switch-toggle">
                <input 
                  type="checkbox" 
                  checked={eligibility.enforceMinGwa} 
                  onChange={(e) => setEligibility({ ...eligibility, enforceMinGwa: e.target.checked })}
                />
                <span className="slider-round"></span>
              </label>
            </div>

            {eligibility.enforceMinGwa && (
              <div className="gwa-slider-card">
                <div className="slider-header-row">
                  <span className="slider-title">Minimum GWA Threshold</span>
                  <span className="slider-value-pill">
                    {eligibility.minGwaPercent}% (GWA {calculateGwaScale(eligibility.minGwaPercent)})
                  </span>
                </div>
                <input 
                  type="range" 
                  min="75" 
                  max="100" 
                  value={eligibility.minGwaPercent}
                  onChange={(e) => setEligibility({ ...eligibility, minGwaPercent: parseInt(e.target.value, 10) })}
                  className="custom-range-slider"
                />
                <div className="slider-labels">
                  <span>75% (passing - GWA 3.00)</span>
                  <span>100% (perfect - GWA 1.00)</span>
                </div>
              </div>
            )}

            <div className="form-grid margin-top-15">
              <div className="form-group">
                <label className="input-label">Target Courses</label>
                <select 
                  className="clean-select"
                  value={eligibility.targetCourse}
                  onChange={(e) => setEligibility({ ...eligibility, targetCourse: e.target.value })}
                >
                  <option value="STEM / Computer Science & IT">STEM / Computer Science & IT</option>
                  <option value="Engineering & Tech">Engineering & Tech</option>
                  <option value="Business & Accountancy">Business & Accountancy</option>
                  <option value="Teacher Education">Teacher Education</option>
                  <option value="Health Sciences / Nursing">Health Sciences / Nursing</option>
                  <option value="All Accredited Programs">All Accredited Programs</option>
                </select>
              </div>

              <div className="form-group">
                <label className="input-label">Maximum Household Income (annual)</label>
                <div className="currency-input-wrapper">
                  <span className="currency-prefix">₱</span>
                  <input 
                    type="text" 
                    className="clean-input currency-input" 
                    value={eligibility.maxIncome}
                    onChange={(e) => setEligibility({ ...eligibility, maxIncome: e.target.value })}
                    placeholder="300,000.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Year Level</label>
                <select 
                  className="clean-select"
                  value={eligibility.yearLevel}
                  onChange={(e) => setEligibility({ ...eligibility, yearLevel: e.target.value })}
                >
                  <option value="Incoming freshmen">Incoming freshmen</option>
                  <option value="2nd Year Undergraduate">2nd Year Undergraduate</option>
                  <option value="3rd Year Undergraduate">3rd Year Undergraduate</option>
                  <option value="4th Year / Graduating">4th Year / Graduating</option>
                  <option value="All Year Levels">All Year Levels</option>
                </select>
              </div>

              <div className="form-group">
                <label className="input-label">Residency Requirement</label>
                <select 
                  className="clean-select"
                  value={eligibility.residency}
                  onChange={(e) => setEligibility({ ...eligibility, residency: e.target.value })}
                >
                  <option value="Province of Laguna">Province of Laguna</option>
                  <option value="Metro Manila (NCR)">Metro Manila (NCR)</option>
                  <option value="Cebu Province">Cebu Province</option>
                  <option value="Davao Region">Davao Region</option>
                  <option value="Nationwide">Nationwide (Philippines)</option>
                </select>
              </div>
            </div>

            <div className="sectors-section">
              <div className="sectors-header">
                <h4>Priority Sectors</h4>
                <p>Qualified applicants in these sectors receive scoring weight.</p>
              </div>

              <div className="checkbox-cards-grid">
                <label className={`check-card ${eligibility.prioritySectors.pwd ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={eligibility.prioritySectors.pwd} 
                    onChange={(e) => setEligibility({
                      ...eligibility,
                      prioritySectors: { ...eligibility.prioritySectors, pwd: e.target.checked }
                    })}
                  />
                  <span>Persons with Disability (PWD)</span>
                </label>

                <label className={`check-card ${eligibility.prioritySectors.fourPs ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={eligibility.prioritySectors.fourPs} 
                    onChange={(e) => setEligibility({
                      ...eligibility,
                      prioritySectors: { ...eligibility.prioritySectors, fourPs: e.target.checked }
                    })}
                  />
                  <span>4Ps Beneficiary</span>
                </label>

                <label className={`check-card ${eligibility.prioritySectors.indigenous ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={eligibility.prioritySectors.indigenous} 
                    onChange={(e) => setEligibility({
                      ...eligibility,
                      prioritySectors: { ...eligibility.prioritySectors, indigenous: e.target.checked }
                    })}
                  />
                  <span>Indigenous Peoples (IPs)</span>
                </label>

                <label className={`check-card ${eligibility.prioritySectors.soloParent ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={eligibility.prioritySectors.soloParent} 
                    onChange={(e) => setEligibility({
                      ...eligibility,
                      prioritySectors: { ...eligibility.prioritySectors, soloParent: e.target.checked }
                    })}
                  />
                  <span>Solo Parent Dependent</span>
                </label>

                <label className={`check-card ${eligibility.prioritySectors.ofwChild ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={eligibility.prioritySectors.ofwChild} 
                    onChange={(e) => setEligibility({
                      ...eligibility,
                      prioritySectors: { ...eligibility.prioritySectors, ofwChild: e.target.checked }
                    })}
                  />
                  <span>Child of OFW</span>
                </label>

                <label className={`check-card ${eligibility.prioritySectors.calamity ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={eligibility.prioritySectors.calamity} 
                    onChange={(e) => setEligibility({
                      ...eligibility,
                      prioritySectors: { ...eligibility.prioritySectors, calamity: e.target.checked }
                    })}
                  />
                  <span>Calamity-affected</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REQUIREMENTS */}
        {currentStep === 3 && (
          <div className="step-panel">
            <div className="panel-header">
              <h3>Required Documents</h3>
              <p>Applicants must upload every checked item before submitting their application.</p>
            </div>

            <div className="checkbox-cards-grid three-cols">
              <label className={`doc-card ${documents.psaBirth ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.psaBirth} 
                  onChange={(e) => setDocuments({ ...documents, psaBirth: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">PSA Birth Certificate</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.form138 ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.form138} 
                  onChange={(e) => setDocuments({ ...documents, form138: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">Form 138 (Report Card)</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.goodMoral ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.goodMoral} 
                  onChange={(e) => setDocuments({ ...documents, goodMoral: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">Certificate of Good Moral Character</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.itrParent ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.itrParent} 
                  onChange={(e) => setDocuments({ ...documents, itrParent: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">Latest ITR of Parent/Guardian</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.indigency ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.indigency} 
                  onChange={(e) => setDocuments({ ...documents, indigency: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">Certificate of Indigency</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.barangayResidency ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.barangayResidency} 
                  onChange={(e) => setDocuments({ ...documents, barangayResidency: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">Barangay Residency Certificate</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.enrollmentCert ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.enrollmentCert} 
                  onChange={(e) => setDocuments({ ...documents, enrollmentCert: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">Certificate of Enrollment</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.idPhoto ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.idPhoto} 
                  onChange={(e) => setDocuments({ ...documents, idPhoto: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">1x1 ID Photo</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              <label className={`doc-card ${documents.philSysId ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={documents.philSysId} 
                  onChange={(e) => setDocuments({ ...documents, philSysId: e.target.checked })}
                />
                <div className="doc-info">
                  <span className="doc-title">PhilSys / eGovPH ID</span>
                  <span className="doc-meta">PDF or image · max 10MB</span>
                </div>
              </label>

              {customDocsList.map((doc, idx) => (
                <label key={idx} className="doc-card selected">
                  <input type="checkbox" checked={true} readOnly />
                  <div className="doc-info">
                    <span className="doc-title">{doc.name}</span>
                    <span className="doc-meta">PDF or image · max 10MB</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="add-custom-doc-box">
              <input 
                type="text" 
                className="clean-input" 
                placeholder="Enter custom requirement name (e.g. Barangay Clearance)..." 
                value={customDocName}
                onChange={(e) => setCustomDocName(e.target.value)}
              />
              <button className="btn-add-item" onClick={handleAddCustomDoc}>
                <Plus size={16} /> Add Requirement
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ESSAY PROMPTS */}
        {currentStep === 4 && (
          <div className="step-panel">
            <div className="panel-header">
              <h3>Custom Essay Prompts</h3>
              <p>Up to 5 prompts, 500 words maximum limit each.</p>
            </div>

            <div className="prompts-list">
              {essayPrompts.map((prompt, idx) => (
                <div key={idx} className="prompt-item-card">
                  <span className="prompt-badge-num">{idx + 1}</span>
                  <p className="prompt-text-body">{prompt}</p>
                  <button 
                    className="btn-trash-delete" 
                    title="Delete prompt"
                    onClick={() => handleDeletePrompt(idx)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {essayPrompts.length < 5 && (
              <div className="add-prompt-row">
                <input 
                  type="text" 
                  className="clean-input flex-1" 
                  placeholder="e.g. What are your career aspirations in the next 5 years?"
                  value={newPromptText}
                  onChange={(e) => setNewPromptText(e.target.value)}
                />
                <button className="btn-add-prompt" onClick={handleAddPrompt}>
                  <Plus size={16} /> Add
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="builder-footer-controls">
          <button 
            className="btn-step-back" 
            disabled={currentStep === 1}
            onClick={handlePrevStep}
          >
            Back
          </button>

          <span className="step-counter-text">Step {currentStep} of 4</span>

          {currentStep < 4 ? (
            <button className="btn-step-continue" onClick={handleNextStep}>
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              className="btn-publish-program"
              onClick={handlePublishProgram}
            >
              {isPublished ? (
                <>
                  <Check size={18} /> Published Program!
                </>
              ) : (
                'Publish program'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderCreateProgram;
