/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { content } from "flowbite-react/tailwind";
import alur from "../../assets/images/alur.png";
const timeline = [
  {
    id: 1,
    content:
      "Download,isi formulir & Upload persayaratan di website resmi sirusun",
    icon: UserIcon,
  },
  {
    id: 2,
    content: "Menunggu Verifikasi dari dinas PU",
    icon: HandThumbUpIcon,
  },
  {
    id: 3,
    content:
      "Mengecek Ketersedian Unit,Jika tersedia lanjut ke pemabyaran,jika penuh maka masuk keantrian",
    icon: CheckIcon,
  },
  {
    id: 4,
    content: "Pembayaran restribusi/sewa",
    icon: HandThumbUpIcon,
  },
  {
    id: 5,
    content: "Penerbitan izin sewa",
    icon: CheckIcon,
  },
];

const persyaratan = [
  {
    id: 1,
    syarat: "KTP Domisili Palembang",
    nomor: "1",
  },
  {
    id: 2,
    syarat: "Kartu Keluarga Pelammebang",
    nomor: "2",
  },
  {
    id: 3,
    syarat: "Terdaftar Gamis ( Keluarga Miskin )",
    nomor: "3",
  },
  {
    id: 4,
    syarat: "Surat Pernyataan ",
    nomor: "4",
    surat: [
      "Bekeluarga",
      "Dalam 1 KK tidak ada ASN,TNI, dan POLRI",
      "Masuk Keluarga Miskin",
    ],
  },
  {
    id: 5,
    syarat: "Pas Photo 4x6",
    nomor: "5",
  },
  {
    id: 6,
    syarat: "Formulis Pendaftaran (tersedia)",
    nomor: "6",
  },
  {
    id: 7,
    syarat: "Surat Pernyataan belum memiliki rumah",
    nomor: "7",
  },
  {
    id: 8,
    syarat: "Surat Pernyataan akan dihuni oleh 1 keluarga pemohon",
    nomor: "8",
  },
  {
    id: 8,
    syarat: "Surat keterangan penhasilan",
    nomor: "8",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Example() {
  return (
    <>
      <div className="mx-auto max-w-2xl text-center my-10 lg:my-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
          Alur dan Pendaftaran
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Silahkan Melihat Informasi Syarat dan Prosedur Pendaftaran
        </p>
      </div>
      <div className="relative isolate bg-indigo-500 " id="Alur">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 ">
          {/* colom 1 */}
          <div>
            <h2 className="text-white mt-8 text-center font-semibold text-2xl">
              Alur Pendafatran
            </h2>

            <div className="flow-root lg:ml-8 sm:ml-0 place-items-center mb-16">
              <img alt="alur" src={alur} className=" lg:h-screen " />
              {/* <ul role="list" className="-mb-8">
                {timeline.map((event, eventIdx) => (
                  <li key={event.id}>
                    <div className="relative pb-8">
                      {eventIdx !== timeline.length - 1 ? <span aria-hidden="true" className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" /> : null}
                      <div className="relative flex space-x-5">
                        <div>
                          <span className={classNames(event.iconBackground, "flex h-8 w-8 items-center bg-white justify-center rounded-full ring-4  ring-gray-200")}>
                            <event.icon aria-hidden="true" className="h-5 w-5 text-indigo-500" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-lg font-semibold text-white">{event.content} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
          {/* colom 2 */}
          <div>
            <h2 className="text-white mt-8 text-center font-semibold text-2xl">
              Persyaratan
            </h2>
            <div className="flow-root ml-8 p-8 mb-16  mt-8 rounded-md">
              <ul role="list" className="-mb-8">
                {persyaratan.map((event, eventIdx) => (
                  <li key={event.id}>
                    <div className="relative pb-8">
                      {eventIdx !== persyaratan.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        />
                      ) : null}
                      <div className="relative flex space-x-5">
                        <div>
                          <span className="flex h-8 w-8 items-center bg-white justify-center rounded-full ring-4 ring-gray-200">
                            <span className="text-indigo-500 font-semibold">
                              {event.nomor}
                            </span>
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-lg font-semibold text-white">
                              {event.syarat}
                            </p>
                            {event.surat && event.surat.length > 0 && (
                              <ul className="font-semibold ml-8 list-disc text-white">
                                {event.surat.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
