'use client'

import Link from 'next/link'
import React, { useState } from 'react'

// AdminLayout Component
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { name: 'Home', href: '/admin/home' },
    { name: 'Keuangan', href: '/admin/finance' },
    { name: 'Absen', href: '/admin/attendance' },
    { name: 'Booking List', href: '/admin/booking' },
    { name: 'User Management', href: '/admin/users' },
    { name: 'Profile', href: '/admin/profile' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-950">
      <aside
        className={`fixed inset-y-0 left-0 w-64 transform bg-gray-900 shadow-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-20 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0`} // Added z-index for sidebar to be above content
      >
        <div className="flex items-center justify-between border-b border-gray-700 p-6">
          <h2 className="text-gradient text-2xl font-bold">Admin Panel</h2>
          <button
            onClick={toggleSidebar}
            className={`text-gray-300 focus:outline-none md:hidden`}
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block rounded-lg p-3 text-gray-300 transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t border-gray-700 p-4">
          <button
            onClick={() => console.log('Logout clicked')}
            className="btn-primary flex w-full items-center justify-center rounded-lg py-3 text-lg font-semibold transition-transform duration-200"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 transition-all duration-300 ease-in-out">
        {isSidebarOpen && (
          <div
            className="bg-opacity-50 fixed inset-0 z-10 bg-black md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-30 rounded-md bg-gray-800 p-2 text-gray-300 focus:outline-none md:hidden ${isSidebarOpen ? 'hidden' : ''}`}
          aria-label="Open sidebar"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div className="rounded-lg bg-gray-800 p-6 shadow-lg">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
