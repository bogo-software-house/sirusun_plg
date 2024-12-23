import React from "react";

function RoomSelector({ rooms, onSelect }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Pilih Kamar</h3>
      <div className="flex flex-wrap gap-4 mt-2 p-4 border rounded-md bg-gray-50" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {rooms.map((room) => (
          <button
            key={room.number}
            className={`p-2 border rounded-md ${
              room.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
            onClick={() => onSelect(room)}
            disabled={!room.available}
          >
            {room.number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoomSelector;
