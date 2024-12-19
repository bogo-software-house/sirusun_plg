import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import gambarKamar from "../../assets/images/rusun5.jpeg";

export default function ProfilRusun() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [rusun, setRusun] = useState(null);
  const [loading, setLoading] = useState(true);

  const customId = id === "1" ? "IRN001" : "IRN002";
  const apiUrl = `https://api.sirusun.com/api/rusuns/${customId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data); // Debug data API
        console.log("Response Data:", response.data); // Debug API response

        setRusun(response.data); // Simpan data dari API ke state
      } catch (error) {
        console.error("Failed to fetch rusun data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Durasi 1 detik, animasi hanya sekali
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!rusun) return <p>Data tidak ditemukan.</p>;

  return (
    <div className="bg-white py-10 px-6 lg:ml-10 lg:mr-10 sm:ml-5 sm:mr-5 place-items-center ">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 lg:ml-6 sm:ml-0">
          Rusun {rusun.rusun}
        </h1>
        {/* Menampilkan gambar rusun */}
        <div className="mx-auto mt-6 max-w-6xl sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 lg:px-6">
  {rusun.image1 && (
    <div className="flex justify-center">
      <img
        src={rusun.image1}
        alt="Gambar 1"
        className="w-full h-72 rounded-lg object-cover lg:h-64"
      />
    </div>
  )}
  {rusun.image2 && (
    <div className="flex justify-center">
      <img
        src={rusun.image2}
        alt="Gambar 2"
        className="w-full h-72 rounded-lg object-cover lg:h-64"
      />
    </div>
  )}
  {rusun.image3 && (
    <div className="flex justify-center">
      <img
        src={rusun.image3}
        alt="Gambar 3"
        className="w-full h-72 rounded-lg object-cover lg:h-64"
      />
    </div>
  )}
  {rusun.image4 && (
    <div className="flex justify-center">
      <img
        src={rusun.image4}
        alt="Gambar 4"
        className="w-full h-72 rounded-lg object-cover lg:h-64"
      />
    </div>
  )}
</div>

        {/* Informasi rusun */}
        <div data-aos="fade-up">
          <h2 className="mt-6 font-bold text-black lg:text-xl sm:text-md mb-4 place-items-center lg:ml-8 sm:ml-0 ">
            Informasi Rusun
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kolom 1:  */}
            <div>
              <table className="w-full text-black border-collapse border border-gray-300 mt-1 lg:ml-8 sm:ml-0">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>Alamat</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rusun?.alamat || "Data tidak tersedia"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>Fasilitas</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rusun?.fasilitas || "Data tidak tersedia"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>Luas</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rusun?.luas ? `${rusun.luas} m²` : "Data tidak tersedia"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>Tahun Pembangunan</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rusun?.tahun || "Data tidak tersedia"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>Block</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rusun?.blok || "Data tidak tersedia"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>Lantai</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rusun?.lantai || "Data tidak tersedia"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Kolom 2*/}
            <div className="h-96 rounded-lg overflow-hidden place-items-end lg:mr-8 sm:mr-0">
              <div className="width: 100%">
                <iframe
                  width="100%"
                  height="600"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rusunawa%20Kertapati+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.gps.ie/sport-gps/">bike gps</a>
                </iframe>
              </div>
              <script
                type="text/javascript"
                src="https://embedmaps.com/google-maps-authorization/script.js?id=b90c489e181df380bf00cc9b3a5a48d4b1e1c7a7"
              ></script>
            </div>
          </div>
        </div>
        <hr />
        {/* Menampilkan Blok dan Lantai */}
        <div className="mt-6" data-aos="fade-up">
          {rusun.bloks &&
            rusun.bloks.map((blok) => (
              <div key={blok.blok} className="mt-2 text-black">
                <h3>
                  <strong className="mt-2 text-md font-bold text-black lg:ml-6 sm:lg-0">
                    Blok {blok.blok}
                  </strong>
                </h3>

                {/* Menggunakan Grid untuk Responsif */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 lg:m-5 sm:m-0">
                  {blok.lantai &&
                    blok.lantai.map((lantai) => (
                      <div
                        className="text-black bg-white rounded-md p-2 shadow-md mb-4 "
                        key={lantai.lantai}
                      >
                        <img
                          src={gambarKamar}
                          alt={`Gambar Lantai ${lantai.lantai}`}
                        />
                        <h3 className="mt-4 text-indigo-600 font-semibold">
                          Lantai {lantai.lantai}
                        </h3>
                        <div className="mt-4 flex justify-between  lg:text-md sm:text-sm text-gray-400  ">
                          <span className="">Harga</span>
                          <span className="ml-2 text-gray-400 font-semibold">
                            Rp.{lantai.harga}
                          </span>
                        </div>
                        <div className=" flex justify-between mb-4  lg:text-md sm:text-sm text-gray-400 ">
                          <span className="">Tersedia</span>
                          <span className="ml-2 text-gray-400 font-semibold">
                            {" "}
                            {lantai.available_rooms_count} kamar
                          </span>
                        </div>
                        <div>
                          <Link
                            to="/Formpengajuan"
                            className="hover:text-white"
                          >
                            <button className="bg-indigo-500 rounded-md w-full text-white hover:bg-indigo-600 ">
                              ajukan sewa
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
