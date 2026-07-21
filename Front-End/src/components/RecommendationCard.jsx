import React from 'react';
import { Bookmark } from 'lucide-react';

const RecommendationCard = ({ tag, title, description, details, match }) => {
  return (
    <div className="recommendation-card hover-lift">
      <div className="card-top-row">
        <div className="card-top-left">
          <span className="tag">{tag}</span>
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
          <div className="card-details">{details}</div>
        </div>
        <div className="match-badge">
          <strong>{match}%</strong>
          <span>Matched</span>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn-primary btn-apply">Apply Now</button>
        <button className="btn-secondary btn-details">View Full Details</button>
        <button className="btn-icon-outline">
          <Bookmark size={20} color="#64748b" />
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
