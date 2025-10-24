'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PremiumButton } from '@/components/ui/premium-button'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 border-b border-border/50 backdrop-blur-xl shadow-lg shadow-black/5 py-3'
          : 'bg-background/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Image 
                src="/logo.svg" 
                alt="Incubazar" 
                width={48} 
                height={48}
                className="transition-all duration-300"
              />
            </div>
            <span className="text-xl font-display font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Incubazar
            </span>
          </Link>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <Button 
                variant="ghost"
                className="font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/waitlist">
              <PremiumButton variant="premium" className="font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Waitlist
              </PremiumButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-3 border-t border-border/50 pt-4 animate-fade-in-down">
            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full font-semibold"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
              <PremiumButton 
                variant="premium"
                className="w-full font-semibold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Join Waitlist
              </PremiumButton>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
