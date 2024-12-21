// Fungsi utilitas untuk mengubah angka bulan menjadi nama bulan
const getNamaBulan = (bulan) => {
  const bulanIndonesia = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return bulanIndonesia[bulan - 1] || "-"; // Kurangi 1 karena array dimulai dari 0
};

export const getReportColumns = (openModal) => [
  { key: "index", label: "No" },
  { key: "rusun", label: "Rusun" },
  { key: "blok", label: "Blok" },
  { key: "lantai", label: "Lantai" },
  { key: "unit_number", label: "Kamar" },
  {
    key: "periode",
    label: "Periode",
    render: (value, item) => {
      const namaBulan = getNamaBulan(item.bulan);
      return `${namaBulan} ${item.tahun}`; // Format: Nama Bulan Tahun
    },
  },
  {
    key: "action",
    label: "Aksi",
    render: (value, item) => (
      <button onClick={() => openModal(item, "sebelum", "setelah")} className="bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        See...
      </button>
    ),
  },
];
