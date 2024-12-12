import React from "react";

const SalariesSelect = ({ salaries, value, onChange }) => {
  return (
    <label>
      Gaji:
      <select name="salaries_custom_id" value={value} onChange={onChange} required>
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
