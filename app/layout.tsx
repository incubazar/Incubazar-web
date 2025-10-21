import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Incubazar - Trust-First Digital Incubator',
  description: 'Connecting India\'s early-stage startup founders with angel investors through a compliant, transparent platform',
  keywords: ['startup', 'investment', 'incubator', 'angel investors', 'India', 'private placement', 'Section 42'],
  authors: [{ name: 'Incubazar' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Incubazar - Trust-First Digital Incubator',
    description: 'Connecting India\'s early-stage startup founders with angel investors',
    type: 'website',
  },
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
