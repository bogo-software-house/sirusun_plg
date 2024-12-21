// src/utils/columns.js
export const Roomcolumns = [
  { key: "index", label: "No" },
  { key: "rusun", label: "Rusun" },
  { key: "blok", label: "Blok" },
  { key: "lantai", label: "Lantai" },
  { key: "unit_number", label: "Kamar" },
  { key: "status", label: "Status" },

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
    render: (
      value,
      row,
      handleEditClick // Terima handleEditClick sebagai parameter
    ) => (
      <button
        onClick={() => handleEditClick(row)} // Panggil fungsi handleEditClick yang diteruskan
        className="btn btn-sm btn-edit bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Edit
      </button>
    ),
  },
];

// Nested value function for columns rendering
export const getNestedValue = (obj, key) => {
  return key.split(".").reduce((acc, part) => (acc ? acc[part] : ""), obj);
};
