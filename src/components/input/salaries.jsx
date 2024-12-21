import React from "react";

const SalariesSelect = ({ salaries, value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
        Salary
      </label>
    <select name="salaries_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded p-2 w-full ">
      <option value="">Pilih Gaji</option>
      {salaries.map((salary) => (
        <option key={salary.custom_id} value={salary.custom_id}>
          {salary.salary} {/* Pastikan menggunakan field salary */}
        </option>
      ))}
    </select>
    </div>
  );
};

export default SalariesSelect;
