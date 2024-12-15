import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import NotificationModal from "../../components/modal/NotificationModal";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null); // Data user
  const [loading, setLoading] = useState(true); // State loading
  const [passwordModalOpen, setPasswordModalOpen] = useState(false); // State modal password
  const [newPassword, setNewPassword] = useState(""); // State password baru
  const [notification, setNotification] = useState(null); // State notifikasi

  // Fetch data user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // Clear token and redirect to login page
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect ke halaman login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/auth/users-update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      setNewPassword(""); // Reset input password
      setPasswordModalOpen(false); // Close modal
      setNotification({ message: "Password berhasil diperbarui", type: "success" });
    } catch (error) {
      setNotification({ message: error.message || "Gagal memperbarui password", type: "error" });
    }
  };

  // If data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no data available
  if (!userData) {
    return <div>Error fetching user data</div>;
  }

  return (
    <main className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h1 className="text-xl font-semibold text-gray-900">Selamat Datang, {userData.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detail data Anda</p>
          </div>
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Display User Data */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Nama</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{userData.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">NIK</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{userData.nik}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Rusun</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{userData.rusun}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Blok</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{userData.blok}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Lantai</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{userData.lantai}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Nomor Unit</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{userData.no_unit}</dd>
              </div>

              {/* Update Password Button */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Update Password</dt>
                <dd className="mt-1 sm:col-span-2">
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" onClick={() => setPasswordModalOpen(true)}>
                    Update
                  </button>
                </dd>
              </div>

              {/* Logout Button */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Logout</dt>
                <dd className="mt-1 sm:col-span-2">
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
                    Logout
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Modal for updating password */}
      {passwordModalOpen && (
        <Dialog as="div" className="relative z-10" open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded shadow-lg p-6">
              <Dialog.Title className="text-lg font-medium">Update Password</Dialog.Title>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-4 border rounded w-full p-2 text-black" placeholder="Password Baru" />
              <div className="mt-4 flex justify-end">
                <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setPasswordModalOpen(false)}>
                  Batal
                </button>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded" onClick={handleUpdatePassword}>
                  Update
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Notification for success or error */}
      {notification && <NotificationModal message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
    </main>
  );
}
