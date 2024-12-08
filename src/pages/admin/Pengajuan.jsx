import React, { useState, useEffect } from "react";
import axios from "axios";

const Pengajuan = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTransactionData();
    fetchStatusOptions();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/transactions");
      setTransactionData(response.data?.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching transaction data");
      setLoading(false);
    }
  };

  const fetchStatusOptions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/status-form");
      setStatusOptions(response.data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching status options");
    }
  };

  const updateStatus = async (transactionId) => {
    const statusFormCustomId = selectedStatuses[transactionId];

    if (!statusFormCustomId) {
      setError("Please select a status for this transaction.");
      return;
    }

    setUpdating(true);
    try {
      const formcustomId = transactionData.find((transaction) => transaction.id === transactionId)?.form_custom_id;

      if (!formcustomId) {
        setError("Form Custom ID not found for this transaction.");
        return;
      }

      await axios.patch(`http://127.0.0.1:8000/api/transactions/${formcustomId}`, {
        statusForm_custom_id: statusFormCustomId,
      });

      fetchTransactionData();
      setNotification({ type: "success", message: "Status berhasil diperbarui!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Error updating status. Please try again later." });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = (transactionId, statusId) => {
    setSelectedStatuses((prevSelectedStatuses) => ({
      ...prevSelectedStatuses,
      [transactionId]: statusId,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="transaction-table">
      <h2>Transaction Status Table</h2>

      {notification && (
        <div
          className={`notification ${notification.type}`}
          style={{ padding: "10px", marginBottom: "15px", backgroundColor: notification.type === "success" ? "green" : "red", color: "white" }}
        >
          {notification.message}
        </div>
      )}

      <table border="1" cellPadding="10" className="text-black min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>NIK</th>
            <th>Username</th>
            <th>Status</th>
            <th>Custom ID</th>
            <th>PDF Resident</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactionData.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.resident_pdf?.resident?.nik || "N/A"}</td>
              <td>{transaction.resident_pdf?.resident?.username || "N/A"}</td>
              <td>{transaction.status_form?.status || "N/A"}</td>
              <td>{transaction.custom_id || "N/A"}</td>
              <td>
                {transaction.resident_pdf?.file_url ? (
                  <a href={transaction.resident_pdf.file_url} target="_blank" rel="noopener noreferrer">
                    Lihat PDF
                  </a>
                ) : (
                  "No PDF"
                )}
              </td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                  value={selectedStatuses[transaction.id] || ""}
                  disabled={updating}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status.custom_id} value={status.custom_id}>
                      {status.status}
                    </option>
                  ))}
                </select>
                <button onClick={() => updateStatus(transaction.id)} disabled={updating || !selectedStatuses[transaction.id]}>
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

export default Pengajuan;
