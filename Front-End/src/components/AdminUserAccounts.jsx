import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Eye, MoreVertical, CheckCircle, XCircle, 
  X, Mail, Shield, UserCheck, UserX, Clock, Calendar, KeyRound
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';
import './ProviderDashboard.css';

export const INITIAL_USERS = [
  {
    id: 'usr-101',
    code: 'AR',
    name: 'Alyssa Ramos',
    email: 'alyssa.ramos@email.com',
    role: 'Student',
    regDate: 'May 27, 2026',
    lastActive: '2 hours ago',
    status: 'Active',
    school: 'Polytechnic Univ. of the Philippines'
  },
  {
    id: 'usr-102',
    code: 'NV',
    name: 'Noel Villanueva',
    email: 'noel@lumina.org',
    role: 'Provider',
    regDate: 'May 25, 2026',
    lastActive: 'Yesterday',
    status: 'Active',
    school: 'Lumina Education Foundation'
  },
  {
    id: 'usr-103',
    code: 'JDC',
    name: 'Janelle Dela Cruz',
    email: 'janelle.dc@email.com',
    role: 'Student',
    regDate: 'May 22, 2026',
    lastActive: '6 days ago',
    status: 'Suspended',
    school: 'Cavite State University'
  },
  {
    id: 'usr-104',
    code: 'RG',
    name: 'Rafael Garcia',
    email: 'rafael@nextgen.edu',
    role: 'Provider',
    regDate: 'May 18, 2026',
    lastActive: '3 days ago',
    status: 'Active',
    school: 'NextGen Academic Trust'
  },
  {
    id: 'usr-105',
    code: 'KB',
    name: 'Kian Bautista',
    email: 'kian.bautista@email.com',
    role: 'Student',
    regDate: 'May 15, 2026',
    lastActive: 'Today',
    status: 'Active',
    school: 'Univ. of the Philippines Los Baños'
  }
];

const AdminUserAccounts = () => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('escholar_admin_users') || '[]');
      return saved.length > 0 ? saved : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdownId(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem('escholar_admin_users', JSON.stringify(updated));
  };

  const toggleUserStatus = (id) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User "${u.name}" account status set to ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    saveUsers(updated);
  };

  const filtered = users.filter(u => {
    if (selectedRole !== 'All' && u.role.toLowerCase() !== selectedRole.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    }
    return true;
  });

  const roleBadgeStyle = (role) => {
    if (role === 'Student') return { bg: '#eff6ff', color: '#082894', border: '#bfdbfe' };
    if (role === 'Provider') return { bg: '#f3e8ff', color: '#7e22ce', border: '#e9d5ff' };
    return { bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' };
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
          <h2 className="pd-title">All user accounts</h2>
          <p className="pd-subtitle">Review account roles, activity, and platform access.</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="table-search-input-box" style={{ minWidth: '280px' }}>
            <Search size={15} className="search-icon-muted" />
            <input 
              type="text" 
              placeholder="Search name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: 'auto' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>Role:</label>
            <select
              className="table-select-cycle"
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              style={{ minWidth: '130px' }}
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Provider">Provider</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>USER</th>
                <th>ROLE</th>
                <th>REGISTRATION DATE</th>
                <th>LAST ACTIVE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">No user accounts found.</td>
                </tr>
              ) : (
                filtered.map(u => {
                  const roleStyle = roleBadgeStyle(u.role);
                  return (
                    <tr key={u.id} className="program-table-row" onClick={() => setSelectedUser(u)}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                          <div style={{
                            width: '34px', height: '34px', borderRadius: '50%',
                            background: '#f1f5f9', border: '1px solid #cbd5e1',
                            color: '#334155', fontWeight: 700, fontSize: '0.78rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            {u.code}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{u.name}</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span style={{
                          display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '50px',
                          fontSize: '0.75rem', fontWeight: 700,
                          background: roleStyle.bg, color: roleStyle.color, border: `1px solid ${roleStyle.border}`
                        }}>
                          {u.role}
                        </span>
                      </td>

                      <td>
                        <span className="table-date-text">{u.regDate}</span>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 500 }}>{u.lastActive}</span>
                      </td>

                      <td>
                        <span className={`status-badge-pill ${u.status === 'Active' ? 'status-published' : 'status-closed'}`} style={{
                          background: u.status === 'Suspended' ? '#fee2e2' : undefined,
                          color: u.status === 'Suspended' ? '#dc2626' : undefined,
                          borderColor: u.status === 'Suspended' ? '#fca5a5' : undefined
                        }}>
                          {u.status}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        {/* ONLY 3-DOTS MENU BUTTON MATCHING PROVIDER PORTAL */}
                        <div className="dropdown-action-wrapper" style={{ display: 'inline-block' }}>
                          <button 
                            className="btn-dots-menu"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === u.id ? null : u.id);
                            }}
                            title="Actions"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openDropdownId === u.id && (
                            <div className="action-dropdown-menu" style={{ minWidth: '160px' }}>
                              <button className="dropdown-item" onClick={() => { setSelectedUser(u); setOpenDropdownId(null); }}>
                                <Eye size={14} /> View Details
                              </button>
                              <button className="dropdown-item" onClick={() => { toggleUserStatus(u.id); setOpenDropdownId(null); }}>
                                {u.status === 'Active' ? <XCircle size={14} color="#dc2626" /> : <CheckCircle size={14} color="#15803d" />}
                                {u.status === 'Active' ? 'Suspend Account' : 'Re-enable Account'}
                              </button>
                              <button className="dropdown-item" onClick={() => { showToast(`Password reset link sent to ${u.email}`); setOpenDropdownId(null); }}>
                                <KeyRound size={14} /> Reset Password
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            maxWidth: '460px', width: '92%', borderRadius: '16px', border: '1.5px solid #cbd5e1', background: '#fff', padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedUser.code}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{selectedUser.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{selectedUser.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Role</span>
                <span style={{ fontWeight: 700, color: '#082894' }}>{selectedUser.role}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Affiliation / School</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedUser.school}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Registration Date</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedUser.regDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Last Active</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedUser.lastActive}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Account Status</span>
                <span className={`status-badge-pill ${selectedUser.status === 'Active' ? 'status-published' : 'status-closed'}`} style={{
                  background: selectedUser.status === 'Suspended' ? '#fee2e2' : undefined,
                  color: selectedUser.status === 'Suspended' ? '#dc2626' : undefined
                }}>
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
              <button className="btn-modal-close" onClick={() => setSelectedUser(null)}>Close</button>
              <button 
                className="pd-primary-btn" 
                style={{ 
                  fontSize: '0.8rem', padding: '0.45rem 1rem',
                  background: selectedUser.status === 'Active' ? '#dc2626' : 'linear-gradient(135deg, #082894 0%, #2563eb 100%)'
                }}
                onClick={() => { toggleUserStatus(selectedUser.id); setSelectedUser(null); }}
              >
                {selectedUser.status === 'Active' ? 'Suspend Account' : 'Re-enable Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserAccounts;
