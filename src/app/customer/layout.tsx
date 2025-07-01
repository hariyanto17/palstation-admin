import Layout from '@/components/layout'
import React from 'react'

const navItems = [
  { name: 'Booking List', href: '/employee/booking' },
  { name: 'Profile', href: '/employee/profile' },
]

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout navItems={navItems}>{children}</Layout>
}

export default CustomerLayout
