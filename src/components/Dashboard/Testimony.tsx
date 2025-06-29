import React from 'react'
import { testimonyData } from './data'

interface TestimonyCardProps {
  says: string
  name: string
  profesi: string
}

const TestimonyCard = ({ name, profesi, says }: TestimonyCardProps) => {
  return (
    <div className="card p-6 text-left">
      <p className="mb-4 text-gray-300 italic">{says}</p>
      <div className="flex items-center">
        <div className="mr-3 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-purple-500">
          <p className="text-2xl font-bold text-white">{name.charAt(0)}</p>
        </div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-400">{profesi}</p>
        </div>
      </div>
    </div>
  )
}

const Testimony = () => {
  return (
    <section id="testimonials" className="bg-gray-800 px-4 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-gradient mb-12 rounded-md p-2 text-4xl font-bold">
          Apa Kata Pelanggan Kami?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonyData.map((testi) => (
            <TestimonyCard key={testi.name} {...testi} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimony
