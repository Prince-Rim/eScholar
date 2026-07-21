import React from 'react';

const RecommendationCard = ({ tag, title, description, details, match }) => {
  return (
    <div className="recommendation-card hover-lift">
      <div className="card-header">
        <div>
          <span className="tag">{tag}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="match-badge">
          <strong>{match}%</strong>
          <span>Matched</span>
        </div>
      </div>
      
      <p className="card-desc">{description}</p>
      
      <div className="card-details">
        {details}
      </div>
      
      <div className="card-actions">
        <button className="btn-primary">Apply Now</button>
        <button className="btn-secondary">View details</button>
        <button className="btn-icon">...</button>
      </div>
    </div>
  );
};

export default RecommendationCard;
