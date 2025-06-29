import React from 'react'
import { prices } from './data'
import Link from 'next/link'

const Price = () => {
  return (
    <section id="pricing" className="bg-gray-900 px-4 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-gradient mb-12 rounded-md p-2 text-4xl font-bold">
          Pilihan Harga Terbaik
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {prices.map((price) => (
            <div
              className="card flex flex-col items-center p-8"
              key={price.title}
            >
              <h3 className="mb-4 text-3xl font-semibold text-white">
                {price.title}
              </h3>
              <p className="text-gradient mb-6 text-5xl font-bold">
                Rp {price.price}
                <span className="text-xl text-gray-400">/jam</span>
              </p>
              <ul className="mb-8 space-y-2 text-left text-gray-300">
                {price.benefits.map((benefit) => (
                  <li className="flex items-center" key={benefit}>
                    <svg
                      className="mr-2 h-5 w-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link href="#contact" className="btn-primary rounded-md p-3">
                Pesan {price.title}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-400">
          Harga dapat berubah sewaktu-waktu. Silakan hubungi kami untuk
          penawaran khusus dan paket bundling.
        </p>
      </div>
    </section>
  )
}

export default Price
