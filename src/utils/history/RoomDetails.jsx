import React from "react";

const RoomDetails = ({ detail }) => {
  const { old_data, new_data } = detail;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-semibold text-gray-700">Perubahan Status Kamar</h3>
        <p className="italic">Status kamar menjadi terisi ketika ada penambahan Penghuni</p>
      </div>
      <div className="space-y-4">
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Rusun</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.rusun || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Blok</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.blok || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Lantai</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.lantai || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Kamar</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.unit_number || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Sebelum</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.status || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Sesudah</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.status || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm italic border-t border-gray-200 pt-4">
        Dibuat pada : {detail.created_at} <br />({detail.created_at_human})
      </div>
    </div>
  );
};

export default RoomDetails;
