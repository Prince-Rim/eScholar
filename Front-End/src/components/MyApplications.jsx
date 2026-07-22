import React, { useState } from 'react';
import DetailedApplicationCard from './DetailedApplicationCard';

const MyApplications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Applications', count: 2 },
    { id: 'review', label: 'Under Review', count: 2 },
    { id: 'approved', label: 'Approved', count: 2 },
    { id: 'not-qualified', label: 'Not Qualified', count: 2 },
  ];

  return (
    <main className="applications-content" style={{ padding: '2rem' }}>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} <span className="tab-badge">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="detailed-applications-list">
        <DetailedApplicationCard 
          title="DOST SEI Merit Scholarship"
          provider="Department of Science and Technology"
          date="Applied on July: 10, 2026"
          status="Under Review"
          documents={['PSA Birth Certificate', 'Report Card', 'COE']}
        />
        <DetailedApplicationCard 
          title="DOST SEI Merit Scholarship"
          provider="Department of Science and Technology"
          date="Applied on July: 10, 2026"
          status="Under Review"
          documents={['PSA Birth Certificate', 'Report Card', 'COE']}
        />
      </div>
    </main>
  );
};

export default MyApplications;
