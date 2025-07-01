'use client'

import Layout from '@/components/layout'
import React from 'react'

const navItems = [
  { name: 'Home', href: '/admin/home' },
  { name: 'Keuangan', href: '/admin/finance' },
  { name: 'Absen', href: '/admin/attendance' },
  { name: 'Booking List', href: '/admin/booking' },
  { name: 'User Management', href: '/admin/users' },
  { name: 'Profile', href: '/admin/profile' },
]

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout navItems={navItems}>{children}</Layout>
}

export default AdminLayout
