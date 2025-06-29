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
    <div className="relative flex flex-col">
      <label
        id={props.id}
        className="absolute -top-2 left-1 bg-gray-900 text-xs font-normal text-white"
      >
        {label}
      </label>
      <div
        className={`rounded-md border p-1 ${focus ? 'border-[#ff53fd]' : 'border-[#261156]'}`}
      >
        <input
          className="w-full text-white"
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
      {description && (
        <p className="text-xs font-normal text-[#9693A5]">{description}</p>
      )}
      {error && (
        <p className="bg-white text-xs font-normal text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input
