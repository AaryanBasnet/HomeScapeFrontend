import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown"; // Import the UserDropdown component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userRoles = JSON.parse(localStorage.getItem("roles"));
  
    if (token) {
      setIsLoggedIn(true);
      setRole(userRoles.includes("ADMIN") ? "ADMIN" : "USER");
    }
  }, []);
  

  const handleSetActive = (section) => {
    setActive(section);
  };

  return (
    <nav className="top-0 left-0 w-full flex items-center justify-between p-4 z-50">
      <div className="text-2xl font-dosis font-bold text-black bg-opacity-0">
        <Link to="/" onClick={() => handleSetActive("home")}>HomeScape</Link>
      </div>
      <div className="hidden md:flex glassmorphism rounded-lg p-2 space-x-4 font-dosis text-xl font-medium">
        {["home", "about", "properties", "contact"].map((section) => (
          <Link
            key={section}
            to={`/${section}`}
            onClick={() => handleSetActive(section)}
            className={`text-black hover:text-gray-300 py-1 px-2 rounded ${
              active === section ? "bg-white rounded-3xl " : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </div>
      <motion.div
        whileHover={{
          scale: 1.1,
          textShadow: "0px 0px 8px rgb(255, 255, 255)",
        }}
        className="hidden md:block"
      >
        {isLoggedIn ? (
          <UserDropdown />
        ) : (
          <Link to="/signin" className="text-white bg-violet-600 py-2 px-4 rounded-3xl hover:bg-violet-700">
            Get Started
          </Link>
        )}
      </motion.div>
      <button
        className="md:hidden text-black focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full glassmorphism rounded-lg p-4 z-50">
          {["home", "about", "properties", "contact"].map((section) => (
            <Link
              key={section}
              to={`/${section}`}
              onClick={() => {
                handleSetActive(section);
                setIsOpen(false);
              }}
              className={`block text-black hover:text-gray-300 py-1 px-2 rounded ${
                active === section ? "bg-white bg-opacity-20" : ""
              } mb-2`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <Link to="/signin">
              <button className="w-full text-black py-2 px-4 rounded-lg hover:bg-opacity-20 mt-4">
                Get Started
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
