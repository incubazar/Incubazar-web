import { Metadata } from 'next'
import AdminDashboardLayout from './admin-layout'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Platform administration, user management, startup approvals, investor verifications, and analytics. Internal use only.',
  openGraph: {
    title: 'Admin Dashboard | Incubazar',
    description: 'Platform administration and management portal.',
  },
  robots: {
    index: false, // Admin pages should never be indexed
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>
}

