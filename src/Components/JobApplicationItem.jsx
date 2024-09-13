import React from 'react';

function JobApplicationItem({ application, onDelete, onUpdate }) {
  const { company, position, status, dateApplied, id } = application;

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{company}</h3>
      <p className="text-sm text-gray-600">Position: {position}</p>
      <p className="text-sm text-gray-600">Date Applied: {new Date(dateApplied).toLocaleDateString()}</p>
      <p className="text-sm">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </p>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={() => onUpdate(application)}
          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
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

export default JobApplicationItem;
