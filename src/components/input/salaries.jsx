import React from "react";

const SalariesSelect = ({ salaries, value, onChange }) => {
  return (
    <label>
      Gaji:
      <select name="salaries_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded-md w-full">
        <option value="">Pilih Gaji</option>
        {salaries.map((salary) => (
          <option key={salary.custom_id} value={salary.custom_id}>
            {salary.salary} {/* Pastikan menggunakan field salary */}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SalariesSelect;
