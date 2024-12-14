import React from "react";

function SelectedRoomInfo({ room }) {
  if (!room) return null;

  return (
    <div className="mt-4 p-4 bg-indigo-100 rounded-md">
      <h4 className="text-sm font-medium text-gray-700">Informasi Kamar Terpilih</h4>
      <ul className="mt-2 text-gray-700">
        <li>
          <strong>Nomor:</strong> {room.number}
        </li>
        <li>
          <strong>ID Khusus:</strong> {room.customId}
        </li>
        <li>
          <strong>Status:</strong> {room.available ? "Tersedia" : "Tidak Tersedia"}
        </li>
      </ul>
    </div>
  );
}

export default SelectedRoomInfo;
