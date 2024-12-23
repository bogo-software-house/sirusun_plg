import React, { useState, useEffect } from "react";
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
    const path = location.pathname === "/" ? "Top" : location.pathname.replace("/", "");
    setActiveTab(path);

    // Detect when to show the "scroll to top" button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true); // Show button if scroll position > 200px
      } else {
        setShowScrollToTop(false); // Hide button otherwise
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling to top
    });
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      setMobileMenuOpen(false); // Close mobile menu before scroll
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveTab(id); // Update active tab state
      }, 300); // Timeout so that scroll happens after menu animation
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const isActive = (href) => activeTab === href;

  return (
    <header className="fixed top-0 z-50 left-0 right-0 items-center bg-white shadow-md">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-black">
        {/* Mobile Menu Button (Visible only on small screens) */}
        <div className="lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items (centered on large screens) */}
        <div className="flex-1 flex justify-center space-x-12 hidden lg:flex">
          {navigation.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setActiveTab(item.href.replace("/", ""))}
                className={`text-sm font-semibold leading-6 px-4 py-2 rounded-full ${
                  isActive(item.href.replace("/", "")) ? "text-gray-50 bg-indigo-500 border-indigo-500" : "text-black hover:bg-indigo-500 hover:text-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={() => handleScroll(item.href)}
                className={`text-sm font-semibold leading-6 px-4 py-2 rounded-full ${
                  isActive(item.href) ? "text-gray-50 bg-indigo-500 border-indigo-500" : "text-black hover:bg-indigo-500 hover:text-gray-50"
                }`}
              >
                {item.name}
              </button>
            )
          )}
        </div>

        {/* Login button (always right-aligned on large screens) */}
        <div className="hidden lg:flex lg:justify-end bg-indigo-500 rounded-md py-2 px-4 ">
          <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden z-[60]">
        {/* Background Overlay */}
        <div className={`fixed inset-0 z-[60] bg-black transition-opacity duration-300 ${mobileMenuOpen ? "opacity-50" : "opacity-0"}`} />

        {/* Animated Dialog Panel */}
        <DialogPanel
          className={`fixed inset-y-0 right-0 z-[70] w-full bg-white px-6 py-6 sm:max-w-sm
      ${mobileMenuOpen ? "animate-slideIn" : "animate-slideOut"}`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">Menu</h2>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("/") ? (
                    <Link to={item.href} onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-base font-semibold leading-7 ml-4 text-gray-900 hover:bg-gray-100">
                      {item.name}
                    </Link>
                  ) : (
                    <button onClick={() => handleScroll(item.href)} className="block w-full text-left py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100">
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className=" bg-indigo-500 rounded-md mt-4 mr-52 ml-4 ">
            <Link to="/login" className="block  text-left  px-3 py-2.5 text-base font-semibold  text-white ">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
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
