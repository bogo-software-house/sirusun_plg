import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import axios from "axios";

import ConfirmationModal from "../../components/modal/ConfirmationModal";
import UpdateRoomModal from "../../utils/update/UpdateRoomCondition";
import PaginationControls from "../../utils/paginations/Paginations";
import RoomFilterModal from "../../components/modal/filter/RoomsFilter";
import {
  Roomcolumns,
  getNestedValue,
} from "../../components/columns/RoomColumns";

function Bangunan() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null); // Room yang dipilih untuk update
  const [formValues, setFormValues] = useState({}); // Nilai formulir
  const [conditionOptions, setConditionOptions] = useState([]); // Opsi kondisi default array kosong
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    rusun: "",
    blok: "",
    lantai: "",
    unit_number: "",
  });

  // Fetch data from API with pagination
  // Ambil data dari API dengan paginasi
  useEffect(() => {
    const query = new URLSearchParams();

    // Menambahkan parameter filter jika ada
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        query.append(key, filter[key]);
      }
    });

    // Ambil data untuk halaman yang sedang aktif
    fetch(
      `https://api.sirusun.com/api/kamar/filter?${query.toString()}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data kamar yang diambil:", data);
        setRooms(data?.data || []); // Menyimpan data kamar
        setTotalPages(data?.meta?.last_page || 1); // Menyimpan total halaman untuk paginasi
        setLoading(false); // Menandakan bahwa data sudah selesai diambil
      })
      .catch((error) => {
        console.error("Error saat mengambil data:", error);
        setLoading(false); // Menghentikan loading saat terjadi error
      });
  }, [currentPage, filter]); // Hook ini akan dipanggil setiap kali `currentPage` atau `filter` berubah

  // Fetch condition options from API
  // Fetch condition options from API
  useEffect(() => {
    fetch(`https://api.sirusun.com/api/conditions`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Conditions:", data);
        // Mengakses array kondisi dari properti data.data
        setConditionOptions(data.data?.data || []);
      })
      .catch((error) =>
        console.error("Error fetching condition options:", error)
      );
  }, []);

  // Handle input filter change
  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    const initialValues = Object.entries(room.kondisi).reduce(
      (acc, [key, value]) => {
        if (key.includes("damage_rooms")) acc[key] = value;
        return acc;
      },
      {}
    );
    setFormValues(initialValues);
  };

  const confirmUpdate = async () => {
    try {
      const updatedData = { ...formValues, _method: "PUT" };

      const response = await fetch(
        `https://api.sirusun.com/api/rooms/${selectedRoom.custom_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Update failed: ${errorDetails}`);
      }

      const updatedRoom = await response.json();
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.custom_id === selectedRoom.custom_id ? updatedRoom.data : room
        )
      );
      setSelectedRoom(null);
      setIsConfirmationModalOpen(false);
    } catch (err) {
      console.error("Update Error:", err.message);
      setIsConfirmationModalOpen(false);
    }
  };
  const cancelUpdate = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleUpdateClick = () => {
    setIsConfirmationModalOpen(true);
  };

  // Mengatur fungsi pagination untuk mengubah halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Memperbarui nomor halaman
    }
  };

  const renderDropdown = (key, options) => (
    <select
      className="form-control"
      value={formValues[key] || ""}
      onChange={(e) => handleInputChange(key, e.target.value)}
    >
      {Object.entries(options).map(([label, id]) => (
        <option key={label} value={id}>
          {label}
        </option>
      ))}
    </select>
  );

  // Mengubah state React saat dropdown dipilih
  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        {/* Render ConfirmationModal jika modal konfirmasi dibuka */}
        {isConfirmationModalOpen && (
          <ConfirmationModal
            onConfirm={confirmUpdate}
            onCancel={cancelUpdate}
          />
        )}
        <TableHeader
          title="Kondisi Bangunan dan Unit"
          actions={[
            { label: "Filter", onClick: () => setIsFilterModalOpen(true) },
          ]}
        />
        <RoomFilterModal
          isOpen={isFilterModalOpen}
          onRequestClose={() => setIsFilterModalOpen(false)}
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
        // Inside Bangunan.js
        <Table
          columns={Roomcolumns}
          data={rooms?.map((room, index) => ({
            ...room,
            index: (currentPage - 1) * 10 + (index + 1) + ".", // Correct index calculation
          }))}
          emptyMessage="No rooms data available"
          handleEditClick={handleEditClick} // Ensure this is passed correctly
        />
      </div>
      {/* Pagination */}
      // Pada komponen PaginationControls
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {/* Update Kondisi Room */}
      {selectedRoom && (
        <UpdateRoomModal
          selectedRoom={selectedRoom}
          formValues={formValues}
          setFormValues={setFormValues}
          setSelectedRoom={setSelectedRoom}
          handleInputChange={handleInputChange}
          handleUpdateClick={handleUpdateClick}
        />
      )}
    </>
  );
}

export default Bangunan;
