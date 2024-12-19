import React from "react";

const InputField = ({ label, id, name, value, onChange, required, placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input id={id} type="text" name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="border border-gray-300 rounded p-2 w-full mt-2" />
  </div>
);

export default InputField;
