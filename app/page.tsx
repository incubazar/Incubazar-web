import { Metadata } from 'next'
import EditorialNavbar from '@/components/editorial/EditorialNavbar'
import EditorialHero from '@/components/editorial/EditorialHero'
import EditorialFeatures from '@/components/editorial/EditorialFeatures'
import EditorialCTA from '@/components/editorial/EditorialCTA'
import EditorialFooter from '@/components/editorial/EditorialFooter'
import PageIndicator from '@/components/editorial/PageIndicator'
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Home',
  description: 'India\'s premier platform connecting early-stage startups with angel investors. Raise capital through Section 42 compliant private placements. Access venture calculators, due diligence tools, and comprehensive fundraising resources.',
  openGraph: {
    title: 'Incubazar - Startup Fundraising Platform | Connect with Angel Investors',
    description: 'Connect startups with angel investors in India. Platform features: venture calculator, due diligence tools, fundraising resources & Section 42 compliant placements.',
  },
}

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="min-h-screen bg-background page-transition overflow-x-hidden">
        <EditorialNavbar />
        <main className="relative">
          <EditorialHero />
          <EditorialFeatures />
          <EditorialCTA />
        </main>
        <EditorialFooter />
        <PageIndicator sections={3} />
      </div>
    </>
  )
}

