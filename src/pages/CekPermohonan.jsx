import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Example() {
  const [nik, setNik] = useState(""); // State untuk NIK input
  const [searchResults, setSearchResults] = useState([]); // State untuk hasil pencarian (default array kosong)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSearch = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true);
    setError(null);

    try {
      // Panggil API untuk mencari data berdasarkan NIK
      const response = await axios.get(`http://127.0.0.1:8000/api/transactions/${nik}`);
      console.log("Respons API:", response.data.data); // Debugging respons
      setSearchResults(response.data.data); // Simpan data hasil pencarian ke state
    } catch (err) {
      console.error("Kesalahan:", err); // Debug error jika terjadi
      setError("Data tidak ditemukan atau terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg w-full max-w-2xl rounded-lg">
        <div className="mt-6 ml-8 font-bold text-xl ">
          <Link to="/" className="text-black ">
            ←
          </Link>
        </div>
        <div className="px-4 py-5 sm:p-6 ">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 text-center">Cek Status Permohonan</h3>
          <div className="mt-2 max-w-lg mx-auto text-sm text-gray-500 text-center">
            <p>Masukkan NIK anda</p>
          </div>

          {/* Form Pencarian */}
          <form onSubmit={handleSearch} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center text-black sm:gap-4">
            <div className="flex-grow">
              <label htmlFor="nik" className="sr-only">
                NIK
              </label>
              <input
                id="nik"
                type="text"
                placeholder="Masukkan NIK"
                value={nik}
                onChange={(e) => setNik(e.target.value)} // Update state NIK
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? "Loading..." : "Cek Status"}
            </button>
          </form>

          {/* Tabel Hasil Pencarian */}
          <div className="overflow-x-auto mt-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            {searchResults.length > 0 ? (
              <table className="w-full border border-gray-200 divide-y divide-gray-300 text-sm text-gray-700">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Nama</th>
                    <th className="px-4 py-2 text-left font-medium">NIK</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-left font-medium">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{result.name}</td>
                      <td className="px-4 py-2">{result.nik}</td>
                      <td className="px-4 py-2">{result.status}</td>
                      <td className="px-4 py-2">{result.keterangan || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center mt-4">Tidak ada data ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
