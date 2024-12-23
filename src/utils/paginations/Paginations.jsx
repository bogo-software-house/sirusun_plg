import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Import ikon panah

function PaginationControls({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className="my-6 flex justify-center items-center space-x-4">
      {/* Informasi Halaman */}
      <span className="px-4 py-2 text-sm font-medium text-gray-700">
        Page <span className="font-semibold text-indigo-600">{currentPage}</span> of <span className="font-semibold text-indigo-600">{totalPages}</span>
      </span>

      {/* Tombol Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-md transition duration-300 ${
          currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        }`}
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2" /> {/* Ikon Panah Kiri */}
        Prev
      </button>

      {/* Tombol Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-md transition duration-300 ${
          currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        }`}
      >
        Next
        <ChevronRightIcon className="w-5 h-5 ml-2" /> {/* Ikon Panah Kanan */}
      </button>
    </div>
  );
}

export default PaginationControls;
