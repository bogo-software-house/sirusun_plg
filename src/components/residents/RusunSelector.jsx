import React from "react";

function RusunSelector({ rusuns, selectedRusun, onSelect }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Pilih Rusun</h3>
      <div className="flex gap-4 mt-2">
        {rusuns.map((rusun) => (
          <button
            key={rusun.id}
            className={`p-2 border rounded-md ${
              selectedRusun === rusun.id ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => onSelect(rusun.id)}
          >
            {rusun.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RusunSelector;
