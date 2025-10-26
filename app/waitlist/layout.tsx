import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist - Early Access to Incubazar Platform',
  description: 'Join the exclusive Incubazar waitlist and get early access to India\'s premier startup funding platform. Connect with angel investors and raise capital for your startup through Section 42 compliant private placements.',
  keywords: ['startup waitlist', 'early access', 'angel investors', 'startup funding', 'India', 'private placement', 'fundraising', 'investment platform'],
  openGraph: {
    title: 'Join the Incubazar Waitlist - Early Access',
    description: 'Get early access to India\'s premier platform connecting startups with angel investors.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/waitlist',
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
