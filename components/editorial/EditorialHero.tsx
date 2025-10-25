'use client';

import Link from 'next/link';
import RevealText from './RevealText';

export default function EditorialHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Headline */}
          <div className="lg:col-span-8">
            <RevealText>
              <p className="overline mb-6">Issue Nº 01 — 2025</p>
            </RevealText>
            
            <RevealText>
              <h1 className="font-serif font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tighter mb-8">
                We Connect<br />
                Visionaries
              </h1>
            </RevealText>

            <RevealText>
              <p className="lead max-w-2xl mb-12">
                A platform where innovation meets investment. India's editorial approach 
                to startup funding—thoughtfully curated, elegantly executed.
              </p>
            </RevealText>

            <RevealText>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/waitlist" 
                  className="px-8 py-4 bg-foreground text-background text-center font-medium transition-all hover:bg-foreground/90"
                >
                  Join the Movement
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-4 border border-foreground text-foreground text-center font-medium transition-all hover:bg-foreground hover:text-background"
                >
                  Learn More
                </Link>
              </div>
            </RevealText>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-4">
            <RevealText>
              <div className="space-y-8">
                <div className="border-l-2 border-foreground pl-6">
                  <p className="font-serif text-5xl font-bold mb-2">500+</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">Founders in Queue</p>
                </div>
                <div className="border-l-2 border-foreground pl-6">
                  <p className="font-serif text-5xl font-bold mb-2">200+</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">Active Investors</p>
                </div>
                <div className="border-l-2 border-foreground pl-6">
                  <p className="font-serif text-5xl font-bold mb-2">₹50Cr+</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">Capital Pledged</p>
                </div>
              </div>
            </RevealText>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
