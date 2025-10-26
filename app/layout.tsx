import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/query-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://incubazar.com'),
  title: {
    default: 'Incubazar - Connect Startups with Angel Investors | Fundraising Platform India',
    template: '%s | Incubazar'
  },
  description: 'India\'s premier platform connecting early-stage startups with angel investors. Raise capital through Section 42 compliant private placements. Access venture calculators, due diligence tools, and fundraising resources.',
  keywords: ['startup funding India', 'angel investors', 'private placement', 'Section 42', 'fundraising platform', 'venture capital', 'seed funding', 'startup ecosystem', 'entrepreneur', 'founder platform', 'investor network', 'due diligence', 'venture calculator', 'startup resources'],
  authors: [{ name: 'Incubazar', url: 'https://incubazar.com' }],
  creator: 'Incubazar',
  publisher: 'Incubazar',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
    shortcut: '/icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://incubazar.com',
    title: 'Incubazar - Startup Fundraising Platform | Connect with Angel Investors',
    description: 'India\'s premier platform connecting startups with angel investors. Raise capital through Section 42 compliant placements. Access venture calculators and fundraising tools.',
    siteName: 'Incubazar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Incubazar - Connecting Visionaries with Investors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Incubazar - Startup Fundraising Platform India',
    description: 'Connect startups with angel investors. Raise capital through compliant private placements. Venture calculators, due diligence tools & resources.',
    creator: '@incubazar',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://incubazar.com',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={playfair.variable}>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
            <SpeedInsights />
            <Analytics />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
