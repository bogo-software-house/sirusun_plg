import React from "react";
import ActionDropdown from "../components/DropdownAction/ActionDropdown";

export const getColumns = (statusOptions, selectedStatuses, handleStatusChange, updateStatus) => [
  {
    key: "nik",
    label: "NIK",
    render: (value, row) => row.data?.resident?.nik || row.resident?.nik || "N/A", // Mengakses NIK dari data atau resident
  },
  {
    key: "username",
    label: "Nama",
    render: (value, row) => row.data?.resident?.username || row.resident?.username || "N/A", // Mengakses nama resident
  },
  {
    key: "status",
    label: "Status",
    render: (value, row) => {
      const status = row.status || "N/A";
      let statusColor;

      switch (status) {
        case "DI PROSES":
          statusColor = "bg-yellow-100 text-yellow-700 border border-yellow-400";
          break;
        case "DITERIMA":
          statusColor = "bg-green-100 text-green-700 border border-green-400";
          break;
        case "DITOLAK":
          statusColor = "bg-red-100 text-red-700 border border-red-400";
          break;
        default:
          statusColor = "bg-gray-100 text-gray-700 border border-gray-400";
          break;
      }

      return (
        <span
          className={`inline-block rounded-full font-medium box-border text-xs ${statusColor}`}
          style={{
            padding: "0.4rem 0.8rem", // Ukuran kecil
            display: "inline-block",
          }}
        >
          {status}
        </span>
      );
    },
  },
  {
    key: "resident_pdf",
    label: "Resident PDF",
    render: (value, row) =>
      row.data?.file_url ? (
        <a href={row.data.file_url} target="_blank" rel="noopener noreferrer" className="p-2 font-semibold text-indigo-600 rounded-lg text-sm hover:bg-indigo-700 hover:text-white box-border">
          Open
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    key: "berkas_ktp",
    label: "KTP",
    render: (value, row) =>
      row.data?.resident?.berkas_ktp?.file_url ? (
        <a
          href={`https://api.sirusun.com${row.data.resident.berkas_ktp.file_url}`} // Gunakan URL backend lengkap
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 font-semibold text-indigo-600 rounded-lg text-sm hover:bg-indigo-700 hover:text-white box-border"
        >
          Open
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    key: "berkas_kk",
    label: "KK",
    render: (value, row) =>
      row.data?.resident?.berkas_kk?.file_url ? (
        <a
          href={`https://api.sirusun.com${row.data.resident.berkas_kk.file_url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 font-semibold text-indigo-600 rounded-lg text-sm hover:bg-indigo-700 hover:text-white box-border"
        >
          Open
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    key: "berkas_salary",
    label: "Slip Gaji",
    render: (value, row) =>
      row.data?.resident?.berkas_salary?.file_url ? (
        <a
          href={`https://api.sirusun.com${row.data.resident.berkas_salary.file_url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 font-semibold text-indigo-600 rounded-lg text-sm hover:bg-indigo-700 hover:text-white box-border"
        >
          Open
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    key: "actions",
    label: "Update Status",
    render: (value, row) => (
      <ActionDropdown
        statusOptions={statusOptions}
        selectedStatus={selectedStatuses[row.data?.id]}
        onStatusChange={(e) => handleStatusChange(row.data?.id, e.target.value)}
        onUpdate={() => updateStatus(row.data?.id)}
      />
    ),
  },
];
