// src/api/auth.js

import axios from "axios";

// Correct API_URL without the extra '/login' part
const API_URL = "http://127.0.0.1:8000/api/auth/login";

// Fungsi untuk login
export const login = async (credentials) => {
  try {
    // Use the API_URL directly without appending '/login' again
    const response = await axios.post(API_URL, credentials);
    const { token, role, username } = response.data;

    // Menampilkan data role yang diterima dari API
    console.log("Role yang diterima:", role);
    console.log("username yang diterima:", username);

    // Menyimpan token dan role di localStorage atau sessionStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Fungsi untuk logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};
