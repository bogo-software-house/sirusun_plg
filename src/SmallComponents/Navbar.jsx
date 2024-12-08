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
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Top");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    // Sync activeTab with current route or default to "Top" for the home page
    const path = location.pathname === "/" ? "Top" : location.pathname;
    setActiveTab(path);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id); // Update active tab state for scrolling buttons
    }
  };

  const isActive = (href) => activeTab === href;

  return (
    <header className="fixed top-0 z-50 left-0 right-0 bg-white shadow-md">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-black">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setActiveTab(item.href)} // Update active tab when a route link is clicked
                className={`text-sm font-semibold leading-6 relative z-10 px-4 py-2 border-2 rounded-full group ${
                  isActive(item.href) ? "text-gray-50 bg-indigo-500 border-indigo-500" : "text-black hover:text-gray-50 hover:bg-indigo-500 hover:border-indigo-500"
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={() => handleScroll(item.href)} // Handle scroll and update active state
                className={`text-sm font-semibold leading-6 flex justify-center  gap-2 items-center mx-auto text-lg backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group ${
                  isActive(item.href) ? "text-gray-50 bg-indigo-500 border-indigo-500" : ""
                }`}
              >
                {item.name}
              </button>
            )
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-black">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setActiveTab(item.href)} // Update active state in mobile menu
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${isActive(item.href) ? "text-indigo-600 underline" : "text-black hover:bg-gray-50"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-gray-50">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-12 left-6 z-50  rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <span className="text-xl">&#8613;</span>
        </button>
      )}
    </header>
  );
}
