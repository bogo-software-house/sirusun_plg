import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import { fetchReportData } from "../../api/Report";
import { getReportColumns } from "../../components/columns/ReportColumns";

const ITEMS_PER_PAGE = 5;

const Laporan = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchReportData();
        setData(fetchedData);
      } catch (err) {
        console.error(err);
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
  const columns = getReportColumns();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="overflow-hidden">
        <TableHeader title="Laporan Perubahan Kondisi" />
        <Table
          columns={columns}
          data={currentData.map((item, index) => ({
            ...item,
            index: indexOfFirstItem + index + 1,
          }))}
          emptyMessage="No laporan tersedia"
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 rounded-lg font-semibold ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Laporan;
