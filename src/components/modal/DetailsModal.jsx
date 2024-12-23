import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body text-gray-700">{children}</div>
        <div className="modal-footer mt-4 flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
