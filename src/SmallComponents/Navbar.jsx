"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "Top" },
  { name: "Rusun", href: "Rusun" },
  { name: "Alur", href: "Alur" },
  { name: "Download", href: "Download" },
  { name: "Cek Permohonan", href: "/CekPermohonan" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Top");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const path = location.pathname === "/" ? "Top" : location.pathname.replace("/", "");
    setActiveTab(path);
  }, [location.pathname]);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
    setMobileMenuOpen(false); // Tutup menu mobile setelah navigasi dilakukan
  };

  const isActive = (href) => activeTab === href;

  return (
    <header className="fixed top-0 z-50 left-0 right-0 bg-white shadow-md">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-black">
  
        {/* Menu Tengah */}
        <div className="hidden lg:flex lg:gap-x-12 lg:justify-center flex-1">
          {navigation
            .filter((item) => !item.href.startsWith("/login")) // Menghapus Login dari menu tengah
            .map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setActiveTab(item.href.replace("/", ""))}
                  className={`text-lg font-semibold rounded-full px-4 py-2 ${
                    isActive(item.href.replace("/", "")) ? "bg-indigo-500 text-black" : " hover:bg-gray-50 text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleScroll(item.href)}
                  className={`rounded-full px-4 py-2 ${
                    isActive(item.href) ? "text-gray-50 bg-indigo-500" : "hover:bg-gray-200"
                  }`}
                >
                  {item.name}
                </button>
              )
            )}
        </div>
  
        {/* Menu Login di sebelah kanan */}
        <div className="hidden lg:flex">
          <Link
            to="/login"
            onClick={() => setActiveTab("login")}
            className={`text-black font-semibold px-4 py-2 rounded-full ${
              isActive("login") ? "bg-indigo-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            Login
          </Link>
        </div>
  
        {/* Menu Hamburger untuk Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="rounded-md p-2.5 text-gray-700">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
  
        {/* Menu Mobile Dialog */}
        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white overflow-y-auto px-6 py-6 flex flex-col gap-y-4">
            {navigation.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setActiveTab(item.href.replace("/", ""));
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-3 py-2 text-base font-semibold ${
                    isActive(item.href.replace("/", "")) ? "text-indigo-600 underline" : "hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    handleScroll(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-full px-3 py-2 text-black"
                >
                  {item.name}
                </button>
              )
            )}
          </DialogPanel>
        </Dialog>
      </nav>
    </header>
  );
  
  
}
