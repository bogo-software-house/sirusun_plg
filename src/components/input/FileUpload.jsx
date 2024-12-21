import React from "react";

const FileUpload = ({ label, name, file, onChange, required }) => (
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative border border-gray-300 rounded-lg shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
      <input type="file" name={name} onChange={onChange} required={required} accept="application/pdf" className="absolute w-full h-full opacity-0 cursor-pointer" />
      <div className="flex items-center justify-between px-3 py-2 bg-white text-gray-600">
        <span className="truncate text-sm">{file ? file.name : "Pilih file (PDF)"}</span>
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs">Browse</span>
      </div>
    </div>
  </div>
);

export default FileUpload;
