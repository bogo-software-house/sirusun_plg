import React from "react";

function FloorSelector({ floors, selectedFloor, onSelect }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Pilih Lantai</h3>
      <div className="flex gap-4 mt-2">
        {floors.map((floor) => (
          <button
            key={floor.number}
            className={`p-2 border rounded-md ${
              selectedFloor === floor.number ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => onSelect(floor.number)}
          >
            Lantai {floor.number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FloorSelector;
