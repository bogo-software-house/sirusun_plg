import React, { useState, useEffect } from "react";
import axios from "axios";




const TransactionTable = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]); // Untuk menyimpan status dari backend
  const [selectedStatuses, setSelectedStatuses] = useState({}); // Menyimpan status per transaksi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState(null); // Menambahkan state untuk pemberitahuan

  // Fetch transaksi dan status form
  useEffect(() => {
    fetchTransactionData(); // Ambil data transaksi
    fetchStatusOptions(); // Ambil status options dari API
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/transactions");
      setTransactionData(response.data.data); // Menyimpan data transaksi ke state
      setLoading(false);
    } catch (err) {
      setError("Error fetching transaction data");
      setLoading(false);
    }
  };

  const fetchStatusOptions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/status-form");
      setStatusOptions(response.data.data); // Menyimpan data status form ke state
    } catch (err) {
      setError("Error fetching status options");
    }
  };

  const updateStatus = async (transactionId) => {
    // Pastikan status dipilih untuk transaksi ini
    const statusFormCustomId = selectedStatuses[transactionId];

    if (!statusFormCustomId) {
      setError("Please select a status for this transaction.");
      return;
    }

    setUpdating(true);
    try {
      // Ambil form_custom_id dari transaksi untuk dikirimkan dalam URL
      const formcustomId = transactionData.find((transaction) => transaction.id === transactionId)?.form_custom_id;

      if (!formcustomId) {
        setError("Form Custom ID not found for this transaction.");
        return;
      }

      // Kirimkan status yang dipilih untuk transaksi ini dengan formcustomId
      const response = await axios.patch(`http://127.0.0.1:8000/api/transactions/${formcustomId}`, {
        statusForm_custom_id: statusFormCustomId,
      });

      // Memuat ulang data transaksi setelah status diperbarui
      fetchTransactionData();

      // Tampilkan pesan sukses
      setNotification({ type: "success", message: "Status berhasil diperbarui!" });

      // Menghapus notifikasi setelah 3 detik
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      // Tampilkan pesan error
      setNotification({ type: "error", message: "Error updating status. Please try again later." });

      // Menghapus notifikasi setelah 3 detik
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = (transactionId, statusId) => {
    setSelectedStatuses((prevSelectedStatuses) => ({
      ...prevSelectedStatuses,
      [transactionId]: statusId, // Update status untuk transaksi tertentu
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="transaction-table">
      <h2>Transaction Status Table</h2>

      {/* Tampilkan notifikasi jika ada */}
      {notification && (
        <div className={`notification ${notification.type}`} style={{ padding: "10px", marginBottom: "15px", backgroundColor: notification.type === "success" ? "green" : "red", color: "white" }}>
          {notification.message}
        </div>
      )}

      <table border="1" cellPadding="10" className="text-black min-w-full border divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custom ID</th> {/* Kolom baru untuk Custom ID */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF Resident</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactionData.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.resident_pdf?.resident?.nik || "N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.resident_pdf?.resident?.username || "N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status_form?.status || "N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.custom_id || "N/A"}</td> {/* Menampilkan Custom ID */}
              <td>
                {transaction.resident_pdf?.file_url ? (
                  <a href={transaction.resident_pdf.file_url} target="_blank" rel="noopener noreferrer" className="text-white bg-indigo-600 px-5 py-2 rounded-lg text-sm">
                   Lihat PDF
                  </a>
                ) : (
                  "No PDF"
                )}
              </td>
              <td className="flex text-sm">
                {/* Status selector */}
                <div>
                  <select className="rounded-lg bg-gray-100 border-none" onChange={(e) => handleStatusChange(transaction.id, e.target.value)} value={selectedStatuses[transaction.id] || ""} disabled={updating}>
                    <option value="">Select Status</option>
                    {statusOptions.map((status) => (
                      <option key={status.custom_id} value={status.custom_id}  >
                        {status.status}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Button to update status */}
                <button  onClick={() => updateStatus(transaction.id)} disabled={updating || !selectedStatuses[transaction.id]} style={{ marginLeft: "10px", backgroundColor:"green",color:"white"}}>
                  {updating ? "Updating..." : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
