import React from "react";

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select id={name} name={name} value={value} onChange={onChange} className="border border-gray-300 rounded p-2 w-full mt-2 text-grey-700">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
