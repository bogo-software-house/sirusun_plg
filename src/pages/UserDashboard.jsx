"use client";
import { Dialog, DialogBackdrop, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild } from "@headlessui/react";
import { Bars3Icon, BellIcon, HomeIcon, UsersIcon, FolderIcon, CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const navigation = [
  { name: "kamar", href: "#", icon: HomeIcon, current: true },
  { name: "Tunggakan", href: "#", icon: UsersIcon, current: false },
  { name: "Fasilitas", href: "#", icon: ChartPieIcon, current: false },
  { name: "Profil", href: "#", icon: ChartPieIcon, current: false },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { useState, useEffect } from "react";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState(""); // Tambahkan state untuk username

  // Ambil username dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop transition className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

          <div className="fixed inset-0 flex">
            <DialogPanel transition className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=white" className="h-8 w-auto" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon aria-hidden="true" className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6 shrink-0")} />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                        <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=white" className="h-8 w-auto" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current ? "bg-indigo-700 text-white" : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon aria-hidden="true" className={classNames(item.current ? "text-white" : "text-indigo-200 group-hover:text-white", "h-6 w-6 shrink-0")} />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 mt-4">
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2 top-2 h-full w-5 text-gray-400" />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="block h-12 mt-2 bg-gray-100 w-full rounded-lg border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-xl font-semibold text-gray-900">Selamat Datang, {username}</h1>
              <div className="transaction-table">
                <h2>Transaction Status Table</h2>

                <table border="1" cellPadding="10" className="text-black min-w-full border divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kamar
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tunggakan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hari
                      </th>{" "}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Listrik
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Update Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td> {/* Menampilkan Custom ID */}
                      <td></td>
                      <td className="flex text-sm">
                        {/* Status selector */}
                        <div></div>
                        {/* Button to update status */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
