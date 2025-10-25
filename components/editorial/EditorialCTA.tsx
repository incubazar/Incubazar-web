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
            <p className="overline mb-8">Join Us</p>
          </RevealText>

          <RevealText>
            <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-12">
              Shape the future of India's startup ecosystem
            </h2>
          </RevealText>

          <RevealText>
            <p className="lead mb-16 max-w-2xl mx-auto">
              Join our curated community of visionaries and investors. 
              Limited access, unlimited potential.
            </p>
          </RevealText>

          <RevealText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
              <Link 
                href="/register" 
                className="px-10 py-5 bg-foreground text-background text-center font-medium text-lg transition-all hover:bg-foreground/90"
              >
                For Founders
              </Link>
              <Link 
                href="/register" 
                className="px-10 py-5 border-2 border-foreground text-foreground text-center font-medium text-lg transition-all hover:bg-foreground hover:text-background"
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
        </div>
      </section>
    </PageSpread>
  );
}
