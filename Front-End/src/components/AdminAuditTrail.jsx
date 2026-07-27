import React, { useState } from 'react';
import { 
  History, Search, Download, CheckCircle, Filter, FileText, User, Building2, Shield, Activity,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';
import './ProviderDashboard.css';

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-101',
    actorCode: 'JM',
    actorName: 'Jeremiah Madronio',
    action: 'Created provider account',
    record: 'Lumina Education Foundation',
    type: 'Provider',
    timestamp: 'May 28, 2026 · 09:14'
  },
  {
    id: 'log-102',
    actorCode: 'JM',
    actorName: 'Jeremiah Madronio',
    action: 'Deactivated provider account',
    record: 'NextGen Academic Trust',
    type: 'Provider',
    timestamp: 'May 26, 2026 · 16:02'
  },
  {
    id: 'log-103',
    actorCode: 'JM',
    actorName: 'Jeremiah Madronio',
    action: 'Suspended user account',
    record: 'Janelle Dela Cruz',
    type: 'User',
    timestamp: 'May 24, 2026 · 11:37'
  },
  {
    id: 'log-104',
    actorCode: 'JM',
    actorName: 'Jeremiah Madronio',
    action: 'Sent password reset link',
    record: 'Rafael Garcia',
    type: 'Account',
    timestamp: 'May 22, 2026 · 08:51'
  },
  {
    id: 'log-105',
    actorCode: 'S',
    actorName: 'System',
    action: 'Nightly account sync completed',
    record: '3,450 student records',
    type: 'System',
    timestamp: 'May 21, 2026 · 02:00'
  },
  {
    id: 'log-106',
    actorCode: 'FA',
    actorName: 'Fransee Azucena',
    action: 'Updated platform security rules',
    record: '2FA Enrollment Enforcement',
    type: 'System',
    timestamp: 'May 20, 2026 · 14:22'
  }
];

const AdminAuditTrail = () => {
  const [logs] = useState(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filtered = logs.filter(log => {
    if (activeTab !== 'All' && log.type.toLowerCase() !== activeTab.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return log.actorName.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || log.record.toLowerCase().includes(q);
    }
    return true;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const typePillStyle = (type) => {
    if (type === 'Provider') return { bg: '#eff6ff', color: '#082894', border: '#bfdbfe' };
    if (type === 'User') return { bg: '#f3e8ff', color: '#7e22ce', border: '#e9d5ff' };
    if (type === 'Account') return { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' };
    return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
  };

  return (
    <div className="pd-page">
      {toastMessage && (
        <div className="toast-notification-banner">
          <CheckCircle size={15} /> {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="pd-header">
        <div>
          <h2 className="pd-title">Activity audit trail</h2>
          <p className="pd-subtitle">Every administrative action recorded on the platform.</p>
        </div>

        <button 
          className="btn-table-export" 
          style={{ gap: '0.45rem', padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          onClick={() => showToast('Exported audit logs to CSV successfully.')}
        >
          <Download size={15} /> Export log
        </button>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="table-search-input-box" style={{ minWidth: '280px' }}>
            <Search size={15} className="search-icon-muted" />
            <input 
              type="text" 
              placeholder="Search actor, action, or record..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="status-tabs-group" style={{ marginLeft: 'auto' }}>
            {['All', 'Provider', 'User', 'Account', 'System'].map(type => (
              <button 
                key={type}
                className={`tab-btn ${activeTab === type ? 'active' : ''}`}
                onClick={() => setActiveTab(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>PERFORMED BY</th>
                <th>ACTION</th>
                <th>RECORD</th>
                <th>TYPE</th>
                <th style={{ textAlign: 'right' }}>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-table-cell">No activity logs found.</td>
                </tr>
              ) : (
                currentLogs.map(log => {
                  const style = typePillStyle(log.type);
                  return (
                    <tr key={log.id} className="program-table-row">
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: log.actorName === 'System' ? '#f1f5f9' : '#eff6ff',
                            border: '1px solid #cbd5e1',
                            color: log.actorName === 'System' ? '#475569' : '#082894',
                            fontWeight: 700, fontSize: '0.75rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            {log.actorCode}
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '0.86rem', color: '#0f172a' }}>
                            {log.actorName}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
                          {log.action}
                        </span>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 500 }}>
                          {log.record}
                        </span>
                      </td>

                      <td>
                        <span style={{
                          display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '50px',
                          fontSize: '0.75rem', fontWeight: 700,
                          background: style.bg, color: style.color, border: `1px solid ${style.border}`
                        }}>
                          {log.type}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className="table-date-text">{log.timestamp}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="table-pagination">
          <span className="pagination-info">
            Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
          </span>
          <div className="pagination-controls">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditTrail;
