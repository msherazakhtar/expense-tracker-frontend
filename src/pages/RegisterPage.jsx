// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const RegisterPage = ({ onToggleMode }) => {
  const { displayModal } = useAppContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => { // Added async for potential API call
    e.preventDefault();
    if (password !== confirmPassword) {
      displayModal('Passwords do not match!', 'error');
      return;
    }
    // Placeholder for API call
    console.log('Registering:', { firstName,lastName, email, password });

    // --- Replace this with your actual API call ---
    try {
      const response = await fetch("http://localhost:5555/auth/register", { // Replace with your Spring Boot registration endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName,lastName, email, password }),
      });
      debugger
      if (response.ok) {
        displayModal('Registration successful! Please login.', 'success');
        onToggleMode(); // Switch to login after successful registration
      } else {
        const errorData = await response.json();
        displayModal(errorData.responseMessage || 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Registration API error:', error);
      displayModal('Network error or server unavailable.', 'error');
    }
    // --- End of API call replacement ---
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Firstname
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
         <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Lastname
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-indigo-600 hover:underline focus:outline-none"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;