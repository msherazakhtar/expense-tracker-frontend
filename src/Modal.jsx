// src/components/Modal.jsx
import React from 'react';

// Modal Component
// Displays temporary messages to the user (e.g., success, error)
const Modal = ({ message, type, onClose }) => {
  let bgColor = 'bg-blue-500';
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-500';
      break;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div
        className={`relative ${bgColor} text-white p-4 rounded-lg shadow-lg max-w-sm w-full animate-fade-in-down`}
      >
        <p className="text-center">{message}</p>
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-200"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;