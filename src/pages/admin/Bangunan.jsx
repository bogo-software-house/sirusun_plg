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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    rusun: "",
    blok: "",
    lantai: "",
    unit_number: "",
  });

  // Fetch data from API with pagination
  useEffect(() => {
    const query = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        query.append(key, filter[key]);
      }
    });

    fetch(`http://127.0.0.1:8000/api/kamar/filter?${query.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched rooms:", data); // Add logging here
        setRooms(data?.data || []); // Make sure the data is available and set it
        setTotalPages(data?.meta?.last_page || 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage, filter]);

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
      setCurrentPage(newPage);
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
        <button
          onClick={() => handleEditClick(row)}
          className="btn btn-sm btn-edit bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit
        </button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Render ConfirmationModal jika modal konfirmasi dibuka */}
      {isConfirmationModalOpen && (
        <ConfirmationModal onConfirm={confirmUpdate} onCancel={cancelUpdate} />
      )}

      <TableHeader
        title="Kondisi Bangunan dan Unit"
        actions={[
          { label: "Tambah Data" },
          { label: "Filter", onClick: () => setIsFilterModalOpen(true) },
        ]}
      />
      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        contentLabel="Filter Rooms"
        className="modal-container"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="modal-content bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative z-10">
          <h3 className="text-xl font-semibold mb-4">Filter Rooms</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Rusun
              </label>
              <input
                type="text"
                value={filter.rusun}
                onChange={(e) => handleFilterChange("rusun", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Blok
              </label>
              <input
                type="text"
                value={filter.blok}
                onChange={(e) => handleFilterChange("blok", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Lantai
              </label>
              <input
                type="text"
                value={filter.lantai}
                onChange={(e) => handleFilterChange("lantai", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Kamar (Unit Number)
              </label>
              <input
                type="text"
                value={filter.unit_number}
                onChange={(e) =>
                  handleFilterChange("unit_number", e.target.value)
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
          </form>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            >
              Apply Filters
            </button>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <Table
          columns={columns}
          data={rooms?.map((room, index) => ({
            ...room,
            index: (currentPage - 1) * 10 + (index + 1),
          }))}
          emptyMessage="No rooms data available"
        />
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-edit bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </button>
        <span className="px-4 py-2 text-black">{`Page ${currentPage} of ${totalPages}`}</span>
      </div>

      {/* Update Popup */}
      {selectedRoom && (
        <Modal
          isOpen={selectedRoom !== null}
          onRequestClose={() => setSelectedRoom(null)}
          ariaHideApp={false}
        >
          <div className="bg-transparent rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-10 text-black">
            <h3 className="text-xl font-bold text-center mb-6">
              Update Room {selectedRoom.unit_number}
            </h3>

            {/* Dropdown untuk Properti Kondisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Kondisi Lantai",
                  id: "damage_rooms_lantai_custom_id",
                  options: lantaiOptions,
                },
                {
                  label: "Kondisi Kusen",
                  id: "damage_rooms_kusen_custom_id",
                  options: kusenOptions,
                },
                {
                  label: "Kondisi Pintu",
                  id: "damage_rooms_pintu_custom_id",
                  options: pintuOptions,
                },
                {
                  label: "Kondisi Jendela",
                  id: "damage_rooms_jendela_custom_id",
                  options: jendelaOptions,
                },
                {
                  label: "Kondisi Flatfond",
                  id: "damage_rooms_fn_flatfond_custom_id",
                  options: flatfondOptions,
                },
                {
                  label: "Kondisi Dinding",
                  id: "damage_rooms_fn_dinding_custom_id",
                  options: dindingOptions,
                },
                {
                  label: "Kondisi Instalasi Air",
                  id: "damage_rooms_instalasi_air_custom_id",
                  options: instalasiAirOptions,
                },
                {
                  label: "Kondisi Instalasi Listrik",
                  id: "damage_rooms_instalasi_listrik_custom_id",
                  options: instalasiListrikOptions,
                },
              ].map(({ label, id, options }) => (
                <div key={id} className="flex flex-col items-center">
                  <label className="block text-center text-gray-700 font-medium mb-2">
                    {label}
                  </label>
                  <select
                    className="w-3/4 md:w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formValues[id] || ""}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                  >
                    <option value="" disabled>
                      Pilih {label}
                    </option>
                    {Object.entries(options).map(([label, value]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-600 transition"
                onClick={() => setSelectedRoom(null)}
              >
                Close
              </button>
              <button
                className="btn btn-sm btn-edit bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleUpdateClick}
              >
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
