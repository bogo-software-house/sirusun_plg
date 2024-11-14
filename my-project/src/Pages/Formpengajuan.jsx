import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
export default function Example() {
  return (
    <div className="relative isolate bg-white h-screen ">
      <h1 className="text-black lg:text-2xl font-semibold lg:ml-40 mt-10 sm:ml-8 mt-10 sm:text-xl sm:text-center ">Pengajuan Penyewaan</h1>
      <p className="text-gray-500 pb-10 text-sm  lg:ml-40  sm:ml-20 pb-4 text-center">Isi data dengan sebaik-baiknya</p>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 pb-10 ">
        <form action="#" method="POST" className="px-3 pt-5 pb-24 sm:pb-24 m-10 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nama" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nama
                </label>
                <div className="mt-2.5">
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    autoComplete="nama"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Tempat Lahir
                </label>
                <div className="mt-2.5">
                  <input
                    id="lahir"
                    name="lahir"
                    type="text"
                    autoComplete="lahir"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Jenis Kelamin
              </label>
              <div className="mt-2">
                <select
                  id="jeniskelamin"
                  name="jeniskelaminn"
                  autoComplete="jeniskelamin"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  <option>Laki-Laki</option>
                  <option>perempuan</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nomor Telepon
                </label>
                <div className="mt-2.5">
                  <input
                    id="notel"
                    name="notel"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Warga Negara
                </label>
                <div className="mt-2.5">
                  <input
                    id="wnegara"
                    name="wnegara"
                    type="text"
                    autoComplete="wnegara"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Pekerjaan
                </label>
                <div className="mt-2.5">
                  <input
                    id="Pekerjaan"
                    name="Pekerjaan"
                    type="text"
                    autoComplete="pekerjaan"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Scan Kartu Keluarga
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG max 5MB</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </form>
        <form action="#" method="POST" className="px-3 pt-10 pb-24 sm:pb-10 m-10 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nama" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nama
                </label>
                <div className="mt-2.5">
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    autoComplete="nama"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Tempat Lahir
                </label>
                <div className="mt-2.5">
                  <input
                    id="lahir"
                    name="lahir"
                    type="text"
                    autoComplete="lahir"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Jenis Kelamin
              </label>
              <div className="mt-2">
                <select
                  id="jeniskelamin"
                  name="jeniskelaminn"
                  autoComplete="jeniskelamin"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  <option>Laki-Laki</option>
                  <option>perempuan</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nomor Telepon
                </label>
                <div className="mt-2.5">
                  <input
                    id="notel"
                    name="notel"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Warga Negara
                </label>
                <div className="mt-2.5">
                  <input
                    id="wnegara"
                    name="wnegara"
                    type="text"
                    autoComplete="wnegara"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Pekerjaan
                </label>
                <div className="mt-2.5">
                  <input
                    id="Pekerjaan"
                    name="Pekerjaan"
                    type="text"
                    autoComplete="pekerjaan"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Scan Kartu Keluarga
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG max 5MB</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ajukan
              </button>
            </div>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
