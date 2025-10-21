import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/query-provider'

const inter = Inter({ subsets: ['latin'] })

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
    default: 'Incubazar - We Connect Visionaries & Turn Ideas into Investments',
    template: '%s | Incubazar'
  },
  description: 'We connect visionaries and help them turn ideas into investments. India\'s trusted platform connecting early-stage startup founders with angel investors. Section 42 compliant private placements.',
  keywords: ['startup', 'investment', 'angel investors', 'India', 'private placement', 'Section 42', 'fundraising', 'venture capital', 'seed funding', 'startup ecosystem', 'entrepreneur', 'founder', 'investor network', 'startup funding'],
  authors: [{ name: 'Incubazar', url: 'https://incubazar.com' }],
  creator: 'Incubazar',
  publisher: 'Incubazar',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://incubazar.com',
    title: 'Incubazar - We Connect Visionaries & Turn Ideas into Investments',
    description: 'We connect visionaries and help them turn ideas into investments. India\'s trusted platform connecting startup founders with angel investors.',
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
    title: 'Incubazar - We Connect Visionaries',
    description: 'We connect visionaries and help them turn ideas into investments. Trusted platform for startup funding in India.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
