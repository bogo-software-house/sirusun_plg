import React from "react";

const StatusNikahSelect = ({ statusNikah, value, onChange }) => {
  return (
    <label>
      Status Nikah:
      <select name="status_nikah_custom_id" value={value} onChange={onChange} required>
        <option value="">Pilih Status Nikah</option>
        {statusNikah.map((status) => (
          <option key={status.custom_id} value={status.custom_id}>
            {status.status_nikah}
          </option>
        ))}
      </select>
    </label>
  );
};

export default StatusNikahSelect;
