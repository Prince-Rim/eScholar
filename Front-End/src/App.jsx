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

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState('student');

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
      ) : (
        <Sidebar activeView={currentView} setActiveView={setCurrentView} />
      )}
      <div className="main-wrapper">
        <Topbar />
        {currentView === 'dashboard' && userRole === 'admin' && <AdminDashboard setActiveView={setCurrentView} />}
        {currentView === 'applicants' && userRole === 'admin' && <AdminApplicants />}
        {currentView === 'applications' && userRole === 'admin' && <AdminApplications />}
        {currentView === 'dashboard' && userRole === 'student' && <Dashboard />}
        {currentView === 'browse' && <BrowseApplication />}
        {currentView === 'applications' && <MyApplications />}
      </div>
    </div>
  );
}

export default App;
