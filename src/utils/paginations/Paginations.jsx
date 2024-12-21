// src/components/pagination/PaginationControls.js

import React from "react";

function PaginationControls({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className="mt-4 flex justify-end space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300"
      >
        Prev
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-sm btn-edit bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Next
      </button>
      <span className="px-4 py-2 text-black">{`Page ${currentPage} of ${totalPages}`}</span>
    </div>
  );
}

export default PaginationControls;
