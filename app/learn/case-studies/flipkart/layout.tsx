import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flipkart Case Study - How India\'s E-Commerce Giant Was Built',
  description: 'Deep dive into Flipkart\'s journey from books to India\'s biggest e-commerce platform. Learn about their fundraising rounds, pivots, competition with Amazon, and $16B Walmart acquisition.',
  keywords: ['Flipkart case study', 'Indian e-commerce', 'startup success', 'Walmart acquisition', 'fundraising journey', 'Sachin Bansal', 'Binny Bansal', 'India'],
  openGraph: {
    title: 'Flipkart Case Study - Building India\'s E-Commerce Giant',
    description: 'From books to billions: How Flipkart became India\'s leading e-commerce platform and got acquired by Walmart for $16B.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn/case-studies/flipkart',
  },
}

export default function FlipkartCaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
