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
          Data anda sedang di prosses...
        </div>
      )}
      <div className="text-center bg-indigo-600 py-10">
      <h1 className="text-white font-semibold text-2xl ">Formulir Pengajuan Sewa Rusun</h1>
      <p className="text-white">isi data dengan sebaik-baiknya</p>
      </div>
      <form  onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black ml-24 mr-24 py-10" >
        <div className="flex flex-col">
        <label >
          NIK:
          <input type="text" name="nik" value={formData.nik} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full" />
        </label>
        <br />
        <label>
          Nama:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required placeholder="Nama berdasarkan KTP"   className="border border-gray-300 rounded p-2 w-full" />
        </label>
        {/* <small className="text-gray-500">Nama berdasarkan KTP</small> */}
        <br />
        <label>
          Email
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required placeholder="Email Aktif"   className="border border-gray-300 rounded p-2 w-full" />
        </label>
        {/* <small className="text-gray-500">Email Aktif</small> */}
        <br />
        <label>
          Tempat Lahir:
          <input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full"/>
        </label>
        <br />
        <label>
          Tanggal Lahir:
          <input type="text" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full" />
        </label>
        <br />

        {/* Use Select Components */}
        <div className="flex gap-20 mt-6 mb-6 ">
        <GenderSelect genders={genders} value={formData.genders_custom_id} onChange={handleInputChange} />
        <StatusNikahSelect statusNikah={statusNikah} value={formData.status_nikah_custom_id} onChange={handleInputChange} />
        </div>
        <br />
        <div className="flex gap-20 " >
        <ReligionSelect religions={religions} value={formData.religions_custom_id} onChange={handleInputChange} />
        <EducationSelect educations={educations} value={formData.education_custom_id} onChange={handleInputChange} />
        </div>
      
        <br />
        <div className="border border-gray-300 p-2 rounded-lg mt-4 " >
        <label  >
          Berkas KK:
          <br />  
          <input type="file" name="berkas_kk" onChange={handleFileChange} required  className="relative cursor-pointer rounded-md bg-gray font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"/>
        </label>
        </div>
      

        </div>
        <div className="flex flex-col">
        <label>
          Alamat KTP:
          <input type="text" name="alamat_rumah" value={formData.alamat_rumah} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full" />
        </label>
        {/* <small className="text-gray-500">Alamat berdasarkan KTP</small> */}
        <br />
        <label>
          No Telp:
          <input type="text" name="no_telp" value={formData.no_telp} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full"/>
        </label>
        <br />
        <label>
          Penghasilan:
          <input type="number" name="penghasilan" value={formData.penghasilan} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full" />
        </label>
        <br />
        <label>
          Warga Negara:
          <input type="text" name="warga_negara" value={formData.warga_negara} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full"/>
        </label>
        <br />
        <label>
          Pekerjaan:
          <input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full" />
        </label>
        <br />
        <label>
          Alamat Tempat Kerja:
          <input type="text" name="alamat_tempat_kerja" value={formData.alamat_tempat_kerja} onChange={handleInputChange} required    className="border border-gray-300 rounded p-2 w-full" />
        </label>
        <br />
       <div className="border border-gray-300 p-2 rounded-lg mb-8 ">
       <label>
          Berkas KTP:
          <br />
          <input type="file" name="berkas_ktp" onChange={handleFileChange} required  className="relative cursor-pointer rounded-md  font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"/>
        </label>
       </div>
       <div className="border border-gray-300 p-2 rounded-lg">
       <label>
          Slip Gaji
          <br />
          <input type="file" name="berkas_ktp" onChange={handleFileChange} required  className="relative cursor-pointer rounded-md  font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"/>
        </label>
       </div>
        </div>
        <div  className="bg-indigo-600 text-center text-white rounded-lg  "><button type="submit">Ajukan</button></div>
      </form>
    </div>
  );
};

export default ResidentForm;
