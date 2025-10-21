import { Metadata } from 'next'
import InvestorDashboardLayout from './dashboard-layout'

export const metadata: Metadata = {
  title: 'Investor Dashboard',
  description: 'Discover curated startup deals, manage your investment portfolio, track your investments, and connect with India\'s best early-stage startups. Section 42 compliant opportunities.',
  openGraph: {
    title: 'Investor Dashboard | Incubazar',
    description: 'Explore deals, invest in startups, and grow your portfolio on India\'s trusted investment platform.',
  },
  robots: {
    index: false, // Dashboard pages should not be indexed
    follow: false,
  },
}

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <InvestorDashboardLayout>{children}</InvestorDashboardLayout>
}

