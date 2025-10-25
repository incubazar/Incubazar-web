'use client';

import Link from 'next/link';

export default function EditorialFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-3xl font-bold mb-4">Incubazar</h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Where visionaries meet investors. A carefully curated platform for meaningful connections 
              in India's startup ecosystem.
            </p>
            <p className="text-sm text-foreground/50 uppercase tracking-wide">
              Section 42 Compliant • Trust-First Platform
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4 uppercase text-sm tracking-wide">Platform</h4>
              <ul className="space-y-3 text-foreground/70">
                <li><Link href="/waitlist" className="hover:text-foreground transition-colors">Waitlist</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-sm tracking-wide">Legal</h4>
              <ul className="space-y-3 text-foreground/70">
                <li><Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-sm tracking-wide">Connect</h4>
              <ul className="space-y-3 text-foreground/70">
                <li><a href="https://twitter.com/incubazar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="https://linkedin.com/company/incubazar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
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
