import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-900 px-4 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-gradient mb-8 rounded-md p-2 text-4xl font-bold">
          Siap Bermain? Hubungi Kami!
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
          Jangan lewatkan keseruan bermain PlayStation 4 atau 5. Hubungi kami
          sekarang untuk reservasi atau informasi lebih lanjut.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center rounded-md p-4"
          >
            WhatsApp Kami
          </Link>
          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center rounded-md p-4"
          >
            Pesan lewat aplikasi
          </Link>
        </div>
        <p className="mt-8 text-gray-400">
          Jam Operasional: Senin - Minggu, 11:00 - 02:00 WITA
        </p>
      </div>
    </section>
  )
}

export default Contact
