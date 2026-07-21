import React from 'react';
import RecommendationCard from './RecommendationCard';

const Dashboard = () => {
  return (
    <main className="dashboard-content">
      
      {/* Profile Completion Banner */}
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

      {/* Stats Cards */}
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

      {/* Main Two-Column Content */}
      <div className="main-layout">
        
        {/* Recommendations */}
        <div className="main-col-full">
          <h2 className="section-title">Top Recommendations</h2>
          <div className="recommendations-list">
            <RecommendationCard 
              tag="DOST"
              title="DOST Merit Program"
              description="Lorem Ipsum blah blah"
              details="40,000/yr tuition - 3,000 stipend • 40 slots • 30days"
              match="95"
            />
            <RecommendationCard 
              tag="PRIVATE"
              title="BASTA KAHIT ANO"
              description="Lorem Ipsum blah blah"
              details="40,000/yr tuition - 3,000 stipend"
              match="95"
            />
          </div>
        </div>

      </div>

      {/* Events and News Section */}
      <section className="events-news">
        <h2 className="section-title">Events and News</h2>
        <div className="events-grid">
          <div className="event-card hover-lift">
            <span className="event-date">AUG 20</span>
            <h4>College Admissions Seminar</h4>
            <p>Join us for tips on securing your dream college.</p>
          </div>
          <div className="event-card hover-lift">
            <span className="event-date">SEP 05</span>
            <h4>New STEM Scholarships Available</h4>
            <p>15 new programs added for tech students.</p>
          </div>
          <div className="event-card hover-lift">
            <span className="event-date">OCT 12</span>
            <h4>Essay Writing Workshop</h4>
            <p>Learn how to craft a winning scholarship essay.</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Dashboard;
