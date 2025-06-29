'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { headerlists } from './data'

interface NavigateProps {
  href: string
  children: string
  onClick?: () => void
}

const Navigate = ({ href, children }: NavigateProps) => {
  return (
    <Link
      href={href}
      className="rounded-md p-2 text-gray-300 transition duration-300 hover:text-white"
    >
      {children}
    </Link>
  )
}

const MobileNavigation = ({ href, children, onClick }: NavigateProps) => {
  return (
    <Link
      href={href}
      className="block px-6 py-2 text-gray-300 transition duration-300 hover:text-white"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <header className="fixed z-10 w-full bg-gray-900 px-6 py-4 shadow-lg md:px-12">
      <nav className="container mx-auto flex items-center justify-between">
        <Link
          href="#"
          className="text-gradient rounded-md p-2 text-3xl font-bold"
        >
          Rental PS
        </Link>
        <div className="hidden space-x-8 md:flex">
          {headerlists.map((headerlist) => (
            <Navigate href={headerlist.href} key={headerlist.href}>
              {headerlist.children}
            </Navigate>
          ))}

          <Link
            className="btn-primary inline-block min-w-[106] rounded-md p-4 text-lg"
            href={'/auth/signin'}
          >
            Sign In
          </Link>
        </div>

        <button
          className="text-gray-300 focus:outline-none md:hidden"
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="mt-2 rounded-md bg-gray-800 py-4 md:hidden">
          {headerlists.map((headerlist) => (
            <MobileNavigation
              href={headerlist.href}
              key={headerlist.href}
              onClick={toggleMobileMenu}
            >
              {headerlist.children}
            </MobileNavigation>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
