import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Development for Startups - Build Better Products',
  description: 'Learn product development essentials for startups: MVP creation, user research, product-market fit, iteration strategies, and scaling. Free guide for founders.',
  keywords: ['product development', 'MVP', 'product-market fit', 'startup product', 'user research', 'product strategy', 'agile development', 'India startups'],
  openGraph: {
    title: 'Product Development Guide - Incubazar Learning Hub',
    description: 'Master product development for startups. Learn MVP, PMF, user research, and scaling strategies.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn/product',
  },
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
