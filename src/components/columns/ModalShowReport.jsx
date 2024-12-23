import React from "react";
import { getFormattedPeriode } from "./ReportColumns"; // Assuming this function exists to format the date

// Fungsi utilitas untuk mengubah angka bulan menjadi nama bulan
const Modal = ({ isOpen, onClose, value }) => {
  if (!isOpen) return null;

  const items = [
    {
      label: "Lantai",
      sebelum: value?.sebelum?.material?.lantai,
      setelah: value?.setelah?.material?.lantai,
    },
    {
      label: "Kusen",
      sebelum: value?.sebelum?.material?.kusen,
      setelah: value?.setelah?.material?.kusen,
    },
    {
      label: "Pintu",
      sebelum: value?.sebelum?.material?.pintu,
      setelah: value?.setelah?.material?.pintu,
    },
    {
      label: "Jendela",
      sebelum: value?.sebelum?.material?.jendela,
      setelah: value?.setelah?.material?.jendela,
    },
    {
      label: "Plafon",
      sebelum: value?.sebelum?.material?.flatfond,
      setelah: value?.setelah?.material?.flatfond,
    },
    {
      label: "Dinding",
      sebelum: value?.sebelum?.material?.dinding,
      setelah: value?.setelah?.material?.dinding,
    },
    {
      label: "Air",
      sebelum: value?.sebelum?.instalasi?.instalasi_air,
      setelah: value?.setelah?.instalasi?.instalasi_air,
    },
    {
      label: "Listrik",
      sebelum: value?.sebelum?.instalasi?.instalasi_listrik,
      setelah: value?.setelah?.instalasi?.instalasi_listrik,
    },
  ];

  const renderItem = (label, sebelumValue, setelahValue) => {
    if (setelahValue === undefined || setelahValue === null || setelahValue === sebelumValue) {
      // Tidak ada perubahan
      return (
        <div className="grid grid-cols-3 items-start gap-2 mb-4">
          <strong className="col-span-1 text-gray-800">{label}</strong>
          <span className="col-span-2 text-gray-500 italic">Tidak ada perubahan</span>
        </div>
      );
    }

    // Format the period if there's a change

    // Ada perubahan
    return (
      <div className="grid grid-cols-3 items-start gap-2 mb-4">
        <strong className="col-span-1 text-gray-800">{label}</strong>
        <div className="col-span-2">
          <div className="text-gray-500 line-through">Sebelum: {sebelumValue || "-"}</div>
          <div className="text-blue-600 font-medium">Setelah: {setelahValue || "-"}</div>
        
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Tombol Tutup */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl focus:outline-none" aria-label="Close">
          &#x2715;
        </button>

        {/* Judul Modal */}
        <h3 className="text-2xl font-bold mb-12 text-gray-900">History Change</h3>

        {/* Konten */}
        <div className="space-y-4">{items.map((item) => renderItem(item.label, item.sebelum, item.setelah))}</div>

        {/* Informasi Periode */}
        <div className="mt-6 text-sm text-gray-600 italic">
          <p className="me-2 text-black">Update at:</p>
          {value?.tanggal && value?.bulan && value?.tahun && value?.jam ? (
            <p className="text-black">{getFormattedPeriode(value?.tanggal, value?.bulan, value?.tahun, value?.jam)}</p>
          ) : (
            <p className="text-red-600">Data tidak lengkap</p>
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 text-center">
          <button onClick={onClose} className="bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none px-6 py-2 rounded-md">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
