import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Application Tracker App */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Job Application Tracker
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="space-x-4">
          <Link to="/applications" className="hover:text-gray-300">
            Applications
          </Link>
          {/* Add more links here if needed */}
        </div>

        {/* Right Side: Login and Sign Up Buttons */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
