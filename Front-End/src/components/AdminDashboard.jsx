import React from 'react';
import { Search, UserCircle } from 'lucide-react';

const AdminDashboard = ({ setActiveView }) => {
  return (
    <main className="admin-dashboard">
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>10</h3>
          <h4>Total Applicants</h4>
          <p>Increase 12% by this month</p>
        </div>
        <div className="admin-stat-card">
          <h3>01</h3>
          <h4>Approved</h4>
          <p>Increase 6.1% by this month</p>
        </div>
        <div className="admin-stat-card">
          <h3>12</h3>
          <h4>Under Review</h4>
          <p>Pending Evaluation</p>
        </div>
      </div>

      <div className="admin-charts-grid">

        <div className="admin-chart-panel">
          <div className="admin-chart-header">
            <h4>Application Trend</h4>
            <p>Submitted vs. Approved · Last 6 months</p>
          </div>
          
          <div className="svg-chart-container">
            <svg viewBox="0 0 500 250" width="100%" height="100%">
              <line x1="40" y1="50" x2="480" y2="50" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="150" x2="480" y2="150" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="200" x2="480" y2="200" stroke="#94a3b8" strokeWidth="2" />

              <text x="30" y="55" fontSize="10" fill="#94a3b8" textAnchor="end">400</text>
              <text x="30" y="105" fontSize="10" fill="#94a3b8" textAnchor="end">300</text>
              <text x="30" y="155" fontSize="10" fill="#94a3b8" textAnchor="end">200</text>
              <text x="30" y="205" fontSize="10" fill="#94a3b8" textAnchor="end">0</text>

              <text x="50" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Mon</text>
              <text x="120" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Tue</text>
              <text x="190" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Wed</text>
              <text x="260" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Thu</text>
              <text x="330" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Fri</text>
              <text x="400" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Sat</text>
              <text x="470" y="220" fontSize="10" fill="#94a3b8" textAnchor="middle">Sun</text>

              <polyline 
                points="50,150 120,80 190,120 260,190 330,140 400,135 470,155" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="2" 
              />
              <circle cx="50" cy="150" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
              <circle cx="120" cy="80" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
              <circle cx="190" cy="120" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
              <circle cx="260" cy="190" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
              <circle cx="330" cy="140" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
              <circle cx="400" cy="135" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
              <circle cx="470" cy="155" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="admin-chart-panel" style={{ flex: 0.6 }}>
          <div className="admin-chart-header">
            <h4>Category Distribution</h4>
          </div>
          <div className="svg-chart-container pie-chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <circle cx="100" cy="100" r="80" fill="#c2185b" />
              
              <line x1="100" y1="100" x2="20" y2="60" stroke="white" strokeWidth="1" />
              <line x1="100" y1="100" x2="120" y2="180" stroke="white" strokeWidth="1" />
              <line x1="100" y1="100" x2="120" y2="20" stroke="white" strokeWidth="1" />

              <g className="pie-data-labels">
                <text x="15" y="150" fontSize="10" fill="#c2185b">780</text>
                <line x1="35" y1="145" x2="50" y2="135" stroke="#c2185b" strokeWidth="1" />

                <text x="160" y="145" fontSize="10" fill="#c2185b">368</text>
                <line x1="145" y1="140" x2="130" y2="130" stroke="#c2185b" strokeWidth="1" />
              </g>
            </svg>
          </div>
        </div>

      </div>

      <div className="admin-recent-panel">
        <div className="recent-header">
          <h4>Recent Application</h4>
          <button className="link-btn" onClick={() => setActiveView('verifications')}>See all</button>
        </div>
        
        <div className="recent-list">   
          <div className="recent-item">
            <div className="recent-info">
              <UserCircle size={40} strokeWidth={1} style={{ color: '#94a3b8' }} />
              <div>
                <h5>Jeremiah Madronio</h5>
                <p>DOST SEI Merit Scholarship</p>
              </div>
            </div>
            <div className="recent-actions">
              <span className="badge-approved">Approved</span>
              <button className="btn-text-blue">View</button>
            </div>
          </div>

          <div className="recent-item">
            <div className="recent-info">
              <UserCircle size={40} strokeWidth={1} style={{ color: '#94a3b8' }} />
              <div>
                <h5>Samantha Reyes</h5>
                <p>CHED Merit Scholarship</p>
              </div>
            </div>
            <div className="recent-actions">
              <span className="badge-approved">Approved</span>
              <button className="btn-text-blue">View</button>
            </div>
          </div>

          <div className="recent-item">
            <div className="recent-info">
              <UserCircle size={40} strokeWidth={1} style={{ color: '#94a3b8' }} />
              <div>
                <h5>Miguel Santos</h5>
                <p>LGU Educational Assist</p>
              </div>
            </div>
            <div className="recent-actions">
              <span className="badge-approved">Approved</span>
              <button className="btn-text-blue">View</button>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default AdminDashboard;
