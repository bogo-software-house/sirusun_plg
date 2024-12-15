import React from "react";
import ActionDropdown from "../components/DropdownAction/ActionDropdown";

export const getColumns = (statusOptions, selectedStatuses, handleStatusChange, updateStatus) => [
  { key: "nik", label: "NIK", render: (value, row) => row.resident_pdf?.nik || "N/A" },
  { key: "username", label: "Nama", render: (value, row) => row.resident_pdf?.resident?.username || "N/A" },
  { key: "status", label: "Status", render: (value, row) => row.status_form?.status || "N/A" },
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
