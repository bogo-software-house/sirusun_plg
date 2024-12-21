import { Link } from "react-router-dom";
// Perbaiki cara impor gambar, tanpa menggunakan objek
import kertapati from "../../assets/images/rusun6.jpeg";
import kasnariansyah from "../../assets/images/rusun5.jpeg"; // Pastikan ekstensi file gambar sudah benar (misalnya .jpeg atau .jpg)

const posts = [
  {
    id: 1,
    title: "Rusun Kertapati",
    image: kertapati, // Pastikan gambar dipanggil dengan benar
  },
  {
    id: 2,
    title: "Rusun Kasnariansyah",
    image: kasnariansyah, // Pastikan gambar dipanggil dengan benar
  },
];

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32" id="Rusun">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
            Profil Rusun
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Dinas Perkimtan Kota Palembang Memiliki 2 Rusun
          </p>
        </div>

        {/* Grid Responsif */}
        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative w-full">
                <img
                  alt=""
                  src={post.image} // Gambar sudah benar ditampilkan
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="p-6">
                <div className="group relative">
                  <h3 className="mt-4 text-lg font-semibold leading-6 text-indigo-900 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                </div>
                <div className="mt-6 flex">
                  <Link
                    to={`/ProfilRusun/${post.id}`} // Mengarahkan ke halaman profil sesuai ID
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Cek Rusun
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
