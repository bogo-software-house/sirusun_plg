import React from "react";

const Table = ({ columns, data, emptyMessage = "No data available" }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 bg-white shadow-sm rounded-lg table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider  break-words">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className=" border-b border-gray-500 text-black">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-normal break-words">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className=" py-4 text-gray-500">
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
