import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/residents", // Ganti sesuai URL backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

// Mendapatkan data resident
export const fetchResidents = async () => {
  const response = await apiClient.get("/residents");
  return response.data;
};

// Menambahkan data resident
export const addResident = async (formData) => {
  const response = await apiClient.post("/residents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Mendapatkan detail resident berdasarkan NIK
export const fetchResidentDetail = async (nik) => {
  const response = await apiClient.get(`/residents/${nik}`);
  return response.data;
};

export default { fetchResidents, addResident, fetchResidentDetail };
