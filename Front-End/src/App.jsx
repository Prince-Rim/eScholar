import React, { useState } from 'react';
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
import AdminCreateProgram from './components/AdminCreateProgram';
import AdminReports from './components/AdminReports';
import LandingPage from './components/LandingPage';
import ProviderSidebar from './components/ProviderSidebar';
import ProviderCreateProgram from './components/ProviderCreateProgram';
import ProviderPrograms from './components/ProviderPrograms';
import ProviderProgramDetail from './components/ProviderProgramDetail';
import ProviderApplicantPipeline from './components/ProviderApplicantPipeline';
import ProviderActiveScholars from './components/ProviderActiveScholars';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState('student');
  const [selectedProgram, setSelectedProgram] = useState(null);

  if (currentView === 'landing') {
    return <LandingPage setActiveView={setCurrentView} />;
  }

  const isAuthView = currentView === 'login' || currentView === 'register';

  if (isAuthView) {
    return (
      <div className="app-container">
        {currentView === 'login' && <Login setActiveView={setCurrentView} setUserRole={setUserRole} />}
        {currentView === 'register' && <Register setActiveView={setCurrentView} />}
      </div>
    );
  }

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

        {/* Provider Views */}
        {userRole === 'provider' && (
          currentView === 'create-program' || currentView === 'provider-create' ? (
            <ProviderCreateProgram setActiveView={setCurrentView} />
          ) : currentView === 'program-detail' ? (
            <ProviderProgramDetail
              program={selectedProgram}
              setActiveView={setCurrentView}
            />
          ) : currentView === 'applicants' ? (
            <ProviderApplicantPipeline />
          ) : currentView === 'renewals' || currentView === 'active-scholars' ? (
            <ProviderActiveScholars />
          ) : (
            <ProviderPrograms
              setActiveView={setCurrentView}
              setSelectedProgram={setSelectedProgram}
            />
          )
        )}

        {/* Student & Admin Views */}
        {userRole === 'student' && currentView === 'compliance' && <Compliance />}
        {userRole === 'admin' && currentView === 'dashboard' && <AdminDashboard setActiveView={setCurrentView} />}
        {userRole === 'admin' && currentView === 'applicants' && <AdminApplicants />}
        {userRole === 'admin' && currentView === 'applications' && <AdminApplications />}
        {userRole === 'admin' && currentView === 'compliance' && <AdminCompliance />}
        {userRole === 'admin' && currentView === 'create-program' && <ProviderCreateProgram setActiveView={setCurrentView} />}
        {userRole === 'admin' && currentView === 'reports' && <AdminReports />}
        {userRole === 'student' && currentView === 'dashboard' && <Dashboard />}
        {userRole === 'student' && currentView === 'browse' && <BrowseApplication />}
        {userRole === 'student' && currentView === 'applications' && <MyApplications />}
      </div>
    </div>
  );
}

export default App;
