import { Metadata } from 'next'
import FounderDashboardLayout from './dashboard-layout'

export const metadata: Metadata = {
  title: 'Founder Dashboard',
  description: 'Manage your startup profile, create fundraising deals, connect with angel investors, and track your fundraising progress. Section 42 compliant private placements.',
  openGraph: {
    title: 'Founder Dashboard | Incubazar',
    description: 'Create deals, connect with investors, and raise funding for your startup through India\'s trusted platform.',
  },
  robots: {
    index: false, // Dashboard pages should not be indexed
    follow: false,
  },
}

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <FounderDashboardLayout>{children}</FounderDashboardLayout>
}

