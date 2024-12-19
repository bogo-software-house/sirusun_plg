import React from "react";

const EducationSelect = ({ educations, value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
        Pendidikan
      </label>
      <select name="education_custom_id" value={value} onChange={onChange} required className="border border-gray-300 rounded p-2 w-full ">
        <option value="">Pilih Pendidikan</option>
        {educations.map((education) => (
          <option key={education.custom_id} value={education.custom_id}>
            {education.education}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EducationSelect;
