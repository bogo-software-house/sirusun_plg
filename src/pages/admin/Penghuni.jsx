// penghuni.js
import React, { useState, useEffect } from "react";
import PenghuniTable from "../../components/residents/ResidentsTable";
import AddOccupantModal from "../../components/residents/AddResidentsModal";
import apiService from "../../services/apiService";
import TableHeader from "../../components/table/TableHeader";

function Penghuni() {
  const [occupants, setOccupants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchOccupants = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await apiService.getOccupants();
      setOccupants(
        data.map((item) => ({
          customId: item.custom_id,
          nik: item.nik,
          name: item.data_user.nama,
          phone: item.data_user.no_telp,
          email: item.data_user.email,
          rusun: item.rusun,
          block: item.kamar.blog,
          floor: item.kamar.lantai,
          roomNumber: item.kamar.no,
        }))
      );
    } catch (error) {
      console.error("Error fetching occupants:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOccupants();
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (hasError) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>Terjadi kesalahan saat memuat data. Silakan coba lagi.</p>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600" onClick={fetchOccupants}>
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <TableHeader title="Daftar Penghuni" actions={[{ label: "Tambah Data", onClick: () => setIsModalOpen(true) }]} />

      <PenghuniTable occupants={occupants} />

      {isModalOpen && (
        <AddOccupantModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchOccupants();
          }}
        />
      )}
    </div>
  );
}

export default Penghuni;
