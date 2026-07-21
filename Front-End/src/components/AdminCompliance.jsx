import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, CheckCircle, XCircle, Eye } from 'lucide-react';

const AdminCompliance = () => {
  const [approvedId, setApprovedId] = useState(null);

  const compliances = [
    { id: 'CMP-23423', name: 'Jeremiah Madronio', scholarship: 'DOST-SEI Merit', requirement: '1st Sem Grades', status: 'Pending Review', date: 'Oct 24, 2025' },
    { id: 'CMP-23424', name: 'Samantha Reyes', scholarship: 'CHED Half-Merit', requirement: 'Reg. Form', status: 'Approved', date: 'Oct 23, 2025' },
    { id: 'CMP-23425', name: 'Miguel Santos', scholarship: 'LGU Assist', requirement: '1st Sem Grades', status: 'Pending Review', date: 'Oct 22, 2025' },
  ];

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '2rem' }}>
        <h2>Compliance Tracking</h2>
        <p>Review and verify ongoing requirements submitted by active scholars.</p>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Submitted Requirements</h3>
          <div className="search-bar" style={{ maxWidth: '300px' }}>
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search scholars..." className="search-input" />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Scholar Name</th>
                <th>Scholarship</th>
                <th>Requirement</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {compliances.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.scholarship}</td>
                  <td>{item.requirement}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status-badge ${(approvedId === item.id || item.status === 'Approved') ? 'status-approved' : 'status-pending'}`}>
                      {(approvedId === item.id) ? 'Approved' : item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action-outline">
                        <Eye size={16} />
                      </button>
                      {(item.status === 'Pending Review' && approvedId !== item.id) && (
                        <>
                          <button className="btn-action-outline text-green" onClick={() => setApprovedId(item.id)}>
                            <CheckCircle size={16} />
                          </button>
                          <button className="btn-action-outline text-red">
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="pagination-info">Showing 1 to 3 of 3 entries</span>
          <div className="pagination-controls">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminCompliance;
