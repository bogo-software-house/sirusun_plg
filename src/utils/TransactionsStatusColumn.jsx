import React from "react";
import ActionDropdown from "../components/DropdownAction/ActionDropdown";

export const getColumns = (
  statusOptions,
  selectedStatuses,
  handleStatusChange,
  updateStatus
) => [
  {
    key: "nik",
    label: "NIK",
    render: (value, row) => row.data?.resident?.nik || "N/A",
  },
  {
    key: "username",
    label: "Nama",
    render: (value, row) => row.data?.resident?.username || "N/A",
  },
  {
    key: "status",
    label: "Status",
    render: (value, row) => {
      const status = row.data?.resident?.status || "N/A"; // Accessing the correct status
      let statusColor;

      // Define colors based on the status value
      switch (status) {
        case "DI PROSES":
          statusColor = "bg-yellow-200 text-yellow-800"; // Yellow for 'DI PROSES'
          break;
        case "DITERIMA":
          statusColor = "bg-green-200 text-green-800"; // Green for 'DITERIMA'
          break;
        case "DITOLAK":
          statusColor = "bg-red-200 text-red-800"; // Red for 'DITOLAK'
          break;
        default:
          statusColor = "bg-gray-200 text-gray-800"; // Default color if no status found
          break;
      }

      return (
        <span
          className={`inline-block rounded-3xl font-bold box-border leading-none text-sm ${statusColor}`}
          style={{
            padding: "0.7rem", // Padding for visual spacing
            display: "inline-block", // Ensures it behaves like an inline-block element
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
      row.data?.resident_pdf?.file_url ? (
        <a
          href={row.data.resident_pdf.file_url} // Correctly accessing the file URL
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 font-semibold text-indigo-600 rounded-lg text-base hover:bg-indigo-700 hover:text-white box-border"
        >
          Open PDF
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
        selectedStatus={selectedStatuses[row.id]}
        onStatusChange={(e) => handleStatusChange(row.id, e.target.value)}
        onUpdate={() => updateStatus(row.id)}
      />
    ),
  },
];
