import React, { useState } from 'react';
import { Save, Plus } from 'lucide-react';

const AdminCreateProgram = () => {
  const [published, setPublished] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
    }, 3000);
  };

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '2rem' }}>
        <h2>Create Scholarship Program</h2>
        <p>Publish a new scholarship program to be matched with applicants.</p>
      </div>

      <div className="profile-card" style={{ maxWidth: '800px', padding: '2rem' }}>
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="form-group">
            <label className="form-label">Program Title</label>
            <input type="text" className="form-input" placeholder="e.g. DOST-SEI Merit Scholarship" required />
          </div>

          <div className="form-group">
            <label className="form-label">Provider Name</label>
            <input type="text" className="form-input" placeholder="e.g. Department of Science and Technology" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Tuition Coverage</label>
              <input type="text" className="form-input" placeholder="e.g. ₱40,000/yr" required />
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Stipend</label>
              <input type="text" className="form-input" placeholder="e.g. ₱3,500/mo" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Slots Available</label>
              <input type="number" className="form-input" placeholder="e.g. 250" required />
            </div>
            <div className="form-group">
              <label className="form-label">Deadline</label>
              <input type="date" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Required GWA (for AI Match)</label>
              <input type="number" step="0.01" className="form-input" placeholder="e.g. 1.50" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Program Description</label>
            <textarea className="form-input" rows="5" placeholder="Enter the full details and eligibility criteria of the scholarship..." required></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {published ? <Save size={16} /> : <Plus size={16} />}
              {published ? 'Published!' : 'Publish Program'}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default AdminCreateProgram;
