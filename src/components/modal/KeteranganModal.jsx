import React from "react";

const KeteranganModal = ({ visible, keterangan, onClose, onChange, onSubmit }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>
          &times;
        </button>
        <label className="block text-gray-700 mb-4">Masukan keterangan</label>
        <textarea
          value={keterangan}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Masukkan keterangan..."
          rows={4}
          className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-700 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <div className="mt-20 flex justify-end gap-2">
          <button
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeteranganModal;
