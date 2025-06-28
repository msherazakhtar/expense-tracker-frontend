// src/pages/AuthContainer.jsx
import React, { useState } from 'react';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage';

// AuthContainer Component
// Manages switching between Login and Registration forms
const AuthContainer = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {isRegisterMode ? (
        <RegisterPage onToggleMode={() => setIsRegisterMode(false)} />
      ) : (
        <LoginPage onToggleMode={() => setIsRegisterMode(true)} />
      )}
    </div>
  );
};

export default AuthContainer;