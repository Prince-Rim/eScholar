import React from 'react';
import { Download, Users, CheckCircle, TrendingUp } from 'lucide-react';
import './ProviderPrograms.css';

const AdminReports = () => {
  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Analytics & Reports</h2>
          <p>Overview of your scholarship programs' performance and applicant metrics.</p>
        </div>
        <button className="btn-table-export" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flex: '0 0 auto' }}>
          <Download size={15} />
          Export CSV
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">1,250</div>
          <div className="stat-label">Total Applications</div>
          <p className="stat-desc">Across all active programs</p>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#16a34a' }}>342</div>
          <div className="stat-label">Active Scholars</div>
          <p className="stat-desc">Currently enrolled and funded</p>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#0ea5e9' }}>94%</div>
          <div className="stat-label">Compliance Rate</div>
          <p className="stat-desc">Scholars meeting requirements</p>
        </div>
      </div>

      <div className="charts-row" style={{ marginTop: '2rem', gridTemplateColumns: '1fr' }}>
        <div className="chart-card">
          <div className="card-header">
            <h3>Applications per Program</h3>
          </div>
          <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '200px', fontWeight: '500', fontSize: '0.9rem' }}>DOST-SEI Merit</div>
              <div style={{ flex: 1, backgroundColor: '#f1f5f9', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ width: '85%', backgroundColor: '#4f46e5', height: '100%' }}></div>
              </div>
              <div style={{ width: '40px', textAlign: 'right', fontSize: '0.9rem', color: '#64748b' }}>850</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '200px', fontWeight: '500', fontSize: '0.9rem' }}>CHED Half-Merit</div>
              <div style={{ flex: 1, backgroundColor: '#f1f5f9', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ width: '45%', backgroundColor: '#0ea5e9', height: '100%' }}></div>
              </div>
              <div style={{ width: '40px', textAlign: 'right', fontSize: '0.9rem', color: '#64748b' }}>450</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '200px', fontWeight: '500', fontSize: '0.9rem' }}>LGU Educational Assist</div>
              <div style={{ flex: 1, backgroundColor: '#f1f5f9', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ width: '25%', backgroundColor: '#10b981', height: '100%' }}></div>
              </div>
              <div style={{ width: '40px', textAlign: 'right', fontSize: '0.9rem', color: '#64748b' }}>250</div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminReports;
