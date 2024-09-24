import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import JobApplicationForm from './Components/JobApplicationForm';
import JobApplicationList from './Components/JobApplicationList';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from './Components/Pagination';
import OTPLoginPage from './Components/OTPLoginPage';

// Import CandidateForm and CandidateList components
import CandidateForm from './Components/CandidateForm';
import CandidateList from './Components/CandidateList';

function App() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5); // Number of applications per page
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Fetch applications from localStorage or API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApplications();
  }, []);

  // Add a new application
  const addApplication = async (application) => {
    try {
      await axios.post('http://localhost:5000/applications', application);
      setApplications([...applications, application]);
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  // Update an existing application
  const updateApplication = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/applications/${id}`, updatedData);
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === id ? { ...app, ...updatedData } : app
        )
      );
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  // Delete an application
  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`http://localhost:5000/applications/${id}`);
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  // Pagination logic
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  const location = useLocation(); // Get current route path
  const hideNavbarOnAuthPages = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/otp-login';

  return (
    <div>
      {/* Conditionally render Navbar if not on auth pages and logged in */}
      {!hideNavbarOnAuthPages && isLoggedIn && <Navbar />}

      <div className="container mx-auto p-6">
        <Routes>
          {/* OTP Login Route */}
          <Route path="/otp-login" element={<OTPLoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* Login and Signup Routes */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route path="/" element={isLoggedIn ? <JobApplicationForm onSave={addApplication} /> : <Navigate to="/otp-login" />} />
          <Route path="/applications" element={isLoggedIn ? (
            <JobApplicationList
              applications={currentApplications}
              onDelete={deleteApplication}
              onUpdate={updateApplication}
            />
          ) : <Navigate to="/otp-login" />} />

          {/* Candidate Form and List Routes */}
          <Route path="/candidate-form" element={isLoggedIn ? <CandidateForm /> : <Navigate to="/otp-login" />} />
          <Route path="/candidate-list" element={isLoggedIn ? <CandidateList /> : <Navigate to="/otp-login" />} />
        </Routes>
      </div>

      {/* Conditionally render pagination if user is logged in */}
      {isLoggedIn && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;
