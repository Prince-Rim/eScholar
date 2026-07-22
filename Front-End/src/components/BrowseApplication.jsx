import React, { useState, useRef } from 'react';
import { Search, ArrowDownUp, SlidersHorizontal, Info, X, Upload, FileCheck, Loader2 } from 'lucide-react';
import BrowseScholarshipCard from './BrowseScholarshipCard';

const BrowseApplication = () => {
  const [extractedGrade, setExtractedGrade] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef(null);

  const allScholarships = [
    {
      id: 1,
      tags: ['Merit', 'All Courses', 'National'],
      title: "Presidential Academic Excellence",
      provider: "Office of the President",
      description: "Highly competitive scholarship for the brightest minds. Requires exceptional academic standing and leadership potential.",
      tuition: "Full tuition + ₱10,000/mo stipend",
      slots: "50",
      deadline: "Oct 15, 2025",
      reqGrade: 1.25,
      isBookmarked: false
    },
    {
      id: 2,
      tags: ['DOST', 'Engineering', 'STEM'],
      title: "DOST-SEI Merit Scholarship",
      provider: "Department of Science and Technology",
      description: "Merit-based scholarship for science and engineering students. Covers full tuition and monthly living allowance with monthly mentoring.",
      tuition: "₱40,000/yr tuition + ₱3,500/mo stipend",
      slots: "250",
      deadline: "Aug 31, 2025",
      reqGrade: 1.50,
      isBookmarked: false
    },
    {
      id: 3,
      tags: ['CHED', 'All Courses', 'Regional'],
      title: "CHED Half-Merit Scholarship",
      provider: "Commission on Higher Education",
      description: "Partial scholarship for students with good academic standing. Prioritizes scholars from regions with limited educational opportunities.",
      tuition: "50% tuition coverage",
      slots: "1000",
      deadline: "Sep 15, 2025",
      reqGrade: 1.75,
      isBookmarked: false
    },
    {
      id: 4,
      tags: ['LGU', 'Local', 'Any Course'],
      title: "LGU Educational Assist",
      provider: "Municipality of Sta. Rosa, Laguna",
      description: "Local scholarship program for residents pursuing any tertiary course. Priority given to honors students and those with financial need.",
      tuition: "₱20,000/yr tuition assistance",
      slots: "150",
      deadline: "Jul 31, 2025",
      reqGrade: 2.25,
      isBookmarked: false
    },
    {
      id: 5,
      tags: ['Private', 'Humanities', 'Social Science'],
      title: "Community Service Grant",
      provider: "Ayala Foundation",
      description: "Support for students dedicated to community service and social impact. Focuses on character and community involvement over perfect grades.",
      tuition: "₱30,000/yr tuition + book allowance",
      slots: "75",
      deadline: "Nov 30, 2025",
      reqGrade: 2.50,
      isBookmarked: true
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsExtracting(true);
    setExtractedGrade(null);

    setTimeout(() => {
      setExtractedGrade(1.50); 
      setIsExtracting(false);
    }, 2500);
  };

  const removeGradeFilter = () => {
    setExtractedGrade(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredScholarships = extractedGrade 
    ? allScholarships.filter(s => extractedGrade <= s.reqGrade)
    : allScholarships;

  return (
    <main className="browse-content">

      <section className="search-filter-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search scholarships by name, provider..." 
            className="search-input"
          />
        </div>

        <div className="upload-match-container">
          <input 
            type="file" 
            accept=".pdf,.png,.jpg,.jpeg" 
            id="grade-upload" 
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <label htmlFor="grade-upload" className={`btn-upload-match ${isExtracting ? 'extracting' : ''}`}>
            {isExtracting ? (
              <><Loader2 size={18} className="spin-icon" /> AI Extracting...</>
            ) : extractedGrade ? (
              <><FileCheck size={18} /> Grade Uploaded</>
            ) : (
              <><Upload size={18} /> Auto-Match Grade</>
            )}
          </label>
        </div>
        <div className="filter-actions">
          <button className="btn-sort">
            <ArrowDownUp size={16} />
            Sort
          </button>
          <button className="btn-filter">
            <SlidersHorizontal size={16} />
            Filter
            <span className="badge">3</span>
          </button>
        </div>
      </section>

      <section className="active-filters-row">
        <span className="filters-label">Active Filters:</span>
        <div className="filter-pills">
          {extractedGrade && (
            <span className="filter-pill highlight-pill" style={{ backgroundColor: '#e0e7ff', color: '#3730a3', borderColor: '#c7d2fe' }}>
              Extracted GWA: {extractedGrade.toFixed(2)} 
              <X size={14} className="pill-close" onClick={removeGradeFilter}/>
            </span>
          )}
          <span className="filter-pill">Engineering <X size={14} className="pill-close"/></span>
          <span className="filter-pill">Region IV-A <X size={14} className="pill-close"/></span>
          <span className="filter-pill">₱30K-₱50K/month <X size={14} className="pill-close"/></span>
        </div>
        <button className="btn-clear-all">Clear all</button>
      </section>

      <section className="results-header">
        <div>
          <h2 className="results-title">Available Scholarships</h2>
          <p className="results-count">Showing {filteredScholarships.length} of {allScholarships.length} scholarships matching your criteria</p>
        </div>
        <div className="sort-info">
          <Info size={16} />
          <span>Sorted by: Match Score (High to Low)</span>
        </div>
      </section>

      <section className="scholarship-list">
        {filteredScholarships.map(scholarship => (
          <BrowseScholarshipCard 
            key={scholarship.id}
            tags={scholarship.tags}
            title={scholarship.title}
            provider={scholarship.provider}
            description={scholarship.description}
            tuition={scholarship.tuition}
            slots={scholarship.slots}
            deadline={scholarship.deadline}
            reqGrade={scholarship.reqGrade}
            isBookmarked={scholarship.isBookmarked}
          />
        ))}
      </section>

    </main>
  );
};

export default BrowseApplication;
