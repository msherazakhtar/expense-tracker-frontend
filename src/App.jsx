// src/App.js
import React from 'react';
import { useAppContext } from './AppContext'; // Import useAppContext
import Navbar from './components/Navbar'; // Import Navbar
import AuthContainer from './pages/AuthContainer'; // Import AuthContainer
import DashboardPage from './pages/DashboardPage'; // Import DashboardPage
import ExpensePage from './pages/ExpensePage';     // Import ExpensePage
import SettingsPage from './pages/SettingsPage';   // Import SettingsPage
import ProfilePage from './pages/ProfilePage';     // Import ProfilePage

// Main App Component
// Handles global routing and authentication status
const App = () => {
  const { currentPage, isAuthenticated } = useAppContext();

  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen text-gray-900">
      {isAuthenticated && <Navbar />}
      <main>
        {(() => {
          switch (currentPage) {
            case 'login':
            case 'register':
              return isAuthenticated ? <DashboardPage /> : <AuthContainer />;
            case 'dashboard':
              return isAuthenticated ? <DashboardPage /> : <AuthContainer />;
            case 'expenses':
              return isAuthenticated ? <ExpensePage /> : <AuthContainer />;
            case 'settings':
              return isAuthenticated ? <SettingsPage /> : <AuthContainer />;
            case 'profile':
              return isAuthenticated ? <ProfilePage /> : <AuthContainer />;
            default:
              return isAuthenticated ? <DashboardPage /> : <AuthContainer />;
          }
        })()}
      </main>
    </div>
  );
};

export default App;