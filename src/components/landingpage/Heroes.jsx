import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Navbar from "../../SmallComponents/Navbar";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logowithtext.png";
import "aos/dist/aos.css";
import AOS from "aos";

// Impor gambar dengan benar
import rusun3 from "../../assets/images/rusun3.jpeg";
import rusun5 from "../../assets/images/rusun5.jpeg";
import rusun6 from "../../assets/images/rusun6.jpeg";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle previous button click
  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  // Handle next button click
  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Automatically move to the next slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // 2 second interval

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]); // Re-run effect when images.length changes

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Durasi 1 detik, animasi hanya sekali
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="relative isolate overflow-hidden bg-white h-screen "
        id="Top"
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>

        <div
          className="mt-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-38"
          data-aos="fade-up"
        >
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-32">
            <img alt="logo" src={logo} className="h-20" />
            <h1 className="mt-10 lg:text-4xl font-semibold tracking-tight text-gray-900 sm:text-lg">
              Sistem Informasi Rumah Susun
              <br />
              <div className="lg:text-6xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                SIRUSUN
              </div>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              UPTD Pengelolaan Rumah Susun Dinas Perumahan Rakyat, Kawasan
              Permukiman dan Pertanahan Kota Palembang
            </p>

            <div className="mt-10 flex items-center gap-x-6" data-aos="fade-up">
              <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <Link to="/Formpengajuan">Ajukan Penyewaan</Link>
              </a>
            </div>
          </div>

          <div
            className="lg:mt-28 flex max-w-2xl sm:mt-8 lg:ml-10 lg:mr-0 lg:mt-10 lg:max-w-none lg:flex-none xl:ml-[50px] h-68"
            data-aos="fade-up"
          >
            <div className="relative mt-[40px] mr-9">
              <div className="carousel overflow-hidden">
                <div
                  className="lg:w-[40rem] carousel-inner flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="carousel-item flex-shrink-0 w-full"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full lg:h-[400px] sm:h-[300px] rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                data-aos="fade-up"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition-colors duration-300"
                onClick={handlePrevClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                data-aos="fade-up"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition-colors duration-300"
                onClick={handleNextClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  // Pastikan gambar diinisialisasi dengan benar
  const images = [
    { src: rusun3, alt: "Rusun 3" },
    { src: rusun5, alt: "Rusun 5" },
    { src: rusun6, alt: "Rusun 6" },
  ];

  return (
    <div className="container-fluid mx-auto">
      <Carousel images={images} />
    </div>
  );
};

export default App;
