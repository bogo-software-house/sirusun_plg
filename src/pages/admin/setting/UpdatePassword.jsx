import React, { useState } from "react";
import ConfirmationModal from "../../../components/modal/ConfirmationModal";

function PasswordUpdateModal({ isModalOpen, toggleModal }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State untuk konfirmasi

  if (!isModalOpen) return null;

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setNotification({
        message: "Password tidak cocok.",
        type: "error",
      });
      return;
    }

    // Tampilkan modal konfirmasi
    setShowConfirmationModal(true);
  };

  const handleConfirmPasswordUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api.sirusun.com/api/auth/admin-update-password", // URL API
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error(errorData.message || "Gagal memperbarui password");
      }

      setNewPassword("");
      setConfirmNewPassword("");
      toggleModal();
      setNotification({
        message: "Password berhasil diperbarui.",
        type: "success",
      });

      // Tutup modal konfirmasi
      setShowConfirmationModal(false);
    } catch (error) {
      setNotification({
        message: error.message || "Gagal memperbarui password.",
        type: "error",
      });
      setShowConfirmationModal(false); // Tutup modal konfirmasi jika terjadi error
    }
  };

  const handleCancelPasswordUpdate = () => {
    setShowConfirmationModal(false); // Tutup modal konfirmasi jika batal
  };

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-lg transform transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-6 text-center">Update Password</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your new password"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirm your new password"
              />
            </div>

            {notification.message && <p className={`text-sm mt-2 ${notification.type === "error" ? "text-red-500" : "text-green-500"}`}>{notification.message}</p>}

            <div className="flex justify-between items-center mt-6">
              <button type="button" onClick={toggleModal} className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdatePassword}
                className="ml-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirmationModal && <ConfirmationModal onConfirm={handleConfirmPasswordUpdate} onCancel={handleCancelPasswordUpdate} />}
    </div>
  );
}

export default PasswordUpdateModal;
