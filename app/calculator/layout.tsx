import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Venture Calculator - Free Valuation Tool | Incubazar',
  description: 'Calculate your startup valuation with our free venture calculator. Get instant valuations using revenue multiples, DCF method, or scorecard approach. Essential tool for fundraising preparation.',
  keywords: ['venture calculator', 'startup valuation', 'valuation tool', 'startup calculator', 'fundraising calculator', 'company valuation', 'India startup', 'valuation methods'],
  openGraph: {
    title: 'Free Startup Venture Calculator - Incubazar',
    description: 'Calculate your startup valuation instantly. Free tool using multiple valuation methods to help you prepare for fundraising.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/calculator',
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
