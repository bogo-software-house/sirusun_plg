import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import KeteranganModal from "../../components/modal/KeteranganModal";
import NotificationModal from "../../components/modal/NotificationModal";
import { getColumns } from "../../utils/TransactionsStatusColumn";
import { fetchTransactionData, fetchStatusOptions } from "../../api/TransactionStatus";
import TableHeader from "../../components/table/TableHeader";

const Pengajuan = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [keterangan, setKeterangan] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactionData();
        setTransactionData(data);

        const options = await fetchStatusOptions();
        setStatusOptions(options);
      } catch {
        setNotification({ type: "error", message: "Error fetching data" });
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (transactionId) => {
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
      if (statusFormCustomId === "ISF003") payload.keterangan = keterangan;

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

  const handleStatusChange = (transactionId, statusId) => {
    setSelectedStatuses((prev) => ({ ...prev, [transactionId]: statusId }));

    if (statusId === "ISF003") {
      setCurrentTransactionId(transactionId);
      setModalVisible(true);
    } else if (statusId === "ISF002") {
      updateStatus(transactionId);
      setModalVisible(false);
    }
  };

  const handleModalSubmit = () => {
    if (currentTransactionId) updateStatus(currentTransactionId);
  };

  const columns = getColumns(statusOptions, selectedStatuses, handleStatusChange, updateStatus);

  return (
    <div className="transaction-table text-black">
      {notification && <NotificationModal type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
      <TableHeader title="Daftar Pengajuan" actions={[{ label: "Tambah Data" }]} />
      <Table columns={columns} data={transactionData} emptyMessage="Tidak ada data pengajuan." />

      <KeteranganModal visible={modalVisible} keterangan={keterangan} onClose={() => setModalVisible(false)} onChange={(value) => setKeterangan(value)} onSubmit={handleModalSubmit} />
    </div>
  );
};

export default Pengajuan;
