import React from 'react'
import { services } from './data'

const Service = () => {
  return (
    <section id="services" className="bg-gray-800 px-4 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-gradient mb-12 rounded-md p-2 text-4xl font-bold">
          Layanan Kami
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              className="card flex flex-col items-center p-6"
              key={service.title}
            >
              <div className="bg-gra mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-500">
                <p className="text-xl font-bold text-white">
                  {service.iconText}
                </p>
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-center text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service
