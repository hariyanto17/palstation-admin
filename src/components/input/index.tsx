'use client'

import React, { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  description?: string
}

const Input = ({ label, description, error, ...props }: InputProps) => {
  const [focus, setFocus] = useState(false)
  return (
    <div className="relative mb-4 flex flex-col">
      {label && (
        <label
          htmlFor={props.id}
          className="absolute -top-2 left-3 z-10 rounded-md px-1 text-xs font-normal text-gray-300"
        >
          {label}
        </label>
      )}
      <div
        className={`relative overflow-hidden rounded-lg border p-2 ${focus ? 'border-[#8e2de2]' : 'border-gray-700'} // Border saat fokus (ungu), saat tidak fokus (abu-abu gelap) transition-colors duration-200`}
      >
        <input
          id={props.id}
          className="w-full bg-[#2d3748] text-gray-200 placeholder-gray-400 focus:outline-none"
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
      {description && (
        <p className="mt-1 ml-1 text-xs font-normal text-gray-400">
          {description}
        </p>
      )}
      {error && (
        <p className="mt-1 ml-1 text-xs font-normal text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input
