import React from 'react';

const ApplicationCard = ({ title, description, date, status }) => {
  return (
    <div className="application-card hover-lift">
      <div className="app-card-left">
        <div className="app-logo-placeholder">
           <div className="logo-circles">
             <div className="circle-blue"></div>
             <div className="circle-black"></div>
             <div className="circle-black2"></div>
             <div className="circle-blue2"></div>
           </div>
        </div>
        <div className="app-card-info">
          <h3 className="app-card-title">{title}</h3>
          <p className="app-card-desc">{description}</p>
        </div>
      </div>
      
      <div className="app-card-right">
        <span className="app-date">{date}</span>
        <div className="app-status-badge">{status}</div>
      </div>
    </div>
  );
};

export default ApplicationCard;
