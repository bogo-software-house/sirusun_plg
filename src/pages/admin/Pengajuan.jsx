import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import KeteranganModal from "../../components/modal/KeteranganModal";
import NotificationModal from "../../components/modal/NotificationModal";
import { getColumns } from "../../utils/TransactionsStatusColumn";
import TableHeader from "../../components/table/TableHeader";

const Pengajuan = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { custom_id: "ISF001", status: "PROSES" },
    { custom_id: "ISF002", status: "DITERIMA" },
    { custom_id: "ISF003", status: "DITOLAK" },
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [keterangan, setKeterangan] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(""); // Menyimpan role user

  // Ambil role dari localStorage untuk mengetahui apakah user admin atau staff
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setUserRole(storedRole || ""); // Jika role tidak ada, set empty string
  }, []);

  const isAdmin = userRole.toLowerCase() === "admin"; // Cek apakah user adalah admin

  // Ambil data transaksi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/transactions/"
        );
        setTransactionData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotification({
          type: "error",
          message: "Gagal mengambil data transaksi.",
        });
      }
    };

    fetchData();
  }, []);

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
      const transaction = transactionData.find((t) => t.id === transactionId);
      if (!transaction) {
        setError("Transaksi tidak ditemukan.");
        return;
      }

      const payload = { statusForm_custom_id: statusFormCustomId };
      if (statusFormCustomId === "ISF003") payload.keterangan = keterangan;

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/transactions/${transaction.form_custom_id}`,
        payload
      );

      if (response.status === 200) {
        setNotification({
          type: "success",
          message: "Status berhasil diperbarui!",
        });
        setTimeout(() => setNotification(null), 3000);
        fetchData(); // Perbarui data setelah berhasil
        setModalVisible(false);
        setKeterangan("");
      } else {
        setError("Gagal memperbarui status. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Terjadi kesalahan saat memperbarui status.");
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
    }
  };

  const handleModalSubmit = () => {
    if (currentTransactionId) updateStatus(currentTransactionId);
  };

  const renderStatusOptions = (transactionId) => {
    return statusOptions.map((option) => (
      <option
        key={option.custom_id}
        value={option.custom_id}
        disabled={!isAdmin} // Nonaktifkan dropdown jika user bukan admin
      >
        {option.status}
      </option>
    ));
  };

  const columns = getColumns(
    statusOptions,
    selectedStatuses,
    handleStatusChange,
    updateStatus
  );

  return (
    <div className="transaction-table text-black max-w-full sm:max-w-4xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      {notification && (
        <NotificationModal
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <TableHeader title="Daftar Pengajuan" actions={[{ label: "Tambah Data" }]} />
      <Table
        columns={columns}
        data={transactionData}
        emptyMessage="Tidak ada data pengajuan."
      />

      {/* Modal untuk keterangan */}
      <KeteranganModal
        visible={modalVisible}
        keterangan={keterangan}
        onClose={() => setModalVisible(false)}
        onChange={(value) => setKeterangan(value)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Pengajuan;
