import React from "react";

const EducationSelect = ({ educations, value, onChange }) => {
  return (
    <label>
      Education:
      <select name="education_custom_id" value={value} onChange={onChange} required>
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
