import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationModal from "../modal/NotificationModal";
import ConfirmationModal from "../modal/ConfirmationModal"; // Import your confirmation modal component

function AddOccupantModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({ nik: "" });
  const [rusuns] = useState([
    { id: "IRN002", name: "Kasnariansyah" },
    { id: "IRN001", name: "Kertapati" },
  ]);
  const [selectedRusun, setSelectedRusun] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal visibility

  const resetForm = () => {
    setFormData({ nik: "" });
    setSelectedRusun(null);
    setSelectedBlock(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setBlocks([]);
    setFloors([]);
    setRooms([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (selectedRusun) {
      const fetchBlocks = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://api.sirusun.com/api/pengambilan-data-kamar/${selectedRusun}`);
          const bloksData = response.data.bloks || [];
          setBlocks(
            bloksData.map((blok) => ({
              name: blok.blok,
              floors: blok.lantai.map((lantai) => ({
                number: lantai.lantai,
                rooms: lantai.kamar.map((kamar) => ({
                  number: kamar.no_unit,
                  available: kamar.status !== "Terisi",
                  customId: kamar.custom_id,
                })),
              })),
            }))
          );
        } catch (error) {
          console.error("Gagal mengambil data blok:", error);
          setNotification({
            message: "Gagal mengambil data blok. Silakan coba lagi nanti.",
            type: "Error",
            isVisible: true,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlocks();
    }
  }, [selectedRusun]);

  useEffect(() => {
    if (selectedBlock) {
      const selectedBlockData = blocks.find((block) => block.name === selectedBlock);
      setFloors(selectedBlockData?.floors || []);
    }
  }, [selectedBlock, blocks]);

  useEffect(() => {
    if (selectedFloor !== null) {
      const selectedFloorData = floors.find((floor) => floor.number === selectedFloor);
      setRooms(selectedFloorData?.rooms || []);
    }
  }, [selectedFloor, floors]);

  const handleSubmit = async () => {
    if (!formData.nik || !selectedRoom) {
      setNotification({
        message: "Harap lengkapi semua data sebelum menyimpan.",
        type: "Error",
        isVisible: true,
      });
      return;
    }

    if (!/^\d{16}$/.test(formData.nik)) {
      setNotification({
        message: "NIK harus berupa 16 digit angka.",
        type: "Error",
        isVisible: true,
      });
      return;
    }

    try {
      const response = await axios.post("https://api.sirusun.com/api/transactions-rooms", {
        nik: formData.nik,
        rooms_custom_id: selectedRoom.customId,
      });

      if (response.data?.data) {
        setNotification({
          message: "Data berhasil disimpan.",
          type: "Success",
          isVisible: true,
        });

        setTimeout(() => {
          setNotification({ message: "", type: "", isVisible: false });
          onSuccess();
          handleClose();
        }, 2000);
      } else {
        setNotification({
          message: "Gagal menyimpan data.",
          type: "Error",
          isVisible: true,
        });
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Terjadi kesalahan pada server.",
        type: "Error",
        isVisible: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeNotification = () => {
    setNotification({ message: "", type: "", isVisible: false });
  };

  const handleConfirmationClose = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      handleSubmit();
    }
  };

  const SelectButton = ({ label, isSelected, onClick, isDisabled }) => (
    <button
      className={`p-2 border rounded-md ${isSelected ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleClose}>
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Tambah Penghuni</h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Masukan NIK</label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-700">Pilih Rusun</h3>
        <div className="flex gap-4 mt-2">
          {rusuns.map((rusun) => (
            <SelectButton key={rusun.id} label={rusun.name} isSelected={selectedRusun === rusun.id} onClick={() => setSelectedRusun(rusun.id)} />
          ))}
        </div>

        {isLoading && <p className="text-gray-500 mt-4">Loading data...</p>}

        {!isLoading && blocks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Pilih Blok</h3>
            <div className="flex gap-4 mt-2">
              {blocks.map((block) => (
                <SelectButton key={block.name} label={block.name} isSelected={selectedBlock === block.name} onClick={() => setSelectedBlock(block.name)} />
              ))}
            </div>
          </div>
        )}

        {floors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Pilih Lantai</h3>
            <div className="flex gap-4 mt-2">
              {floors.map((floor) => (
                <SelectButton key={floor.number} label={`Lantai ${floor.number}`} isSelected={selectedFloor === floor.number} onClick={() => setSelectedFloor(floor.number)} />
              ))}
            </div>
          </div>
        )}

        {rooms.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Pilih Kamar</h3>
            <div className="flex flex-wrap gap-4 mt-2 p-4 border rounded-md bg-gray-50" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {rooms.map((room) => (
                <SelectButton key={room.number} label={room.number} isSelected={selectedRoom?.number === room.number} onClick={() => setSelectedRoom(room)} isDisabled={!room.available} />
              ))}
            </div>
          </div>
        )}

        {selectedRoom && (
          <div className="mt-4 p-4 bg-indigo-500 text-white rounded-md">
            <p>Room Custom ID: {selectedRoom.customId || "Tidak ada custom ID"}</p>
            <p>Rusun: {selectedRusun || "Rusun tidak dipilih"}</p>
            <p>Blok: {selectedBlock || "Blok tidak dipilih"}</p>
            <p>Lantai: {selectedFloor || "Lantai tidak dipilih"}</p>
            <p>Kamar: {selectedRoom.number || "Kamar tidak dipilih"}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400" onClick={handleClose}>
            Batal
          </button>
          <button className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600" onClick={() => setShowConfirmation(true)}>
            Simpan
          </button>
        </div>
      </div>
      {/* Show NotificationModal if visible */}
      {notification.isVisible && <NotificationModal message={notification.message} type={notification.type} onClose={closeNotification} />}
      {showConfirmation && <ConfirmationModal onConfirm={() => handleConfirmationClose(true)} onCancel={() => handleConfirmationClose(false)} />}
    </div>
  );
}

export default AddOccupantModal;
