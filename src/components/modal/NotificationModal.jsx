import React from "react";

function NotificationModal({ message, onClose, type }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`bg-${type === "success" ? "green" : "indigo"}-500 p-6 rounded-lg w-80 shadow-lg relative text-white`}>
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          &times;
        </button>
        <h3 className="text-lg font-semibold">{type === "success" ? "Sukses" : "Kesalahan"}</h3>
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
