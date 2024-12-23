import React, { useLayoutEffect, useRef, useState } from "react";

const Table = ({
  columns,
  data,
  emptyMessage = "No data available",
  showCheckbox = true, // Default to show checkboxes
  handleEditClick,
  // Prop for handling edit click
}) => {
  const checkbox = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  // Update checkbox state
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRows.length > 0 && selectedRows.length < data.length;
    setChecked(selectedRows.length === data.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedRows, data]);

  // Toggle "select all" checkbox
  const toggleAll = () => {
    if (checked || indeterminate) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  // Toggle individual row checkbox
  const toggleRow = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row)
        ? prev.filter((selected) => selected !== row)
        : [...prev, row]
    );
  };

  return (
    <div className="relative overflow-x-auto">
      {/* Bulk action buttons */}
      {showCheckbox && selectedRows.length > 0 && (
        <div className=" flex items-center bg-white rounded-lg mt-5 mb-[-15px]">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Delete
          </button>
        </div>
      )}

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 bg-white shadow-sm rounded-lg table-fixed mt-10">
        <thead className="bg-gray-50">
          <tr>
            {showCheckbox && (
              <th className="relative px-7 sm:w-12 sm:px-6">
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  ref={checkbox}
                  checked={checked}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider break-words text-center"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`border-gray-500 text-black text-center ${
                  selectedRows.includes(row)
                    ? "bg-gray-50"
                    : index % 2 !== 0
                    ? "bg-gray-200"
                    : "bg-gray-50"
                }`}
              >
                {showCheckbox && (
                  <td className="relative px-7 sm:w-12 sm:px-6">
                    {selectedRows.includes(row) && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                    )}
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRow(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-normal break-words text-center text-base"
                  >
                    {col.render
                      ? col.render(row[col.key], row, handleEditClick)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showCheckbox ? 1 : 0)}
                className="py-4 text-gray-500 text-center"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
