import React from 'react';
import { 
  BookOpen, Users, GraduationCap, ShieldCheck, Search, 
  ChevronRight, Sparkles, FileText, CheckCircle, Clock, Award
} from 'lucide-react';
import { MOCK_PROGRAMS } from './ProviderPrograms';
import './ProviderDashboard.css';

const Dashboard = ({ setActiveView }) => {
  const publishedPrograms = MOCK_PROGRAMS.filter(p => p.status === 'Published');
  
  const applications = [
    {
      id: 'APP-2026-001',
      title: 'CHED Merit Scholarship for STEM',
      provider: 'Commission on Higher Education',
      date: 'Jan 22, 2026',
      status: 'Under Review',
      stipend: '₱5,000 / mo',
      gwa: '1.45'
    },
    {
      id: 'APP-2026-002',
      title: 'Foundation Digital Skills Fellowship',
      provider: 'Ayala Foundation',
      date: 'Jan 18, 2026',
      status: 'Approved',
      stipend: '₱4,000 / mo',
      gwa: '1.45'
    }
  ];

  return (
    <div className="pd-page">
      {/* ── Header ── */}
      <div className="pd-header">
        <div>
          <h2 className="pd-title">Dashboard</h2>
          <p className="pd-subtitle">Welcome back, <strong>Fransee Azucena</strong> · Student Applicant (UP Los Baños)</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="pd-primary-btn" onClick={() => setActiveView && setActiveView('browse')}>
            <Search size={15} /> Browse Scholarships
          </button>
        </div>
      </div>

      {/* ── KPI Cards Grid (Matching Provider Side) ── */}
      <div className="pd-kpi-grid">
        {[
          { icon: <BookOpen size={19} />, label: 'Matched Grants', value: publishedPrograms.length, sub: 'Eligible for STEM course' },
          { icon: <FileText size={19} />, label: 'Applications Submitted', value: applications.length, sub: '1 under review' },
          { icon: <Award size={19} />, label: 'Awarded Grants', value: '1', sub: 'Active fellowship grant' },
          { icon: <ShieldCheck size={19} />, label: 'Verified GWA', value: '1.45', sub: 'Verified via Form 138' },
        ].map(({ icon, label, value, sub }) => (
          <div key={label} className="pd-kpi-card">
            <div className="pd-kpi-icon">{icon}</div>
            <div>
              <p className="pd-kpi-label">{label}</p>
              <p className="pd-kpi-value">{value}</p>
              <p className="pd-kpi-sub">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Content Grid ── */}
      <div className="pd-charts-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* Top Matched Scholarships Panel */}
        <div className="pd-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <p className="pd-card-title">Top Matched Scholarships</p>
              <p className="pd-card-sub">Programs matching your GWA and academic profile.</p>
            </div>
            <button 
              className="pd-card-sub" 
              style={{ color: '#082894', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none' }}
              onClick={() => setActiveView && setActiveView('browse')}
            >
              View All <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {publishedPrograms.slice(0, 2).map(program => (
              <div 
                key={program.id} 
                style={{ 
                  border: '1.5px solid #e2e8f0', 
                  borderRadius: '10px', 
                  padding: '1rem', 
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#082894', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {program.sector} · {program.region}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>
                    ₱{program.monthlyAllowance.toLocaleString()} / mo
                  </span>
                </div>

                <h4 style={{ margin: '0.2rem 0 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  {program.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {program.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                    Deadline: {program.endDate}
                  </span>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#082894', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                    onClick={() => setActiveView && setActiveView('browse')}
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Application Tracker */}
        <div className="pd-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <p className="pd-card-title">Application Status Tracker</p>
              <p className="pd-card-sub">Live updates on your submitted grant applications.</p>
            </div>
            <button 
              className="pd-card-sub" 
              style={{ color: '#082894', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none' }}
              onClick={() => setActiveView && setActiveView('applications')}
            >
              View Details <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {applications.map(app => (
              <div key={app.id} style={{ border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '1rem', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', fontFamily: 'monospace' }}>
                    {app.id}
                  </span>
                  <span className={`status-badge-pill ${app.status === 'Approved' ? 'status-published' : 'status-draft'}`}>
                    {app.status}
                  </span>
                </div>

                <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  {app.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
                  {app.provider} · Submitted {app.date}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
