// Fungsi utilitas untuk mengubah angka bulan menjadi nama bulan
const getNamaBulan = (bulan) => {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return bulanIndonesia[bulan - 1] || "-"; // Kurangi 1 karena array dimulai dari 0
};
// Fungsi untuk memformat periode (tanggal, bulan, tahun)
export const getFormattedPeriode = (tanggal, bulan, tahun, jam) => {
  const namaBulan = getNamaBulan(bulan);
  return `${tanggal} ${namaBulan} ${tahun} ${jam || ""}`; // Menambahkan jam jika ada
};
export const getReportColumns = (openModal) => [
  { key: "index", label: "No" },
  { key: "rusun", label: "Rusun" },
  { key: "blok", label: "Blok" },
  { key: "lantai", label: "Lantai" },
  { key: "unit_number", label: "Kamar" },
  {
    key: "periode",
    label: "Update At",
    render: (value, item) => {
      const { tanggal, bulan, tahun, jam } = item;
      return getFormattedPeriode(tanggal, bulan, tahun, jam);
    },
  },
  {
    key: "action",
    label: "Aksi",
    render: (value, item) => (
      <button
        onClick={() => openModal(item, "sebelum", "setelah")}
        className="bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        See...
      </button>
    ),
  },
];
