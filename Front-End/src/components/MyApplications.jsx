import React, { useState } from 'react';
import ApplicationCard from './ApplicationCard';

const MyApplications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Applications', count: 5 },
    { id: 'review', label: 'Under Review', count: 2 },
    { id: 'interview', label: 'Interview Scheduled', count: 1 },
    { id: 'approved', label: 'Approved', count: 1 },
    { id: 'not-qualified', label: 'Not Qualified', count: 0 },
  ];

  return (
    <main className="applications-content">
      
      {/* Top Tabs */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} {tab.count > 0 && <span className="tab-badge">{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="applications-container">
        <h2 className="section-title">All Applications (5)</h2>
        
        <div className="applications-list">
          <ApplicationCard 
            title="CHED Merit Scholarship Program"
            provider="Commission on Higher Education"
            status="under-review"
            stage="Under Review"
            appliedDate="July 10, 2025"
            docsSubmitted="5"
            daysRemaining="18 days"
            documents={['PSA Birth Certificate', 'Certificate of Registration', 'Report Card/TOR', 'Certificate of Enrollment', 'Income Certificate']}
          />

          <ApplicationCard 
            title="DOST-SEI Undergraduate Scholarship"
            provider="Department of Science and Technology"
            status="interview-scheduled"
            stage="Interview Scheduled"
            appliedDate="June 20, 2025"
            docsSubmitted="5"
            daysRemaining="18 days"
            interviewDetails={{
              date: "July 28, 2025, 10:00 AM",
              location: "DOST Main Office, Bicutan, Taguig"
            }}
            documents={['PSA Birth Certificate', 'Certificate of Registration', 'Report Card/TOR', 'Certificate of Enrollment', 'Income Certificate']}
          />

          <ApplicationCard 
            title="SM Foundation College Scholarship"
            provider="SM Foundation, Inc."
            status="approved"
            stage="Approved"
            appliedDate="May 5, 2025"
            docsSubmitted="5"
            daysRemaining="-"
            documents={['PSA Birth Certificate', 'Certificate of Registration', 'Report Card/TOR', 'Certificate of Enrollment', 'Income Certificate']}
          />
        </div>
      </div>
    </main>
  );
};

export default MyApplications;
