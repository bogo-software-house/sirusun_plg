/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client'

import { Fragment, useState } from 'react'

const product = {
  name: 'Rusun Kaliurang',
  price: '$192',
  href: '#',
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],

  description:
    'ini adalah rusun kaliurang',
  fasilitas: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  detail:
    [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ]
}

const products = [
  {
    id: 1,
    name: 'Blok A Lantai 1',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/9f/3a/99/9f3a99394ce0e63cc7b9c949c6767fb9.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 'Rp 300.000,00',
    tersedia: '5 kamar lagi nih'
  },
  {
    id: 2,
    name: 'Blok A Lantai 1',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/9f/3a/99/9f3a99394ce0e63cc7b9c949c6767fb9.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 'Rp 300.000,00',
    tersedia: '5 kamar lagi nih'
  },
  {
    id: 3,
    name: 'Blok A Lantai 1',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/9f/3a/99/9f3a99394ce0e63cc7b9c949c6767fb9.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 'Rp 300.000,00',
    tersedia: '5 kamar lagi nih'
  },
  {
    id: 4,
    name: 'Blok A Lantai 1',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/9f/3a/99/9f3a99394ce0e63cc7b9c949c6767fb9.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 'Rp 300.000,00',
    tersedia: '5 kamar lagi nih'
  }
  // More products...
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)


  return (
    <div className="bg-white">
      <main className="pt-10 sm:pt-5">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt=""
              src="https://i.pinimg.com/564x/e4/70/d4/e470d413f23265dfb3cb78793bd3214e.jpg"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt=""
                src="https://i.pinimg.com/564x/e5/57/22/e557228a0c514aeaaf0b09bff6b0e107.jpg"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt=""
                src="https://i.pinimg.com/564x/25/78/b1/2578b109c98559232178918cb940e37b.jpg"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt=""
              src="https://i.pinimg.com/564x/1f/b6/aa/1fb6aa3367786886829875a0439f8dbd.jpg"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-medium text-gray-900">Lokasi</p>
            <form className="mt-10">
            {/* maps */}
            <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Jl.%20Gajah%20Mada%20Jl.%20Kandis%20Raya,%20Kp.%20Olo,%20Kec.%20Nanggalo,%20Kota%20Padang,%20Sumatera%20Barat%2025173+(Rusun%20Kaliurang)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2 id="shipping-heading" className="text-sm font-medium text-gray-900">
                Details
              </h2>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.detail.map((detail) => (
                    <li key={detail} className="text-gray-400">
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Fasilitas</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.fasilitas.map((fasilitas) => (
                    <li key={fasilitas} className="text-gray-400">
                      <span className="text-gray-600">{fasilitas}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>   
          </div>
        </div>
        <section aria-labelledby="related-products-heading" className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 id="related-products-heading" className="text-xl font-bold tracking-tight text-gray-900">
              Kamar yang tersedia di rusun kaliurang
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.tersedia}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}
