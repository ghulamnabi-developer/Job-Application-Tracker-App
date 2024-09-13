import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import JobApplicationForm from './Components/JobApplicationForm';
import JobApplicationList from './Components/JobApplicationList';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from './Components/Pagination';

// Main App Component
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
      const response = await axios.put(`http://localhost:5000/applications/${id}`, updatedData);
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

  // Navbar logic: Hide navbar on login/signup pages
  const location = useLocation();  // Get current route path
  const hideNavbarOnAuthPages = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <div className="App">
        {/* Conditionally render Navbar */}
        {!hideNavbarOnAuthPages && <Navbar />}
        <div className="container mx-auto p-6">
          <Routes>

            {/* Login and Signup Routes */}
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Default Route: If not logged in, redirect to login */}
            <Route path="/" element={isLoggedIn ? <JobApplicationForm onSave={addApplication} /> : <Navigate to="/login" />} />
            
            {/* Applications Page */}
            <Route path="/applications" element={isLoggedIn ? (
              <JobApplicationList
                applications={currentApplications}
                onDelete={deleteApplication}
                onUpdate={updateApplication}
              />
            ) : <Navigate to="/login" />} />

          </Routes>
        </div>
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
