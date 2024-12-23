import React from "react";

const RoomDetails = ({ detail }) => {
  const { old_data, new_data } = detail;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Room Details</h3>
      <div className="space-y-2">
        <div>Sebelumnya: {old_data.status || "N/A"}</div>
        <div>Setelah: {new_data.status || "N/A"}</div>
      </div>
    </div>
  );
};

export default RoomDetails;
