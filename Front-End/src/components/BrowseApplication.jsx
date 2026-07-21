import React from 'react';
import { Search, ArrowDownUp, SlidersHorizontal, Info, X } from 'lucide-react';
import BrowseScholarshipCard from './BrowseScholarshipCard';

const BrowseApplication = () => {
  return (
    <main className="browse-content">
      
      {/* Top Search and Filter Bar */}
      <section className="search-filter-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search scholarships by name, provider..." 
            className="search-input"
          />
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

      {/* Active Filters Row */}
      <section className="active-filters-row">
        <span className="filters-label">Active Filters:</span>
        <div className="filter-pills">
          <span className="filter-pill">Engineering <X size={14} className="pill-close"/></span>
          <span className="filter-pill">Region IV-A <X size={14} className="pill-close"/></span>
          <span className="filter-pill">₱30K-₱50K/month <X size={14} className="pill-close"/></span>
        </div>
        <button className="btn-clear-all">Clear all</button>
      </section>

      {/* Results Header */}
      <section className="results-header">
        <div>
          <h2 className="results-title">Available Scholarships</h2>
          <p className="results-count">Showing 12 of 148 scholarships matching your criteria</p>
        </div>
        <div className="sort-info">
          <Info size={16} />
          <span>Sorted by: Match Score (High to Low)</span>
        </div>
      </section>

      {/* Scholarship List */}
      <section className="scholarship-list">
        <BrowseScholarshipCard 
          tags={['DOST', 'Engineering', 'STEM']}
          title="DOST-SEI Merit Scholarship"
          provider="Department of Science and Technology"
          description="Merit-based scholarship for science and engineering students. Covers full tuition and monthly living allowance with monthly mentoring."
          tuition="₱40,000/yr tuition + ₱3,500/mo stipend"
          slots="250"
          deadline="Aug 31, 2025"
          isBookmarked={false}
        />
        <BrowseScholarshipCard 
          tags={['CHED', 'Engineering', 'Regional']}
          title="CHED Priority Development Asean Scholarship"
          provider="Commission on Higher Education"
          description="Full tuition coverage for priority courses. Prioritizes scholars from regions with limited educational opportunities. Includes career development seminars."
          tuition="Full tuition + ₱3,000/mo allowance"
          slots="500"
          deadline="Sep 15, 2025"
          isBookmarked={false}
        />
        <BrowseScholarshipCard 
          tags={['Private', 'All Courses', 'Private']}
          title="SM Foundation College Scholarship Program"
          provider="SM Foundation, Inc."
          description="Support for underprivileged but deserving students pursuing higher education. Covers tuition, books, and school supplies with annual renewal based on academic performance."
          tuition="Full tuition + school supplies (up to ₱5,000/yr)"
          slots="100"
          deadline="Oct 1, 2025"
          isBookmarked={true}
        />
        <BrowseScholarshipCard 
          tags={['LGU', 'Local', 'Any Course']}
          title="LGU Scholarship for Deserving Students"
          provider="Municipality of Sta. Rosa, Laguna"
          description="Local scholarship program for residents pursuing any tertiary course. Priority given to honors students and those with financial need within the municipality."
          tuition="₱20,000/yr tuition assistance"
          slots="50"
          deadline="Jul 31, 2025"
          isBookmarked={false}
        />
      </section>

    </main>
  );
};

export default BrowseApplication;
