import React, { useState } from "react";
import { BuildingOffice2Icon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Payload sesuai format yang diharapkan backend Laravel
    const payload = {
      custom_id: "SGN000001",
      description: formData.message,
      email: formData.email,
      nama: formData.nama,
    };

    try {
      const response = await fetch("https://api.sirusun.com/api/suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      // Display part of the response result in the success message
      setSuccessMessage(`Keluhan berhasil dikirim: ${result.message || "Terima kasih telah menghubungi kami."}`);
      setFormData({ nama: "", email: "", message: "" });
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat mengirim keluhan. Silakan coba lagi.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
                <defs>
                  <pattern x="100%" y={-1} id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width={200} height={200} patternUnits="userSpaceOnUse">
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Hubungi Kami</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">Kami siap membantu Anda. Jika ada pertanyaan atau kebutuhan lebih lanjut, jangan ragu untuk menghubungi kami.</p>

            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  Jl. Slamet Riady No.550, Kuto Batu, Kec. Ilir Tim. II,
                  <br />
                  Kota Palembang, Sumatera Selatan 30114
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <p className="text-gray-600">+62 852-7311-1290</p>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <p href="sirusunpalembang@gmail.com" className="text-gray-600">
                    sirusunpalembang@gmail.com
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="relative isolate bg-white">
          <form onSubmit={handleSubmit} className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                    Nama
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                    Keluhan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}
              {successMessage && <p className="mt-4 text-sm text-green-600">{successMessage}</p>}

              <button type="submit" disabled={isSubmitting} className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
