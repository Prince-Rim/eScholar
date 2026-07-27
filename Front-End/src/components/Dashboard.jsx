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
              description="Awarded to students with high aptitude in science and mathematics who wish to pursue careers in science and technology fields."
              details="40,000/yr tuition - 3,000 stipend | 40 slots | 30 days left"
              match="95"
            />
            <RecommendationCard 
              tag="CHED"
              title="CHED Scholarship Program (CSP)"
              description="Financial assistance for highly qualified, underprivileged, and deserving students seeking to pursue a college degree."
              details="30,000/yr tuition - 2,500 stipend | 20 slots | 15 days left"
              match="88"
            />
          </div>
        </div>

        <div className="main-col-full" style={{ marginTop: '1rem' }}>
          <h2 className="section-title">My Application</h2>
          <div className="recommendations-list">
            <ApplicationCard 
              title="DOST Merit Program"
              description="Application for the Department of Science and Technology Undergraduate Scholarship."
              date="Applied: July 10, 2025"
              status="Under Review"
            />
            <ApplicationCard 
              title="CHED Scholarship Program"
              description="Application for the CHED Student Financial Assistance Program."
              date="Applied: July 12, 2025"
              status="Pending Documents"
            />
          </div>
        </div>

      </div>



    </main>
  );
};

export default Dashboard;
