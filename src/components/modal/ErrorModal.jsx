import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

const ErrorModal = ({ errors, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-4">
            <h3 className="text-red-800 font-medium text-lg">Terjadi Kesalahan</h3>
            <div className="mt-4 text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                {errors &&
                  Object.values(errors).map((error, index) => (
                    <li key={index} className="text-sm">
                      {error}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="mt-12 bg-red-500 text-white  rounded-lg hover:bg-red-600 ">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
