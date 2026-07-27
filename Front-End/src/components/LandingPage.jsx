import React from 'react';
import './LandingPage.css';

const LandingPage = ({ setActiveView }) => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-logo">eScholar</div>
        <div className="landing-nav-actions">
          <button className="btn-login-nav" onClick={() => setActiveView('login')}>Log In</button>
          <button className="btn-register-nav" onClick={() => setActiveView('register')}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <h1>
          Empower Your Future with <br />
          <span className="hero-highlight">eScholar</span>
        </h1>
        <p>
          Discover, apply, and manage scholarships all in one secure platform. 
          Streamline your educational journey today.
        </p>
        <div className="hero-actions">
          <button className="btn-primary-large" onClick={() => setActiveView('register')}>
            Get Started
          </button>
          <button className="btn-secondary-large" onClick={() => setActiveView('login')}>
            Log In
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="features-header">
          <h2>Why Choose eScholar?</h2>
          <p>Everything you need to succeed, designed with you in mind.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Centralized Applications</h3>
            <p>Browse and apply for multiple scholarships through a single, easy-to-use dashboard. Track your application status in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Authentication</h3>
            <p>Your data is protected. We use advanced Two-Factor Authentication (2FA) via SMS to ensure your account remains completely secure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Updates</h3>
            <p>Never miss a deadline. Receive instant notifications about your application status, missing documents, and upcoming interviews.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} eScholar. All rights reserved.
        </div>
        <div className="footer-links">
          <a href="#" style={{ marginRight: '1.5rem' }}>Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
