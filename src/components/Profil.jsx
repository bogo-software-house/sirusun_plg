import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Rusun Kertapati",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing" },
  },
  {
    id: 2,
    title: "Rusun Kasnariansyah",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing" },
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
            Dinas PU Kota Palembang Memiliki 2 Rusun
          </p>
        </div>

        {/* Grid Responsif */}
        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full">
                <img
                  alt=""
                  src={post.imageUrl}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="p-6">
                <div className="mt-4 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                    {post.category.title}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-4 text-lg font-semibold leading-6 text-indigo-900 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
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
