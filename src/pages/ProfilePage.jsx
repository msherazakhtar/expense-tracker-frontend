// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

const ProfilePage = () => {
  const { displayModal } = useAppContext();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isVerfied: "",
    userId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      displayModal("Fetching profile data...", "info");
      try {
        const response = await fetch(
          "http://localhost:5555/users/getUserProfile/2"
        );
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          displayModal("Profile loaded", "success");
        } else {
          const err = await response.json();
          displayModal(err.message || "Failed to load profile", "error");
        }
      } catch (err) {
        displayModal("Network error", "error");
      }
    };
    fetchProfileData();
  }, []);

  // Handle profile updates (excluding password)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5555/users/updateUserProfile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );
      if (response.ok) {
        displayModal("Profile updated successfully", "success");
        setIsEditing(false);
      } else {
        const err = await response.json();
        displayModal(err.message || "Failed to update profile", "error");
      }
    } catch (err) {
      displayModal("Network error", "error");
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      displayModal("New and Confirm passwords do not match", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5555/users/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: profile.userId,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        displayModal("Password updated successfully!", "success");
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const err = await response.json();
        displayModal(err.message || "Failed to update password", "error");
      }
    } catch (err) {
      displayModal("Network error", "error");
    }
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
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-700">Password:</p>
                  <p className="text-xl font-semibold text-gray-900">*****</p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="text-indigo-600 hover:underline"
                >
                  Change Password
                </button>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Status</p>
                <p className="text-xl text-gray-900">
                  {profile.isVerfied === true ? "Verified" : "Not Verified"}
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
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">
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
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">
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
              <label className="block text-sm font-medium mb-1" htmlFor="profileEmail">
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

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
