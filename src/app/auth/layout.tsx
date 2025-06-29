import Image from 'next/image'
import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative h-dvh max-h-dvh w-full max-w-dvw">
      <Image
        src="/images/auth-background.jpg"
        alt="background"
        fill
        className="object-cover"
      />
      <div className="absolute flex h-full w-full items-center justify-center xl:justify-evenly">
        <div className="min-w-72 rounded-4xl bg-white">{children}</div>
        <div className="hidden min-w-72 xl:inline"></div>
      </div>
    </div>
  )
}
