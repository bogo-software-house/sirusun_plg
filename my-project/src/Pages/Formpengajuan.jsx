import React, { useState } from "react";
import axios from "axios";
import { useFetchOptions } from "../../src/api/FetchOption"; // Import the custom hook
import GenderSelect from "../components/input/genders";
import StatusNikahSelect from "../components/input/statusnikah";
import ReligionSelect from "../components/input/religions";
import EducationSelect from "../components/input/educations";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

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
    penghasilan: "",
    warga_negara: "",
    pekerjaan: "",
    alamat_tempat_kerja: "",
    berkas_kk: null,
    berkas_ktp: null,
  });

  const [showBanner, setShowBanner] = useState(false); // State to manage banner visibility
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const { genders, statusNikah, religions, educations } = useFetchOptions(); // Use the custom hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/residents", // Replace with your Laravel API URL
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset the form after submission
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
        penghasilan: "",
        warga_negara: "",
        pekerjaan: "",
        alamat_tempat_kerja: "",
        berkas_kk: null,
        berkas_ktp: null,
      });

      // Show the "Mohon tunggu" banner
      setShowBanner(true);

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 3000);

      console.log(response.data);
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Banner */}
      {showBanner && (
        <div style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px",
          textAlign: "center",
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "1000"
        }}>
          Data anda sedang di prosses...
        </div>
      )}

      <form onSubmit={handleSubmit} className="text-black">
        <label>
          NIK:
          <input type="text" name="nik" value={formData.nik} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Tempat Lahir:
          <input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Tanggal Lahir:
          <input type="text" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} required />
        </label>
        <br />

        {/* Use Select Components */}
        <GenderSelect genders={genders} value={formData.genders_custom_id} onChange={handleInputChange} />
        <br />
        <StatusNikahSelect statusNikah={statusNikah} value={formData.status_nikah_custom_id} onChange={handleInputChange} />
        <br />
        <ReligionSelect religions={religions} value={formData.religions_custom_id} onChange={handleInputChange} />
        <br />
        <EducationSelect educations={educations} value={formData.education_custom_id} onChange={handleInputChange} />
        <br />

        <label>
          Alamat Rumah:
          <input type="text" name="alamat_rumah" value={formData.alamat_rumah} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          No Telp:
          <input type="text" name="no_telp" value={formData.no_telp} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Penghasilan:
          <input type="number" name="penghasilan" value={formData.penghasilan} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Warga Negara:
          <input type="text" name="warga_negara" value={formData.warga_negara} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Pekerjaan:
          <input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Alamat Tempat Kerja:
          <input type="text" name="alamat_tempat_kerja" value={formData.alamat_tempat_kerja} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Berkas KK:
          <input type="file" name="berkas_kk" onChange={handleFileChange} required />
        </label>
        <br />
        <label>
          Berkas KTP:
          <input type="file" name="berkas_ktp" onChange={handleFileChange} required />
        </label>
        <br />
        <button type="submit">Ajukan</button>
      </form>
    </div>
  );
};

export default ResidentForm;
