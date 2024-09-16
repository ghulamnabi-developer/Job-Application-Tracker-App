import React, { useState, useEffect } from 'react';
import '../index.css';

function JobApplicationForm({ onSave, applicationToEdit }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('applied');
  const [dateApplied, setDateApplied] = useState('');

  useEffect(() => {
    if (applicationToEdit) {
      setCompany(applicationToEdit.company);
      setPosition(applicationToEdit.position);
      setStatus(applicationToEdit.status);
      setDateApplied(applicationToEdit.dateApplied);
    }
  }, [applicationToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!company || !position || !dateApplied) {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare application object
    const application = {
      id: applicationToEdit ? applicationToEdit.id : Date.now(), // Generate a new ID if not editing
      company,
      position,
      status,
      dateApplied
    };

    onSave(application);
    clearForm();
  };

  const clearForm = () => {
    setCompany('');
    setPosition('');
    setStatus('applied');
    setDateApplied('');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        {applicationToEdit ? 'Edit Job Application' : 'Add New Job Application'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {applicationToEdit ? 'Update Application' : 'Add Application'}
        </button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
