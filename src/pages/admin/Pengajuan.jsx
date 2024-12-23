import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import KeteranganModal from "../../components/modal/KeteranganModal";
import NotificationModal from "../../components/modal/NotificationModal";
import { getColumns } from "../../utils/TransactionsStatusColumn";
import TableHeader from "../../components/table/TableHeader";

const Pengajuan = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [statusOptions] = useState([
    { custom_id: "ISF001", status: "PROSES" },
    { custom_id: "ISF002", status: "DITERIMA" },
    { custom_id: "ISF003", status: "DITOLAK" },
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [keterangan, setKeterangan] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [setError] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setUserRole(storedRole || "");
  }, []);

  const isAdmin = userRole.toLowerCase() === "admin";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.sirusun.com/api/transactions");
      setTransactionData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNotification({
        type: "error",
        message: "Gagal mengambil data transaksi.",
      });
    }
  };

  const updateStatus = async (transactionId) => {
    if (!isAdmin) {
      setNotification({
        type: "error",
        message: "Hanya admin yang dapat memperbarui status.",
      });
      return;
    }

    const statusFormCustomId = selectedStatuses[transactionId];
    if (!statusFormCustomId) {
      setError("Silakan pilih status untuk transaksi ini.");
      return;
    }

    try {
      const transaction = transactionData.find((t) => t.data.id === transactionId);
      if (!transaction) {
        setError("Transaksi tidak ditemukan.");
        return;
      }

      const payload = {
        statusForm_custom_id: statusFormCustomId,
      };

      // Jika status ditolak (ISF003), pastikan keterangan ada
      if (statusFormCustomId === "ISF003" && keterangan) {
        payload.keterangan = keterangan;
      } else if (statusFormCustomId === "ISF002" && keterangan) {
        // Jika status diterima (ISF002), pastikan keterangan kosong
        setError("Keterangan harus kosong jika status adalah Diterima.");
        return;
      }

      const response = await axios.patch(`https://api.sirusun.com/api/transactions/${transaction.data.custom_id}`, payload);

      // Jika berhasil (status 200)
      if (response.status === 200) {
        setModalVisible(false);
        setKeterangan();
        setNotification({
          type: "Success", // Pastikan type adalah 'success'
          message: "Status berhasil diperbarui!",
        });

        // Tutup modal setelah 3 detik dan reset notifikasi
        setTimeout(() => {
          setNotification(null);
          setModalVisible(false);
        }, 3000);

        // Refresh data transaksi setelah update
        fetchData();
      } else {
        // Tangani jika status bukan 200
        setNotification({
          type: "Rrror",
          message: "Status gagal diperbarui!",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setNotification({
        type: "Error", // Set error message jika ada error
        message: "Terjadi kesalahan saat memperbarui status.",
      });
    }
  };

  const handleStatusChange = (transactionId, statusId) => {
    if (!isAdmin) {
      setNotification({
        type: "warning",
        message: "Hanya admin yang dapat mengupdate status.",
      });
      return;
    }

    setSelectedStatuses((prev) => ({ ...prev, [transactionId]: statusId }));

    if (statusId === "ISF003") {
      setCurrentTransactionId(transactionId);
      setModalVisible(true);
    } else if (statusId === "ISF002" && isAdmin) {
      updateStatus(transactionId);
      setModalVisible(false);
    } else if (statusId === "ISF001" && isAdmin) {
      setNotification({
        type: "warning",
        message: "Silahkan pilih status DI TOLAK dan DI TERIMA",
      });
    }
  };

  const handleModalSubmit = () => {
    if (currentTransactionId) updateStatus(currentTransactionId);
  };

  // const renderStatusOptions = (transactionId) => {
  //   return statusOptions.map((option) => (
  //     <option key={option.custom_id} value={option.custom_id} disabled={!isAdmin}>
  //       {option.status}
  //     </option>
  //   ));
  // };

  const columns = getColumns(statusOptions, selectedStatuses, handleStatusChange, updateStatus);

  return (
    <div>
      {notification && <NotificationModal type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
      <TableHeader title="Daftar Pengajuan" />
      <Table showCheckbox={false} columns={columns} data={transactionData} emptyMessage="Tidak ada data pengajuan." />

      <KeteranganModal visible={modalVisible} keterangan={keterangan} onClose={() => setModalVisible(false)} onChange={(value) => setKeterangan(value)} onSubmit={handleModalSubmit} />
    </div>
  );
};

export default Pengajuan;
