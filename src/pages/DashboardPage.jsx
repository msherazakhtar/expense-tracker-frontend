// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';

// DashboardPage Component
// Overview of expenses
const DashboardPage = () => {
  const { displayModal } = useAppContext();
  const [summary, setSummary] = useState({ totalExpenses: 0, monthlyBudget: 0, categories: {} });

  // useEffect(() => {
  //   // Simulate fetching dashboard data
  //   const fetchDashboardData = async () => {
  //     displayModal('Fetching dashboard data...', 'info');
  //     // --- Replace this with your actual API call ---
  //     try {
  //       const response = await fetch('/api/dashboard-summary'); // Replace with your Spring Boot endpoint
  //       if (response.ok) {
  //         const data = await response.json();
  //         setSummary(data); // Assuming backend returns { totalExpenses, monthlyBudget, categories }
  //         displayModal('Dashboard data loaded!', 'success');
  //       } else {
  //         const errorData = await response.json();
  //         displayModal(errorData.message || 'Failed to load dashboard data.', 'error');
  //       }
  //     } catch (error) {
  //       console.error('Dashboard API error:', error);
  //       displayModal('Network error or server unavailable.', 'error');
  //     }
  //     // --- End of API call replacement ---
  //   };
  //   fetchDashboardData();
  // }, [displayModal]);

  const progress = summary.monthlyBudget > 0 ? (summary.totalExpenses / summary.monthlyBudget) * 100 : 0;

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Expenses Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold text-gray-700">Total Expenses</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            ${summary.totalExpenses.toFixed(2)}
          </p>
          <p className="text-gray-500 mt-2">Spent this month</p>
        </div>

        {/* Monthly Budget Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V4m0 8v4m-6 0h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold text-gray-700">Monthly Budget</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            ${summary.monthlyBudget.toFixed(2)}
          </p>
          <p className="text-gray-500 mt-2">Allocated for this month</p>
        </div>

        {/* Budget Progress Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8v8m-4-2v2m-4-2v2M4 16h.01M7 16h.01M10 16h.01M13 16h.01M16 16h.01M19 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold text-gray-700">Budget Progress</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900">{progress.toFixed(1)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className={`h-2.5 rounded-full ${
                progress < 75 ? 'bg-green-500' : progress < 90 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
          <p className="text-gray-500 mt-2">
            {summary.monthlyBudget - summary.totalExpenses > 0
              ? `$${(summary.monthlyBudget - summary.totalExpenses).toFixed(2)} remaining`
              : `Over budget by $${(summary.totalExpenses - summary.monthlyBudget).toFixed(2)}`}
          </p>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Expenses by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(summary.categories).map(([category, amount]) => (
            <div
              key={category}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <span className="font-medium text-gray-700">{category}</span>
              <span className="font-bold text-lg text-indigo-600">${amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;