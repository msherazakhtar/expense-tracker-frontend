// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useAppContext } from "../AppContext";

const LoginPage = ({ onToggleMode }) => {
  const { login, displayModal } = useAppContext();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    // Added async for potential API call
    e.preventDefault();
    // Placeholder for API call
    console.log("Logging in with:", { username, password });

    // --- Replace this with your actual API call ---
    try {
      const response = await fetch("http://localhost:5555/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      debugger;
      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a token or user info on success
        console.log("Login successful data:", data);
        login(); // Simulate successful login
        displayModal("Login successful!", "success");
        // You might want to store the token (e.g., in localStorage or context)
        // localStorage.setItem('authToken', data.token);
      } else {
        const errorData = await response.json();
        displayModal(
          errorData.message || "Invalid credentials. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Login API error:", error);
      displayModal("Network error or server unavailable.", "error");
    }
    // --- End of API call replacement ---
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            value={username}
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
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-indigo-600 hover:underline focus:outline-none"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
