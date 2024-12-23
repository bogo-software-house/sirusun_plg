import React from "react";

const TransactionRoomDetails = ({ detail }) => {
  const { new_data } = detail;

  return (
    <div className="space-y-6">
      <h3 className="pb-2 text-lg font-semibold text-gray-700 border-b border-gray-200">Penambahan Penghuni</h3>
      <div className="space-y-4">
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Nama</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.user?.username || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">NIK</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.transaction?.nik || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Rusun</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.room?.rusun || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Blok</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.room?.blok || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Lantai</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.room?.lantai || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Kamar</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.room?.unit_number || "N/A"}
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

export default TransactionRoomDetails;
