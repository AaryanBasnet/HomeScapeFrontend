import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "./AuthContext";

import { FaUser } from "react-icons/fa";

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
     
      if (userId && token) {
        try {
          const response = await axios.get(`http://localhost:8080/customer/get/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const userData = response.data.data;
          setUsername(userData.username);
          setEmail(userData.email);
          setRoles(userData.roles.map(role => role.name));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };
 
    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      
      <FaUser id="avatarButton" onClick={toggleDropdown} className="w-10 h-10 rounded-full cursor-pointer" />


      {dropdownOpen && (
        <div
          id="userDropdown"
          className="absolute right-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{username}</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            {roles.includes("ADMIN") && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/earnings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
