import React, { useState, useEffect } from 'react';
import { 
  Building2, Search, Plus, Eye, MoreVertical, CheckCircle, XCircle, 
  X, Mail, Phone, MapPin, ShieldCheck, Lock, ToggleLeft, ToggleRight, User, PlusCircle, KeyRound, Edit
} from 'lucide-react';
import './ProviderCreateProgram.css';
import './ProviderPrograms.css';
import './ProviderDashboard.css';

export const INITIAL_PROVIDERS = [
  {
    id: 'prov-1',
    code: 'LE',
    name: 'Lumina Education Foundation',
    type: 'Private Foundation',
    repName: 'Catherine Reyes',
    repDesignation: 'Executive Director',
    repEmail: 'c.reyes@lumina.org',
    repPhone: '+63 917 111 2233',
    programs: 4,
    dateCreated: 'May 28, 2026',
    status: 'Active',
    address: '24F Ayala Tower, Makati City, Metro Manila'
  },
  {
    id: 'prov-2',
    code: 'BS',
    name: 'Bayanihan Scholarship Fund',
    type: 'Non-Profit Organization',
    repName: 'Miguel Santos',
    repDesignation: 'Program Officer',
    repEmail: 'm.santos@bayanihan.ph',
    repPhone: '+63 918 222 3344',
    programs: 6,
    dateCreated: 'May 24, 2026',
    status: 'Active',
    address: 'East Ave, Quezon City, Metro Manila'
  },
  {
    id: 'prov-3',
    code: 'NA',
    name: 'NextGen Academic Trust',
    type: 'Corporate Foundation',
    repName: 'Andrea Lim',
    repDesignation: 'Grants Administrator',
    repEmail: 'andrea@nextgen.edu',
    repPhone: '+63 919 333 4455',
    programs: 2,
    dateCreated: 'May 19, 2026',
    status: 'Disabled',
    address: 'High Street, BGC, Taguig City'
  },
  {
    id: 'prov-4',
    code: 'PY',
    name: 'Pacific Youth Initiative',
    type: 'Government Partner / LGU',
    repName: 'Daniel Cruz',
    repDesignation: 'Regional Coordinator',
    repEmail: 'd.cruz@pacificyouth.org',
    repPhone: '+63 920 444 5566',
    programs: 3,
    dateCreated: 'May 14, 2026',
    status: 'Active',
    address: 'National Highway, Calamba City, Laguna'
  }
];

const AdminProviders = () => {
  const [providers, setProviders] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('escholar_admin_providers') || '[]');
      return saved.length > 0 ? saved : INITIAL_PROVIDERS;
    } catch {
      return INITIAL_PROVIDERS;
    }
  });

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // New Provider Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'Private Foundation',
    address: '',
    repName: '',
    repDesignation: 'Grants Administrator',
    repEmail: '',
    repPhone: ''
  });

  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdownId(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const saveProviders = (updated) => {
    setProviders(updated);
    localStorage.setItem('escholar_admin_providers', JSON.stringify(updated));
  };

  const toggleStatus = (id) => {
    const updated = providers.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Active' ? 'Disabled' : 'Active';
        showToast(`Provider "${p.name}" account set to ${nextStatus}.`);
        return { ...p, status: nextStatus };
      }
      return p;
    });
    saveProviders(updated);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const initials = formData.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'PR';
    const newProv = {
      id: `prov-${Date.now()}`,
      code: initials,
      name: formData.name,
      type: formData.type,
      repName: formData.repName,
      repDesignation: formData.repDesignation || 'Authorized Officer',
      repEmail: formData.repEmail,
      repPhone: formData.repPhone,
      programs: 0,
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active',
      address: formData.address || 'Philippines'
    };

    saveProviders([newProv, ...providers]);
    setShowCreateModal(false);
    setFormData({ name: '', type: 'Private Foundation', address: '', repName: '', repDesignation: 'Grants Administrator', repEmail: '', repPhone: '' });
    showToast(`Successfully created provider account for "${newProv.name}"!`);
  };

  const filtered = providers.filter(p => {
    if (activeTab === 'Active' && p.status !== 'Active') return false;
    if (activeTab === 'Disabled' && p.status !== 'Disabled') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.repName.toLowerCase().includes(q) || p.repEmail.toLowerCase().includes(q);
    }
    return true;
  });

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
          <h2 className="pd-title">Provider accounts</h2>
          <p className="pd-subtitle">Create, review, and control scholarship organization access.</p>
        </div>

        <button 
          className="pd-primary-btn" 
          onClick={() => setShowCreateModal(true)}
        >
          <PlusCircle size={16} /> Create new provider
        </button>
      </div>

      {/* Table Card */}
      <div className="programs-table-card">
        <div className="programs-toolbar" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="table-search-input-box" style={{ minWidth: '280px' }}>
            <Search size={15} className="search-icon-muted" />
            <input 
              type="text" 
              placeholder="Search organization, rep, or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginLeft: 'auto' }}>
            <div className="status-tabs-group">
              <button 
                className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
                onClick={() => setActiveTab('All')}
              >
                All
              </button>
              <button 
                className={`tab-btn ${activeTab === 'Active' ? 'active' : ''}`}
                onClick={() => setActiveTab('Active')}
              >
                Active
              </button>
              <button 
                className={`tab-btn ${activeTab === 'Disabled' ? 'active' : ''}`}
                onClick={() => setActiveTab('Disabled')}
              >
                Disabled
              </button>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {filtered.length} of {providers.length}
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper">
          <table className="programs-data-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>ORGANIZATION</th>
                <th>REPRESENTATIVE</th>
                <th>PROGRAMS</th>
                <th>DATE CREATED</th>
                <th>ACCOUNT STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">No provider accounts found.</td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="program-table-row" onClick={() => setSelectedProvider(p)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '8px',
                          background: '#eff6ff', border: '1px solid #bfdbfe',
                          color: '#082894', fontWeight: 800, fontSize: '0.8rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                          {p.code}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{p.name}</span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.type}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0f172a' }}>{p.repName}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.repEmail}</span>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontWeight: 700, color: '#082894', fontSize: '0.875rem' }}>{p.programs}</span>
                    </td>

                    <td>
                      <span className="table-date-text">{p.dateCreated}</span>
                    </td>

                    <td>
                      <span className={`status-badge-pill ${p.status === 'Active' ? 'status-published' : 'status-draft'}`}>
                        {p.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      {/* ONLY 3-DOTS MENU BUTTON MATCHING PROVIDER PORTAL */}
                      <div className="dropdown-action-wrapper" style={{ display: 'inline-block' }}>
                        <button 
                          className="btn-dots-menu"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === p.id ? null : p.id);
                          }}
                          title="Actions"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openDropdownId === p.id && (
                          <div className="action-dropdown-menu" style={{ minWidth: '170px' }}>
                            <button className="dropdown-item" onClick={() => { setSelectedProvider(p); setOpenDropdownId(null); }}>
                              <Eye size={14} /> View Details
                            </button>
                            <button className="dropdown-item" onClick={() => { toggleStatus(p.id); setOpenDropdownId(null); }}>
                              {p.status === 'Active' ? <XCircle size={14} color="#dc2626" /> : <CheckCircle size={14} color="#15803d" />}
                              {p.status === 'Active' ? 'Disable Account' : 'Activate Account'}
                            </button>
                            <button className="dropdown-item" onClick={() => { showToast(`Password reset link sent to ${p.repEmail}`); setOpenDropdownId(null); }}>
                              <KeyRound size={14} /> Reset Password
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="modal-overlay" onClick={() => setSelectedProvider(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            maxWidth: '540px', width: '92%', borderRadius: '16px', border: '1.5px solid #cbd5e1', background: '#fff', padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#082894', fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedProvider.code}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{selectedProvider.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{selectedProvider.type}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProvider(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Office Address</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedProvider.address}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Authorized Representative</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedProvider.repName} ({selectedProvider.repDesignation})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Official Email</span>
                <span style={{ fontWeight: 600, color: '#082894' }}>{selectedProvider.repEmail}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Contact Phone</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedProvider.repPhone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Active Programs</span>
                <span style={{ fontWeight: 700, color: '#15803d' }}>{selectedProvider.programs} Published</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Account Status</span>
                <span className={`status-badge-pill ${selectedProvider.status === 'Active' ? 'status-published' : 'status-draft'}`}>
                  {selectedProvider.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
              <button className="btn-modal-close" onClick={() => setSelectedProvider(null)}>Close</button>
              <button 
                className="pd-primary-btn" 
                style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
                onClick={() => { toggleStatus(selectedProvider.id); setSelectedProvider(null); }}
              >
                {selectedProvider.status === 'Active' ? 'Disable Account' : 'Activate Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Provider Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            maxWidth: '540px', width: '92%', borderRadius: '16px', border: '1.5px solid #cbd5e1', background: '#fff', padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Create New Provider Account</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="input-label">Organization Name *</label>
                <input 
                  className="clean-input" 
                  type="text" 
                  required 
                  placeholder="e.g. Metrobank Foundation, Inc."
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="input-label">Organization Type</label>
                  <select 
                    className="table-select-cycle" 
                    style={{ width: '100%' }}
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Private Foundation">Private Foundation</option>
                    <option value="Non-Profit Organization">Non-Profit Organization</option>
                    <option value="Corporate Foundation">Corporate Foundation</option>
                    <option value="Government Agency">Government Agency</option>
                    <option value="LGU Partner">LGU Partner</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Office Address</label>
                  <input 
                    className="clean-input" 
                    type="text" 
                    placeholder="e.g. Makati City"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="input-label">Authorized Representative Name *</label>
                  <input 
                    className="clean-input" 
                    type="text" 
                    required 
                    placeholder="e.g. Juan dela Cruz"
                    value={formData.repName}
                    onChange={e => setFormData({ ...formData, repName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Designation</label>
                  <input 
                    className="clean-input" 
                    type="text" 
                    placeholder="e.g. Executive Director"
                    value={formData.repDesignation}
                    onChange={e => setFormData({ ...formData, repDesignation: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="input-label">Official Email *</label>
                  <input 
                    className="clean-input" 
                    type="email" 
                    required 
                    placeholder="rep@organization.org"
                    value={formData.repEmail}
                    onChange={e => setFormData({ ...formData, repEmail: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Contact Phone</label>
                  <input 
                    className="clean-input" 
                    type="text" 
                    placeholder="+63 917 000 0000"
                    value={formData.repPhone}
                    onChange={e => setFormData({ ...formData, repPhone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                <button className="btn-modal-close" type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button className="pd-primary-btn" type="submit">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProviders;
