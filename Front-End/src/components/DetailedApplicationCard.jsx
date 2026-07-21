import React from 'react';

const DetailedApplicationCard = ({ title, provider, date, status, documents }) => {
  return (
    <div className="detailed-app-card hover-lift">
      {/* Top Row: Title, Provider, Date, Status */}
      <div className="detailed-app-header">
        <div className="detailed-app-info">
          <h3 className="detailed-app-title">{title}</h3>
          <p className="detailed-app-provider">{provider}</p>
        </div>
        <div className="detailed-app-meta">
          <span className="detailed-app-date">{date}</span>
          <div className="app-status-badge">{status}</div>
        </div>
      </div>
      
      {/* Divider */}
      <hr className="detailed-app-divider" />
      
      {/* Documents Tags */}
      <div className="detailed-app-docs">
        {documents && documents.map((doc, index) => (
          <span key={index} className="doc-tag">{doc}</span>
        ))}
      </div>
      
      {/* Actions */}
      <div className="detailed-app-actions">
        <button className="btn-outline-dark btn-half">View Details</button>
        <button className="btn-primary btn-half">Track Status</button>
      </div>
    </div>
  );
};

export default DetailedApplicationCard;
