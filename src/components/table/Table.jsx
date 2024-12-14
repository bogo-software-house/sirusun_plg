import React from "react";

const Table = ({ columns, data, emptyMessage = "No data available" }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-50 text-center">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="text-center">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap text-center text-black">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500 text-black">
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
