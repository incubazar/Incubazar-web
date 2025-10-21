'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 border-b border-border backdrop-blur-lg py-3'
          : 'bg-background/60 backdrop-blur-md py-4'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-sm">IB</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Incubazar
            </span>
          </Link>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <Button 
                variant="ghost"
                className="font-medium"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="gradient-primary font-semibold">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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
          <div className="md:hidden mt-6 pb-6 space-y-3 border-t border-border pt-4 animate-fade-in">
            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full font-medium"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                className="w-full gradient-primary font-semibold"
              >
                Join Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
