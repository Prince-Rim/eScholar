import React, { useState, useEffect, useRef } from 'react';
import {
  User, Lock, Bell, Monitor, AlertTriangle,
  Eye, EyeOff, CheckCircle, Camera, Shield, ShieldCheck,
  Smartphone, LogOut, Clock, Globe, Mail,
  Phone, Building2, MapPin, Save, ChevronRight,
  X, ToggleLeft, ToggleRight, Key, Trash2, RefreshCw, FileText
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderSettings.css';

/* ── Default profiles (loaded from localStorage or defaults) ─ */
const DEFAULT_PROVIDER_PROFILE = {
  firstName: 'Divina',
  lastName: 'Ramos',
  designation: 'Regional Director',
  email: 'provider@example.com',
  contactNumber: '+63 917 000 0001',
  orgName: 'CHED Region IV-A',
  orgType: 'Government Agency',
  orgEmail: 'scholarships@ched4a.gov.ph',
  orgPhone: '(049) 523-0017',
  orgAddress: '2F BEF Bldg., National Highway, Calamba City, Laguna',
  bio: 'Overseeing higher education scholarship programs across Calabarzon.',
  avatarInitials: 'DR',
};

const DEFAULT_ADMIN_PROFILE = {
  firstName: 'Fransee',
  lastName: 'Azucena',
  designation: 'System Administrator',
  email: 'admin@escholar.gov.ph',
  contactNumber: '+63 917 888 9999',
  orgName: 'eScholar National Administration',
  orgType: 'System Administrator',
  orgEmail: 'admin@escholar.gov.ph',
  orgPhone: '(02) 8888-0000',
  orgAddress: 'DICT Central Office, C.P. Garcia Ave, Diliman, Quezon City',
  bio: 'Managing platform governance, security compliance, and provider verifications.',
  avatarInitials: 'FA',
};

const DEFAULT_STUDENT_PROFILE = {
  firstName: 'Fransee',
  lastName: 'Azucena',
  designation: 'Student Applicant',
  email: 'student@escholar.ph',
  contactNumber: '+63 918 123 4567',
  orgName: 'University of the Philippines Los Baños',
  orgType: 'Undergraduate Student',
  orgEmail: 'student@escholar.ph',
  orgPhone: '+63 918 123 4567',
  orgAddress: 'College, Los Baños, Laguna, 4031',
  bio: 'Passionate STEM student pursuing higher education opportunities.',
  avatarInitials: 'FA',
};

const DEFAULT_NOTIF = {
  newApplicant: true,
  applicationStatus: true,
  slotAlert: true,
  deadlineReminder: true,
  verificationUpdate: true,
  systemUpdates: false,
  smsNewApplicant: false,
  smsDeadline: true,
  emailWeeklyDigest: true,
};

const MOCK_SESSIONS = [
  { id: 1, device: 'Chrome on Windows 11', location: 'Calamba City, Laguna, PH', lastActive: 'Active now', current: true, icon: 'desktop' },
  { id: 2, device: 'Safari on iPhone 15',  location: 'Quezon City, PH',          lastActive: '3 hours ago',  current: false, icon: 'mobile' },
  { id: 3, device: 'Chrome on macOS',      location: 'Manila, PH',               lastActive: '2 days ago',   current: false, icon: 'desktop' },
];

const ACTIVITY_LOG = [
  { action: 'Logged in',                        time: 'Today, 12:42 AM', location: 'Calamba City, PH' },
  { action: 'Changed notification settings',    time: 'Today, 12:30 AM', location: 'Calamba City, PH' },
  { action: 'Updated account profile',          time: 'Jul 27, 11:18 PM', location: 'Calamba City, PH' },
  { action: 'Published CHED Merit Scholarship', time: 'Jul 25, 10:05 AM', location: 'Calamba City, PH' },
  { action: 'Logged in',                        time: 'Jul 25, 9:58 AM',  location: 'Calamba City, PH' },
];

/* ── Toggle Switch ── */
const Toggle = ({ checked, onChange, id }) => (
  <label className="ps-toggle" htmlFor={id}>
    <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    <span className="ps-toggle-track">
      <span className="ps-toggle-thumb" />
    </span>
  </label>
);

/* ── Toast ── */
const Toast = ({ msg }) => msg ? (
  <div className="ps-toast">
    <CheckCircle size={15} color="#15803d" />
    {msg}
  </div>
) : null;

/* ================================================================
   Main Settings Component (Supports Student, Admin & Provider)
   ================================================================ */
const ProviderSettings = ({ setActiveView, userRole = 'provider' }) => {
  const defaultProf = userRole === 'admin' 
    ? DEFAULT_ADMIN_PROFILE 
    : userRole === 'student' 
    ? DEFAULT_STUDENT_PROFILE 
    : DEFAULT_PROVIDER_PROFILE;

  const storageKey = `escholar_${userRole}_profile`;

  const [tab, setTab] = useState('profile');
  const [toast, setToast]   = useState('');
  const [profile, setProfile] = useState(() => {
    try { return { ...defaultProf, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }; }
    catch { return defaultProf; }
  });
  const [notif, setNotif] = useState(() => {
    try { return { ...DEFAULT_NOTIF, ...JSON.parse(localStorage.getItem(`escholar_${userRole}_notif`) || '{}') }; }
    catch { return DEFAULT_NOTIF; }
  });
  const [sessions, setSessions] = useState(MOCK_SESSIONS);

  /* Password state */
  const [pw, setPw] = useState({ current: '', newPw: '', confirm: '' });
  const [pwVis, setPwVis] = useState({ current: false, newPw: false, confirm: false });
  const [pwErr, setPwErr] = useState('');
  const [twoFA, setTwoFA] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const setP = (field, val) => setProfile(p => ({ ...p, [field]: val }));

  const saveProfile = () => {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    showToast('Profile saved successfully.');
  };

  const handleCancel = () => {
    if (userRole === 'admin' || userRole === 'student') {
      setActiveView && setActiveView('dashboard');
    } else {
      setActiveView && setActiveView('provider-dashboard');
    }
  };

  const setN = (field, val) => setNotif(n => ({ ...n, [field]: val }));

  const saveNotif = () => {
    localStorage.setItem(`escholar_${userRole}_notif`, JSON.stringify(notif));
    showToast('Notification preferences saved.');
  };

  const changePw = () => {
    if (!pw.current) { setPwErr('Enter your current password.'); return; }
    if (pw.newPw.length < 8) { setPwErr('New password must be at least 8 characters.'); return; }
    if (pw.newPw !== pw.confirm) { setPwErr('Passwords do not match.'); return; }
    setPwErr('');
    setPw({ current: '', newPw: '', confirm: '' });
    showToast('Password changed successfully.');
  };

  const revokeSession = (id) => {
    setSessions(s => s.filter(x => x.id !== id));
    showToast('Session revoked.');
  };

  const [confirmDeact, setConfirmDeact] = useState('');

  const TABS = [
    { key: 'profile',       label: 'Profile',        icon: <User size={16} />, roles: ['provider', 'admin', 'student'] },
    { key: 'security',      label: 'Security',       icon: <Lock size={16} />, roles: ['provider', 'admin', 'student'] },
    { key: 'notifications', label: 'Notifications',  icon: <Bell size={16} />, roles: ['provider'] },
    { key: 'sessions',      label: 'Sessions',       icon: <Monitor size={16} />, roles: ['provider', 'admin', 'student'] },
  ].filter(t => t.roles.includes(userRole));

  return (
    <div className="provider-builder-wrapper">
      <Toast msg={toast} />

      {/* ── Header ── */}
      <div className="program-builder-header">
        <div className="builder-title-group">
          <h2>Account Settings</h2>
          <p className="builder-subtitle">Manage your profile, security, and preferences.</p>
        </div>
        <div className="builder-header-actions">
          <span className="verified-provider-badge">
            <Shield size={13} /> {profile.orgType}
          </span>
        </div>
      </div>

      {/* ── Tab Nav ── */}
      <div className="ps-tab-nav">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`ps-tab-btn ${tab === t.key ? 'ps-tab-active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: PROFILE */}
      {tab === 'profile' && (
        <div className="builder-content-card">
          {/* Avatar Row */}
          <div className="ps-avatar-row">
            <div className="ps-avatar-circle">
              {profile.avatarInitials}
              <button className="ps-avatar-edit-btn" title="Change photo">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <p className="ps-avatar-name">{profile.firstName} {profile.lastName}</p>
              <p className="ps-avatar-role">{profile.designation} · {profile.orgName}</p>
              <p className="ps-avatar-email">{profile.email}</p>
            </div>
          </div>

          <hr className="ps-divider" />

          {/* Personal Information */}
          <div className="panel-header">
            <h3>{userRole === 'student' ? 'Student Information' : userRole === 'admin' ? 'Administrator Profile' : 'Personal Information'}</h3>
            <p>{userRole === 'student' ? 'Your personal details and contact information.' : 'Your name and contact details as the authorized user.'}</p>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="input-label">First Name <span className="ps-req">*</span></label>
              <input className="clean-input" value={profile.firstName} onChange={e => setP('firstName', e.target.value)} placeholder="First name" />
            </div>
            <div className="form-group">
              <label className="input-label">Last Name <span className="ps-req">*</span></label>
              <input className="clean-input" value={profile.lastName} onChange={e => setP('lastName', e.target.value)} placeholder="Last name" />
            </div>
            <div className="form-group">
              <label className="input-label">{userRole === 'student' ? 'Current Academic Status' : 'Designation / Title'} <span className="ps-req">*</span></label>
              <input className="clean-input" value={profile.designation} onChange={e => setP('designation', e.target.value)} placeholder={userRole === 'student' ? 'e.g. Undergraduate Student' : 'e.g. Regional Director'} />
            </div>
            <div className="form-group">
              <label className="input-label">Email Address <span className="ps-req">*</span></label>
              <input className="clean-input" type="email" value={profile.email} onChange={e => setP('email', e.target.value)} placeholder="email@example.com" />
            </div>
            <div className="form-group">
              <label className="input-label">Contact Number</label>
              <input className="clean-input" type="tel" value={profile.contactNumber} onChange={e => setP('contactNumber', e.target.value)} placeholder="+63 9XX XXX XXXX" />
            </div>
            <div className="form-group">
              <label className="input-label">Bio <span className="ps-opt">(optional)</span></label>
              <input className="clean-input" value={profile.bio} onChange={e => setP('bio', e.target.value)} placeholder="Short description" />
            </div>
          </div>

          <hr className="ps-divider" />

          {/* Organization / Academic Details */}
          <div className="panel-header">
            <h3>{userRole === 'student' ? 'Academic Institution Details' : userRole === 'admin' ? 'System Governance Details' : 'Organization Details'}</h3>
            <p>{userRole === 'student' ? 'Details about your school or university.' : userRole === 'admin' ? 'System administrative department information.' : 'Information about the provider organization.'}</p>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="input-label">{userRole === 'student' ? 'School / University Name' : 'Legal Organization Name'} <span className="ps-req">*</span></label>
              <input className="clean-input" value={profile.orgName} onChange={e => setP('orgName', e.target.value)} placeholder={userRole === 'student' ? 'e.g. University of the Philippines' : 'e.g. CHED Region IV-A'} />
            </div>
            <div className="form-group">
              <label className="input-label">{userRole === 'student' ? 'Student / User Type' : 'Organization Type'}</label>
              <input className="clean-input" value={profile.orgType} onChange={e => setP('orgType', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="input-label">Institutional Email</label>
              <input className="clean-input" type="email" value={profile.orgEmail} onChange={e => setP('orgEmail', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="input-label">Institutional Contact Phone</label>
              <input className="clean-input" type="tel" value={profile.orgPhone} onChange={e => setP('orgPhone', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label className="input-label">Address</label>
              <textarea className="clean-textarea" rows={2} value={profile.orgAddress} onChange={e => setP('orgAddress', e.target.value)} />
            </div>
          </div>

          <div className="builder-footer-controls">
            <button className="btn-step-back" onClick={handleCancel}>Cancel</button>
            <button className="btn-step-continue" onClick={saveProfile}>
              <Save size={15} /> Save Profile
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          TAB: SECURITY
          ════════════════════════════════════════ */}
      {tab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Change Password */}
          <div className="builder-content-card">
            <div className="panel-header">
              <h3><Key size={16} style={{ display: 'inline', marginRight: 6, color: '#082894' }} />Change Password</h3>
              <p>Use a strong password of at least 8 characters with mixed letters, numbers, and symbols.</p>
            </div>
            <div className="form-grid">
              {[
                { key: 'current', label: 'Current Password' },
                { key: 'newPw',   label: 'New Password' },
                { key: 'confirm', label: 'Confirm New Password' },
              ].map(({ key, label }) => (
                <div className="form-group" key={key}>
                  <label className="input-label">{label} <span className="ps-req">*</span></label>
                  <div className="ps-pw-wrap">
                    <input
                      className="clean-input"
                      type={pwVis[key] ? 'text' : 'password'}
                      value={pw[key]}
                      onChange={e => setPw(p => ({ ...p, [key]: e.target.value }))}
                      placeholder="••••••••"
                      style={{ paddingRight: '2.5rem' }}
                    />
                    <button className="ps-pw-toggle" type="button" onClick={() => setPwVis(v => ({ ...v, [key]: !v[key] }))}>
                      {pwVis[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {pwErr && <p className="ps-err-msg"><AlertTriangle size={13} /> {pwErr}</p>}
            {/* Password strength hint */}
            {pw.newPw && (
              <div className="ps-strength-row">
                {['8+ chars', 'Uppercase', 'Number', 'Symbol'].map((hint, i) => {
                  const checks = [pw.newPw.length >= 8, /[A-Z]/.test(pw.newPw), /\d/.test(pw.newPw), /[^A-Za-z0-9]/.test(pw.newPw)];
                  return (
                    <span key={hint} className={`ps-strength-chip ${checks[i] ? 'ps-chip-ok' : 'ps-chip-no'}`}>
                      {checks[i] ? <CheckCircle size={11} /> : <X size={11} />} {hint}
                    </span>
                  );
                })}
              </div>
            )}
            <div className="builder-footer-controls" style={{ paddingTop: '1rem' }}>
              <div />
              <button className="btn-step-continue" onClick={changePw}>
                <Lock size={15} /> Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="builder-content-card">
            <div className="panel-header">
              <h3><Smartphone size={16} style={{ display: 'inline', marginRight: 6, color: '#082894' }} />Two-Factor Authentication</h3>
              <p>Add an extra layer of security by requiring a one-time SMS code at login.</p>
            </div>
            <div className="toggle-card" style={{ marginBottom: '1rem' }}>
              <div className="toggle-info">
                <h4>SMS Two-Factor Authentication</h4>
                <p>You will receive a 6-digit code via SMS every time you log in from a new device.</p>
              </div>
              <Toggle checked={twoFA} onChange={setTwoFA} id="twofa-toggle" />
            </div>
            <div className="toggle-card">
              <div className="toggle-info">
                <h4>Login Security Alerts</h4>
                <p>Receive an email alert whenever your account is accessed from a new device or location.</p>
              </div>
              <Toggle checked={loginAlerts} onChange={setLoginAlerts} id="login-alert-toggle" />
            </div>
            {twoFA && (
              <div className="gwa-slider-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.35rem', marginTop: '1rem', marginBottom: 0 }}>
                <CheckCircle size={16} color="#10b981" />
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                  2FA is active for your account. Registered phone: <strong>+63 917 ●●● ●001</strong>
                </p>
              </div>
            )}
          </div>

          {/* Linked Email */}
          <div className="builder-content-card">
            <div className="panel-header">
              <h3><Mail size={16} style={{ display: 'inline', marginRight: 6, color: '#082894' }} />Linked Email Address</h3>
              <p>Your verified email address used for account recovery and notifications.</p>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="input-label">Email Address</label>
                <input className="clean-input" type="email" defaultValue={profile.email} disabled style={{ opacity: 0.65, cursor: 'not-allowed' }} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <span className="verified-provider-badge" style={{ marginBottom: '0.1rem' }}>
                  <CheckCircle size={13} /> Verified
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', fontWeight: 500 }}>
              To change your email address, contact the eScholar admin team.
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          TAB: NOTIFICATIONS
          ════════════════════════════════════════ */}
      {tab === 'notifications' && (
        <div className="builder-content-card">
          <div className="panel-header">
            <h3>Notification Preferences</h3>
            <p>Choose which events trigger email and SMS notifications for your account.</p>
          </div>

          {/* Email Notifications */}
          <p className="ps-section-label"><Mail size={13} /> Email Notifications</p>
          {[
            { key: 'newApplicant',      label: 'New Applicant Submitted',       desc: 'Notify when a student submits an application to your program.' },
            { key: 'applicationStatus', label: 'Application Status Changed',     desc: 'Notify when an applicant\'s review status is updated.' },
            { key: 'slotAlert',         label: 'Slot Utilization Alerts',        desc: 'Alert when a program slot utilization reaches 80% or 100%.' },
            { key: 'deadlineReminder',  label: 'Application Deadline Reminder',  desc: 'Remind 7 days and 1 day before a program deadline closes.' },
            { key: 'systemUpdates',     label: 'eScholar System Updates',        desc: 'Receive platform update announcements and maintenance notices.' },
            { key: 'emailWeeklyDigest', label: 'Weekly Activity Digest',         desc: 'Receive a weekly summary of all activity across your programs.' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="toggle-card" style={{ marginBottom: '0.75rem' }}>
              <div className="toggle-info">
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
              <Toggle checked={notif[key]} onChange={v => setN(key, v)} id={`notif-${key}`} />
            </div>
          ))}

          <hr className="ps-divider" />

          {/* SMS Notifications */}
          <p className="ps-section-label"><Smartphone size={13} /> SMS Notifications</p>
          {[
            { key: 'smsNewApplicant', label: 'New Applicant SMS Alert', desc: 'Receive an SMS when a new applicant submits to your program.' },
            { key: 'smsDeadline',     label: 'Deadline Reminder SMS',   desc: 'Receive an SMS 24 hours before an application window closes.' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="toggle-card" style={{ marginBottom: '0.75rem' }}>
              <div className="toggle-info">
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
              <Toggle checked={notif[key]} onChange={v => setN(key, v)} id={`notif-${key}`} />
            </div>
          ))}

          <div className="builder-footer-controls">
            <div />
            <button className="btn-step-continue" onClick={saveNotif}>
              <Save size={15} /> Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          TAB: SESSIONS
          ════════════════════════════════════════ */}
      {tab === 'sessions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Active Sessions */}
          <div className="builder-content-card">
            <div className="panel-header">
              <h3><Monitor size={16} style={{ display: 'inline', marginRight: 6, color: '#082894' }} />Active Sessions</h3>
              <p>Devices currently logged into your eScholar account. Revoke any sessions you don't recognize.</p>
            </div>
            <div className="ps-session-list">
              {sessions.map(s => (
                <div key={s.id} className={`ps-session-row ${s.current ? 'ps-session-current' : ''}`}>
                  <div className="ps-session-icon">
                    {s.icon === 'mobile' ? <Smartphone size={20} color="#082894" /> : <Monitor size={20} color="#082894" />}
                  </div>
                  <div className="ps-session-info">
                    <p className="ps-session-device">
                      {s.device}
                      {s.current && <span className="ps-current-chip">Current</span>}
                    </p>
                    <p className="ps-session-meta"><Globe size={11} /> {s.location} &nbsp;·&nbsp; <Clock size={11} /> {s.lastActive}</p>
                  </div>
                  {!s.current && (
                    <button className="ps-revoke-btn" onClick={() => revokeSession(s.id)}>
                      <LogOut size={14} /> Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="builder-footer-controls" style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <div />
              <button className="btn-draft-save" onClick={() => { setSessions(s => s.filter(x => x.current)); showToast('All other sessions revoked.'); }}>
                <LogOut size={14} /> Revoke All Other Sessions
              </button>
            </div>
          </div>

          {/* Activity Log */}
          <div className="builder-content-card">
            <div className="panel-header">
              <h3><Clock size={16} style={{ display: 'inline', marginRight: 6, color: '#082894' }} />Recent Account Activity</h3>
              <p>A log of recent actions and login events on your account.</p>
            </div>
            <div className="ps-activity-log">
              {ACTIVITY_LOG.map((a, i) => (
                <div key={i} className="ps-activity-row">
                  <div className="ps-activity-dot" />
                  <div className="ps-activity-info">
                    <p className="ps-activity-action">{a.action}</p>
                    <p className="ps-activity-meta">{a.time} · {a.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderSettings;
