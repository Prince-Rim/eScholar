import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import BannerCompleteProfile from './components/dashboard/BannerCompleteProfile';
import MetricsCards from './components/dashboard/MetricsCards';
import ScholarshipCard from './components/scholarships/ScholarshipCard';
import AIMatchedEnginePanel from './components/dashboard/AIMatchedEnginePanel';
import EventsAndNews from './components/dashboard/EventsAndNews';
import ScholarshipDetailModal from './components/scholarships/ScholarshipDetailModal';
import CompleteProfileModal from './components/scholarships/CompleteProfileModal';
import BrowseApplicationsView from './components/views/BrowseApplicationsView';
import MyApplicationsView from './components/views/MyApplicationsView';
import AIRecommendationsView from './components/views/AIRecommendationsView';
import SettingsView from './components/views/SettingsView';

import { INITIAL_PROFILE, SCHOLARSHIPS_DATA } from './data/scholarships';
import { calculateMatchScore, getProfileHealthStats } from './utils/matchingEngine';

export default function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('eservices_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('eservices_theme');
    return saved || 'light';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookmarkedIds, setBookmarkedIds] = useState(['private-basta-kahit-ano']);
  const [appliedIds, setAppliedIds] = useState(['dost-merit-2026']);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeEngineFilter, setActiveEngineFilter] = useState('ALL');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eservices_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('eservices_profile', JSON.stringify(profile));
  }, [profile]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleToggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApply = (scholarship) => {
    if (!appliedIds.includes(scholarship.id)) {
      setAppliedIds(prev => [...prev, scholarship.id]);
    }
  };

  const healthStats = getProfileHealthStats(profile, SCHOLARSHIPS_DATA);

  const evaluatedScholarships = SCHOLARSHIPS_DATA.map(s => ({
    scholarship: s,
    matchData: calculateMatchScore(profile, s)
  })).sort((a, b) => b.matchData.score - a.matchData.score);

  const filteredDashboardScholarships = evaluatedScholarships.filter(({ scholarship }) => {
    if (activeEngineFilter === 'GOVT') return scholarship.agency === 'DOST' || scholarship.agency === 'CHED';
    if (activeEngineFilter === 'STEM') return scholarship.requiredCategory === 'STEM';
    if (activeEngineFilter === 'STIPEND') return scholarship.monthlyStipend >= 5000;
    return true;
  });

  return (
    <div className="app-container">
      <Header 
        profile={profile} 
        theme={theme} 
        toggleTheme={toggleTheme}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      <div className="dashboard-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="main-content">
          {activeTab === 'dashboard' && (
            <>
              <BannerCompleteProfile 
                healthScore={healthStats.healthScore}
                onOpenProfileModal={() => setIsProfileModalOpen(true)}
              />

              <MetricsCards 
                matchedCount={healthStats.matchedCount}
                submittedCount={appliedIds.length}
                totalPotentialFunding={healthStats.totalPotentialFunding}
                urgentDeadlinesCount={healthStats.urgentDeadlinesCount}
              />

              <div className="recommendations-section">
                <div>
                  <h3 className="section-title">
                    Top AI Recommendations
                    <span className="section-subtitle">• Matches sorted by eligibility algorithms</span>
                  </h3>

                  <div className="scholarship-list">
                    {filteredDashboardScholarships.slice(0, 3).map(({ scholarship, matchData }) => (
                      <ScholarshipCard
                        key={scholarship.id}
                        scholarship={scholarship}
                        matchData={matchData}
                        onViewDetails={(s) => setSelectedScholarship(s)}
                        onApply={handleApply}
                        isBookmarked={bookmarkedIds.includes(scholarship.id)}
                        onToggleBookmark={handleToggleBookmark}
                        hasApplied={appliedIds.includes(scholarship.id)}
                      />
                    ))}
                  </div>
                </div>

                <AIMatchedEnginePanel 
                  profile={profile}
                  healthStats={healthStats}
                  onOpenProfileModal={() => setIsProfileModalOpen(true)}
                  activeFilter={activeEngineFilter}
                  setActiveFilter={setActiveEngineFilter}
                />
              </div>

              <EventsAndNews 
                onSelectEvent={(event) => alert(`Event Notice: ${event.title}\n${event.desc}`)}
              />
            </>
          )}

          {activeTab === 'browse' && (
            <BrowseApplicationsView 
              scholarships={SCHOLARSHIPS_DATA}
              profile={profile}
              onViewDetails={(s) => setSelectedScholarship(s)}
              onApply={handleApply}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              appliedIds={appliedIds}
            />
          )}

          {activeTab === 'recommendations' && (
            <AIRecommendationsView 
              scholarships={SCHOLARSHIPS_DATA}
              profile={profile}
              onViewDetails={(s) => setSelectedScholarship(s)}
              onApply={handleApply}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
            />
          )}

          {activeTab === 'applications' && (
            <MyApplicationsView 
              scholarships={SCHOLARSHIPS_DATA}
              profile={profile}
              appliedIds={appliedIds}
              bookmarkedIds={bookmarkedIds}
              onViewDetails={(s) => setSelectedScholarship(s)}
              onApply={handleApply}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              profile={profile}
              theme={theme}
              toggleTheme={toggleTheme}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
            />
          )}
        </main>
      </div>

      {selectedScholarship && (
        <ScholarshipDetailModal 
          scholarship={selectedScholarship}
          matchData={calculateMatchScore(profile, selectedScholarship)}
          onClose={() => setSelectedScholarship(null)}
          onApply={handleApply}
          hasApplied={appliedIds.includes(selectedScholarship.id)}
        />
      )}

      {isProfileModalOpen && (
        <CompleteProfileModal 
          profile={profile}
          onSave={(updated) => setProfile(updated)}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
}
