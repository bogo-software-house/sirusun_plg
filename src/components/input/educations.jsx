import React from "react";

const EducationSelect = ({ educations, value, onChange }) => {
  return (
    <label>
      Education:
      <select name="education_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded-md w-full rounded-gray-300">
        <option value="">Pilih Pendidikan</option>
        {educations.map((education) => (
          <option key={education.custom_id} value={education.custom_id}>
            {education.education}
          </option>
        ))}
      </select>
    </label>
  );
};

export default EducationSelect;
