import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import BrowseApplication from './components/BrowseApplication';
import MyApplications from './components/MyApplications';
import Login from './API Pages/Login';
import Register from './API Pages/Register';

function App() {
  const [currentView, setCurrentView] = useState('login');

  const isAuthView = currentView === 'login' || currentView === 'register';

  if (isAuthView) {
    return (
      <div className="app-container">
        {currentView === 'login' && <Login setActiveView={setCurrentView} />}
        {currentView === 'register' && <Register setActiveView={setCurrentView} />}
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar activeView={currentView} setActiveView={setCurrentView} />
      <div className="main-wrapper">
        <Topbar />
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'browse' && <BrowseApplication />}
        {currentView === 'applications' && <MyApplications />}
      </div>
    </div>
  );
}

export default App;
