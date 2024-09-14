import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the navbar menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left Side: Login and Sign Up Buttons */}
        <div className="flex space-x-2">
          <Link
            to="/login"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Center: Application Tracker App */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Job Application Tracker
          </Link>
        </div>

        {/* Hamburger Menu Icon (visible on small screens) */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Links Section (Visible on medium and larger screens) */}
        <div className="hidden md:flex space-x-4">
          <Link to="/applications" className="hover:text-gray-300">
            Applications
          </Link>
        </div>
      </div>

      {/* Collapsible Menu for Small Screens with Transition Animation */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <Link to="/applications" className="block text-white bg-gray-700 p-2 rounded-md text-center">
              Applications
            </Link>
          </div>
        </div>
      </Transition>
    </nav>
  );
}

export default Navbar;
