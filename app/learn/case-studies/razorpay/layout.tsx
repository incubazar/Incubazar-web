import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Razorpay Case Study - Developer-First Fintech Revolution',
  description: 'How Razorpay became India\'s leading payment gateway by focusing on developers. Learn about their $7.5B journey, product strategy, and expansion from payments to banking.',
  keywords: ['Razorpay case study', 'fintech startup', 'payment gateway India', 'developer-first', 'startup growth', 'Y Combinator', 'unicorn startup', 'India'],
  openGraph: {
    title: 'Razorpay Case Study - Developer-First Fintech Success',
    description: 'How two IIT graduates built India\'s leading payment infrastructure by putting developers first. $7.5B valuation story.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn/case-studies/razorpay',
  },
}

export default function RazorpayCaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
