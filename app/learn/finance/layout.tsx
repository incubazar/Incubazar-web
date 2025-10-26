import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Finance & Fundraising Guide - Free Learning Resources',
  description: 'Master startup finance fundamentals: cap tables, equity dilution, term sheets, valuations, and fundraising strategies. Free comprehensive guide for founders in India.',
  keywords: ['startup finance', 'fundraising guide', 'cap table', 'equity dilution', 'term sheet', 'startup valuation', 'venture capital', 'angel investing', 'India'],
  openGraph: {
    title: 'Startup Finance Guide - Incubazar Learning Hub',
    description: 'Learn startup finance fundamentals, cap tables, valuations, and fundraising strategies. Free comprehensive guide for founders.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn/finance',
  },
}

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
