import React from 'react';
import { Bookmark, GraduationCap, Users, Calendar } from 'lucide-react';

const BrowseScholarshipCard = ({ tags, title, provider, description, tuition, slots, deadline, isBookmarked }) => {
  return (
    <div className="browse-card hover-lift">
      <div className="browse-card-header">
        <div className="browse-tags">
          {tags.map((tag, index) => (
            <span key={index} className={`tag ${index === 0 ? 'primary-tag' : ''}`}>{tag}</span>
          ))}
        </div>
        <button className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}>
          <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="browse-card-body">
        <h3 className="browse-title">{title}</h3>
        <span className="browse-provider">{provider}</span>
        <p className="browse-desc">{description}</p>
      </div>

      <div className="browse-meta">
        <div className="meta-item">
          <GraduationCap size={16} />
          <span>{tuition}</span>
        </div>
        <div className="meta-item">
          <Users size={16} />
          <span>{slots} slots available</span>
        </div>
        <div className="meta-item">
          <Calendar size={16} />
          <span>Deadline: {deadline}</span>
        </div>
      </div>

      <div className="browse-actions">
        <button className="btn-primary flex-1">Learn More</button>
        <button className="btn-outline">Apply</button>
      </div>
    </div>
  );
};

export default BrowseScholarshipCard;
