import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import { fetchReportData } from "../../api/Report";
import { getReportColumns } from "../../components/columns/ReportColumns";
import Modal from "../../components/columns/ModalShowReport";
import PaginationControls from "../../utils/paginations/Paginations";

const ITEMS_PER_PAGE = 10;

const Laporan = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState("sebelum"); // Track which condition is selected (sebelum/setelah)

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchReportData();
        setData(fetchedData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  // Open modal with selected item and its corresponding condition (sebelum or setelah)
  const openModal = (item) => {
    setSelectedItem(item); // Pass the entire item (including 'sebelum' and 'setelah') to the modal
    setIsModalOpen(true); // Open the modal
  };

  const columns = getReportColumns(openModal); // Pass openModal to handle the modal opening

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="overflow-hidden">
        <TableHeader title="Report Changes in Room Conditions" />
        <Table
          columns={columns}
          data={currentData.map((item, index) => ({
            ...item,
            index: indexOfFirstItem + index + 1,
          }))}
          emptyMessage="No laporan tersedia"
        />
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        value={selectedItem} // Pass the selected 'sebelum' or 'setelah' data
        condition={selectedCondition} // Pass the condition (sebelum/setelah) to the modal
      />
    </div>
  );
};

export default Laporan;
