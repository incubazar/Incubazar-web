'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ScrollProgress from './ScrollProgress';

export default function EditorialNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
                <Image 
                  src="/logo.svg" 
                  alt="Incubazar" 
                  width={32} 
                  height={32}
                  className="transition-all duration-300"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Incubazar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/about" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="/waitlist" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Join Waitlist
              </Link>
              <Link 
                href="/login" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="px-6 py-2 bg-foreground text-background text-sm font-medium transition-all hover:bg-foreground/90"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/about" 
                className="block text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/waitlist" 
                className="block text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Join Waitlist
              </Link>
              <Link 
                href="/login" 
                className="block text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="block px-6 py-2 bg-foreground text-background text-center transition-all hover:bg-foreground/90"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
