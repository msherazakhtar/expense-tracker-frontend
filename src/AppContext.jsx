// src/AppContext.js
import React, { createContext, useState, useContext } from 'react';
import Modal from './Modal'

// Create a context for authentication and page navigation
const AppContext = createContext();

// AppProvider component to wrap the entire application and manage global state
export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('login'); // Default page is login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info'); // 'info', 'success', 'error'

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const login = () => {
    setIsAuthenticated(true);
    navigateTo('dashboard'); // Redirect to dashboard after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigateTo('login'); // Redirect to login after logout
  };

  const displayModal = (message, type = 'info') => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setModalMessage('');
    }, 5000); // Modal disappears after 5 seconds
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        isAuthenticated,
        login,
        logout,
        displayModal,
      }}
    >
      {children}
      {/* Modal is rendered here so it can access AppContext for displayModal */}
      {showModal && (
        <Modal message={modalMessage} type={modalType} onClose={() => setShowModal(false)} />
      )}
    </AppContext.Provider>
  );
};

// Export useContext as well for consumer components
export const useAppContext = () => useContext(AppContext);

