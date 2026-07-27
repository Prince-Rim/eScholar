import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import BrowseApplication from './components/BrowseApplication';
import MyApplications from './components/MyApplications';
import Login from './API Pages/Login';
import Register from './API Pages/Register';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import AdminApplicants from './components/AdminApplicants';
import AdminApplications from './components/AdminApplications';
import Compliance from './components/Compliance';
import AdminCompliance from './components/AdminCompliance';
import AdminReports from './components/AdminReports';
import LandingPage from './components/LandingPage';
import ProviderSidebar from './components/ProviderSidebar';
import ProviderCreateProgram from './components/ProviderCreateProgram';
import ProviderPrograms from './components/ProviderPrograms';
import ProviderProgramDetail from './components/ProviderProgramDetail';
import ProviderApplicantPipeline from './components/ProviderApplicantPipeline';
import ProviderActiveScholars from './components/ProviderActiveScholars';
import AdminVerifications from './components/AdminVerifications';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderSettings from './components/ProviderSettings';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("eScholar App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#dc2626', marginBottom: '0.75rem', fontSize: '1.4rem' }}>Application Notice</h2>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem', wordBreak: 'break-word' }}>
              {this.state.error?.toString() || "A temporary rendering issue occurred."}
            </p>
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#082894',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Session & Go to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const [userRole, setUserRole] = useState(() => {
    const path = window.location.pathname.toLowerCase().replace('/', '');
    if (path.includes('admin')) return 'admin';
    if (path.includes('provider')) return 'provider';
    return localStorage.getItem('escholar_user_role') || 'student';
  });

  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname.toLowerCase().replace('/', '');
    if (path === 'admin') {
      localStorage.setItem('escholar_user_role', 'admin');
      return 'dashboard';
    }
    if (path === 'provider') {
      localStorage.setItem('escholar_user_role', 'provider');
      return 'my-programs';
    }
    if (path === 'login' || path === 'register') {
      return path;
    }
    if (path === 'landing' || path === '') {
      const sessionExpiry = localStorage.getItem('escholar_2fa_session');
      const savedRole = localStorage.getItem('escholar_user_role');
      if (sessionExpiry && new Date().getTime() < parseInt(sessionExpiry, 10)) {
        return savedRole === 'provider' ? 'my-programs' : 'dashboard';
      }
      return 'landing';
    }
    return path;
  });

  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('escholar_user_role', userRole);
    }
  }, [userRole]);

  if (currentView === 'landing') {
    return <LandingPage setActiveView={setCurrentView} />;
  }

  if (currentView === 'login' || currentView === 'register') {
    return (
      <div className="app-container">
        {currentView === 'login' && <Login setActiveView={setCurrentView} setUserRole={setUserRole} />}
        {currentView === 'register' && <Register setActiveView={setCurrentView} />}
      </div>
    );
  }

  const renderMainContent = () => {
    if (userRole === 'provider') {
      switch (currentView) {
        case 'create-program':
        case 'provider-create':
          return <ProviderCreateProgram setActiveView={setCurrentView} />;
        case 'program-detail':
          return <ProviderProgramDetail program={selectedProgram} setActiveView={setCurrentView} />;
        case 'applicants':
          return <ProviderApplicantPipeline />;
        case 'renewals':
        case 'active-scholars':
          return <ProviderActiveScholars />;
        case 'analytics':
          return <AdminReports />;
        default:
          return <ProviderPrograms setActiveView={setCurrentView} setSelectedProgram={setSelectedProgram} />;
      }
    }

    if (userRole === 'admin') {
      switch (currentView) {
        case 'applicants':
          return <AdminApplicants />;
        case 'applications':
          return <AdminApplications />;
        case 'compliance':
          return <AdminCompliance />;
        case 'create-program':
          return <ProviderCreateProgram setActiveView={setCurrentView} />;
        case 'verifications':
          return <AdminVerifications />;
        case 'reports':
        case 'analytics':
          return <AdminReports />;
        default:
          return <AdminDashboard setActiveView={setCurrentView} />;
      }
    }

    switch (currentView) {
      case 'browse':
        return <BrowseApplication />;
      case 'applications':
        return <MyApplications />;
      case 'compliance':
        return <Compliance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {userRole === 'admin' ? (
        <AdminSidebar activeView={currentView} setActiveView={setCurrentView} />
      ) : userRole === 'provider' ? (
        <ProviderSidebar activeView={currentView} setActiveView={setCurrentView} />
      ) : (
        <Sidebar activeView={currentView} setActiveView={setCurrentView} />
      )}
      
      <div className="main-wrapper">
        {userRole !== 'provider' && <Topbar />}
        {renderMainContent()}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}

export default App;
