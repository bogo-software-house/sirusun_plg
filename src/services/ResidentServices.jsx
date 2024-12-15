import axios from "axios";

const API_URL = "https://api.sirusun.com/api"; // Ganti dengan URL API yang benar

export const fetchResidentsWithTransactions = async () => {
  try {
    // Ambil data residents
    const responseResidents = await axios.get(`${API_URL}/residents`);
    console.log("Fetched residents data:", responseResidents.data); // Debugging log

    // Cek apakah response.data adalah array
    if (!Array.isArray(responseResidents.data)) {
      console.error("Response data is not an array:", responseResidents.data);
      throw new Error("Response data is not an array");
    }

    // Ambil data transaksi
    const responseTransactions = await axios.get(`${API_URL}/transactions`);
    console.log("Fetched transactions data:", responseTransactions.data); // Debugging log

    // Gabungkan data residents dengan transaksi berdasarkan id
    const residentsWithTransactions = responseResidents.data.map((residentItem) => {
      const resident = residentItem.data; // Asumsikan data ada dalam property 'data'

      // Temukan transaksi yang sesuai berdasarkan 'resident.id'
      const transaction = responseTransactions.data.find(
        (trans) => trans.resident_id === resident.id
      );

      return {
        ...resident,
        status: transaction ? transaction.status : "Unknown", // Set status default jika tidak ada transaksi
      };
    });

    return residentsWithTransactions;
  } catch (error) {
    console.error("Error fetching residents or transactions:", error);
    throw new Error("Failed to fetch residents or transactions");
  }
};
