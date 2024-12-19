import React from "react";
import InputField from "../../components/input/InputField";
import GenderSelect from "../../components/input/genders";
import StatusNikahSelect from "../../components/input/statusnikah";
import ReligionSelect from "../../components/input/religions";
import EducationSelect from "../../components/input/educations";
import SalariesSelect from "../../components/input/salaries";
import FileUpload from "../../components/input/FileUpload";

const ResidentFormFields = ({ formData, handleInputChange, handleFileChange, genders, statusNikah, religions, educations, salaries }) => {
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="space-y-6">
          <InputField label="NIK" id="nik" name="nik" value={formData.nik} onChange={handleInputChange} required />
          <InputField label="Nama" id="username" name="username" value={formData.username} onChange={handleInputChange} required placeholder="Nama berdasarkan KTP" />
          <InputField label="Tempat Lahir" id="tempat_lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} required />
          <InputField label="Tanggal Lahir" id="tanggal_lahir" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} required placeholder="ex: 10-10-2001" />
        </div>

        {/* Gender, Status Nikah, Religion, Education, Salary */}
        <div className="flex flex-col sm:flex-row gap-6 translate-y-[-8px]">
          <GenderSelect genders={genders} value={formData.genders_custom_id} onChange={handleInputChange} />
          <StatusNikahSelect statusNikah={statusNikah} value={formData.status_nikah_custom_id} onChange={handleInputChange} />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 translate-y-[-16px]">
          <ReligionSelect religions={religions} value={formData.religions_custom_id} onChange={handleInputChange} />
          <EducationSelect educations={educations} value={formData.education_custom_id} onChange={handleInputChange} />
          <SalariesSelect salaries={salaries} value={formData.salaries_custom_id} onChange={handleInputChange} />
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        {/* Alamat KTP, No Telp, Email, Warga Negara */}
        <div className="space-y-6">
          <InputField label="Alamat KTP" id="alamat_rumah" name="alamat_rumah" value={formData.alamat_rumah} onChange={handleInputChange} required />
          <InputField label="No Telp" id="no_telp" name="no_telp" value={formData.no_telp} onChange={handleInputChange} required placeholder="ex: 08123456789" />
          <InputField label="Email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          <InputField label="Warga Negara" id="warga_negara" name="warga_negara" value={formData.warga_negara} onChange={handleInputChange} required />
          <InputField label="Pekerjaan" id="pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} required />
          <InputField label="Alamat Tempat Kerja" id="alamat_tempat_kerja" name="alamat_tempat_kerja" value={formData.alamat_tempat_kerja} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 space-y-8">
        {/* Upload files */}
        <div className="space-y-6">
          <FileUpload label="Berkas Kartu Keluarga" name="berkas_kk" file={formData.berkas_kk} onChange={handleFileChange} required />
          <FileUpload label="Berkas KTP" name="berkas_ktp" file={formData.berkas_ktp} onChange={handleFileChange} required />
          <FileUpload label="Berkas Salary" name="berkas_salary" file={formData.berkas_salary} onChange={handleFileChange} required />
        </div>
      </div>
    </>
  );
};

export default ResidentFormFields;
