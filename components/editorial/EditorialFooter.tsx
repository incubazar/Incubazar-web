'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EditorialFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center space-x-3 mb-4 group w-fit">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110">
                <Image 
                  src="/logo.svg" 
                  alt="Incubazar" 
                  width={40} 
                  height={40}
                  className="transition-all duration-300"
                />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Incubazar</h3>
            </Link>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-6">
              Where visionaries meet investors. A carefully curated platform for meaningful connections 
              in India's startup ecosystem.
            </p>
            <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wide">
              Section 42 Compliant • Trust-First Platform
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 uppercase text-xs sm:text-sm tracking-wide">Platform</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/70">
                <li><Link href="/waitlist" className="hover:text-foreground transition-colors">Waitlist</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 uppercase text-xs sm:text-sm tracking-wide">Legal</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/70">
                <li><Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 uppercase text-xs sm:text-sm tracking-wide">Connect</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/70">
                <li><a href="https://twitter.com/incubazar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="https://linkedin.com/company/incubazar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 sm:pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-foreground/60 text-center sm:text-left">
            © {currentYear} Incubazar. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 uppercase tracking-widest">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
