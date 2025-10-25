'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#for-founders', label: 'For Founders' },
    { href: '#for-investors', label: 'For Investors' },
    { href: '#community', label: 'Community' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-paper/90 backdrop-blur-md border-b border-graphite-200 shadow-editorial py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Monochrome */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Image 
                src="/logo.svg" 
                alt="Incubazar" 
                width={48} 
                height={48}
                className="transition-all duration-300"
              />
            </div>
            <span className="text-xl lg:text-2xl font-serif font-bold text-ink">
              Incubazar
            </span>
          </Link>

          {/* Desktop Navigation - Monochrome */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-graphite-600 hover:text-ink transition-all relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ink group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Buttons - Monochrome */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button 
                variant="ghost" 
                className="text-ink hover:bg-graphite-100"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button 
                className="bg-ink text-paper hover:bg-graphite-900"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Monochrome */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Monochrome */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-graphite-600 hover:text-ink transition-all py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-graphite-300">
              <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  className="w-full bg-ink text-paper hover:bg-graphite-900"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
