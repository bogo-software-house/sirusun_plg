import React, { useState, useEffect } from "react";
import PenghuniTable from "../../components/residents/ResidentsTable";
import AddOccupantModal from "../../components/residents/AddResidentsModal";
import apiService from "../../services/apiService";
import TableHeader from "../../components/table/TableHeader";
import { PlusIcon } from "@heroicons/react/24/outline";

function Penghuni() {
  const [occupants, setOccupants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [role, setRole] = useState(""); // Store user role

  // Fetch role from localStorage or Context (adjust according to your auth context)
  useEffect(() => {
    const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
    setRole(userRole); // Set role
  }, []);

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
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600"
          onClick={fetchOccupants}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Only show 'Tambah Data' button if user is admin */}
      {role === "admin" && (
        <TableHeader
          title="Daftar Penghuni"
          actions={[
            {
              label: "Tambah",
              icon: <PlusIcon class="h-6 w-6 text-white" />,
              onClick: () => setIsModalOpen(true),
            },
          ]}
        />
      )}

      <PenghuniTable
        occupants={occupants}
        role={role} // Pass role to the table for conditionally showing actions
      />

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
