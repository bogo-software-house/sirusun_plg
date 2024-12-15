export const getReportColumns = () => [
    { key: "index", label: "No" },
    { key: "rusun", label: "Rusun" },
    { key: "blok", label: "Blok" },
    { key: "lantai", label: "Lantai" },
    { key: "unit_number", label: "Kamar" },
    { key: "bulan", label: "Bulan" },
    { key: "tahun", label: "Tahun" },
    {
      key: "sebelum",
      label: "Sebelum",
      render: (value) => (
        <div className="grid grid-cols-2 gap-4 mt-2 w-full text-black">
          {[
            { label: "Lantai", value: value?.material?.lantai },
            { label: "Kusen", value: value?.material?.kusen },
            { label: "Pintu", value: value?.material?.pintu },
            { label: "Jendela", value: value?.material?.jendela },
            { label: "Plafon", value: value?.material?.flatfond },
            { label: "Dinding", value: value?.material?.dinding },
            { label: "Air", value: value?.instalasi?.instalasi_air },
            { label: "Listrik", value: value?.instalasi?.instalasi_listrik },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-lg shadow border border-gray-200 w-full p-4 flex flex-col items-center"
            >
              <p className="text-gray-600 font-semibold">{item.label}</p>
              <p className="text-gray-800 mt-1">{item.value || "-"}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "setelah",
      label: "Setelah",
      render: (value) => (
        <div className="grid grid-cols-2 gap-4 mt-2 w-full text-black">
          {[
            { label: "Lantai", value: value?.material?.lantai },
            { label: "Kusen", value: value?.material?.kusen },
            { label: "Pintu", value: value?.material?.pintu },
            { label: "Jendela", value: value?.material?.jendela },
            { label: "Plafon", value: value?.material?.flatfond },
            { label: "Dinding", value: value?.material?.dinding },
            { label: "Air", value: value?.instalasi?.instalasi_air },
            { label: "Listrik", value: value?.instalasi?.instalasi_listrik },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-lg shadow border border-gray-200 w-full p-4 flex flex-col items-center"
            >
              <p className="text-gray-600 font-semibold">{item.label}</p>
              <p className="text-gray-800 mt-1">{item.value || "-"}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];
  