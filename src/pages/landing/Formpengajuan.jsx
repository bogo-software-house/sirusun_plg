// src/pages/ResidentForm.js
import React, { useState } from "react";
import axios from "axios";
import { useFetchOptions } from "../../../src/api/FetchOption";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/modal/ErrorModal";
import ResidentFormFields from "../../components/forms/ResidentFormFields";
import ProcessingBanner from "../../components/ui/banner/ProcessingBanner";
import SubmitButton from "../../components/button/SubmitButton";
import FormHeader from "../../components/forms/FormHeader";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { genders, statusNikah, religions, educations, salaries } = useFetchOptions();

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

    setLoading(true);

    try {
      const response = await axios.post("https://api.sirusun.com/api/residents", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
        setShowBanner(false);
        navigate("/"); // Redirect setelah 3 detik
      }, 3000);

      console.log(response.data);
    } catch (error) {
      setLoading(false);
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
      {showBanner && <ProcessingBanner />}
      <FormHeader />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-black mx-6 lg:mx-24 py-10 px-20">
        <ResidentFormFields
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          genders={genders}
          statusNikah={statusNikah}
          religions={religions}
          educations={educations}
          salaries={salaries}
        />

        <SubmitButton loading={loading} />
      </form>

      {showErrorModal && <ErrorModal errors={errors} onClose={handleCloseModal} />}
    </div>
  );
};

export default ResidentForm;
