import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminApplicants = () => {
  const applicants = [
    { id: 'APP-23423', name: 'Jeremiah Madronio', scholarship: 'DOST-SEI Scholarship', category: 'General', status: 'Active' },
    { id: 'APP-19284', name: 'Samantha Reyes', scholarship: 'CHED Merit Scholarship', category: 'STEM', status: 'Active' },
    { id: 'APP-84729', name: 'Miguel Santos', scholarship: 'LGU Educational Assist', category: 'Arts', status: 'Active' },
    { id: 'APP-56210', name: 'Chloe Lim', scholarship: 'DOST-SEI Scholarship', category: 'General', status: 'Active' },
    { id: 'APP-10394', name: 'Alexander Cruz', scholarship: 'OWWA Scholarship', category: 'General', status: 'Active' },
    { id: 'APP-99482', name: 'Isabella Garcia', scholarship: 'CHED Merit Scholarship', category: 'STEM', status: 'Active' },
  ];

  return (
    <div className="admin-applicants-container">
      {/* Top Search Bar Row */}
      <div className="applicants-top-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search applicants by name, provider..." className="applicants-search" />
        </div>
        <button className="btn-category-outline">Category</button>
      </div>

      {/* Tabs */}
      <div className="applicants-tabs">
        <button className="applicants-tab active">All Applicants</button>
        <button className="applicants-tab">Active</button>
        <button className="applicants-tab">Inactive</button>
      </div>

      {/* Main Table Card */}
      <div className="applicants-table-card">
        <table className="applicants-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app, index) => (
              <tr key={index}>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td>{app.scholarship}</td>
                <td>{app.category}</td>
                <td>
                  <span className="badge-active-pill">{app.status}</span>
                </td>
                <td>
                  <button className="action-edit-link">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Footer */}
        <div className="table-pagination">
          <span className="pagination-info">Showing 1 to 6 of 42 entries</span>
          <div className="pagination-controls">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-btn">7</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicants;
