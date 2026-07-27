import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, Upload, CheckCircle, Clock, XCircle,
  AlertCircle, ChevronDown, FileText, Building2,
  RefreshCw, ArrowRight
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderVerification.css';

/* ─── Constants ─────────────────────────────────────────── */
const PROVIDER_TYPES = [
  'Government Agency',
  'State University / HEI',
  'Local Government Unit (LGU)',
  'Private Foundation / NGO',
  'Private Higher Education Institution',
  'Corporate CSR Program',
];

const EMPTY_FORM = {
  orgName: '', providerType: '', tin: '',
  representative: '', designation: '',
  email: '', contactNumber: '', address: '',
  registrationDoc: null, birDoc: null, govIdDoc: null,
};

/* ─── File Upload Box (styled like Create Scholarship docs) ─ */
const FileUploadBox = ({ label, hint, value, onChange, error }) => {
  const ref = useRef();
  return (
    <div
      className={`verif-upload-box ${error ? 'verif-upload-error' : ''} ${value ? 'verif-upload-done' : ''}`}
      onClick={() => ref.current.click()}
    >
      <input
        type="file"
        ref={ref}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={e => onChange(e.target.files[0] || null)}
      />
      {value ? (
        <div className="verif-upload-inner">
          <CheckCircle size={22} color="#10b981" />
          <span className="verif-upload-filename">{value}</span>
          <span className="verif-upload-replace">Click to replace</span>
        </div>
      ) : (
        <div className="verif-upload-inner">
          <Upload size={22} color="#082894" />
          <span className="verif-upload-label">{label}</span>
          <span className="verif-upload-hint">{hint}</span>
          <button
            type="button"
            className="btn-draft-save"
            style={{ marginTop: '0.5rem' }}
            onClick={e => { e.stopPropagation(); ref.current.click(); }}
          >
            Browse files
          </button>
        </div>
      )}
      {error && <span className="verif-upload-err-msg">{error}</span>}
    </div>
  );
};

/* ─── Verification Status Tracker ─────────────────────────── */
const VerificationStatus = ({ application, onWithdraw, onReapply }) => {
  const steps = ['Submitted', 'Under Review', 'Decision'];
  const statusIdx = application.status === 'Pending' ? 0
    : application.status === 'Under Review' ? 1 : 2;
  const isApproved = application.status === 'Approved';
  const isRejected = application.status === 'Rejected';

  return (
    <div className="provider-builder-wrapper">
      {/* Header — same as Create Scholarship */}
      <div className="program-builder-header">
        <div className="builder-title-group">
          <h2>Provider Verification</h2>
          <p className="builder-subtitle">Track the status of your accreditation application.</p>
        </div>
        <div className="builder-header-actions">
          <span
            className="verified-provider-badge"
            style={
              isApproved ? {} :
              isRejected ? { background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' } :
              application.status === 'Under Review' ? { background: '#dbeafe', color: '#1d4ed8', borderColor: '#bfdbfe' } :
              { background: '#fef9c3', color: '#a16207', borderColor: '#fde68a' }
            }
          >
            <ShieldCheck size={14} />
            {application.status}
          </span>
          <span className="verif-ref-pill">{application.id}</span>
        </div>
      </div>

      {/* Stepper — reusing same stepper card style */}
      <div className="builder-stepper-card" style={{ justifyContent: 'flex-start', gap: '0' }}>
        {steps.map((s, i) => {
          const isDone = i < statusIdx || ((isApproved || isRejected) && i <= statusIdx);
          const isCurrent = i === statusIdx && !isApproved && !isRejected;
          return (
            <React.Fragment key={i}>
              <div className={`step-item ${isDone ? 'completed' : isCurrent ? 'active' : ''}`}>
                <div className="step-circle">
                  {isDone ? <CheckCircle size={16} /> : isCurrent ? <Clock size={16} /> : i + 1}
                </div>
                <div className="step-label-group">
                  <span className="step-title">{s}</span>
                  <span className="step-desc">
                    {i === 0 && new Date(application.submittedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {i === 1 && application.status !== 'Pending' && 'In progress'}
                    {i === 2 && (isApproved || isRejected) && application.updatedAt &&
                      new Date(application.updatedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={`step-line ${isDone ? 'filled' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Status Content Card */}
      <div className="builder-content-card">
        {/* Decision Banner */}
        {isApproved && (
          <div className="verif-decision-banner verif-approved">
            <CheckCircle size={20} color="#15803d" />
            <div>
              <strong>Application Approved</strong>
              <p>Your organization is now a verified provider on eScholar. You may publish scholarship programs.</p>
            </div>
          </div>
        )}
        {isRejected && (
          <div className="verif-decision-banner verif-rejected">
            <XCircle size={20} color="#dc2626" />
            <div>
              <strong>Application Not Approved</strong>
              <p>Your application was not approved. Please review the admin remarks and reapply.</p>
            </div>
          </div>
        )}
        {!isApproved && !isRejected && (
          <div className="verif-decision-banner verif-pending-banner">
            <Clock size={20} color="#d97706" />
            <div>
              <strong>{application.status === 'Under Review' ? 'Under Review' : 'Pending Review'}</strong>
              <p>
                {application.status === 'Under Review'
                  ? 'Your application is currently being reviewed by the admin team. You will be notified once a decision is made.'
                  : 'Your application has been submitted and is awaiting review. Accreditation takes 3–5 working days.'}
              </p>
            </div>
          </div>
        )}

        {/* Admin Remarks */}
        {application.adminNotes && (
          <div className="toggle-card" style={{ marginTop: '1.5rem', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <div className="toggle-info">
              <h4 style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Admin Remarks</h4>
              <p style={{ marginTop: '0.35rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: 500, lineHeight: 1.6 }}>{application.adminNotes}</p>
            </div>
          </div>
        )}

        {/* Summary of submitted info */}
        <div className="panel-header" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Submitted Application Details</h3>
          <p>Information as submitted during verification.</p>
        </div>

        <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
          {[
            ['Legal Organization Name', application.orgName],
            ['Provider Type', application.providerType],
            ['Tax Identification Number', application.tin],
            ['Authorized Representative', application.representative],
            ['Designation / Title', application.designation],
            ['Official Email', application.email],
            ['Contact Number', application.contactNumber],
          ].map(([label, val]) => (
            <div key={label} className="form-group">
              <label className="input-label" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                {label}
              </label>
              <div className="clean-input" style={{ color: '#0f172a', fontWeight: 600, cursor: 'default', userSelect: 'text' }}>
                {val}
              </div>
            </div>
          ))}
          <div className="form-group full-width">
            <label className="input-label" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              Principal Office Address
            </label>
            <div className="clean-input" style={{ color: '#0f172a', fontWeight: 600, cursor: 'default', userSelect: 'text' }}>
              {application.address}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Submitted Documents</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {[application.registrationDoc, application.birDoc, application.govIdDoc].filter(Boolean).map((d, i) => (
            <span key={i} className="verif-doc-chip">
              <FileText size={12} />{d}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="builder-footer-controls" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          <div />
          {(application.status === 'Pending' || application.status === 'Under Review') && (
            <button className="btn-step-back" onClick={onWithdraw}>
              Withdraw Application
            </button>
          )}
          {isRejected && (
            <button className="btn-step-continue" onClick={onReapply}>
              <RefreshCw size={15} /> Reapply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main ProviderVerification ─────────────────────────── */
const ProviderVerification = () => {
  const [view, setView] = useState('form');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [application, setApplication] = useState(null);
  const [savedDraft, setSavedDraft] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('provider_verification');
    if (saved) {
      setApplication(JSON.parse(saved));
      setView('status');
    } else {
      const draft = localStorage.getItem('provider_verification_draft');
      if (draft) setFormData(JSON.parse(draft));
    }
  }, []);

  const set = (field, val) => {
    setFormData(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate1 = () => {
    const e = {};
    if (!formData.orgName.trim())        e.orgName = 'Required';
    if (!formData.providerType)          e.providerType = 'Required';
    if (!formData.tin.trim())            e.tin = 'Required';
    if (!formData.representative.trim()) e.representative = 'Required';
    if (!formData.designation.trim())    e.designation = 'Required';
    if (!formData.email.trim())          e.email = 'Required';
    if (!formData.contactNumber.trim())  e.contactNumber = 'Required';
    if (!formData.address.trim())        e.address = 'Required';
    return e;
  };

  const validate2 = () => {
    const e = {};
    if (!formData.registrationDoc) e.registrationDoc = 'Required';
    if (!formData.birDoc)          e.birDoc = 'Required';
    if (!formData.govIdDoc)        e.govIdDoc = 'Required';
    return e;
  };

  const next = () => {
    const errs = step === 1 ? validate1() : step === 2 ? validate2() : {};
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveDraft = () => {
    localStorage.setItem('provider_verification_draft', JSON.stringify(formData));
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2500);
  };

  const submitApplication = () => {
    const appData = {
      ...formData,
      id: `VER-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      adminNotes: '',
      updatedAt: null,
    };
    const adminPool = JSON.parse(localStorage.getItem('admin_verif_apps') || '[]');
    adminPool.unshift(appData);
    localStorage.setItem('admin_verif_apps', JSON.stringify(adminPool));
    localStorage.setItem('provider_verification', JSON.stringify(appData));
    localStorage.removeItem('provider_verification_draft');
    setApplication(appData);
    setView('status');
  };

  const withdraw = () => {
    if (!window.confirm('Withdraw your verification application?')) return;
    const adminPool = JSON.parse(localStorage.getItem('admin_verif_apps') || '[]');
    localStorage.setItem('admin_verif_apps', JSON.stringify(adminPool.filter(a => a.id !== application.id)));
    localStorage.removeItem('provider_verification');
    setApplication(null);
    setFormData(EMPTY_FORM);
    setStep(1);
    setView('form');
  };

  const reapply = () => {
    localStorage.removeItem('provider_verification');
    setApplication(null);
    setFormData(EMPTY_FORM);
    setStep(1);
    setView('form');
  };

  if (view === 'status') {
    return <VerificationStatus application={application} onWithdraw={withdraw} onReapply={reapply} />;
  }

  const isGov = formData.providerType === 'Government Agency' || formData.providerType === 'Local Government Unit (LGU)';
  const regDocLabel = isGov ? 'Agency Charter / Executive Order' : 'SEC Certificate of Registration';
  const regDocHint  = isGov ? 'For government agencies and LGUs' : 'For private foundations and corporations';

  const STEPS = [
    { label: 'Organization Profile', desc: 'Legal entity & contact info' },
    { label: 'Supporting Documents', desc: 'Registration & ID uploads' },
    { label: 'Review & Submit', desc: 'Confirm and submit' },
  ];

  return (
    <div className="provider-builder-wrapper">
      {/* Draft saved toast */}
      {savedDraft && (
        <div className="draft-toast-banner">
          <CheckCircle size={16} /> Draft saved successfully.
        </div>
      )}

      {/* Header — identical to Create Scholarship header */}
      <div className="program-builder-header">
        <div className="builder-title-group">
          <h2>Provider Verification</h2>
          <p className="builder-subtitle">Submit your organization's credentials for accreditation review.</p>
        </div>
        <div className="builder-header-actions">
          <span className="verified-provider-badge" style={{ background: '#fef9c3', color: '#a16207', borderColor: '#fde68a' }}>
            <ShieldCheck size={14} /> Pending Verification
          </span>
          <button className="btn-draft-save" onClick={saveDraft}>
            Save draft
          </button>
        </div>
      </div>

      {/* Stepper — identical to Create Scholarship stepper */}
      <div className="builder-stepper-card">
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`step-item ${step === i + 1 ? 'active' : step > i + 1 ? 'completed' : ''}`}>
              <div className="step-circle">
                {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
              </div>
              <div className="step-label-group">
                <span className="step-title">{s.label}</span>
                <span className="step-desc">{s.desc}</span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${step > i + 1 ? 'filled' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 1: Organization Profile ── */}
      {step === 1 && (
        <div className="builder-content-card">
          <div className="panel-header">
            <h3>A. Organization Profile</h3>
            <p>Details must match your official registration papers exactly.</p>
          </div>

          <div className="form-grid">
            {/* Full-width: Legal Name */}
            <div className="form-group full-width">
              <label className="input-label">
                Legal Organization Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className={`clean-input ${errors.orgName ? 'verif-input-error' : ''}`}
                placeholder="e.g. Provincial Government of Laguna"
                value={formData.orgName}
                onChange={e => set('orgName', e.target.value)}
              />
              {errors.orgName && <span className="verif-field-err">{errors.orgName}</span>}
            </div>

            {/* Provider Type */}
            <div className="form-group">
              <label className="input-label">
                Provider Type <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  className={`clean-select ${errors.providerType ? 'verif-input-error' : ''}`}
                  value={formData.providerType}
                  onChange={e => set('providerType', e.target.value)}
                  style={{ width: '100%', paddingRight: '2.25rem', appearance: 'none' }}
                >
                  <option value="">Select provider type</option>
                  {PROVIDER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={15} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              </div>
              {errors.providerType && <span className="verif-field-err">{errors.providerType}</span>}
            </div>

            {/* TIN */}
            <div className="form-group">
              <label className="input-label">
                Tax Identification Number (TIN) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className={`clean-input ${errors.tin ? 'verif-input-error' : ''}`}
                placeholder="000-000-000-000"
                value={formData.tin}
                onChange={e => set('tin', e.target.value)}
              />
              {errors.tin && <span className="verif-field-err">{errors.tin}</span>}
            </div>

            {/* Authorized Rep */}
            <div className="form-group">
              <label className="input-label">
                Authorized Representative <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className={`clean-input ${errors.representative ? 'verif-input-error' : ''}`}
                placeholder="Full name as printed on valid ID"
                value={formData.representative}
                onChange={e => set('representative', e.target.value)}
              />
              {errors.representative && <span className="verif-field-err">{errors.representative}</span>}
            </div>

            {/* Designation */}
            <div className="form-group">
              <label className="input-label">
                Designation / Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className={`clean-input ${errors.designation ? 'verif-input-error' : ''}`}
                placeholder="e.g. Regional Director, Executive Director"
                value={formData.designation}
                onChange={e => set('designation', e.target.value)}
              />
              {errors.designation && <span className="verif-field-err">{errors.designation}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="input-label">
                Official Email Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                className={`clean-input ${errors.email ? 'verif-input-error' : ''}`}
                placeholder="scholarships@agency.gov.ph"
                value={formData.email}
                onChange={e => set('email', e.target.value)}
              />
              {errors.email && <span className="verif-field-err">{errors.email}</span>}
            </div>

            {/* Contact */}
            <div className="form-group">
              <label className="input-label">
                Official Contact Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="tel"
                className={`clean-input ${errors.contactNumber ? 'verif-input-error' : ''}`}
                placeholder="+63 917 000 0000"
                value={formData.contactNumber}
                onChange={e => set('contactNumber', e.target.value)}
              />
              {errors.contactNumber && <span className="verif-field-err">{errors.contactNumber}</span>}
            </div>

            {/* Address */}
            <div className="form-group full-width">
              <label className="input-label">
                Principal Office Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                className={`clean-textarea ${errors.address ? 'verif-input-error' : ''}`}
                placeholder="Building, street, city, province"
                value={formData.address}
                onChange={e => set('address', e.target.value)}
                rows={3}
              />
              {errors.address && <span className="verif-field-err">{errors.address}</span>}
            </div>
          </div>

          <div className="builder-footer-controls">
            <button className="btn-step-back" disabled>Back</button>
            <span className="step-counter-text">Step 1 of 3</span>
            <button className="btn-step-continue" onClick={next}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Documents ── */}
      {step === 2 && (
        <div className="builder-content-card">
          <div className="panel-header">
            <h3>B. Supporting Documents</h3>
            <p>Upload PDF or JPG files. Maximum 10 MB per file. All three documents are required.</p>
          </div>

          <div className="verif-docs-upload-grid">
            <FileUploadBox
              label={regDocLabel}
              hint={regDocHint}
              value={formData.registrationDoc}
              onChange={f => set('registrationDoc', f ? f.name : null)}
              error={errors.registrationDoc}
            />
            <FileUploadBox
              label="BIR Certificate of Registration"
              hint="BIR Form 2303"
              value={formData.birDoc}
              onChange={f => set('birDoc', f ? f.name : null)}
              error={errors.birDoc}
            />
            <FileUploadBox
              label="Government-Issued ID"
              hint="PhilID, Passport, or UMID of representative"
              value={formData.govIdDoc}
              onChange={f => set('govIdDoc', f ? f.name : null)}
              error={errors.govIdDoc}
            />
          </div>

          <div className="toggle-card" style={{ marginBottom: '0' }}>
            <div className="toggle-info">
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={15} color="#d97706" />
                Accreditation review takes <strong>&nbsp;3–5 working days</strong>. You will be notified by email once a decision is made.
              </p>
            </div>
          </div>

          <div className="builder-footer-controls">
            <button className="btn-step-back" onClick={() => setStep(1)}>Back</button>
            <span className="step-counter-text">Step 2 of 3</span>
            <button className="btn-step-continue" onClick={next}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Review & Submit ── */}
      {step === 3 && (
        <div className="builder-content-card">
          <div className="panel-header">
            <h3>C. Review & Submit</h3>
            <p>Please verify all information before submitting for accreditation review.</p>
          </div>

          <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              ['Legal Organization Name', formData.orgName],
              ['Provider Type', formData.providerType],
              ['Tax Identification Number', formData.tin],
              ['Authorized Representative', formData.representative],
              ['Designation / Title', formData.designation],
              ['Official Email', formData.email],
              ['Contact Number', formData.contactNumber],
            ].map(([label, val]) => (
              <div key={label} className="form-group">
                <label className="input-label" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {label}
                </label>
                <div className="clean-input" style={{ color: '#0f172a', fontWeight: 700, cursor: 'default', userSelect: 'text' }}>
                  {val || <span style={{ color: '#94a3b8', fontWeight: 400 }}>Not provided</span>}
                </div>
              </div>
            ))}

            <div className="form-group full-width">
              <label className="input-label" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Principal Office Address
              </label>
              <div className="clean-input" style={{ color: '#0f172a', fontWeight: 700, cursor: 'default', userSelect: 'text' }}>
                {formData.address}
              </div>
            </div>
          </div>

          {/* Attached Docs */}
          <div className="sectors-section" style={{ marginTop: 0 }}>
            <label className="input-label" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem', display: 'block' }}>
              Attached Documents
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[formData.registrationDoc, formData.birDoc, formData.govIdDoc].filter(Boolean).map((d, i) => (
                <span key={i} className="verif-doc-chip"><FileText size={12} />{d}</span>
              ))}
            </div>
          </div>

          {/* Certify Note */}
          <div className="gwa-slider-card" style={{ marginTop: '1.75rem', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.35rem' }}>
            <ShieldCheck size={16} color="#082894" />
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#0f172a', fontWeight: 600, lineHeight: 1.5 }}>
              By submitting, I certify that all information and documents provided are accurate, complete, and authentic.
            </p>
          </div>

          <div className="builder-footer-controls">
            <button className="btn-step-back" onClick={() => setStep(2)}>Back</button>
            <span className="step-counter-text">Step 3 of 3</span>
            <button className="btn-publish-program" onClick={submitApplication}>
              <ShieldCheck size={16} /> Submit for Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderVerification;
