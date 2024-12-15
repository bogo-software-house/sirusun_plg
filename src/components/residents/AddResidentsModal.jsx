import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationModal from "../modal/NotificationModal";
import ConfirmationModal from "../modal/ConfirmationModal"; // Import your confirmation modal component

function AddOccupantModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({ nik: "" });
  const [rusuns, setRusuns] = useState([
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
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal visibility

  useEffect(() => {
    if (selectedRusun) {
      const fetchBlocks = async () => {
        try {
          const response = await axios.get(
            `https://api.sirusun.com/api/pengambilan-data-kamar/${selectedRusun}`
          );
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
        }
      };
      fetchBlocks();
    }
  }, [selectedRusun]);

  useEffect(() => {
    if (selectedBlock) {
      const selectedBlockData = blocks.find(
        (block) => block.name === selectedBlock
      );
      setFloors(selectedBlockData?.floors || []);
    }
  }, [selectedBlock, blocks]);

  useEffect(() => {
    if (selectedFloor !== null) {
      const selectedFloorData = floors.find(
        (floor) => floor.number === selectedFloor
      );
      setRooms(selectedFloorData?.rooms || []);
    }
  }, [selectedFloor, floors]);

  const handleSubmit = async () => {
    if (!formData.nik || !selectedRoom) {
      setNotification({
        message: "Harap lengkapi semua data sebelum menyimpan.",
        type: "error",
        isVisible: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://api.sirusun.com/api/transactions-rooms",
        {
          nik: formData.nik,
          rooms_custom_id: selectedRoom.customId,
        }
      );

      if (response.data.success) {
        setNotification({
          message: response.data.message || "Data berhasil disimpan.",
          type: "success",
          isVisible: true,
        });
        onSuccess();
      } else {
        setNotification({
          message:
            response.data.message || "Terjadi kesalahan saat menyimpan data.",
          type: "error",
          isVisible: true,
        });
      }
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      setNotification({
        message: "Data tidak Valid",
        type: "error",
        isVisible: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const handleConfirmationClose = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Tambah Penghuni</h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Masukan NIK
            </label>
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
            <button
              key={rusun.id}
              className={`p-2 border rounded-md ${
                selectedRusun === rusun.id
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedRusun(rusun.id)}
            >
              {rusun.name}
            </button>
          ))}
        </div>

        {blocks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Pilih Blok</h3>
            <div className="flex gap-4 mt-2">
              {blocks.map((block) => (
                <button
                  key={block.name}
                  className={`p-2 border rounded-md ${
                    selectedBlock === block.name
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedBlock(block.name)}
                >
                  {block.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {floors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Pilih Lantai</h3>
            <div className="flex gap-4 mt-2">
              {floors.map((floor) => (
                <button
                  key={floor.number}
                  className={`p-2 border rounded-md ${
                    selectedFloor === floor.number
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedFloor(floor.number)}
                >
                  Lantai {floor.number}
                </button>
              ))}
            </div>
          </div>
        )}

        {rooms.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Pilih Kamar</h3>
            <div
              className="flex flex-wrap gap-4 mt-2 p-4 border rounded-md bg-gray-50"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {rooms.map((room) => (
                <button
                  key={room.number}
                  className={`p-2 border rounded-md ${
                    room.available
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => setSelectedRoom(room)}
                  disabled={!room.available}
                >
                  {room.number}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedRoom && (
          <div className="mt-4 p-4 bg-indigo-500 text-white rounded-md">
            <p>
              Room Custom ID: {selectedRoom.customId || "Tidak ada custom ID"}
            </p>{" "}
            {/* Tampilkan customId */}
            <p>Rusun: {selectedRusun || "Rusun tidak dipilih"}</p>
            <p>Blok: {selectedBlock || "Blok tidak dipilih"}</p>
            <p>Lantai: {selectedFloor || "Lantai tidak dipilih"}</p>
            <p>Kamar: {selectedRoom.number || "Kamar tidak dipilih"}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
            onClick={() => setShowConfirmation(true)}
          >
            Simpan
          </button>
        </div>
      </div>
      {/* Show NotificationModal if visible */}
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={() => handleConfirmationClose(true)}
          onCancel={() => handleConfirmationClose(false)}
        />
      )}
    </div>
  );
}

export default AddOccupantModal;
