import React, { useState } from 'react';
import { Upload, CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';

const Compliance = () => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '2rem' }}>
        <h2>My Compliance Requirements</h2>
        <p>Upload and manage the documents needed to maintain your active scholarships.</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">1</div>
          <div className="stat-label">Active Scholarships</div>
          <p className="stat-desc">Maintaining requirements</p>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#eab308' }}>2</div>
          <div className="stat-label">Pending Uploads</div>
          <p className="stat-desc">Due in 14 days</p>
        </div>
      </div>

      <div className="charts-row" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <div className="chart-card">
          <div className="card-header">
            <h3>DOST-SEI Merit Scholarship</h3>
            <span className="badge" style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>Active Scholar</span>
          </div>
          
          <div className="compliance-list" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div className="compliance-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '8px', color: '#475569' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>1st Semester Grades (AY 2025-2026)</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Must maintain a GWA of 2.50 or better. Deadline: Nov 30, 2025</p>
                </div>
              </div>
              <div>
                {uploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: '500', fontSize: '14px' }}>
                    <CheckCircle2 size={18} />
                    Submitted
                  </div>
                ) : (
                  <button 
                    className="btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '14px' }}
                    onClick={() => setUploaded(true)}
                  >
                    <Upload size={16} />
                    Upload PDF
                  </button>
                )}
              </div>
            </div>

            <div className="compliance-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: '#fef3c7', padding: '10px', borderRadius: '8px', color: '#d97706' }}>
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>Certificate of Registration (2nd Semester)</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Proof of enrollment for the upcoming semester. Deadline: Dec 15, 2025</p>
                </div>
              </div>
              <div>
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '14px' }}>
                  <Upload size={16} />
                  Upload PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Compliance;
