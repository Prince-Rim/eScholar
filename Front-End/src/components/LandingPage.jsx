import React, { useState, useMemo } from 'react';
import './LandingPage.css';
import heroStudentsImg from '../assets/hero_students.png';
import scholarMariaImg from '../assets/scholar_maria.png';
import scholarJuanImg from '../assets/scholar_juan.png';
import { 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Search, 
  Award, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  BookOpen, 
  DollarSign, 
  Users, 
  Clock, 
  Sparkles, 
  X, 
  Info, 
  Building2, 
  Check,
  Star,
  Bell,
  Calendar,
  Mail,
  PhoneCall
} from 'lucide-react';

const LandingPage = ({ setActiveView }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Core Philippine Scholarship Program Datasets (Clean & Detailed)
  const scholarshipsData = [
    {
      id: 1,
      category: 'STEM',
      badge: 'Government STEM',
      title: 'DOST-SEI Merit & RA 7687 Scholarship',
      provider: 'Department of Science and Technology (DOST)',
      tuition: 'Full Tuition + ₱7,000/month Stipend',
      allowance: '₱10,000/yr Book Allowance + Uniform Grant',
      slots: '5,000 Nationwide',
      deadline: 'August 31, 2026',
      reqGrade: 1.75,
      reqGradeText: 'GWA 1.75 or higher in STEM subjects',
      incomeLimit: '₱300,000 / year (RA 7687 Track)',
      description: 'The flagship government scholarship for talented Filipino students entering priority S&T fields. Includes monthly stipend, learning materials, and guaranteed career placement in science and technology.',
      courses: ['BS Computer Science', 'BS Information Technology', 'BS Civil / Electrical Engineering', 'BS Applied Physics', 'BS Chemistry', 'BS Agriculture'],
      requirements: [
        'Certified True Copy of Grades / Form 137 (GWA ≤ 1.75)',
        'Parents\' Income Tax Return (ITR) or BIR Exemption Certificate',
        'Certificate of Good Moral Character',
        'PSA Certified Birth Certificate',
        'Two (2) recent 2x2 ID photos'
      ],
      contactEmail: 'seigrants@dost.gov.ph',
      contactPhone: '(02) 8837-2071'
    },
    {
      id: 2,
      category: 'Presidential',
      badge: 'Top Honor Grant',
      title: 'Presidential Academic Excellence Award',
      provider: 'Office of the President & CHED',
      tuition: '100% Full Tuition + ₱12,000/month Stipend',
      allowance: '₱25,000 Tech/Laptop Grant + Thesis Allowance',
      slots: '100 Nationwide',
      deadline: 'October 15, 2026',
      reqGrade: 1.25,
      reqGradeText: 'GWA 1.25 or higher (Top 5% batch ranking)',
      incomeLimit: 'No Household Income Limit (Merit Based)',
      description: 'The nation’s most prestigious undergraduate scholarship awarded to extraordinary academic performers demonstrating outstanding leadership and commitment to public service.',
      courses: ['Open to all Accredited Undergraduate Degree Programs (CHED COEs/CODs)'],
      requirements: [
        'Official Transcript of Records with University Seal (GWA ≤ 1.25)',
        'Certificate of Batch Ranking (Top 5% of graduating class)',
        'Two (2) Recommendation Letters from College Deans',
        'Personal Statement Essay (500 words)',
        'Certificate of Extracurricular Leadership'
      ],
      contactEmail: 'presidential.grants@ched.gov.ph',
      contactPhone: '(02) 8441-1256'
    },
    {
      id: 3,
      category: 'Government',
      badge: 'CHED Official',
      title: 'CHED Tulong Dunong & Full Merit Program',
      provider: 'Commission on Higher Education (CHED)',
      tuition: 'Up to ₱120,000 / Academic Year',
      allowance: 'Includes Tuition, Book Stipend & Living Subsidy',
      slots: '2,500 Nationwide',
      deadline: 'September 15, 2026',
      reqGrade: 1.50,
      reqGradeText: 'GWA 1.50 or higher (Full Merit)',
      incomeLimit: '₱400,000 / year Annual Gross Income',
      description: 'Provides substantial financial aid to high-performing students enrolled in recognized Higher Education Institutions (HEIs) across priority economic disciplines.',
      courses: ['Information Technology', 'Teacher Education', 'Health Sciences / Nursing', 'Business Analytics', 'Agriculture'],
      requirements: [
        'Certified True Copy of Grades / Report Card',
        'Certificate of Indigency from Barangay or Parents\' ITR',
        'Certificate of Enrollment / Registration Form',
        'Valid Student or Government ID'
      ],
      contactEmail: 'stufaps@ched.gov.ph',
      contactPhone: '(02) 8441-0927'
    },
    {
      id: 4,
      category: 'LGU Local',
      badge: 'City Municipal',
      title: 'LGU Educational Financial Assistance Program',
      provider: 'Local Government Unit (City / Municipal Mayor\'s Office)',
      tuition: '₱20,000 per Semester (₱40,000 Annual Assistance)',
      allowance: 'Direct Educational Subsidy paid via Cash Card',
      slots: '1,200 Local Residents',
      deadline: 'July 31, 2026',
      reqGrade: 2.25,
      reqGradeText: 'GWA 2.25 or higher without failing grades',
      incomeLimit: '₱250,000 / year (Low-income priority)',
      description: 'Community-centered educational support funded by local government units to empower underprivileged resident youth pursuing tertiary education.',
      courses: ['All Accredited 4-year and 5-year Undergraduate Degree Programs'],
      requirements: [
        'Barangay Certificate of Residency (At least 2 years resident)',
        'Parents\' Voter Registration Certificate or Voter ID',
        'Official Copy of Grades / Transcript for previous term',
        'Utility Bill matching home address'
      ],
      contactEmail: 'scholarship@lgu.gov.ph',
      contactPhone: '(02) 8888-0000'
    },
    {
      id: 5,
      category: 'Private',
      badge: 'Corporate Foundation',
      title: 'Ayala Foundation Leadership Grant',
      provider: 'Ayala Foundation Inc.',
      tuition: '₱40,000 / Year + Executive Mentorship',
      allowance: 'Book Stipend + Guaranteed Summer Internship',
      slots: '150 Scholars',
      deadline: 'November 30, 2026',
      reqGrade: 2.00,
      reqGradeText: 'GWA 2.00 or higher + Active Volunteerism',
      incomeLimit: '₱350,000 / year',
      description: 'Holistic scholarship combining financial grants, executive career mentorship, and leadership bootcamps for student changemakers.',
      courses: ['Humanities', 'Social Sciences', 'Business Administration', 'Environmental Science', 'Information Systems'],
      requirements: [
        'Completed Online Application Form',
        'Portfolio / Proof of Community Involvement',
        'Letter of Intent & Future Career Plan',
        'Transcript of Records / SHS Diploma'
      ],
      contactEmail: 'scholars@ayalafoundation.org',
      contactPhone: '(02) 7759-2100'
    },
    {
      id: 6,
      category: 'Private',
      badge: 'Full Ride Private',
      title: 'SM Foundation College Scholarship Program',
      provider: 'SM Foundation Inc.',
      tuition: '100% Full Tuition Coverage',
      allowance: 'Monthly Living Allowance + Part-time Work Offer',
      slots: '300 Scholars Nationwide',
      deadline: 'December 15, 2026',
      reqGrade: 1.75,
      reqGradeText: 'GWA 1.75 or High School Average of 88%+',
      incomeLimit: '₱150,000 / year Combined Parents\' Income',
      description: 'Comprehensive college scholarship program providing full tuition, monthly stipend, enrichment activities, and guaranteed employment placement.',
      courses: ['Computer Science', 'Information Technology', 'Civil / Electrical Engineering', 'Accountancy & Business'],
      requirements: [
        'Form 138 / High School Report Card or College Grade Slip',
        'Combined Annual Gross Income of Parents not exceeding ₱150,000',
        'Recent Household Photo (Exterior & Interior)',
        'Barangay Clearance & Certificate of Indigency'
      ],
      contactEmail: 'education@sm-foundation.org',
      contactPhone: '(02) 8857-0100'
    }
  ];

  const categories = ['All', 'STEM', 'Government', 'Presidential', 'LGU Local', 'Private'];

  // Filtered scholarships based on category & search query
  const filteredScholarships = useMemo(() => {
    return scholarshipsData.filter((s) => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        s.title.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.courses.some(c => c.toLowerCase().includes(q)) ||
        s.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const faqList = [
    {
      q: 'How does eScholar help me find and apply for scholarships?',
      a: 'eScholar centralizes government, private, and LGU scholarships on a single portal. You can search by course, filter by GWA eligibility, inspect requirements, and submit applications directly online.'
    },
    {
      q: 'How does the GWA requirement work in the Philippines?',
      a: 'In the Philippine grading system, lower GWA numbers represent higher academic performance (e.g. 1.00 is highest, 1.75 is high honor, 3.00 is passing). If a program requires a GWA of ≤ 1.75, a grade of 1.50 qualifies.'
    },
    {
      q: 'What if I am an incoming freshman without a college GWA?',
      a: 'Incoming college freshmen can apply using their Grade 11 and Grade 12 Senior High School (SHS) report card averages or Form 138/137.'
    },
    {
      q: 'What documents are usually required to apply?',
      a: 'Standard requirements include: (1) Official Grade Slip or TOR, (2) Barangay Certificate of Indigency or Parents\' BIR Tax Return / Exemption, (3) Certificate of Good Moral Character, (4) PSA Birth Certificate, and (5) Student ID.'
    },
    {
      q: 'Is eScholar free for students?',
      a: 'Yes, 100% free! eScholar is built to empower students. There are no fees for searching, matching, or submitting scholarship applications.'
    }
  ];

  return (
    <div className="landing-container">
      {/* Top Navbar */}
      <nav className="landing-navbar">
        <div className="landing-logo-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="landing-logo-icon">
            <GraduationCap size={22} />
          </div>
          <span className="landing-logo-text">eScholar</span>
        </div>

        <ul className="landing-nav-links">
          <li><a href="#scholarships">Scholarships</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#testimonials">Stories</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>

        <div className="landing-nav-actions">
          <button className="btn-login-nav" onClick={() => setActiveView('login')}>Log In</button>
          <button className="btn-register-nav" onClick={() => setActiveView('register')}>
            <span>Register Free</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <div className="hero-badge">
              <GraduationCap size={15} className="badge-sparkle" />
              <span>Scholarship Finder & Application Portal</span>
            </div>

            <h1>
              Unlock Your Education with <br />
              <span className="hero-highlight">Verified Scholarships</span>
            </h1>

            <p>
              Discover, match, and apply for government, LGU, and private scholarships across the Philippines. Access full grant details, requirements, and status updates in one clean platform.
            </p>

            <div className="hero-actions">
              <a href="#scholarships" className="btn-primary-large">
                <Search size={18} />
                <span>Explore Scholarships</span>
              </a>
              <button className="btn-secondary-large" onClick={() => setActiveView('register')}>
                <span>Create Student Profile</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Clean Stats Bar */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number">₱50M+</span>
                <span className="stat-label">Grants Awarded</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Active Scholars</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Match Rate</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Pure Photo Only */}
          <div className="hero-visual-side">
            <div className="hero-image-frame">
              <img src={heroStudentsImg} alt="eScholar College Students" className="hero-main-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Scholarships Directory Section */}
      <section className="landing-scholarships" id="scholarships">
        <div className="section-header">
          <span className="section-subtitle">Active Programs</span>
          <h2>Explore Available Scholarship Opportunities</h2>
          <p>Filter by category or search by course name to find programs you qualify for.</p>
        </div>

        {/* Clean Controls: Search + Categories */}
        <div className="clean-search-filter-bar">
          <div className="search-box-clean">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by keyword, course (e.g. Computer Science), or provider (DOST, CHED)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? 'All Programs' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scholarship Cards Grid */}
        <div className="scholarship-grid">
          {filteredScholarships.map((s) => (
            <div className="scholarship-card" key={s.id}>
              <div className="card-top">
                <span className="scholarship-badge">{s.badge}</span>
                <span className="gwa-pill">GWA: ≤ {s.reqGrade.toFixed(2)}</span>
              </div>

              <h3 className="scholarship-title">{s.title}</h3>
              <p className="scholarship-provider">
                <Building2 size={15} /> {s.provider}
              </p>

              <p className="scholarship-desc">{s.description}</p>

              <div className="grant-highlights">
                <div className="highlight-item">
                  <DollarSign size={16} className="highlight-icon" />
                  <span><strong>Funding:</strong> {s.tuition}</span>
                </div>
                <div className="highlight-item">
                  <BookOpen size={16} className="highlight-icon" />
                  <span><strong>Allowance:</strong> {s.allowance}</span>
                </div>
                <div className="highlight-item">
                  <Users size={16} className="highlight-icon" />
                  <span><strong>Slots:</strong> {s.slots}</span>
                </div>
                <div className="highlight-item">
                  <Clock size={16} className="highlight-icon red" />
                  <span><strong>Deadline:</strong> {s.deadline}</span>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="btn-details"
                  onClick={() => setSelectedScholarship(s)}
                >
                  <Info size={15} />
                  <span>View Full Details</span>
                </button>
                <button 
                  className="btn-apply-card"
                  onClick={() => setActiveView('register')}
                >
                  <span>Apply Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="empty-results-box">
            <p>No scholarship programs matched your search. Try clearing your search query.</p>
            <button className="btn-reset" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Clear Search & Filters
            </button>
          </div>
        )}
      </section>

      {/* Program Details Modal */}
      {selectedScholarship && (
        <div className="modal-backdrop" onClick={() => setSelectedScholarship(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedScholarship(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <span className="modal-badge">{selectedScholarship.badge}</span>
              <h2>{selectedScholarship.title}</h2>
              <p className="modal-provider">
                <Building2 size={16} /> Provided by <strong>{selectedScholarship.provider}</strong>
              </p>
            </div>

            <div className="modal-body">
              <div className="modal-info-box">
                <div className="info-cell">
                  <span className="info-cell-title">Financial Coverage</span>
                  <span className="info-cell-value">{selectedScholarship.tuition}</span>
                </div>
                <div className="info-cell">
                  <span className="info-cell-title">Required GWA</span>
                  <span className="info-cell-value">≤ {selectedScholarship.reqGrade.toFixed(2)}</span>
                </div>
                <div className="info-cell">
                  <span className="info-cell-title">Family Income Ceiling</span>
                  <span className="info-cell-value">{selectedScholarship.incomeLimit}</span>
                </div>
                <div className="info-cell">
                  <span className="info-cell-title">Deadline</span>
                  <span className="info-cell-value text-red">{selectedScholarship.deadline}</span>
                </div>
              </div>

              <div className="modal-section">
                <h3><Award size={17} /> Program Overview & Extra Subsidies</h3>
                <p>{selectedScholarship.description}</p>
                <p className="extra-allowance"><strong>Extra Allowance:</strong> {selectedScholarship.allowance}</p>
              </div>

              <div className="modal-section">
                <h3><GraduationCap size={17} /> Course Eligibility</h3>
                <ul className="eligibility-list">
                  {selectedScholarship.courses.map((course, idx) => (
                    <li key={idx}><Check size={15} color="#16a34a"/> {course}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3><FileText size={17} /> Application Requirements Checklist</h3>
                <div className="checklist-box">
                  {selectedScholarship.requirements.map((req, idx) => (
                    <div key={idx} className="checklist-item">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section contact-row">
                <div className="contact-chip"><Mail size={14} /> {selectedScholarship.contactEmail}</div>
                <div className="contact-chip"><PhoneCall size={14} /> {selectedScholarship.contactPhone}</div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-close" onClick={() => setSelectedScholarship(null)}>Close</button>
              <button className="btn-modal-apply" onClick={() => setActiveView('register')}>
                <span>Start Application</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section className="landing-how" id="how-it-works">
        <div className="section-header">
          <span className="section-subtitle">Simplified Process</span>
          <h2>How eScholar Works in 4 Steps</h2>
          <p>From initial registration to receiving your grant stipend, we make applying simple.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon-wrapper">
              <FileText size={26} />
            </div>
            <h3>Create Profile & Upload Grades</h3>
            <p>Sign up in under 2 minutes and upload your official grade slip or transcript.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon-wrapper">
              <Zap size={26} />
            </div>
            <h3>Instant Grade Matching</h3>
            <p>Our matching engine evaluates your GWA and course against active programs.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon-wrapper">
              <CheckCircle2 size={26} />
            </div>
            <h3>Submit Applications Online</h3>
            <p>Fill out standardized forms, attach documents, and track compliance status live.</p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon-wrapper">
              <Bell size={26} />
            </div>
            <h3>Receive Allowance & Alerts</h3>
            <p>Get SMS notifications on grant approval and direct educational stipend disbursements.</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="landing-testimonials" id="testimonials">
        <div className="section-header">
          <span className="section-subtitle">Student Success</span>
          <h2>Empowering Scholars Across the Country</h2>
          <p>Hear from scholars who funded their university degree using eScholar.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <p className="testimonial-quote">
              "eScholar matched me with the DOST-SEI scholarship within minutes. The full tuition coverage and ₱7,000 monthly stipend removed all financial stress for my family!"
            </p>
            <div className="scholar-author">
              <img src={scholarMariaImg} alt="Maria Santos" className="scholar-avatar" />
              <div>
                <h4>Maria Santos</h4>
                <p>DOST Scholar • BS Computer Engineering, UP Diliman</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <p className="testimonial-quote">
              "Finding requirement details used to be frustrating on old sites. eScholar gave me exact checklists and step-by-step deadline tracking. Now I'm a Presidential Scholar!"
            </p>
            <div className="scholar-author">
              <img src={scholarJuanImg} alt="Juan Dela Cruz" className="scholar-avatar" />
              <div>
                <h4>Juan Dela Cruz</h4>
                <p>Presidential Scholar • BS Information Technology, UST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="landing-faq" id="faq">
        <div className="section-header">
          <span className="section-subtitle">Questions & Answers</span>
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions about scholarships, requirements, and eligibility.</p>
        </div>

        <div className="faq-accordion">
          {faqList.map((item, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openFaq === idx ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="faq-question">
                <h3>{item.q}</h3>
                <ChevronDown size={18} className="faq-arrow" />
              </div>
              {openFaq === idx && (
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="landing-cta">
        <div className="cta-box">
          <h2>Ready to Begin Your Educational Journey?</h2>
          <p>Join thousands of scholars securing full tuition and monthly allowances across the Philippines.</p>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => setActiveView('register')}>
              <span>Register for Free</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-cta-secondary" onClick={() => setActiveView('login')}>
              <span>Sign In to Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="landing-logo-group">
              <div className="landing-logo-icon">
                <GraduationCap size={20} />
              </div>
              <span className="landing-logo-text">eScholar</span>
            </div>
            <p>The Philippines' premier centralized scholarship application and management portal.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#scholarships">Scholarships</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Success Stories</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Supported Grants</h4>
            <ul>
              <li><a href="#scholarships">DOST-SEI Merit</a></li>
              <li><a href="#scholarships">CHED Tulong Dunong</a></li>
              <li><a href="#scholarships">Presidential Grants</a></li>
              <li><a href="#scholarships">LGU Financial Aid</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal & Support</h4>
            <ul>
              <li><a href="#faq">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} eScholar Educational Portal. All rights reserved.
          </div>
          <div className="footer-security">
            <ShieldCheck size={16} color="#16a34a" /> 256-bit Encrypted Student Data Protection
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


