import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

 

  return (
    <div className="flex justify-center mt-6">
      <nav className="relative z-0 inline-flex shadow-sm">
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-lg bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'} focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-lg bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
