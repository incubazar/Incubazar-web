import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Learning Hub - Free Resources for Founders & Entrepreneurs',
  description: 'Access comprehensive free learning resources for startup founders. Learn about finance, product development, market trends, case studies, and essential startup knowledge to build and scale your business.',
  keywords: ['startup learning', 'founder education', 'entrepreneurship resources', 'startup finance', 'product development', 'market trends', 'startup case studies', 'India startups', 'business education'],
  openGraph: {
    title: 'Startup Learning Hub - Free Resources for Founders',
    description: 'Comprehensive learning resources for startup founders covering finance, product, trends, and real-world case studies.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/learn',
  },
}

export default function LearnLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
