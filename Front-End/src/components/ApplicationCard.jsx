import React from 'react';
import { Calendar, FileText, CheckCircle, Clock, MapPin, Navigation } from 'lucide-react';

const ApplicationCard = ({ 
  title, 
  provider, 
  appliedDate, 
  docsSubmitted, 
  stage, 
  daysRemaining, 
  status, // 'under-review', 'interview-scheduled', 'approved'
  interviewDetails,
  documents
}) => {
  
  // Dynamic status badge styling
  const getStatusBadge = () => {
    switch(status) {
      case 'under-review': return <span className="status-badge review"><Clock size={14} /> Under Review</span>;
      case 'interview-scheduled': return <span className="status-badge interview"><Calendar size={14} /> Interview Scheduled</span>;
      case 'approved': return <span className="status-badge approved"><CheckCircle size={14} /> Approved</span>;
      default: return null;
    }
  };

  return (
    <div className="app-card">
      <div className="app-card-header">
        <div>
          <h3 className="app-title">{title}</h3>
          <span className="app-provider">{provider}</span>
        </div>
        <div>
          {getStatusBadge()}
        </div>
      </div>

      <div className="app-date">
        <Calendar size={14} /> Applied on {appliedDate}
      </div>

      <div className="app-metrics">
        <div className="metric-box">
          <span className="metric-label">Documents Submitted</span>
          <span className="metric-value">{docsSubmitted}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Application Stage</span>
          <span className="metric-value">{stage}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Days Remaining</span>
          <span className={`metric-value ${daysRemaining === '-' ? 'text-gray' : 'text-orange'}`}>{daysRemaining}</span>
        </div>
      </div>

      {status === 'interview-scheduled' && interviewDetails && (
        <div className="interview-box">
          <div className="interview-header">
            <Calendar size={16} />
            <strong>Interview Scheduled</strong>
          </div>
          <p>{interviewDetails.date}<br/>at {interviewDetails.location}</p>
          <div className="interview-actions">
            <button className="btn-small-outline"><FileText size={14} /> View Confirmation</button>
            <button className="btn-small-outline"><Navigation size={14} /> Get Directions</button>
          </div>
        </div>
      )}

      <div className="app-documents">
        <span className="docs-label">Submitted Documents</span>
        <div className="docs-list">
          {documents.map((doc, index) => (
            <span key={index} className="doc-pill">
              <FileText size={14} /> {doc}
            </span>
          ))}
        </div>
      </div>

      <div className="app-actions">
        {status === 'under-review' && (
          <>
            <button className="btn-outline flex-1">View Details</button>
            <button className="btn-solid-blue flex-1">Track Status</button>
          </>
        )}
        {status === 'interview-scheduled' && (
          <>
            <button className="btn-solid-blue flex-1">Prepare for Interview</button>
            <button className="btn-outline flex-1">Message Coordinator</button>
          </>
        )}
        {status === 'approved' && (
          <>
            <button className="btn-solid-green flex-1">Download Approval Letter</button>
            <button className="btn-outline flex-1">View Next Steps</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
