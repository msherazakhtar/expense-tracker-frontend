// src/components/Navbar.jsx
import React from 'react';
import { useAppContext } from '../AppContext'; // Import useAppContext

// Navbar Component
// Navigation links for authenticated users
const Navbar = () => {
  const { navigateTo, logout, currentPage } = useAppContext(); // Use useAppContext

  const navItems = [
    { name: 'Dashboard', page: 'dashboard' },
    { name: 'Expenses', page: 'expenses' },
    { name: 'Settings', page: 'settings' },
    { name: 'Profile', page: 'profile' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-xl font-bold rounded-md py-1 px-2">Expense Tracker</div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
                ${currentPage === item.page ? 'bg-indigo-600' : 'hover:bg-gray-700 hover:text-white'}`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={logout}
            className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;