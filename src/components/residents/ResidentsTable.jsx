// PenghuniTable.jsx
import React from "react";
import Table from "../table/Table";
const PenghuniTable = ({ occupants }) => {
  const columns = [
    { key: "nik", label: "NIK" },
    { key: "name", label: "Nama" },
    { key: "rusun", label: "Rusun" },
    { key: "block", label: "Blok" },
    { key: "floor", label: "Lantai" },
    { key: "roomNumber", label: "Kamar" },
    { key: "email", label: "Email" },
    { key: "phone", label: "No. HP" },
  ];

  return <Table columns={columns} data={occupants} emptyMessage="Tidak ada data penghuni." />;
};

export default PenghuniTable;
