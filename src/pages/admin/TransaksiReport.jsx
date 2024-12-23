import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";

const TransactionHistory = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transaction history from the API
    const fetchHistories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/transaction-histories"
        );
        setHistories(response.data.data); // Set the fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to determine color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "DI PROSES":
        return "bg-yellow-200 text-yellow-800"; // Yellow for 'DI PROSES'
      case "DITERIMA":
        return "bg-green-200 text-green-800"; // Green for 'DITERIMA'
      case "DITOLAK":
        return "bg-red-200 text-red-800"; // Red for 'DITOLAK'
      default:
        return "bg-gray-200 text-gray-800"; // Default color if no status found
    }
  };

  // Define columns for the table with color-coded old_status and new_status
  const columns = [
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
            className={`inline-block rounded-3xl font-bold box-border leading-none text-sm ${getStatusColor(
              oldStatus
            )}`}
            style={{
              padding: "0.7rem",
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
            className={`inline-block rounded-3xl font-bold box-border leading-none text-sm ${getStatusColor(
              newStatus
            )}`}
            style={{
              padding: "0.7rem",
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
        data={histories.map((history) => ({
          nik: history.old_data?.user?.nik || "N/A",
          nama: history.old_data?.user?.nama || "N/A",
          action: history.action,
          old_status: history.old_data?.status || "N/A",
          new_status: history.new_data?.status || "N/A",
          created_at: new Date(history.created_at).toLocaleString(),
          created_at_human: history.created_at_human || "N/A",
        }))}
        emptyMessage="No transaction history available"
        showCheckbox={false} // Set to false if no checkboxes are needed
        handleEditClick={handleEditClick}
      />
    </div>
  );
};

export default TransactionHistory;
