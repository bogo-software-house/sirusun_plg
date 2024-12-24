import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import gambar from "../../assets/images/rusun6.jpeg";


export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }
  
      // Try to get user data from localStorage first
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        setLoading(false);
        return; // Skip fetching from API if user data is found
      }
  
      // If user data is not in localStorage, fetch from API
      try {
        const response = await fetch("https://api.sirusun.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        setUserData(data.user);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in localStorage
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [navigate]); // The dependency array ensures this effect runs only on mount
   // The dependency array ensures this effect runs only on mount

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api.sirusun.com/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  
  const handleUpdatePassword = async () => {
    if (newPassword.length < 8) {
      setPasswordUpdateMessage({
        message: "Password harus memiliki minimal 8 karakter.",
        type: "error",
      });
      setIsMessageModalOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setPasswordUpdateMessage({
          message: "Token tidak ditemukan. Silakan login ulang.",
          type: "error",
        });
        setIsMessageModalOpen(true);
        return;
      }

      const response = await fetch("https://api.sirusun.com/api/auth/users-update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setPasswordUpdateMessage({
          message: errorData.message || "Gagal memperbarui password.",
          type: "error",
        });
        setIsMessageModalOpen(true);
        return;
      }

      setNewPassword("");
      setPasswordModalOpen(false);
      setPasswordUpdateMessage({
        message: "Password berhasil diperbarui.",
        type: "success",
      });
      setIsMessageModalOpen(true);
    } catch (error) {
      setPasswordUpdateMessage({
        message: error.message || "Terjadi kesalahan saat memperbarui password.",
        type: "error",
      });
      setIsMessageModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  


  
  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Error fetching user data</div>;
  }

  return (
    <main className="relative">
      <div className="w-full h-56 relative">
        <img src={gambar} alt="" className="w-full h-full object-cover absolute top-0 left-0" />
      </div>

      <div className="bg-white py-8 rounded-l-2xl relative shadow-sm top-[-50px] ml-4 sm:ml-8 lg:ml-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 sm:top-6 sm:right-6" onClick={handleLogout}>
            Logout
          </button>

          <div className="text-left mb-10">
            <h1 className="text-2xl font-semibold text-gray-900">Selamat Datang, {userData.name}</h1>
            <p className="mt-2 text-gray-600 text-sm">Berikut adalah detail data Anda.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-md font-semibold text-gray-900 mb-4">Informasi Pribadi</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="text-gray-800">
                <div className="mb-2">Nama Lengkap</div>
                <div className="w-full sm:w-96 rounded-md bg-gray-200 p-2">{userData.name}</div>
              </div>

              <div className="text-gray-800">
  <div className="mb-2">Nomor Induk Kependudukan</div>
  <div className="w-full sm:w-96 rounded-md bg-gray-200 p-2">{userData.nik}</div>
</div>

            </div>

            <div className="relative mt-4 flex lg:justify-end sm:justify-center">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 sm:w-full sm:max-w-xs" onClick={() => setPasswordModalOpen(true)}>
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-indigo-500 text-white rounded-lg p-6">
            <div className="grid grid-cols-1 text-white text-left font-semibold md:grid-cols-2 lg:grid-cols-4 gap-4">
              <p className="border-l border-gray-300 pl-8">
                <span className="block font-light text-sm">Rusun</span>
                <div className="font-semibold text-lg">{userData.rusun}</div>
              </p>
              <p className="border-l border-gray-300 pl-8">
                <span className="block font-light text-sm">Blok</span>
                <div className="font-semibold text-lg">{userData.blok}</div>
              </p>
              <p className="border-l border-gray-300 pl-8">
                <span className="block font-light text-sm">Lantai</span>
                <div className="font-semibold text-lg">{userData.lantai}</div>
              </p>
              <p className="border-l border-gray-300 pl-8">
                <span className="block font-light text-sm">Nomor Unit</span>
                <div className="font-semibold text-lg">{userData.no_unit}</div>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isMessageModalOpen && (
        <Dialog as="div" className="relative z-10" open={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transform transition-all duration-300 ease-in-out scale-95 sm:scale-100">
              <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-4 text-center">{passwordUpdateMessage?.type === "success" ? "Success" : "Error"}</Dialog.Title>
              <p className="text-gray-600 mb-6 text-center">{passwordUpdateMessage?.message}</p>

              <div className="mt-6 flex justify-center">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200" onClick={() => setIsMessageModalOpen(false)}>
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {passwordModalOpen && (
        <Dialog as="div" className="relative z-10" open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transform transition-all duration-300 ease-in-out scale-95 sm:scale-100">
              <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-4 text-center">Update Password</Dialog.Title>
              <p className="text-gray-600 mb-6 text-center">Please enter a new password to update your account.</p>

              <div className="space-y-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-black focus:outline-none transition-all duration-200"
                  placeholder="New Password"
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200" onClick={() => setPasswordModalOpen(false)}>
                  Cancel
                </button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200" onClick={handleUpdatePassword}>
                  Update
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </main>
  );
}
