'use client';

import PageSpread from './PageSpread';
import RevealText from './RevealText';
import PullQuote from './PullQuote';
import Link from 'next/link';

export default function EditorialCTA() {
  return (
    <PageSpread>
      <section className="editorial-section bg-graphite-50 dark:bg-ink-lighter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealText>
            <p className="overline mb-6 sm:mb-8">Join Us</p>
          </RevealText>

          <RevealText>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight mb-8 sm:mb-10 lg:mb-12">
              Shape the future of India&apos;s startup ecosystem
            </h2>
          </RevealText>

          <RevealText>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-12 sm:mb-14 lg:mb-16 max-w-2xl mx-auto text-foreground/80">
              Join our curated community of visionaries and investors. 
              Limited access, unlimited potential.
            </p>
          </RevealText>

          <RevealText>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 sm:mb-20 lg:mb-24">
              <Link 
                href="/register" 
                className="px-8 sm:px-10 py-4 sm:py-5 bg-foreground text-background text-center font-medium text-base sm:text-lg transition-all hover:bg-foreground/90"
              >
                For Founders
              </Link>
              <Link 
                href="/register" 
                className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-foreground text-foreground text-center font-medium text-base sm:text-lg transition-all hover:bg-foreground hover:text-background"
              >
                For Investors
              </Link>
            </div>
          </RevealText>

          <RevealText>
            <PullQuote 
              text="The best platforms are invisible. They simply facilitate meaningful connections."
              className="border-l-2 text-left max-w-2xl mx-auto"
            />
          </RevealText>

          {/* Subtle Services Note */}
          <RevealText>
            <div className="mt-16 sm:mt-20">
              <p className="text-xs text-foreground/40 uppercase tracking-[0.2em] mb-3">Select Services</p>
              <p className="text-sm text-foreground/50 max-w-xl mx-auto">
                We offer curated branding packages for select startups—logo design, brand identity, and web presence.{' '}
                <a 
                  href="mailto:founder@incubazar.com" 
                  className="text-foreground/70 hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Inquire at founder@incubazar.com
                </a>
              </p>
            </div>
          </RevealText>
        </div>
      </section>
    </PageSpread>
  );
}
