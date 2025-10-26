import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Access Your Incubazar Account',
  description: 'Login to your Incubazar account to connect with investors, manage your startup profile, access venture calculators, and track your fundraising journey.',
  keywords: ['login', 'sign in', 'startup platform login', 'founder login', 'investor login', 'India'],
  openGraph: {
    title: 'Login - Incubazar',
    description: 'Access your Incubazar account to manage fundraising and connect with investors.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/auth/login',
  },
  robots: {
    index: false, // Don't index login page
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
