import Link from 'next/link'
import React from 'react'

const MainHome = () => {
  return (
    <section
      id="home"
      className="relative flex h-screen items-center justify-center bg-[#1a202c] bg-cover bg-center px-4 text-center"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
      }}
    >
      <div className="absolute inset-0 rounded-md bg-black opacity-60"></div>
      <div className="bg-opacity-70 relative z-10 mx-auto max-w-4xl rounded-md bg-gray-800 p-8">
        <h1 className="text-gradient mb-4 rounded-md p-2 text-5xl leading-tight font-extrabold md:text-7xl">
          Sewa PlayStation 4 & 5
        </h1>
        <p className="mb-8 text-xl text-gray-200 md:text-2xl">
          Nikmati pengalaman gaming terbaik dengan pilihan konsol terbaru dan
          game-game hits.
        </p>
        <Link
          href="#pricing"
          className="btn-primary inline-block rounded-md p-4 text-lg"
        >
          Lihat Harga & Pesan Sekarang!
        </Link>
      </div>
    </section>
  )
}

export default MainHome
