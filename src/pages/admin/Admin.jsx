import React, { useState, useContext } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon, ChartPieIcon, CalendarIcon, DocumentDuplicateIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../../context/authContext";
import logo from "../../assets/images/logowhite.png";

const navigationItems = [
  { name: "Pengajuan", href: "/admin/dashboard/pengajuan", icon: HomeIcon },
  { name: "Penghuni", href: "/admin/dashboard/penghuni", icon: UsersIcon },
  { name: "Pembayaran dan Tunggakan", href: "/admin/dashboard/pembayaran", icon: ChartPieIcon },
  { name: "Kondisi Bangunan", href: "/admin/dashboard/bangunan", icon: DocumentDuplicateIcon },
  { name: "Laporan", href: "/admin/dashboard/laporan", icon: CalendarIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = navigationItems.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  return (
    <>
      <div>
        {/* Sidebar Mobile */}
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
          <div className="fixed inset-0 flex">
            <DialogPanel className="relative flex w-full max-w-xs flex-1 bg-indigo-600 px-6 pb-4">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
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
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                              {item.name}
                            </Link>
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

        {/* Sidebar Desktop */}
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
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6")} />
                          {item.name}
                        </Link>
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
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
            {/* <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 mt-4">
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="block h-12 mt-2 bg-gray-100 w-full rounded-lg border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>
            </div> */}
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
