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
  description: 'We connect visionaries and help them turn ideas into investments. Join India\'s trusted platform to connect with angel investors and raise funding through Section 42 compliant private placements.',
  openGraph: {
    title: 'Incubazar - Connecting Visionaries with Investors',
    description: 'We connect visionaries and help them turn ideas into investments. India\'s trust-first platform for startup funding.',
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

