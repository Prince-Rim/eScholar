import React, { useState } from 'react';
import { X, User, Sparkles } from 'lucide-react';

export default function CompleteProfileModal({ profile, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGpaChange = (e) => {
    const phGpa = parseFloat(e.target.value) || 1.0;
    let equiv = 4.0;
    if (phGpa >= 1.0 && phGpa <= 1.25) equiv = 3.9;
    else if (phGpa <= 1.5) equiv = 3.7;
    else if (phGpa <= 1.75) equiv = 3.5;
    else if (phGpa <= 2.0) equiv = 3.2;
    else if (phGpa <= 2.5) equiv = 2.8;
    else equiv = 2.5;

    setFormData(prev => ({
      ...prev,
      gpa: phGpa,
      gpaEquivalent: equiv
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={20} className="sparkle-icon" />
              Complete Your Student Information
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Accurate details improve AI recommendation precision
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group full-width">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">General Weighted Average (GWA)</label>
            <input 
              type="number" 
              step="0.01" 
              min="1.0" 
              max="5.0" 
              name="gpa" 
              className="form-input" 
              value={formData.gpa} 
              onChange={handleGpaChange} 
              required 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Equiv 4.0 GPA: <strong>{formData.gpaEquivalent}</strong> (1.0 is Highest)
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Major Field Category</label>
            <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
              <option value="STEM">STEM (Science, Tech, Eng, Math)</option>
              <option value="BUSINESS">Business & Finance</option>
              <option value="ARTS">Arts, Humanities & Education</option>
              <option value="HEALTH">Health & Medical Sciences</option>
              <option value="ALL">General / Other</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Course / Degree Program Name</label>
            <input 
              type="text" 
              name="course" 
              className="form-input" 
              value={formData.course} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Year Level</label>
            <select name="yearLevel" className="form-select" value={formData.yearLevel} onChange={handleChange}>
              <option value="1st Year College">1st Year College</option>
              <option value="2nd Year College">2nd Year College</option>
              <option value="3rd Year College">3rd Year College</option>
              <option value="4th Year College">4th Year College</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Annual Household Income (PHP)</label>
            <input 
              type="number" 
              name="householdIncome" 
              className="form-input" 
              value={formData.householdIncome} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Document Verification Checkboxes */}
          <div className="form-group full-width" style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            padding: 14,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Verification & Priority Status
            </span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.84rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="transcriptUploaded" 
                checked={formData.transcriptUploaded} 
                onChange={handleChange} 
              />
              <span>Grade Transcript (TOR / Report Slip) Verified (+15% AI Score)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.84rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="isFirstGen" 
                checked={formData.isFirstGen} 
                onChange={handleChange} 
              />
              <span>First-Generation College Student Priority Tag</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.84rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="isIndigent" 
                checked={formData.isIndigent} 
                onChange={handleChange} 
              />
              <span>Certificate of Indigency / Financial Need Priority</span>
            </label>
          </div>

          <div className="form-group full-width" style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <Sparkles size={16} /> Save Profile & Recalculate AI Match
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
