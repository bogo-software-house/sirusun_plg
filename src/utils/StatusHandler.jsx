// StatusHandler.jsx
import axios from "axios";

export const handleStatusChange = (transactionId, statusId, setSelectedStatuses, setCurrentTransactionId, setModalVisible, updateStatus) => {
  if (typeof setSelectedStatuses !== "function") {
    console.error("setSelectedStatuses is not a function or missing.");
    return;
  }

  setSelectedStatuses((prev) => ({ ...prev, [transactionId]: statusId }));

  if (statusId === "ISF003") {
    setCurrentTransactionId(transactionId);
    setModalVisible(true);
  } else if (statusId === "ISF002") {
    updateStatus(transactionId);
    setModalVisible(false);
  }
};

export const updateStatus = async (transactionId, selectedStatuses, transactionData, setNotification, setError, fetchTransactionData, setModalVisible, setKeterangan) => {
  if (!selectedStatuses || !transactionData || !setNotification || !setError) {
    console.error("One or more required parameters are missing.");
    return;
  }

  const statusFormCustomId = selectedStatuses[transactionId];
  if (!statusFormCustomId) {
    setError("Please select a status for this transaction.");
    return;
  }

  try {
    const transaction = transactionData.find((t) => t.id === transactionId);
    if (!transaction) {
      setError("Transaction not found.");
      return;
    }

    const payload = { statusForm_custom_id: statusFormCustomId };
    if (statusFormCustomId === "ISF003") payload.keterangan = setKeterangan;

    const response = await axios.patch(`http://127.0.0.1:8000/api/transactions/${transaction.form_custom_id}`, payload);

    if (response.status === 200) {
      setNotification({ type: "success", message: "Status berhasil diperbarui!" });
      setTimeout(() => setNotification(null), 3000);
      fetchTransactionData();
      setModalVisible(false);
      setKeterangan("");
      window.location.reload();
    } else {
      setError("Failed to update the status. Please try again.");
    }
  } catch {
    setError("Error updating status. Please try again later.");
  }
};
