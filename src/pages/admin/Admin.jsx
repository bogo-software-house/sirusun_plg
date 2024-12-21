import React, { useState, useContext } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon, ChartPieIcon, CalendarIcon, DocumentDuplicateIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import AuthContext from "../../context/authContext";
import logo from "../../assets/images/logowhite.png";

// Navigation Items
const navigationItems = [
  { name: "Pengajuan", href: "/admin/dashboard/pengajuan", icon: HomeIcon },
  { name: "Penghuni", href: "/admin/dashboard/penghuni", icon: UsersIcon },
  { name: "Pembayaran dan Tunggakan", href: "/admin/dashboard/pembayaran", icon: ChartPieIcon },
  { name: "Kondisi Bangunan", href: "/admin/dashboard/bangunan", icon: DocumentDuplicateIcon },
  { name: "Laporan", href: "/admin/dashboard/laporan", icon: CalendarIcon },
  { name: "Saran", href: "/admin/dashboard/suggestion", icon: CalendarIcon },
  {
    name: "Report",
    href: "#",
    icon: CalendarIcon,
    children: [
      { name: "Report 1", href: "/admin/dashboard/report/report1" },
      { name: "Report 2", href: "/admin/dashboard/report/report2" },
      { name: "Report 3", href: "/admin/dashboard/report/report3" },
    ],
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
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (itemName) => {
    setDropdownOpen((prev) => (prev === itemName ? null : itemName));
  };

  // Update navigation items with active state
  const navigation = navigationItems.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  return (
    <>
      <div>
        {/* Mobile Sidebar */}
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
          <div className="fixed inset-0 flex">
            <DialogPanel className="relative flex w-full max-w-xs flex-1 bg-indigo-600 px-6 pb-4">
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
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name} className="relative">
                            <div>
                              <button
                                onClick={() => item.children && handleDropdownToggle(item.name)}
                                className={classNames(
                                  item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                                {item.name}
                              </button>
                            </div>
                            {item.children && dropdownOpen === item.name && (
                              <ul className="absolute left-0 mt-2 w-48 bg-indigo-600 rounded-md shadow-lg">
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <Link
                                      to={child.href}
                                      onClick={() => setDropdownOpen(null)} // Close dropdown on navigation
                                      className="block px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <button onClick={handleLogout} className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white">
                        <Cog6ToothIcon className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                        Log out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div className="flex h-16 items-center">
              <img alt="logo" src={logo} className="h-16 mt-4" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
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
                                    <Link
                                      to={child.href} // Use Link for proper navigation
                                      onClick={() => setDropdownOpen(null)} // Close dropdown on navigation
                                      className="block px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <Link
                            to={item.href} // For non-dropdown items, use Link directly
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
                <li className="mt-auto">
                  <button onClick={handleLogout} className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    Log out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Dynamic Content */}
          <main className="">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
