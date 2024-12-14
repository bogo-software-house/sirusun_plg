import React from "react";

const GenderSelect = ({ genders, value, onChange }) => {
  return (
    <label>
      Gender:
      <select name="genders_custom_id" value={value} onChange={onChange} required>
        <option value="">Pilih Gender</option>
        {genders.map((gender) => (
          <option key={gender.custom_id} value={gender.custom_id}>
            {gender.gender}
          </option>
        ))}
      </select>
    </label>
  );
};

export default GenderSelect;
