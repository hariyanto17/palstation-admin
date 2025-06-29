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
        className="absolute -top-3 left-1 bg-white text-sm font-normal text-[#9693A5]"
      >
        {label}
      </label>
      <div
        className={`rounded-md border p-1 ${focus ? 'border-[#ff53fd]' : 'border-[#261156]'}`}
      >
        <input
          className="w-full"
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
      {description && (
        <p className="bg-white text-xs font-normal text-[#9693A5]">
          {description}
        </p>
      )}
      {error && (
        <p className="bg-white text-xs font-normal text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input
