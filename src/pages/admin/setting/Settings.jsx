import React, { useState, useEffect, useContext } from "react";
import { Cog8ToothIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import PasswordUpdateModal from "./UpdatePassword";
import AuthContext from "../../../context/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate here

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate here
  const [role, setRole] = useState(""); // Store role of the user

  // Function to handle modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Dummy logout handler function (replace with your actual function)
  const handleLogout = () => {
    logout();
    localStorage.removeItem("role"); // Remove role from localStorage
    navigate("/loginadmin"); // Navigate to login page after logout
  };

  // Get role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <>
      <li className="mt-auto flex flex-col ms-[-20px]">
        {/* Settings Button */}
        <button
          onClick={toggleModal} // Toggle modal visibility
          className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
        >
          <Cog8ToothIcon className="w-5 h-5" /> Settings
        </button>

        {/* Log out Button */}
        <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white">
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" /> Log out
        </button>
      </li>

      {/* Password Update Modal */}
      <PasswordUpdateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </>
  );
}

export default Settings;
