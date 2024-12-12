import React from "react";

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-indigo-500 p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h3 className="text-lg font-semibold mb-1 text-white">Konfirmasi</h3>
        <p className="mb-10 text-white">Apakah Anda yakin ingin menyimpan data ini?</p>
        <div className="flex justify-end gap-4">
          <button className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400" onClick={onCancel}>
            Batal
          </button>
          <button className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600" onClick={onConfirm}>
            Ya, Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
