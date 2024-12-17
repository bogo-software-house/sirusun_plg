import React, { useState } from "react";
import axios from "axios";
import { useFetchOptions } from "../../../src/api/FetchOption";
import GenderSelect from "../../components/input/genders";
import StatusNikahSelect from "../../components/input/statusnikah";
import ReligionSelect from "../../components/input/religions";
import EducationSelect from "../../components/input/educations";
import SalariesSelect from "../../components/input/salaries";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/modal/ErrorModal";

const ResidentForm = () => {
  const [formData, setFormData] = useState({
    nik: "",
    username: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    genders_custom_id: "",
    status_nikah_custom_id: "",
    religions_custom_id: "",
    education_custom_id: "",
    alamat_rumah: "",
    no_telp: "",
    salaries_custom_id: "",
    penghasilan: "",
    warga_negara: "",
    pekerjaan: "",
    alamat_tempat_kerja: "",
    email: "",
    berkas_kk: null,
    berkas_ktp: null,
    berkas_salary: null,
  });

  const [showBanner, setShowBanner] = useState(false);
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const { genders, statusNikah, religions, educations, salaries } =
    useFetchOptions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://api.sirusun.com/api/residents",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        nik: "",
        username: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        genders_custom_id: "",
        status_nikah_custom_id: "",
        religions_custom_id: "",
        education_custom_id: "",
        alamat_rumah: "",
        no_telp: "",
        salaries_custom_id: "",
        penghasilan: "",
        warga_negara: "",
        pekerjaan: "",
        alamat_tempat_kerja: "",
        email: "",
        berkas_kk: null,
        berkas_ktp: null,
        berkas_salary: null,
      });

      setShowBanner(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setErrors(error.response.data.errors || {});
        setShowErrorModal(true);
      } else {
        console.error("Error:", error.message);
        setErrors({ message: "Terjadi kesalahan: " + error.message });
        setShowErrorModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div>
      {showBanner && (
        <div
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px",
            textAlign: "center",
            position: "fixed",
            top: "0",
            width: "100%",
            zIndex: "1000",
          }}
        >
          Data anda sedang diproses...
        </div>
      )}

      <div className="text-center bg-indigo-600 py-10">
        <h1 className="text-white font-semibold text-2xl">
          Formulir Pengajuan Sewa Rusun
        </h1>
        <p className="text-white">Isi data dengan sebaik-baiknya</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-black mx-6 lg:mx-24 py-10"
      >
        <div className="flex flex-col">
          <label>
            NIK:
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>

          <label>
            Nama:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Nama berdasarkan KTP"
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
          </label>

          <label>
            Tempat Lahir:
            <input
              type="text"
              name="tempat_lahir"
              value={formData.tempat_lahir}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
          </label>

          <label>
            Tanggal Lahir:
            <input
              type="text"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
              placeholder="ex: 10-10-2001"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <GenderSelect
              genders={genders}
              value={formData.genders_custom_id}
              onChange={handleInputChange}
            />
            <StatusNikahSelect
              statusNikah={statusNikah}
              value={formData.status_nikah_custom_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <ReligionSelect
              religions={religions}
              value={formData.religions_custom_id}
              onChange={handleInputChange}
            />
            <EducationSelect
              educations={educations}
              value={formData.education_custom_id}
              onChange={handleInputChange}
            />
            <SalariesSelect
              salaries={salaries}
              value={formData.salaries_custom_id}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>
            Alamat KTP:
            <input
              type="text"
              name="alamat_rumah"
              value={formData.alamat_rumah}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>

          <label>
            No Telp:
            <input
              type="text"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleInputChange}
              required
              className="rounded p-2 w-full mt-4"
              placeholder="ex: 08123456789"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
          </label>

          <label>
            Warga Negara:
            <input
              type="text"
              name="warga_negara"
              value={formData.warga_negara}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
          </label>

          <label>
            Pekerjaan:
            <input
              type="text"
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
          </label>

          <label>
            Alamat Tempat Kerja:
            <input
              type="text"
              name="alamat_tempat_kerja"
              value={formData.alamat_tempat_kerja}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
          </label>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label>
            Upload KK:
            <input
              type="file"
              name="berkas_kk"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
              accept="application/pdf"
            />
          </label>

          <label>
            Upload KTP:
            <input
              type="file"
              name="berkas_ktp"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
              accept="application/pdf"
            />
          </label>

          <label>
            Upload Slip Gaji:
            <input
              type="file"
              name="berkas_salary"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded p-2 w-full mt-4"
              accept="application/pdf"
            />
          </label>
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700"
          >
            Ajukan
          </button>
        </div>
      </form>
      {/* Error Modal */}

      {showErrorModal && (
        <ErrorModal errors={errors} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ResidentForm;
