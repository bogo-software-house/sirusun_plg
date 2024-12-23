import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

const ActionDropdown = ({ statusOptions, selectedStatus, onStatusChange, onUpdate }) => {
  return (
    <div className="text-center flex justify-center">
      <select
        value={selectedStatus || ""}
        onChange={onStatusChange}
        className="block rounded-md me-2 border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="">Pilih Status</option>
        {statusOptions.map((status) => (
          <option key={status.custom_id} value={status.custom_id}>
            {status.status}
          </option>
        ))}
      </select>
      <button className="text-white bg-indigo-600 rounded-2xl text-sm hover:bg-indigo-700 flex items-center space-x-2 font-bold" onClick={onUpdate}>
        <PlusIcon className="h-5 w-5  font-extrabold" />
        <span>Update</span>
      </button>
    </div>
  );
};

export default ActionDropdown;
