import React from 'react';
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const AdminApplications = () => {
  const applications = [
    { id: 'APP-23423', name: 'Jeremiah Madronio', scholarship: 'DOST-SEI Scholarship' },
    { id: 'APP-19284', name: 'Samantha Reyes', scholarship: 'CHED Merit Scholarship' },
    { id: 'APP-84729', name: 'Miguel Santos', scholarship: 'LGU Educational Assist' },
    { id: 'APP-56210', name: 'Chloe Lim', scholarship: 'DOST-SEI Scholarship' },
    { id: 'APP-10394', name: 'Alexander Cruz', scholarship: 'OWWA Scholarship' },
    { id: 'APP-99482', name: 'Isabella Garcia', scholarship: 'CHED Merit Scholarship' },
  ];

  return (
    <div className="admin-applicants-container">
      <div className="applicants-top-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search applicants by name, provider..." className="applicants-search" />
        </div>
      </div>

      <div className="applicants-tabs">
        <button className="applicants-tab active">All Applicants</button>
        <button className="applicants-tab">Under Review</button>
        <button className="applicants-tab">Approved</button>
        <button className="applicants-tab">Disqualified</button>
      </div>

      <div className="applicants-table-card">
        <table className="applicants-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Scholarship Name</th>
              <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td>{app.scholarship}</td>
                <td style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                  <div className="action-buttons-group">
                    <button className="btn-icon"><Eye size={20} /></button>
                    <button className="btn-action-outline">Approve</button>
                    <button className="btn-action-outline">Reject</button>
                    <button className="btn-action-outline text-red">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-pagination">
          <span className="pagination-info">Showing 1 to 6 of 128 entries</span>
          <div className="pagination-controls">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-btn">12</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
