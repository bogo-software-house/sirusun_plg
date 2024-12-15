import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";

const Laporan = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mengambil data dari API backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/report-kamar");
        const result = await response.json();

        if (result.success) {
          setData(
            result.data.flatMap((item) =>
              item.units.map((unit) => ({
                ...unit,
                rusun: item.rusun,
                blok: item.blok,
                lantai: item.lantai,
              }))
            )
          );
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const columns = [
    { key: "index", label: "No" },
    { key: "rusun", label: "Rusun" },
    { key: "blok", label: "Blok" },
    { key: "lantai", label: "Lantai" },
    { key: "unit_number", label: "Kamar" },
    { key: "bulan", label: "Bulan" },
    { key: "tahun", label: "Tahun" },
    {
      key: "sebelum",
      label: "Sebelum",
      render: (value) => (
        <div className="grid grid-cols-2 gap-4 mt-2 w-full text-black">
          {[
            { label: "Lantai", value: value?.material?.lantai },
            { label: "Kusen", value: value?.material?.kusen },
            { label: "Pintu", value: value?.material?.pintu },
            { label: "Jendela", value: value?.material?.jendela },
            { label: "Plafon", value: value?.material?.flatfond },
            { label: "Dinding", value: value?.material?.dinding },
            { label: "Air", value: value?.instalasi?.instalasi_air },
            { label: "Listrik", value: value?.instalasi?.instalasi_listrik },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg shadow border border-gray-200 w-full p-4 flex flex-col items-center">
              <p className="text-gray-600 font-semibold">{item.label}</p>
              <p className="text-gray-800 mt-1">{item.value || "-"}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "setelah",
      label: "Setelah",
      render: (value) => (
        <div className="grid grid-cols-2 gap-4 mt-2 w-full text-black">
          {[
            { label: "Lantai", value: value?.material?.lantai },
            { label: "Kusen", value: value?.material?.kusen },
            { label: "Pintu", value: value?.material?.pintu },
            { label: "Jendela", value: value?.material?.jendela },
            { label: "Plafon", value: value?.material?.flatfond },
            { label: "Dinding", value: value?.material?.dinding },
            { label: "Air", value: value?.instalasi?.instalasi_air },
            { label: "Listrik", value: value?.instalasi?.instalasi_listrik },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg shadow border border-gray-200 w-full p-4 flex flex-col items-center">
              <p className="text-gray-600 font-semibold">{item.label}</p>
              <p className="text-gray-800 mt-1">{item.value || "-"}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {/* Komponen Table */}
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
