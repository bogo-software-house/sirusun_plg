import React from "react";
import { getStatusColor } from "../../utils/StatusColour";

const TransactionStatusFormDetails = ({ detail }) => {
  const { old_data, new_data } = detail;

  return (
    <div className="space-y-6">
      <h3 className="pb-2 text-lg font-semibold text-gray-700 border-b border-gray-200">Perubahan Status Pengajuan</h3>
      <div className="space-y-4">
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Nama</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.user?.nama || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">NIK</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {old_data.user?.nik || "N/A"}
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Sebelum</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              <span className={getStatusColor(old_data.status)}>{old_data.status || "N/A"}</span>
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Setelah</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              <span className={getStatusColor(new_data.status)}>{new_data.status || "N/A"}</span>
            </span>
          </div>
        </div>
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell font-medium text-gray-600 w-32">Keterangan</span>
            <span className="table-cell font-semibold">
              <span className="font-semibold mr-2"> : </span>
              {new_data.keterangan || "N/A"}
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

export default TransactionStatusFormDetails;
