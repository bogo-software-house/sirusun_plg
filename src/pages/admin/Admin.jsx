import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon, ChartPieIcon, CalendarIcon, DocumentDuplicateIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// import AuthContext from "../../context/authContext";
import logo from "../../assets/images/logowhite.png";
import Settings from "./setting/Settings";

// Navigation Items
const mainNavigation = [
  { name: "Pengajuan", href: "/admin/dashboard/pengajuan", icon: HomeIcon },
  { name: "Penghuni", href: "/admin/dashboard/penghuni", icon: UsersIcon },
  {
    name: "Pembayaran dan Tunggakan",
    href: "/admin/dashboard/pembayaran",
    icon: ChartPieIcon,
  },
  {
    name: "Kondisi Bangunan",
    href: "/admin/dashboard/bangunan",
    icon: DocumentDuplicateIcon,
  },
  { name: "Saran", href: "/admin/dashboard/suggestion", icon: CalendarIcon },
];

const reportNavigation = [
  {
    name: "Kondisi Kamar",
    href: "/admin/dashboard/laporan",
    icon: CalendarIcon,
  },
  {
    name: "Status Transaksi",
    href: "/admin/dashboard/status-transaksi-history",
    icon: CalendarIcon,
  },
];

// Utility function to combine classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Main Component
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Dropdown tracking
  // const { logout } = useContext(AuthContext);
  // const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(""); // Store role of the user

  // Get role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // Handle dropdown toggle
  const handleDropdownToggle = (itemName) => {
    setDropdownOpen((prev) => (prev === itemName ? null : itemName));
  };

  // Update navigation items with active state
  const mainNav = mainNavigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  const reportNav = reportNavigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  // Handle item click to close sidebar (for mobile)
  const handleItemClick = () => {
    setSidebarOpen(false); // Close sidebar on item click (mobile)
  };

  return (
    <>
      <div>
        {/* Mobile Sidebar */}
        <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" />
          <div className="fixed inset-0 flex">
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 bg-indigo-600 px-6 pb-4">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto">
                <div className="flex h-16 items-center">
                  <img alt="logo" src={logo} className="h-10" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    {/* Main Navigation */}
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {mainNav.map((item) => (
                          <li key={item.name} className="relative">
                            {item.children ? (
                              <div>
                                <button
                                  onClick={() => handleDropdownToggle(item.name)}
                                  className={classNames(
                                    item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                    "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                                  {item.name}
                                  <ChevronDownIcon
                                    className={classNames(
                                      dropdownOpen === item.name ? "rotate-0 text-white" : "rotate-[-90deg] text-indigo-200 group-hover:text-white",
                                      "h-5 w-5 transition-transform"
                                    )}
                                  />
                                </button>
                                {dropdownOpen === item.name && (
                                  <ul className="absolute left-0 mt-2 w-48 bg-indigo-600 rounded-md shadow-lg">
                                    {item.children.map((child) => (
                                      <li key={child.name}>
                                        <Link to={child.href} onClick={() => setSidebarOpen(false)} className="block px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-700 hover:text-white">
                                          {child.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              <Link
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={classNames(
                                  item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                                {item.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/* Settings Menu */}
                    <Settings /> {/* Render the Settings component */}
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div className="flex h-16 items-center">
              <img alt="logo" src={logo} className="h-16 mt-4" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-5 mt-5">
                {/* Main Navigation */}
                <li>
                  <p className="ms-2 text-indigo-200 text-sm font-semibold my-3">Main Navigation</p>
                  <ul className="-mx-2 space-y-1">
                    {mainNav.map((item) => (
                      <li key={item.name} className="relative">
                        {item.children ? (
                          <div>
                            <button
                              onClick={() => handleDropdownToggle(item.name)}
                              className={classNames(
                                item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                              {item.name}
                              {item.children && (
                                <ChevronDownIcon
                                  className={classNames(dropdownOpen === item.name ? "rotate-0 text-white" : "rotate-[-90deg] text-indigo-200 group-hover:text-white", "h-5 w-5 transition-transform")}
                                />
                              )}
                            </button>
                            {dropdownOpen === item.name && (
                              <ul className="absolute left-0 mt-2 w-48 bg-indigo-600 rounded-md shadow-lg">
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <Link to={child.href} onClick={handleItemClick} className="block px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-700 hover:text-white">
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={handleItemClick}
                            className={classNames(
                              item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                {/* Report Navigation */}
                {reportNav.length > 0 && (
                  <li>
                    <p className="ms-2 text-indigo-200 text-sm font-semibold my-2">Report</p>
                    <ul className="-mx-2 space-y-1">
                      {reportNav.map((item) => (
                        <li key={item.name} className="relative">
                          {item.children ? (
                            <div>
                              <button
                                onClick={() => handleDropdownToggle(item.name)}
                                className={classNames(
                                  item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                  "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                                {item.name}
                                {item.children && (
                                  <ChevronDownIcon
                                    className={classNames(
                                      dropdownOpen === item.name ? "rotate-0 text-white" : "rotate-[-90deg] text-indigo-200 group-hover:text-white",
                                      "h-5 w-5 transition-transform"
                                    )}
                                  />
                                )}
                              </button>
                              {dropdownOpen === item.name && (
                                <ul className="absolute left-0 mt-2 w-48 bg-indigo-600 rounded-md shadow-lg">
                                  {item.children.map((child) => (
                                    <li key={child.name}>
                                      <Link to={child.href} onClick={handleItemClick} className="block px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-700 hover:text-white">
                                        {child.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <Link
                              to={item.href}
                              onClick={handleItemClick}
                              className={classNames(
                                item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                <Settings onClick={() => setSidebarOpen(true)} /> {/* Render the Settings component */}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-72 ml-10 mr-10">
          <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          {/* Selamat Datang */}
          {role && (
            <div className=" ">
              <h1 className="text-2xl font-semibold text-indigo-600">Selamat Datang, {role === "admin" ? "Admin" : "Staff"}!</h1>
            </div>
          )}
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </>
  );
}