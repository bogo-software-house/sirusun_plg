import React from "react";

const GenderSelect = ({ genders, value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
        Gender
      </label>
      <select name="genders_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded p-2 w-full ">
        <option value="">Pilih Gender</option>
        {genders.map((gender) => (
          <option key={gender.custom_id} value={gender.custom_id}>
            {gender.gender}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenderSelect;
