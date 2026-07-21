import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import ScholarshipCard from '../scholarships/ScholarshipCard';
import { calculateMatchScore } from '../../utils/matchingEngine';

export default function BrowseApplicationsView({ 
  scholarships, 
  profile, 
  onViewDetails, 
  onApply, 
  bookmarkedIds, 
  onToggleBookmark,
  appliedIds
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('ALL');
  const [sortBy, setSortBy] = useState('match');

  const agencies = ['ALL', 'DOST', 'CHED', 'PRIVATE', 'SM FOUNDATION', 'MEGAWORLD', 'SECURITY BANK'];

  const evaluatedScholarships = scholarships.map(s => ({
    scholarship: s,
    matchData: calculateMatchScore(profile, s)
  }));

  const filtered = evaluatedScholarships.filter(({ scholarship }) => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scholarship.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = selectedAgency === 'ALL' || scholarship.agency === selectedAgency;
    return matchesSearch && matchesAgency;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'match') return b.matchData.score - a.matchData.score;
    if (sortBy === 'amount') return b.scholarship.tuitionCoverage - a.scholarship.tuitionCoverage;
    if (sortBy === 'deadline') return a.scholarship.deadlineDaysLeft - b.scholarship.deadlineDaysLeft;
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: '1.4rem' }}>Browse All Scholarship Applications</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Explore government, institutional, and private corporate grants across all major academic fields.
        </p>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: 38 }}
            placeholder="Search scholarship name, agency, STEM, tuition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select 
              className="form-select" 
              style={{ width: 'auto', padding: '8px 12px' }}
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              {agencies.map(a => <option key={a} value={a}>{a === 'ALL' ? 'All Providers' : a}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
            <select 
              className="form-select" 
              style={{ width: 'auto', padding: '8px 12px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="match">Highest AI Match Score</option>
              <option value="amount">Highest Tuition Grant Amount</option>
              <option value="deadline">Closing Soonest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="scholarship-list">
        {filtered.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 40,
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            No scholarships found matching your criteria. Try adjusting search filters or selecting "All Providers".
          </div>
        ) : (
          filtered.map(({ scholarship, matchData }) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              matchData={matchData}
              onViewDetails={onViewDetails}
              onApply={onApply}
              isBookmarked={bookmarkedIds.includes(scholarship.id)}
              onToggleBookmark={onToggleBookmark}
              hasApplied={appliedIds.includes(scholarship.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
