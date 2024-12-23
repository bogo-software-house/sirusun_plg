import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import PaginationControls from "../../utils/paginations/Paginations";
import Modal from "../../components/modal/DetailsModal";
import { getStatusColor } from "../../utils/StatusColour";
import RoomDetails from "../../utils/history/RoomDetails";
import TransactionRoomDetails from "../../utils/history/TransactionRoomDetails";
import UserDetails from "../../utils/history/UserDetails";
import TransactionStatusFormDetails from "../../utils/history/TransactionStatusFormDetails";

const TransactionHistory = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const fetchHistories = async (page = 1) => {
    try {
      const response = await axios.get(`https://api.sirusun.com/api/transaction-histories?page=${page}`);
      setHistories(response.data.data);
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

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
  };

  const closeModal = () => {
    setSelectedDetail(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderDetailContent = (detail) => {
    switch (detail.model_type) {
      case "TransactionRoom":
        return <TransactionRoomDetails detail={detail} />;
      case "TransactionStatusForm":
        return <TransactionStatusFormDetails detail={detail} />;
      case "User":
        return <UserDetails detail={detail} />;
      case "Room":
        return <RoomDetails detail={detail} />;
      default:
        return <p className="text-gray-600">No details available for this model type.</p>;
    }
  };

  const columns = [
    { key: "no", label: "No" },
    { key: "model_type", label: "Type" },
    { key: "action", label: "Action" },
    { key: "created_at", label: "Created At" },
    { key: "created_at_human", label: "Updated" },
    {
      key: "detail",
      label: "",
      render: (value, row) => (
        <button className="text-indigo-600" onClick={() => handleDetailClick(row)}>
          View Detail
        </button>
      ),
    },
  ];

  return (
    <div>
      <TableHeader title="History Status Transaksi" />

      <Table
        columns={columns}
        data={histories.map((history, index) => ({
          no: (currentPage - 1) * 15 + (index + 1),
          model_type: history.model_type || "N/A",
          action: history.action || "N/A",
          created_at: new Date(history.created_at).toLocaleString(),
          created_at_human: history.created_at_human || "N/A",
          old_data: history.old_data,
          new_data: history.new_data,
        }))}
        emptyMessage="No transaction history available"
        showCheckbox={true}
      />

      <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

      {selectedDetail && (
        <Modal isOpen={!!selectedDetail} title="Detail Information" onClose={closeModal}>
          {renderDetailContent(selectedDetail)}
        </Modal>
      )}
    </div>
  );
};

export default TransactionHistory;
