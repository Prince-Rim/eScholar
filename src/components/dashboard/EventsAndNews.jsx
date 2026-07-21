import React from 'react';
import { Calendar, ArrowRight, Video, FileText, MapPin } from 'lucide-react';
import { EVENTS_AND_NEWS } from '../../data/scholarships';

export default function EventsAndNews({ onSelectEvent }) {
  const getIcon = (tag) => {
    switch (tag) {
      case 'Exam Schedule': return <MapPin size={16} />;
      case 'Orientation': return <Video size={16} />;
      case 'Masterclass': return <FileText size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  return (
    <section className="events-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="section-title">
          Events and News
          <span className="section-subtitle">• Official announcements and applicant resources</span>
        </h3>
      </div>

      <div className="events-grid">
        {EVENTS_AND_NEWS.map((item) => (
          <div key={item.id} className="event-card" onClick={() => onSelectEvent && onSelectEvent(item)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="event-tag">{item.tag}</span>
              {getIcon(item.tag)}
            </div>

            <h4 className="event-title">{item.title}</h4>

            <div className="event-date">
              <Calendar size={14} />
              <span>{item.date}</span>
            </div>

            <p className="event-desc">{item.desc}</p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--primary)',
              marginTop: 'auto',
              paddingTop: 8
            }}>
              <span>Read announcement</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
