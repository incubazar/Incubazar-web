'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import {
  ArticleSpread,
  ArticleHeader,
  ArticleSection,
  ArticleText,
  CalloutBox,
  DataTable,
  References,
  InlineCitation,
  PullQuote
} from '@/components/learn/ArticleComponents';
import { BrandShowcase } from '@/components/learn/CaseStudyComponents';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';

const citations = [
  {
    id: 'apple-brand-guidelines',
    number: 1,
    source: 'Apple Brand Guidelines - Apple Inc.',
    url: 'https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html',
    date: 'October 2024'
  },
  {
    id: 'nike-logo-evolution',
    number: 2,
    source: 'The Nike Swoosh: A $35 Logo That Changed Everything - Design History',
    url: 'https://www.logodesignlove.com/nike-logo-design-history',
    date: 'September 2024'
  },
  {
    id: 'fedex-hidden-arrow',
    number: 3,
    source: 'FedEx Logo: The Hidden Arrow - Landor & Associates Case Study',
    url: 'https://landor.com/work/fedex',
    date: 'August 2024'
  },
  {
    id: 'butterick-typography',
    number: 4,
    source: 'Practical Typography - Matthew Butterick',
    url: 'https://practicaltypography.com/',
    date: 'October 2024'
  },
  {
    id: 'wcag-contrast',
    number: 5,
    source: 'WCAG 2.1 Understanding Success Criterion 1.4.3 - W3C',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
    date: 'October 2024'
  },
  {
    id: 'google-material-typography',
    number: 6,
    source: 'Material Design Typography System - Google',
    url: 'https://material.io/design/typography/the-type-system.html',
    date: 'September 2024'
  },
];

export default function BrandPage() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Building"
          title="Brand, Typography & Logo Design"
          subtitle="Master brand foundations, typography systems, and logo design principles with case studies from Apple, Nike, and FedEx."
          readTime={60}
          level="intermediate"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            Your brand is not your logo. Your logo is not your brand. But together, they form the 
            visual foundation of how the world perceives your startup — from your first pitch deck 
            to your Series C announcement.
          </ArticleText>

          <ArticleText>
            This comprehensive guide covers brand strategy, typography hierarchy, and logo design 
            fundamentals, with annotated case studies showing how Apple, Nike, and FedEx built 
            some of the world's most recognizable visual identities.
          </ArticleText>

          <PullQuote
            quote="Design is not just what it looks like and feels like. Design is how it works."
            author="Steve Jobs"
            citation="Fortune Magazine, 2003"
          />
        </ArticleSection>

        {/* Brand Foundations */}
        <ArticleSection heading="1. Brand Foundations: Before You Design Anything">
          <ArticleText>
            A logo without a brand strategy is decoration. Start by defining these core elements:
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Brand Core Elements
            </h4>
            
            <div className="space-y-6">
              <div className="border-l-4 border-ink pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Mission</h5>
                <p className="text-graphite-800">
                  Why does your company exist? What problem are you solving?
                </p>
                <p className="text-sm text-graphite-600 mt-2 italic">
                  Example (Airbnb): "Create a world where anyone can belong anywhere."
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Vision</h5>
                <p className="text-graphite-800">
                  Where are you headed in 5-10 years? What future do you want to create?
                </p>
                <p className="text-sm text-graphite-600 mt-2 italic">
                  Example (Tesla): &quot;Accelerate the world's transition to sustainable energy.&quot;
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Values</h5>
                <p className="text-graphite-800">
                  What principles guide your decisions? What do you stand for?
                </p>
                <p className="text-sm text-graphite-600 mt-2 italic">
                  Example (Patagonia): Environmental responsibility, quality over quantity, activism
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Value Proposition</h5>
                <p className="text-graphite-800">
                  What unique benefit do you deliver that competitors don&apos;t?
                </p>
                <p className="text-sm text-graphite-600 mt-2 italic">
                  Example (Slack): "Be more productive at work with less effort."
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Tone of Voice</h5>
                <p className="text-graphite-800">
                  How do you communicate? Professional? Playful? Authoritative? Friendly?
                </p>
                <p className="text-sm text-graphite-600 mt-2 italic">
                  Example (Mailchimp): Friendly, helpful, quirky but professional
                </p>
              </div>
            </div>
          </div>

          <CalloutBox type="tip" title="Brand Strategy Exercise">
            <p className="mb-3">
              Before designing your logo, complete this one-page brand brief:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Who is your target audience? (demographics, psychographics)</li>
              <li>• What are 3 adjectives that describe your brand? (e.g., innovative, trustworthy, bold)</li>
              <li>• Who are your top 3 competitors, and how are you different?</li>
              <li>• What emotions should your brand evoke?</li>
              <li>• What&apos;s your brand promise in one sentence?</li>
            </ul>
          </CalloutBox>
        </ArticleSection>

        {/* Typography */}
        <ArticleSection heading="2. Typography: The Science of Readable Design">
          <ArticleText>
            Typography is 95% of design<InlineCitation number={4} id="butterick-typography" />. 
            Get it wrong, and even the best content becomes unreadable. Get it right, and your 
            site feels professional, trustworthy, and elegant.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The Serif vs Sans-Serif Decision
            </h4>
            
            <DataTable
              headers={['Font Type', 'Best For', 'Examples', 'Psychological Effect']}
              rows={[
                [
                  'Serif (e.g., Playfair, Merriweather, Lora)',
                  'Headlines, editorial content, luxury brands',
                  'NYT, Medium, Vogue, Apple (marketing)',
                  'Traditional, trustworthy, sophisticated'
                ],
                [
                  'Sans-serif (e.g., Inter, DM Sans, Satoshi)',
                  'Body text, UI, modern tech brands',
                  'Google, Airbnb, Stripe, Notion',
                  'Clean, modern, approachable, neutral'
                ],
                [
                  'Monospace (e.g., JetBrains Mono)',
                  'Code blocks, technical documentation',
                  'GitHub, VS Code, developer tools',
                  'Technical, precise, developer-focused'
                ],
              ]}
              caption="Typography classification and usage patterns, 2024"
            />
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Typography Hierarchy: The Incubazar System
            </h4>
            
            <p className="text-lg text-graphite-800 mb-6">
              This site uses a carefully crafted hierarchy combining serif headlines (Playfair Display) 
              with sans-serif body text (DM Sans/Satoshi) for editorial impact:
            </p>

            <div className="space-y-6">
              <div className="border-2 border-graphite-200 p-6">
                <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">H1 - HERO HEADLINE</div>
                <div className="font-serif text-7xl font-bold text-ink tracking-tight leading-none mb-3">
                  Build Smart.
                </div>
                <p className="text-sm text-graphite-600">
                  Font: Playfair Display • Size: 72px (7rem) • Weight: 700 • Line height: 1 • Tracking: -0.04em
                </p>
              </div>

              <div className="border-2 border-graphite-200 p-6">
                <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">H2 - SECTION HEADING</div>
                <div className="font-serif text-4xl font-bold text-ink mb-3">
                  The Typography System
                </div>
                <p className="text-sm text-graphite-600">
                  Font: Playfair Display • Size: 36px (2.25rem) • Weight: 700 • Line height: 1.2 • Tracking: -0.02em
                </p>
              </div>

              <div className="border-2 border-graphite-200 p-6">
                <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">H3 - SUBSECTION</div>
                <div className="font-serif text-2xl font-bold text-ink mb-3">
                  Why This Matters
                </div>
                <p className="text-sm text-graphite-600">
                  Font: Playfair Display • Size: 24px (1.5rem) • Weight: 700 • Line height: 1.3 • Tracking: -0.01em
                </p>
              </div>

              <div className="border-2 border-graphite-200 p-6">
                <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">BODY - PARAGRAPH TEXT</div>
                <div className="text-lg text-graphite-800 leading-relaxed mb-3">
                  This is body text, optimized for reading comfort at 18px with generous line height 
                  (1.75) and balanced measure (65-75 characters per line). The slightly larger size 
                  reduces eye strain for long-form content.
                </div>
                <p className="text-sm text-graphite-600">
                  Font: DM Sans • Size: 18px (1.125rem) • Weight: 400 • Line height: 1.75 • Tracking: 0
                </p>
              </div>

              <div className="border-2 border-graphite-200 p-6">
                <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                  LABEL - NAVIGATION & UI
                </div>
                <div className="text-xs uppercase tracking-widest font-semibold text-graphite-600 mb-3">
                  FOUNDATION • BUILDING • GROWTH
                </div>
                <p className="text-sm text-graphite-600">
                  Font: DM Sans • Size: 12px (0.75rem) • Weight: 600 • Line height: 1 • Tracking: 0.1em • Transform: uppercase
                </p>
              </div>
            </div>
          </div>

          <CalloutBox type="info" title="The 8px Grid System">
            <p className="mb-3">
              All font sizes follow an 8px baseline grid for vertical rhythm:
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>H1:</span>
                <span className="font-semibold">72px (9 × 8)</span>
              </div>
              <div className="flex justify-between">
                <span>H2:</span>
                <span className="font-semibold">48px (6 × 8)</span>
              </div>
              <div className="flex justify-between">
                <span>H3:</span>
                <span className="font-semibold">32px (4 × 8)</span>
              </div>
              <div className="flex justify-between">
                <span>Body:</span>
                <span className="font-semibold">16-18px (2 × 8 + 2)</span>
              </div>
              <div className="flex justify-between">
                <span>Caption:</span>
                <span className="font-semibold">12-14px (1.5-1.75 × 8)</span>
              </div>
            </div>
          </CalloutBox>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Line Height (Leading) Guidelines
            </h4>
            
            <DataTable
              headers={['Element', 'Font Size', 'Line Height', 'Reason']}
              rows={[
                ['Display heading', '64px+', '1.0 - 1.1', 'Tight for impact'],
                ['Section heading', '32-48px', '1.2 - 1.3', 'Balanced readability'],
                ['Body text', '16-18px', '1.6 - 1.75', 'Comfortable reading'],
                ['Small text', '12-14px', '1.5', 'Prevent cramping'],
              ]}
              caption="Line height ratios for optimal readability (Google Material Design, 2024)"
            />
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Column Width: The Measure Rule
            </h4>
            
            <ArticleText>
              <strong>45-75 characters per line</strong> is the sweet spot for readability<InlineCitation number={4} id="butterick-typography" />. 
              Too narrow, and readers tire from frequent line breaks. Too wide, and eyes lose their 
              place jumping to the next line.
            </ArticleText>

            <div className="my-6 p-6 bg-graphite-50 border-2 border-graphite-300">
              <p className="text-sm text-graphite-600 mb-2">Example: This paragraph is too wide (130+ characters)</p>
              <p className="text-lg text-graphite-800" style={{ maxWidth: 'none' }}>
                This paragraph spans the entire width of the container, forcing your eyes to travel 
                a long distance from line to line. Studies show that reading speed decreases and 
                comprehension drops when line length exceeds 75-80 characters.
              </p>
            </div>

            <div className="my-6 p-6 bg-ink text-paper border-2 border-ink">
              <p className="text-sm text-graphite-300 mb-2">Example: This paragraph is optimal (65 characters)</p>
              <p className="text-lg" style={{ maxWidth: '65ch' }}>
                This paragraph uses <code>max-width: 65ch</code> (65 characters). 
                Notice how much easier it is to read? Your eyes naturally 
                flow from one line to the next without fatigue.
              </p>
            </div>
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Responsive Typography
            </h4>
            
            <ArticleText>
              Use <code>clamp()</code> for fluid typography that scales gracefully from mobile to desktop:
            </ArticleText>

            <div className="my-6 p-6 bg-graphite-900 text-paper font-mono text-sm">
              <div className="text-graphite-400 mb-2">{`/* CSS */`}</div>
              <div className="space-y-2">
                <div>h1 {'{'}</div>
                <div className="pl-4">font-size: clamp(3rem, 8vw, 7rem);</div>
                <div className="pl-4 text-graphite-400">{`/* 48px → 112px */`}</div>
                <div>{'}'}</div>
                <div className="mt-4">body {'{'}</div>
                <div className="pl-4">font-size: clamp(1rem, 2vw, 1.125rem);</div>
                <div className="pl-4 text-graphite-400">{`/* 16px → 18px */`}</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>

          <CalloutBox type="warning" title="Accessibility: Contrast is Critical">
            <p className="mb-3">
              WCAG 2.1 requires minimum contrast ratios<InlineCitation number={5} id="wcag-contrast" />:
            </p>
            <ul className="space-y-1 text-sm">
              <li>• <strong>AA (standard):</strong> 4.5:1 for normal text, 3:1 for large text (18px+)</li>
              <li>• <strong>AAA (enhanced):</strong> 7:1 for normal text, 4.5:1 for large text</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong>Example:</strong> Black (#000) on white (#FFF) = 21:1 ratio (AAA compliant) ✅
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Logo Design */}
        <ArticleSection heading="3. Logo Design Fundamentals">
          <ArticleText>
            A great logo is simple, memorable, timeless, versatile, and appropriate. It works at 
            16×16 pixels (favicon) and 16 feet tall (billboard). It looks good in black and white, 
            not just color.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The 5 Types of Logos
            </h4>
            
            <DataTable
              headers={['Type', 'Description', 'Examples', 'Best For']}
              rows={[
                [
                  'Wordmark (Logotype)',
                  'Company name in custom typography',
                  'Google, Coca-Cola, FedEx, Visa',
                  'Companies with short, memorable names'
                ],
                [
                  'Lettermark',
                  'Initials/acronym only',
                  'IBM, HBO, CNN, HP',
                  'Companies with long names or known by acronyms'
                ],
                [
                  'Brandmark (Symbol)',
                  'Icon/symbol without text',
                  'Apple, Nike Swoosh, Twitter bird',
                  'Established brands with high recognition'
                ],
                [
                  'Emblem',
                  'Text inside a symbol/badge',
                  'Starbucks, Harley-Davidson, NFL',
                  'Traditional, institutional, heritage brands'
                ],
                [
                  'Combination Mark',
                  'Symbol + wordmark together',
                  'Adidas, Burger King, Lacoste',
                  'New brands building recognition'
                ],
              ]}
              caption="Logo type classification (Design Council, 2024)"
            />
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The Logo Design Process
            </h4>
            
            <div className="space-y-6">
              <div className="border-l-4 border-ink pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">1. Research & Discovery (1-2 weeks)</h5>
                <ul className="space-y-1 text-graphite-800">
                  <li>• Analyze competitors' visual identities</li>
                  <li>• Study your target audience preferences</li>
                  <li>• Review industry trends and archetypes</li>
                  <li>• Gather brand adjectives and mood boards</li>
                  <li>• Define brand attributes (modern, trustworthy, playful, etc.)</li>
                </ul>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">2. Sketching & Ideation (1 week)</h5>
                <ul className="space-y-1 text-graphite-800">
                  <li>• Hand-sketch 50-100 rough concepts</li>
                  <li>• Explore wordmarks, symbols, abstract shapes</li>
                  <li>• Test letterforms, negative space, geometry</li>
                  <li>• Don't self-edit — quantity leads to quality</li>
                </ul>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">3. Digital Refinement (1-2 weeks)</h5>
                <ul className="space-y-1 text-graphite-800">
                  <li>• Vectorize top 10-15 concepts in Illustrator/Figma</li>
                  <li>• Test at multiple sizes (16px → 1000px)</li>
                  <li>• Ensure geometric precision with grids</li>
                  <li>• Create monochrome versions first</li>
                </ul>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">4. Testing & Validation (1 week)</h5>
                <ul className="space-y-1 text-graphite-800">
                  <li>• Test in real contexts: website, business card, social media, app icon</li>
                  <li>• Check contrast against light/dark backgrounds</li>
                  <li>• Review with stakeholders and target users</li>
                  <li>• Ensure scalability and legibility</li>
                </ul>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">5. Finalization & Guidelines (1 week)</h5>
                <ul className="space-y-1 text-graphite-800">
                  <li>• Create master files (SVG, PNG, PDF)</li>
                  <li>• Define clear space/minimum size rules</li>
                  <li>• Document color specifications</li>
                  <li>• Build brand guidelines PDF</li>
                </ul>
              </div>
            </div>
          </div>

          <CalloutBox type="tip" title="The Grid Test">
            <p>
              Professional logos are built on geometric grids. Try overlaying circles, squares, and 
              golden ratio guides on famous logos — you&apos;ll see mathematical precision underneath.
            </p>
            <p className="mt-3 text-sm text-graphite-600">
              Tools: <strong>LogoLounge</strong>, <strong>Golden Ratio Calculator</strong>, <strong>Grid by Spec</strong>
            </p>
          </CalloutBox>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Logo Checklist: 7 Critical Tests
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-ink">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">1. The Squint Test</h5>
                  <p className="text-sm text-graphite-700">
                    Squint your eyes or blur the logo. Is it still recognizable? Simple shapes win.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-graphite-600">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">2. The Size Test</h5>
                  <p className="text-sm text-graphite-700">
                    Does it work at 16×16px (favicon) and 1000×1000px (billboard)?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-graphite-600">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">3. The Black & White Test</h5>
                  <p className="text-sm text-graphite-700">
                    Remove all color. Does it still work? A logo that needs color is weak.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-graphite-600">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">4. The Inversion Test</h5>
                  <p className="text-sm text-graphite-700">
                    Flip it. Does it still look good on dark backgrounds?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-graphite-600">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">5. The 5-Second Test</h5>
                  <p className="text-sm text-graphite-700">
                    Show it to someone for 5 seconds, then ask them to describe it. Can they?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-graphite-600">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">6. The Context Test</h5>
                  <p className="text-sm text-graphite-700">
                    Mock it up in real scenarios: website header, business card, Instagram profile, app icon.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-graphite-50 border-l-4 border-graphite-600">
                <span className="text-xl font-bold text-ink">✓</span>
                <div>
                  <h5 className="font-semibold text-ink mb-1">7. The Uniqueness Test</h5>
                  <p className="text-sm text-graphite-700">
                    Google image search similar logos. Is yours distinctive or generic?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Case Studies */}
        <ArticleSection heading="4. Case Studies: Iconic Logos Deconstructed">
          <ArticleText>
            Let&apos;s analyze three of the world&apos;s most recognizable logos to understand what makes 
            them work — and what lessons we can extract for your startup.
          </ArticleText>

          {/* Apple Logo Showcase */}
          <BrandShowcase
            title="Apple Logo Evolution"
            description="From colorful complexity to monochrome minimalism — Apple&apos;s logo transformation mirrors the company&apos;s journey from playful startup to premium global brand."
            logos={[
              {
                src: '/brand/logos/apple/logo-black.svg',
                alt: 'Apple Logo - Modern Monochrome',
                caption: 'Monochrome Era',
                year: '1998'
              },
              {
                src: '/brand/logos/apple/logo-rainbow.svg',
                alt: 'Apple Rainbow Logo',
                caption: 'Rainbow Logo',
                year: '1977'
              }
            ]}
            brandColors={['#000000', '#A6AAAE', '#FFFFFF']}
            gridLayout="2"
          />

          {/* Apple */}
          <div className="my-12 p-8 bg-graphite-50 border-2 border-ink">
            <h4 className="font-serif text-3xl font-bold text-ink mb-4">
              Case Study #1: Apple
            </h4>
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-graphite-600 font-semibold">
                BRANDMARK • ESTABLISHED 1977 • REDESIGNED 1998
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">The Evolution</h5>
                <ul className="space-y-2 text-graphite-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-ink">1977:</span>
                    <span>Rainbow-striped apple with bite mark (Rob Janoff design)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-ink">1998:</span>
                    <span>Monochrome apple (Steve Jobs return, &quot;Think Different&quot; campaign)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-ink">2013-Present:</span>
                    <span>Flat design, ultra-minimal, single-color variations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">Why It Works</h5>
                <ul className="space-y-2 text-graphite-800">
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Instant recognition:</strong> The bite mark differentiates it from a cherry or tomato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Biblical metaphor:</strong> Apple = knowledge, innovation (Garden of Eden reference)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Scale perfection:</strong> Works flawlessly from 16px to building-sized installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Timeless simplicity:</strong> No text needed — symbol alone carries entire brand</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">The Redesign Decision (1998)</h5>
                <ArticleText>
                  When Steve Jobs returned to Apple in 1997, the company was near bankruptcy. The 
                  rainbow logo felt dated and complex. Jobs commissioned a monochrome version to 
                  signal Apple's rebirth — clean, modern, focused<InlineCitation number={1} id="apple-brand-guidelines" />. 
                  The timing aligned with the &quot;Think Different&quot; campaign and iMac launch.
                </ArticleText>
              </div>

              <CalloutBox type="info" title="Lesson for Founders">
                <p>
                  <strong>Simplify to amplify.</strong> Apple went from 6 colors to 1, from complex 
                  to minimal, from playful to premium. The lesson: As your brand matures, reduce 
                  noise to strengthen signal.
                </p>
              </CalloutBox>
            </div>
          </div>

          {/* Nike Logo Showcase */}
          <BrandShowcase
            title="Nike Swoosh: $35 to $26 Billion"
            description="One of history's most successful logos — designed by a college student for $35. Proof that simplicity, motion, and perfect execution trump budget."
            logos={[
              {
                src: '/brand/logos/nike/swoosh-black.svg',
                alt: 'Nike Swoosh Logo',
                caption: 'The Swoosh',
                year: '1971'
              },
              {
                src: '/brand/logos/nike/jumpman-black.svg',
                alt: 'Nike Air Jordan Jumpman',
                caption: 'Air Jordan Jumpman',
                year: '1985'
              }
            ]}
            brandColors={['#000000', '#FFFFFF', '#FF6900']}
            gridLayout="2"
          />

          {/* Nike */}
          <div className="my-12 p-8 bg-ink text-paper border-2 border-ink">
            <h4 className="font-serif text-3xl font-bold mb-4">
              Case Study #2: Nike Swoosh
            </h4>
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-graphite-400 font-semibold">
                BRANDMARK • DESIGNED 1971 • COST: $35
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-lg mb-3">The Origin Story</h5>
                <p className="text-graphite-200 mb-3">
                  In 1971, Portland State University student Carolyn Davidson designed the Swoosh 
                  for $35 (about $250 today)<InlineCitation number={2} id="nike-logo-evolution" />. 
                  Nike founder Phil Knight's first reaction: &quot;I don&apos;t love it, but it'll grow on me.&quot;
                </p>
                <p className="text-graphite-200">
                  He was right. Today, it&apos;s one of the world&apos;s most valuable logos, worth an estimated 
                  $26 billion in brand value (2024).
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-lg mb-3">Design Principles</h5>
                <ul className="space-y-2 text-graphite-200">
                  <li className="flex items-start gap-2">
                    <span className="text-paper font-semibold">•</span>
                    <span><strong>Motion & energy:</strong> The Swoosh implies forward movement, speed, victory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-paper font-semibold">•</span>
                    <span><strong>Greek mythology:</strong> Named after Nike, goddess of victory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-paper font-semibold">•</span>
                    <span><strong>Asymmetry works:</strong> Not a perfect arc — organic, dynamic, human</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-paper font-semibold">•</span>
                    <span><strong>Wordmark evolution:</strong> 1995 dropped &quot;Nike&quot; text — symbol alone is enough</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-lg mb-3">The Pivot: Dropping the Wordmark</h5>
                <p className="text-graphite-200">
                  In 1995, Nike made a bold move — removing &quot;Nike&quot; text from most applications, 
                  using only the Swoosh. This signaled ultimate brand confidence: &quot;We&apos;re so 
                  recognizable, we don&apos;t need our name.&quot;
                </p>
              </div>

              <CalloutBox type="tip" title="Lesson for Founders">
                <p className="text-graphite-800">
                  <strong>Build equity first, simplify later.</strong> Nike used the full 
                  wordmark+symbol combo for 24 years before dropping the text. New startups should 
                  keep the name visible until recognition is established.
                </p>
              </CalloutBox>
            </div>
          </div>

          {/* FedEx Logo Showcase */}
          <BrandShowcase
            title="FedEx: The Hidden Arrow Masterclass"
            description="Subliminal design at its finest. The negative space arrow between E and X communicates speed and precision without saying a word."
            logos={[
              {
                src: '/brand/logos/fedex/fedex-express.svg',
                alt: 'FedEx Logo with Hidden Arrow',
                caption: 'Express (Purple/Orange)',
                year: '1994'
              },
              {
                src: '/brand/logos/fedex/fedex-ground.svg',
                alt: 'FedEx Ground Logo',
                caption: 'Ground (Purple/Green)',
                year: '1998'
              }
            ]}
            brandColors={['#4D148C', '#FF6600', '#006341', '#FDB71A']}
            gridLayout="2"
          />

          {/* FedEx */}
          <div className="my-12 p-8 bg-graphite-50 border-2 border-ink">
            <h4 className="font-serif text-3xl font-bold text-ink mb-4">
              Case Study #3: FedEx Hidden Arrow
            </h4>
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-graphite-600 font-semibold">
                WORDMARK • DESIGNED 1994 • LANDOR & ASSOCIATES
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">The Genius Detail</h5>
                <p className="text-graphite-800 mb-3">
                  Look closely at the space between the <strong>E</strong> and <strong>x</strong>. 
                  See it? A forward-pointing arrow — symbolizing speed, precision, and forward 
                  movement<InlineCitation number={3} id="fedex-hidden-arrow" />.
                </p>
                <p className="text-graphite-800">
                  The arrow is formed by <strong>negative space</strong> (the background between letters), 
                  not added elements. This is design elegance at its peak.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">Why Negative Space Matters</h5>
                <ul className="space-y-2 text-graphite-800">
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Subliminal messaging:</strong> The arrow works subconsciously — you feel speed even if you don&apos;t consciously see it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Conversation starter:</strong> Once someone points it out, they remember FedEx forever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink font-semibold">•</span>
                    <span><strong>Brand reinforcement:</strong> Every package, truck, uniform reinforces &quot;fast delivery&quot;</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">Typography Precision</h5>
                <p className="text-graphite-800 mb-3">
                  The logo uses two fonts: <strong>Futura Bold</strong> (Fed) and <strong>Univers 67</strong> (Ex). 
                  The combination creates the perfect negative space for the arrow — pure mathematical design.
                </p>
              </div>

              <CalloutBox type="info" title="Lesson for Founders">
                <p>
                  <strong>Hidden details create brand magic.</strong> The FedEx arrow proves that 
                  thoughtful design has layers. Your logo doesn&apos;t need Easter eggs, but intentional 
                  details (perfect spacing, optical balance, meaningful geometry) separate amateur 
                  from professional work.
                </p>
              </CalloutBox>
            </div>
          </div>
        </ArticleSection>

        {/* Responsive Logos */}
        <ArticleSection heading="5. Responsive Logos: Designing for Every Screen">
          <ArticleText>
            Your logo must work across dozens of contexts: website header, mobile app, favicon, 
            Instagram profile, business card, billboard. This requires responsive variations.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The 3-Tier Logo System
            </h4>
            
            <DataTable
              headers={['Version', 'Use Cases', 'Minimum Size', 'Details']}
              rows={[
                [
                  'Full logo (Horizontal)',
                  'Website header, email signature, presentations',
                  '120px wide',
                  'Symbol + full wordmark'
                ],
                [
                  'Stacked logo (Vertical)',
                  'Square contexts, social media, mobile apps',
                  '80×80px',
                  'Symbol above wordmark'
                ],
                [
                  'Icon/Symbol only',
                  'Favicon, app icon, small buttons, profile pictures',
                  '16×16px',
                  'No text, symbol recognizable alone'
                ],
              ]}
              caption="Responsive logo hierarchy (iOS Human Interface Guidelines, 2024)"
            />
          </div>

          <CalloutBox type="tip" title="Favicon Best Practices">
            <ul className="space-y-2 text-sm">
              <li>• Design for 16×16px and 32×32px (browser tabs)</li>
              <li>• Use high contrast (avoid thin lines, small details)</li>
              <li>• Test against light and dark browser themes</li>
              <li>• Provide SVG version for sharp rendering at any size</li>
              <li>• Create Apple Touch Icon (180×180px) for iOS home screen</li>
            </ul>
          </CalloutBox>
        </ArticleSection>

        {/* Downloads */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/brand-brief.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Brand Strategy Brief</h4>
                <p className="text-sm text-graphite-600">One-page framework for brand foundations</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/logo-grid.svg"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Logo Grid Template</h4>
                <p className="text-sm text-graphite-600">Geometric grid for precise logo design</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/typography-scale.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Typography Scale Calculator</h4>
                <p className="text-sm text-graphite-600">Build your type system with ratios</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/brand-guidelines.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Brand Guidelines Template</h4>
                <p className="text-sm text-graphite-600">40-page template for complete brand docs</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* References */}
        <References citations={citations} />

        {/* Next Module */}
        <section className="mt-16 pt-12 border-t-2 border-ink bg-graphite-50 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-12">
          <h3 className="text-sm uppercase tracking-widest text-graphite-600 font-semibold mb-4">
            Next Module
          </h3>
          <Link
            href="/learn/trends"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Industry Trends: India & USA →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              Market data, growth rates, and actionable playbooks for 9 industries.
            </p>
            <div className="inline-flex items-center gap-2 text-ink font-semibold group-hover:gap-4 transition-all">
              Continue Learning
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </section>
      </ArticleSpread>
    </LearnLayout>
  );
}
