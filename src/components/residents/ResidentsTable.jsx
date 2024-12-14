import React from "react";

function PenghuniTable({ occupants }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md mt-6">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-2">NIK</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Rusun</th>
            <th className="border border-gray-300 p-2">Blok</th>
            <th className="border border-gray-300 p-2">Lantai</th>
            <th className="border border-gray-300 p-2">Kamar</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">No. HP</th>
          </tr>
        </thead>
        <tbody>
          {occupants.length > 0 ? (
            occupants.map((occupant) => (
              <tr key={occupant.customId} className="text-gray-700 hover:bg-gray-100 text-center">
                <td className="border border-gray-300 p-2">{occupant.nik}</td>
                <td className="border border-gray-300 p-2">{occupant.name}</td>
                <td className="border border-gray-300 p-2">{occupant.rusun}</td>
                <td className="border border-gray-300 p-2">{occupant.block}</td>
                <td className="border border-gray-300 p-2">{occupant.floor}</td>
                <td className="border border-gray-300 p-2">{occupant.roomNumber}</td>
                <td className="border border-gray-300 p-2">{occupant.email}</td>
                <td className="border border-gray-300 p-2">{occupant.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="border border-gray-300 p-2 text-center text-gray-500">
                Tidak ada data penghuni.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PenghuniTable;
