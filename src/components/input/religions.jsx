import React from "react";

const ReligionSelect = ({ religions, value, onChange }) => {
  return (
    <label>
      Religion:
      <select name="religions_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded-md w-full">
        <option value="">Pilih Agama</option>
        {religions.map((religion) => (
          <option key={religion.custom_id} value={religion.custom_id}>
            {religion.religions}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ReligionSelect;
