import React from "react";

const ReligionSelect = ({ religions, value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
        Agama
      </label>
      <select name="religions_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded p-2 w-full ">
        <option value="">Pilih Agama</option>
        {religions.map((religion) => (
          <option key={religion.custom_id} value={religion.custom_id}>
            {religion.religions}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReligionSelect;
