import React from 'react';
import RecommendationCard from './RecommendationCard';
import ApplicationCard from './ApplicationCard';

const Dashboard = () => {
  return (
    <main className="dashboard-content">

      <section className="profile-banner">
        <div className="profile-info">
          <h2>Complete your information</h2>
          <p>A complete profile improves recommendation accuracy</p>
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
        </div>
        <button className="btn-complete hover-lift">Complete Profile</button>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>10</h3>
          <p>Matched Scholarships</p>
          <span>Matched to your profile</span>
        </div>
        <div className="stat-card">
          <h3>01</h3>
          <p>Application Submitted</p>
          <span>01 Pending</span>
        </div>
        <div className="stat-card">
          <h3>12</h3>
          <p>Saved Scholarships</p>
          <span>Bookmarked for later</span>
        </div>
      </section>

      <div className="main-layout">

        <div className="main-col-full">
          <h2 className="section-title">Top Recommendations</h2>
          <div className="recommendations-list">
             <RecommendationCard 
              tag="DOST"
              title="DOST Merit Program"
              description="Lorem Ipsum blah blah"
              details="40,000/yr tuition - 3,000 stipend  40 slots  30days"
              match="95"
            />
            <RecommendationCard 
              tag="DOST"
              title="DOST Merit Program"
              description="Lorem Ipsum blah blah"
              details="40,000/yr tuition - 3,000 stipend  40 slots  30days"
              match="95"
            />
          </div>
        </div>

        <div className="main-col-full" style={{ marginTop: '1rem' }}>
          <h2 className="section-title">My Application</h2>
          <div className="recommendations-list">
            <ApplicationCard 
              title="DOST Merit Program"
              description="Lorem Ipsum blah blah"
              date="Applied: july 10, 2025"
              status="Under Review"
            />
            <ApplicationCard 
              title="DOST Merit Program"
              description="Lorem Ipsum blah blah"
              date="Applied: july 10, 2025"
              status="Under Review"
            />
          </div>
        </div>

      </div>



    </main>
  );
};

export default Dashboard;
