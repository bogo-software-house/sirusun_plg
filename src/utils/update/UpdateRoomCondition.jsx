import React from "react";
import Modal from "react-modal";
import {
  lantaiOptions,
  kusenOptions,
  pintuOptions,
  jendelaOptions,
  flatfondOptions,
  dindingOptions,
  instalasiAirOptions,
  instalasiListrikOptions,
} from "../../utils/options/ConditionsOption";


Modal.setAppElement("#root");

function UpdateRoomModal({
  selectedRoom,
  formValues,
  setFormValues,
  setSelectedRoom,
  handleInputChange,
  handleUpdateClick,
}) {
  return (
    <Modal
      isOpen={selectedRoom !== null}
      onRequestClose={() => setSelectedRoom(null)}
      ariaHideApp={false}
    >
      <div className="rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-10 text-black">
        <h3 className="text-xl font-bold text-center mb-6">
          Update Room {selectedRoom?.unit_number}
        </h3>

        {/* Dropdown untuk Properti Kondisi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Kondisi Lantai",
              id: "damage_rooms_lantai_custom_id",
              options: lantaiOptions,
            },
            {
              label: "Kondisi Kusen",
              id: "damage_rooms_kusen_custom_id",
              options: kusenOptions,
            },
            {
              label: "Kondisi Pintu",
              id: "damage_rooms_pintu_custom_id",
              options: pintuOptions,
            },
            {
              label: "Kondisi Jendela",
              id: "damage_rooms_jendela_custom_id",
              options: jendelaOptions,
            },
            {
              label: "Kondisi Flatfond",
              id: "damage_rooms_fn_flatfond_custom_id",
              options: flatfondOptions,
            },
            {
              label: "Kondisi Dinding",
              id: "damage_rooms_fn_dinding_custom_id",
              options: dindingOptions,
            },
            {
              label: "Kondisi Instalasi Air",
              id: "damage_rooms_instalasi_air_custom_id",
              options: instalasiAirOptions,
            },
            {
              label: "Kondisi Instalasi Listrik",
              id: "damage_rooms_instalasi_listrik_custom_id",
              options: instalasiListrikOptions,
            },
          ].map(({ label, id, options }) => (
            <div key={id} className="flex flex-col items-center">
              <label className="block text-center text-gray-700 font-medium mb-2">
                {label}
              </label>
              <select
                className="w-3/4 md:w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formValues[id] || ""}
                onChange={(e) => handleInputChange(id, e.target.value)}
              >
                <option value="" disabled>
                  Pilih {label}
                </option>
                {Object.entries(options).map(([label, value]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-600 transition"
            onClick={() => setSelectedRoom(null)}
          >
            Close
          </button>
          <button
            className="btn btn-sm btn-edit bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleUpdateClick}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateRoomModal;
