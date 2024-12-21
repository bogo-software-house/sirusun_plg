// src/components/modal/FilterModal.js
import Modal from "react-modal";
import React from "react";

function RoomFilterModal({
  isOpen,
  onRequestClose,
  filter,
  handleFilterChange,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Filter Rooms"
      className="modal-container"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="modal-content bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative z-10">
        <h3 className="text-xl font-semibold mb-4">Filter Rooms</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rusun
            </label>
            <input
              type="text"
              value={filter.rusun}
              onChange={(e) => handleFilterChange("rusun", e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Blok
            </label>
            <input
              type="text"
              value={filter.blok}
              onChange={(e) => handleFilterChange("blok", e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Lantai
            </label>
            <input
              type="text"
              value={filter.lantai}
              onChange={(e) => handleFilterChange("lantai", e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Kamar (Unit Number)
            </label>
            <input
              type="text"
              value={filter.unit_number}
              onChange={(e) =>
                handleFilterChange("unit_number", e.target.value)
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RoomFilterModal;
