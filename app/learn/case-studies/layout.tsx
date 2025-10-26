import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Case Studies - Real Success Stories from India',
  description: 'Learn from successful Indian startups: Flipkart, Razorpay, and more. Detailed case studies covering fundraising, growth strategies, pivots, and key lessons for founders.',
  keywords: ['startup case studies', 'Indian startup stories', 'Flipkart case study', 'Razorpay case study', 'startup success stories', 'founder lessons', 'India'],
  openGraph: {
    title: 'Startup Case Studies - Incubazar Learning Hub',
    description: 'Real success stories and lessons from India\'s top startups. Learn from Flipkart, Razorpay, and more.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn/case-studies',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
