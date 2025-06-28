// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global CSS (which includes Tailwind directives)
import App from './App';
import { AppProvider } from './AppContext'; // Import AppProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);