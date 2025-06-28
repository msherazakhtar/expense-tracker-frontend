// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

// SettingsPage Component
// User settings
const SettingsPage = () => {
  const { displayModal } = useAppContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveSettings = async (e) => { // Added async
    e.preventDefault();
    console.log('Saving settings:', { notificationsEnabled, currency, darkMode });
    // Placeholder for API call to save settings

    // --- Replace this with your actual API call ---
    try {
      const response = await fetch('/api/settings', { // Replace with your Spring Boot endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationsEnabled, currency, darkMode }),
      });

      if (response.ok) {
        displayModal('Settings saved successfully!', 'success');
      } else {
        const errorData = await response.json();
        displayModal(errorData.message || 'Failed to save settings.', 'error');
      }
    } catch (error) {
      console.error('Settings API error:', error);
      displayModal('Network error or server unavailable.', 'error');
    }
    // --- End of API call replacement ---
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Settings</h1>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Notifications Setting */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
            <label htmlFor="notifications" className="text-lg font-medium text-gray-700">
              Enable Notifications
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in-out">
              <input
                type="checkbox"
                name="notifications"
                id="notifications"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="notifications"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              ></label>
            </div>
            {/* The inline style for the toggle will be handled by Tailwind config and global CSS */}
            {/* The `style jsx` block is removed as it's not standard in create-react-app */}
          </div>

          {/* Currency Setting */}
          <div className="py-2 border-b border-gray-200 last:border-b-0">
            <label htmlFor="currency" className="block text-lg font-medium text-gray-700 mb-2">
              Default Currency
            </label>
            <select
              id="currency"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="PKR">PKR - Pakistani Rupee</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>

          {/* Dark Mode Setting */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
            <label htmlFor="darkMode" className="text-lg font-medium text-gray-700">
              Dark Mode
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in-out">
              <input
                type="checkbox"
                name="darkMode"
                id="darkMode"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="darkMode"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              ></label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;