import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Join Incubazar Platform',
  description: 'Create your Incubazar account. Join India\'s premier startup fundraising platform to connect with angel investors, access venture tools, and raise capital for your startup.',
  keywords: ['register', 'sign up', 'join platform', 'startup registration', 'founder account', 'investor registration', 'India'],
  openGraph: {
    title: 'Register - Incubazar',
    description: 'Create your account to connect with investors and access fundraising tools.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/auth/register',
  },
  robots: {
    index: false, // Don't index registration page
    follow: true,
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
