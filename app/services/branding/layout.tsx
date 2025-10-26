import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supplementary Branding Services - Incubazar',
  description: 'Optional branding support for startups on our platform. Our core focus is connecting founders with investors - branding is a supplementary service we offer to select startups.',
  keywords: ['startup platform', 'investor connection', 'fundraising', 'India', 'angel investors', 'startup funding'],
  openGraph: {
    title: 'Supplementary Services - Incubazar',
    description: 'While our focus is connecting startups with investors, we offer optional branding support to select startups.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/services/branding',
  },
  robots: {
    index: false, // Don't prioritize this in search results
    follow: true,
  },
}

export default function BrandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
