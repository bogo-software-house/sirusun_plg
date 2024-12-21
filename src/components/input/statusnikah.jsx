import React from "react";

const StatusNikahSelect = ({ statusNikah, value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
        Status Nikah
      </label>
      <select name="status_nikah_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded p-2 w-full">
        <option value="">Pilih Status Nikah</option>
        {statusNikah.map((status) => (
          <option key={status.custom_id} value={status.custom_id}>
            {status.status_nikah}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusNikahSelect;
