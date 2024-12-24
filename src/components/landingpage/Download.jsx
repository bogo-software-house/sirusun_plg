import React from "react"; // Pastikan React diimpor

import download1 from "../../assets/images/rusun6.jpeg";
import download2 from "../../assets/images/rusun5.jpeg";
import download3 from "../../assets/images/rusun3.jpeg";

const posts = [
  {
    id: 1,
    title: "Panduan Pendaftaran",
    href: "https://sirusun.com/PanduanPendaftaran.pdf", // Rute ke file PDF
    description: "downl",
    image: download1,
  },
  {
    id: 2,
    title: "Formulir Pendaftaran",
    href: "/FormPengajuan", // Jika tidak ada file PDF, gunakan '#' atau link lain
    description: "downl",
    image: download2,
  },
  {
    id: 3,
    title: "Perwali",
    href: "https://sirusun.com/perwali.pdf", // Jika tidak ada file PDF, gunakan '#' atau link lain
    description: "downl",
    image: download3,
  },
  // More posts...
];

export default function Example() {
  return (
    <div className="lg:h-screen mb-12 sm:py-12" id="Download">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Download</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Silahkan Download Untuk Melihat Informasi Lebih Lanjut</p>
      </div>
      <div className="py-24 sm:py-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl auto-rows-fr sm:grid-cols-2 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="relative isolate flex flex-col justify-end items-center overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <div className="mt-4 flex items-center gap-x-6">
                  <a
                    href={post.href} // Arahkan ke file PDF
                    target={post.title === "Formulir Pendaftaran" ? "_self" : "_blank"} // "Daftar" tetap di tab yang sama
                    className="rounded-md bg-indigo-600 px-20 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    rel="noreferrer"
                  >
                    {post.title === "Formulir Pendaftaran" ? "Daftar" : "Download"}
                  </a>
                </div>
                <img alt="" src={post.image} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
