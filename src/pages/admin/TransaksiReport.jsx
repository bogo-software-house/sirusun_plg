import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import PaginationControls from "../../utils/paginations/Paginations";

const TransactionHistory = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistories = async (page = 1) => {
    try {
      const response = await axios.get(`https://api.sirusun.com/api/transaction-histories?page=${page}`);
      setHistories(response.data.data); // Set fetched data
      setCurrentPage(response.data.meta.current_page);
      setTotalPages(response.data.meta.last_page);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setLoading(true);
      fetchHistories(page);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to determine color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "DI PROSES":
        return "bg-yellow-100 text-yellow-700 border border-yellow-400"; // Warna lebih lembut dengan border
      case "DITERIMA":
        return "bg-green-100 text-green-700 border border-green-400"; // Warna lebih lembut dengan border
      case "DITOLAK":
        return "bg-red-100 text-red-700 border border-red-400"; // Warna lebih lembut dengan border
      default:
        return "bg-gray-100 text-gray-700 border border-gray-400"; // Default warna dengan border
    }
  };

  // Define columns for the table with color-coded old_status and new_status
  const columns = [
    { key: "no", label: "No" }, // New column for row index
    { key: "nik", label: "NIK" },
    { key: "nama", label: "Nama" },
    { key: "action", label: "Action" },
    {
      key: "old_status",
      label: "Old Status",
      render: (value, row) => {
        const oldStatus = row.old_status || "N/A";
        return (
          <span
            className={`inline-block rounded-full font-medium box-border text-xs ${getStatusColor(oldStatus)}`}
            style={{
              padding: "0.4rem 0.8rem", // Padding yang lebih kecil
              display: "inline-block",
            }}
          >
            {oldStatus}
          </span>
        );
      },
    },
    {
      key: "new_status",
      label: "New Status",
      render: (value, row) => {
        const newStatus = row.new_status || "N/A";
        return (
          <span
            className={`inline-block rounded-full font-medium box-border text-xs ${getStatusColor(newStatus)}`}
            style={{
              padding: "0.4rem 0.8rem", // Padding yang lebih kecil
              display: "inline-block",
            }}
          >
            {newStatus}
          </span>
        );
      },
    },
    { key: "created_at", label: "Created At" },
    { key: "created_at_human", label: "Updated" },
  ];

  // Render the table with data and columns
  const handleEditClick = (row) => {
    // Define your edit logic here
    console.log("Edit clicked", row);
  };

  return (
    <div>
      <TableHeader title="History Status Transaksi" />

      <Table
        columns={columns}
        data={histories.map((history, index) => ({
          no: (currentPage - 1) * 15 + (index + 1), // Calculate row number
          nik: history.old_data?.user?.nik || "N/A",
          nama: history.old_data?.user?.nama || "N/A",
          action: history.action,
          old_status: history.old_data?.status || "N/A",
          new_status: history.new_data?.status || "N/A",
          created_at: new Date(history.created_at).toLocaleString(),
          created_at_human: history.created_at_human || "N/A",
        }))}
        emptyMessage="No transaction history available"
        showCheckbox={true} // Set to false if no checkboxes are needed
        handleEditClick={handleEditClick}
      />

      {/* Pagination controls */}
      <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default TransactionHistory;
