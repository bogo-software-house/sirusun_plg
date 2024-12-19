// src/components/SubmitButton.js
import React from "react";

const SubmitButton = ({ loading }) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700" disabled={loading}>
        {loading ? "Mengirim..." : "Ajukan"}
      </button>
    </div>
  );
};

export default SubmitButton;
