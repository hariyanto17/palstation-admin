import Layout from '@/components/layout'
import React from 'react'

const navItems = [
  { name: 'Home', href: '/employee/home' },
  { name: 'Absen', href: '/employee/attendance' },
  { name: 'Booking List', href: '/employee/booking' },
  { name: 'Profile', href: '/employee/profile' },
]

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout navItems={navItems}>{children}</Layout>
}

export default EmployeeLayout
