import React, { useState } from 'react';
import Pagination from './Pagination';
import App from '../App';


function JobApplicationList({ applications, onDelete, onUpdate }) {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
 

  // Filter applications based on status
  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  // Sort applications by date applied
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const dateA = new Date(a.dateApplied);
    const dateB = new Date(b.dateApplied);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Job Applications</h2>

      {/* Filter and Sort Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="asc">Date Applied (Asc)</option>
            <option value="desc">Date Applied (Desc)</option>
          </select>
        </div>
      </div>

      {/* Application List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Company</th>
              <th className="py-2 px-4 text-left text-gray-600">Position</th>
              <th className="py-2 px-4 text-left text-gray-600">Status</th>
              <th className="py-2 px-4 text-left text-gray-600">Date Applied</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedApplications.length > 0 ? (
              sortedApplications.map(app => (
                <tr key={app.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{app.company}</td>
                  <td className="py-2 px-4">{app.position}</td>
                  <td className="py-2 px-4">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${statusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 px-4">{new Date(app.dateApplied).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => onUpdate(app)}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(app.id)}
                      className="ml-4 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

   
    </div>
  );

  // Function to determine the color based on status
  function statusColor(status) {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

export default JobApplicationList;
