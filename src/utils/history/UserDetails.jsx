import React from "react";

const UserDetails = ({ detail }) => {
  const { new_data } = detail;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-semibold text-gray-700">Pembuatan User Account</h3>
        <p className="italic">Pembuatan akun dilakukan setelah status pengajuan diterima</p>
      </div>
      <div className="table w-full">
        <div className="table-row">
          <span className="table-cell font-medium text-gray-600 w-32">Username</span>
          <span className="table-cell font-semibold">
            <span className="font-semibold mr-2"> : </span>
            {new_data.username || "N/A"}
          </span>
        </div>
        <div className="table-row">
          <span className="table-cell font-medium text-gray-600 w-32">NIK</span>
          <span className="table-cell font-semibold">
            <span className="font-semibold mr-2"> : </span>
            {new_data.nik || "N/A"}
          </span>
        </div>
      </div>

      <div className="mt-8 text-sm italic border-t border-gray-200 pt-4">
        Dibuat pada : {detail.created_at} <br />({detail.created_at_human})
      </div>
    </div>
  );
};

export default UserDetails;
