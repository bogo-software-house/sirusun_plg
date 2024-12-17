import axios from "axios";

const API_BASE_URL = "https://api.sirusun.com/api";

const apiService = {
  // Get all occupants
  getOccupants: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions-rooms`);
      return response.data.data || [];
    } catch (error) {
      console.error("Gagal mengambil data penghuni:", error);
      throw error;
    }
  },

  // Get blocks for a selected rusun
  getBlocksByRusun: async (rusunId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pengambilan-data-kamar/${rusunId}`);
      return response.data.bloks || [];
    } catch (error) {
      console.error("Gagal mengambil data blok:", error);
      throw error;
    }
  },

  // Add a new occupant
  addOccupant: async (nik, roomCustomId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions-rooms`, {
        nik,
        rooms_custom_id: roomCustomId,
      });
      return response.data;
    } catch (error) {
      console.error("Gagal menambahkan penghuni:", error);
      throw error;
    }
  },
};

export default apiService;
