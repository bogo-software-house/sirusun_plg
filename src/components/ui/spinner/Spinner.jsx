import React from "react";

const Spinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Spinner Animasi */}
      <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>

      {/* Teks Loading */}
      <p className="mt-4 text-lg font-medium text-indigo-600">{text}</p>
    </div>
  );
};

export default Spinner;
