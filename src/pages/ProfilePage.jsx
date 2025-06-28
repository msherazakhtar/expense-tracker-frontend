// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

// ProfilePage Component
// User profile management
const ProfilePage = () => {
  const { displayModal } = useAppContext();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isVerfied: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      displayModal("Fetching profile data...", "info");
      // --- Replace this with your actual API call ---
      try {
        const response = await fetch(
          "http://localhost:5555/users/getUserProfile/2"
        ); // Replace with your Spring Boot endpoint
        if (response.ok) {
          const data = await response.json();
          setProfile(data); // Assuming backend returns { name, email, bio }
          displayModal("Profile data loaded!", "success");
        } else {
          const errorData = await response.json();
          displayModal(
            errorData.message || "Failed to load profile data.",
            "error"
          );
        }
      } catch (error) {
        console.error("Profile API error:", error);
        displayModal("Network error or server unavailable.", "error");
      }
      // --- End of API call replacement ---
    };
    fetchProfileData();
  }, []);

  const handleProfileUpdate = async (e) => {
    // Added async
    e.preventDefault();
    console.log("Updating profile:", profile);
    // Placeholder for API call to update profile

    // --- Replace this with your actual API call ---
    try {
      const response = await fetch(
        "http://localhost:5555/users/updateUserProfile",
        {
          // Replace with your Spring Boot endpoint
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      if (response.ok) {
        displayModal("Profile updated successfully!", "success");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        displayModal(errorData.message || "Failed to update profile.", "error");
      }
    } catch (error) {
      console.error("Update profile API error:", error);
      displayModal("Network error or server unavailable.", "error");
    }
    // --- End of API call replacement ---
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Profile
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        {!isEditing ? (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-gray-700">Firstname:</p>
                <p className="text-xl font-semibold text-gray-900">
                  {profile.firstName}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Lastname:</p>
                <p className="text-xl font-semibold text-gray-900">
                  {profile.lastName}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Email:</p>
                <p className="text-xl font-semibold text-gray-900">
                  {profile.email}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Password:</p>
                <p className="text-xl font-semibold text-gray-900">*****</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Status</p>
                <p className="text-xl text-gray-900">
                  {(profile.isVerfied === null) | "true"
                    ? "Verified"
                    : "Not Verified"}
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="profileName"
              >
                Firstname
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="profileName"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="profileEmail"
              >
                Email
              </label>
              <input
                type="email"
                id="profileEmail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password (leave blank to keep current)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
