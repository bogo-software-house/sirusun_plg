import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import axios from "axios";
import Modal from "react-modal";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

Modal.setAppElement("#root");
const conditionOptions = {
  Baik: "damage_rooms_good_custom_id",
  "Rusak Ringan": "damage_rooms_minor_custom_id",
  "Rusak Sedang": "damage_rooms_severe_custom_id",
  "Rusak Berat": "damage_rooms_very_severe_custom_id",
};

const lantaiOptions = {
  Baik: "IDR001",
  "Rusak Ringan": "IDR002",
  "Rusak Sedang": "IDR003",
  "Rusak Berat": "IDR004",
};

const kusenOptions = {
  Baik: "IDR005",
  "Rusak Ringan": "IDR006",
  "Rusak Sedang": "IDR007",
  "Rusak Berat": "IDR008",
};

const pintuOptions = {
  Baik: "IDR009",
  "Rusak Ringan": "IDR010",
  "Rusak Sedang": "IDR011",
  "Rusak Berat": "IDR012",
};

const jendelaOptions = {
  Baik: "IDR013",
  "Rusak Ringan": "IDR014",
  "Rusak Sedang": "IDR015",
  "Rusak Berat": "IDR016",
};

const flatfondOptions = {
  Baik: "IDR017",
  "Rusak Ringan": "IDR018",
  "Rusak Sedang": "IDR019",
  "Rusak Berat": "IDR020",
};

const dindingOptions = {
  Baik: "IDR021",
  "Rusak Ringan": "IDR022",
  "Rusak Sedang": "IDR023",
  "Rusak Berat": "IDR024",
};

const instalasiListrikOptions = {
  Baik: "IDR025",
  "Rusak Ringan": "IDR026",
  "Rusak Sedang": "IDR027",
  "Rusak Berat": "IDR028",
};

const instalasiAirOptions = {
  Baik: "IDR029",
  "Rusak Ringan": "IDR030",
  "Rusak Sedang": "IDR031",
  "Rusak Berat": "IDR032",
};
Modal.setAppElement("#root");

function Bangunan() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null); // Room yang dipilih untuk update
  const [formValues, setFormValues] = useState({}); // Nilai formulir
  const [conditionOptions, setConditionOptions] = useState([]); // Opsi kondisi default array kosong
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Fetch data from API with pagination
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/rooms?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.data); // Assign the data from the response to rooms
        setTotalPages(data.meta.last_page); // Set the total pages from the response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]); // Trigger fetch when the page changes

  // Fetch condition options from API
  // Fetch condition options from API
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/conditions`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Conditions:", data);
        // Mengakses array kondisi dari properti data.data
        setConditionOptions(data.data?.data || []);
      })
      .catch((error) => console.error("Error fetching condition options:", error));
  }, []);

  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((acc, part) => (acc ? acc[part] : ""), obj);
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    const initialValues = {};
    Object.entries(room.kondisi).forEach(([key, value]) => {
      if (key.includes("damage_rooms")) {
        initialValues[key] = value;
      }
    });
    setFormValues(initialValues);
  };

  const handleUpdate = async () => {
    setIsConfirmationModalOpen(true); // Tampilkan modal konfirmasi
  };

  const confirmUpdate = async () => {
    try {
      const updatedData = { ...formValues, _method: "PUT" };

      const response = await fetch(`http://127.0.0.1:8000/api/rooms/${selectedRoom.custom_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Update failed: ${errorDetails}`);
      }

      const updatedRoom = await response.json();
      setRooms((prevRooms) => prevRooms.map((room) => (room.custom_id === selectedRoom.custom_id ? updatedRoom.data : room)));
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
      setCurrentPage(newPage);
    }
  };

  const renderDropdown = (key, options) => (
    <select className="form-control" value={formValues[key] || ""} onChange={(e) => handleInputChange(key, e.target.value)}>
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

  const columns = [
    { key: "index", label: "No" },
    { key: "rusun", label: "Rusun" },
    { key: "blok", label: "Blok" },
    { key: "lantai", label: "Lantai" },
    { key: "unit_number", label: "Kamar" },
    { key: "status", label: "Status" },

    // Mengakses ID custom dari objek kondisi yang nested secara lengkap
    {
      key: "kondisi.lantai",
      label: "Kondisi Lantai",
      render: (value, row) => getNestedValue(row, "kondisi.lantai"),
    },
    {
      key: "kondisi.kusen",
      label: "Kondisi Kusen",
      render: (value, row) => getNestedValue(row, "kondisi.kusen"),
    },
    {
      key: "kondisi.pintu",
      label: "Kondisi Pintu",
      render: (value, row) => getNestedValue(row, "kondisi.pintu"),
    },
    {
      key: "kondisi.jendela",
      label: "Kondisi Jendela",
      render: (value, row) => getNestedValue(row, "kondisi.jendela"),
    },
    {
      key: "kondisi.fn_flatfond",
      label: "Kondisi Flatfond",
      render: (value, row) => getNestedValue(row, "kondisi.fn_flatfond"),
    },
    {
      key: "kondisi.fn_dinding",
      label: "Kondisi Dinding",
      render: (value, row) => getNestedValue(row, "kondisi.fn_dinding"),
    },
    {
      key: "kondisi.instalasi_air",
      label: "Kondisi Instalasi Air",
      render: (value, row) => getNestedValue(row, "kondisi.instalasi_air"),
    },
    {
      key: "kondisi.instalasi_listrik",
      label: "Kondisi Instalasi Listrik",
      render: (value, row) => getNestedValue(row, "kondisi.instalasi_listrik"),
    },

    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
        <button onClick={() => handleEditClick(row)} className="btn btn-sm btn-edit">
          Edit
        </button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Render ConfirmationModal jika modal konfirmasi dibuka */}
      {isConfirmationModalOpen && <ConfirmationModal onConfirm={confirmUpdate} onCancel={cancelUpdate} />}

      <TableHeader title="Kondisi Bangunan dan Unit" actions={[{ label: "Tambah Data" }]} />

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <Table
          columns={columns}
          data={rooms.map((room, index) => ({
            ...room,
            index: (currentPage - 1) * 10 + (index + 1),
          }))}
          emptyMessage="No rooms data available"
        />
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
          Prev
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
          Next
        </button>
        <span className="px-4 py-2 text-black">{`Page ${currentPage} of ${totalPages}`}</span>
      </div>

      {/* Update Popup */}
      {selectedRoom && (
        <Modal isOpen={selectedRoom !== null} onRequestClose={() => setSelectedRoom(null)} ariaHideApp={false}>
          <h3>Update Room {selectedRoom.unit_number}</h3>

          {/* Dropdown untuk Properti Kondisi */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-10 text-black">
            {[
              { label: "Kondisi Lantai", id: "damage_rooms_lantai_custom_id", options: lantaiOptions },
              { label: "Kondisi Kusen", id: "damage_rooms_kusen_custom_id", options: kusenOptions },
              { label: "Kondisi Pintu", id: "damage_rooms_pintu_custom_id", options: pintuOptions },
              { label: "Kondisi Jendela", id: "damage_rooms_jendela_custom_id", options: jendelaOptions },
              { label: "Kondisi Flatfond", id: "damage_rooms_fn_flatfond_custom_id", options: flatfondOptions },
              { label: "Kondisi Dinding", id: "damage_rooms_fn_dinding_custom_id", options: dindingOptions },
              { label: "Kondisi Instalasi Air", id: "damage_rooms_instalasi_air_custom_id", options: instalasiAirOptions },
              { label: "Kondisi Instalasi Listrik", id: "damage_rooms_instalasi_listrik_custom_id", options: instalasiListrikOptions },
            ].map(({ label, id, options }) => (
              <div key={id} className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">{label}</label>
                {renderDropdown(id, options)}
              </div>
            ))}

            <div className="mt-6 flex justify-end gap-4">
              <button className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow" onClick={() => setSelectedRoom(null)}>
                Close
              </button>
              {/* Mengganti Save Changes untuk konfirmasi */}
              <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow" onClick={handleUpdateClick}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bangunan;
