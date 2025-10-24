import { Metadata } from 'next'
import PremiumNavbar from '@/components/premium/PremiumNavbar'
import PremiumHero from '@/components/premium/PremiumHero'
import PremiumFeatures from '@/components/premium/PremiumFeatures'
import GradientCTA from '@/components/premium/GradientCTA'
import PremiumFooter from '@/components/premium/PremiumFooter'
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Home',
  description: 'We connect visionaries and help them turn ideas into investments. Join India\'s trusted platform to connect with angel investors and raise funding through Section 42 compliant private placements.',
  openGraph: {
    title: 'Incubazar - Connecting Visionaries with Investors',
    description: 'We connect visionaries and help them turn ideas into investments. Join 500+ founders and 200+ angel investors.',
  },
}

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="min-h-screen bg-background page-transition">
        <PremiumNavbar />
        <main className="relative">
          <PremiumHero />
          <PremiumFeatures />
          <GradientCTA />
        </main>
        <PremiumFooter />
      </div>
    </>
  )
}

