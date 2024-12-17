import React, { useState, useEffect } from "react";
import TableHeader from "../../components/table/TableHeader";

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
        console.log("API Response:", result); // Debugging API response

        // Pemrosesan data untuk tabel
        const fetchedData = result.data.map((item, index) => ({
          key: item.custom_id || `row-${index}`,
          index: index + 1, // Nomor urut
          nama: item.contact?.nama || "-", // Nama dari contact
          email: item.contact?.email || "-", // Email dari contact
          description: item.description || "-", // Deskripsi
        }));
        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching data:", err);
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

  const columns = [
    { name: "index", label: "No" },
    { name: "nama", label: "Nama" },
    { name: "email", label: "Email" },
    { name: "description", label: "Deskripsi" },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="overflow-hidden text-black">
        <TableHeader title="Laporan Saran dan Keluhan" />
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.name}
                  className="px-4 py-2 border border-gray-300 text-left"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr key={row.key}>
                  {columns.map((column) => (
                    <td
                      key={column.name}
                      className="px-4 py-2 border border-gray-300"
                    >
                      {row[column.name]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 border border-gray-300"
                >
                  Tidak ada laporan tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`page-${i + 1}`}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Laporan;
