import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import PaginationControls from "../../utils/paginations/Paginations";

const ITEMS_PER_PAGE = 5;

const Laporan = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("https://api.sirusun.com/api/suggestion");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();

        // Pemrosesan data untuk tabel
        const fetchedData = result.data.map((item, index) => ({
          key: item.custom_id || `row-${index}`,
          index: index + 1, // Nomor urut
          nama: item.contact?.nama || "-",
          email: item.contact?.email || "-",
          description: item.description || "-",
        }));
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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns = [
    { key: "index", label: "No" },
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "description", label: "Deskripsi" },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Laporan Saran dan Keluhan</h1>
      <Table
        columns={columns}
        data={currentData}
        emptyMessage="Tidak ada data tersedia."
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Laporan;
