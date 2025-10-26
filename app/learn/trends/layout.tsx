import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Market Trends & Industry Insights - India 2025',
  description: 'Stay updated with latest startup market trends, industry insights, funding patterns, and emerging opportunities in India. Analysis and data for founders and investors.',
  keywords: ['startup trends', 'market trends India', 'startup insights', 'funding trends', 'industry analysis', 'Indian startup ecosystem', 'venture capital trends', '2025 trends'],
  openGraph: {
    title: 'Startup Market Trends - Incubazar Learning Hub',
    description: 'Latest startup trends, funding patterns, and market insights for India\'s startup ecosystem.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn/trends',
  },
}

export default function TrendsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
