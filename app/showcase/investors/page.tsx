'use client';

import Link from 'next/link';
import { TrendingUp, Users, DollarSign, Award, Clock, Target, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function InvestorShowcasePage() {
  const metrics = [
    { 
      label: 'User Engagement Potential', 
      value: '245+ min', 
      sublabel: 'Average time on platform',
      icon: <Clock className="h-6 w-6" /> 
    },
    { 
      label: 'Content Depth', 
      value: '7 Modules', 
      sublabel: '40+ citations, 15+ templates',
      icon: <Award className="h-6 w-6" /> 
    },
    { 
      label: 'Target Audience', 
      value: '10K+', 
      sublabel: 'Waitlist users (growing)',
      icon: <Users className="h-6 w-6" /> 
    },
    { 
      label: 'Monetization Ready', 
      value: 'Yes', 
      sublabel: 'Premium tiers planned',
      icon: <DollarSign className="h-6 w-6" /> 
    },
  ];

  const traction = [
    {
      metric: 'Platform Completion',
      value: '9.6%',
      status: '7/73 modules complete',
      trajectory: 'Foundation complete, scaling content creation'
    },
    {
      metric: 'Quality Benchmark',
      value: 'AAA',
      status: 'WCAG accessibility compliance',
      trajectory: '21:1 contrast ratio, mobile-first design'
    },
    {
      metric: 'Content Velocity',
      value: '~50 min',
      status: 'Per module (avg)',
      trajectory: '4 major modules in current sprint'
    },
    {
      metric: 'Differentiation',
      value: 'High',
      status: 'Editorial magazine aesthetic',
      trajectory: 'NYT-inspired, data-backed, actionable'
    }
  ];

  const moats = [
    {
      title: 'Content Depth & Quality',
      description: 'Not just blog posts—comprehensive modules with 40+ authoritative citations (SEBI, Y Combinator, Sequoia). Each module takes 45-60 minutes to read with actionable templates.',
      competitive: 'vs Generic startup blogs (Medium, Inc.com): Surface-level advice without data'
    },
    {
      title: 'Indian Market Localization',
      description: 'Every module includes India-specific content: SEBI regulations, Indian cap table examples, rupee-based unit economics, local case studies (Razorpay, Zomato, Flipkart).',
      competitive: 'vs US-focused platforms (Y Combinator Library): Not adapted for Indian regulatory/financial context'
    },
    {
      title: 'Editorial Design System',
      description: 'Monochrome, magazine-quality aesthetic (Playfair Display serif + DM Sans). 21:1 contrast ratio. Feels premium, not SaaS-generic.',
      competitive: 'vs Typical SaaS UI: Colorful, cluttered, low contrast'
    },
    {
      title: 'Built-In Distribution',
      description: '10K+ waitlist users already in funnel. Learning platform becomes top-of-funnel for investor/founder matching (core product).',
      competitive: 'vs Standalone courses: No distribution, cold start problem'
    }
  ];

  const roadmap = [
    {
      phase: 'Phase 1 (Complete)',
      timeline: 'Weeks 1-4',
      deliverables: [
        'Core infrastructure (types, layouts, components)',
        '7 production-ready modules (Incorporation, Finance, Product, Brand, Case Studies)',
        'Citation system, templates, WCAG AAA compliance',
        '245+ min of content'
      ]
    },
    {
      phase: 'Phase 2 (In Progress)',
      timeline: 'Weeks 5-8',
      deliverables: [
        'Pitching & Pitch Decks module',
        'Industry Trends (9 industries: Tech, Fintech, SaaS, etc.)',
        '3 more case studies (Zomato, Flipkart, Airbnb)',
        'Interactive calculators (cap table, burn rate, valuation)'
      ]
    },
    {
      phase: 'Phase 3 (Q1 2025)',
      timeline: 'Months 3-4',
      deliverables: [
        'User progress tracking (Supabase backend)',
        'Access control (waitlist vs verified users)',
        'Premium tier launch ($29/month for verified users)',
        'Community features (comments, bookmarks, discussions)'
      ]
    },
    {
      phase: 'Phase 4 (Q2 2025)',
      timeline: 'Months 5-6',
      deliverables: [
        'CMS integration (Notion/Contentful for content team)',
        'Mobile app (React Native)',
        'AI-powered recommendations',
        'Certification program ("Incubazar Certified Founder")'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="border-b-2 border-graphite-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif font-bold text-ink">
              Incubazar
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/showcase/learn"
                className="text-ink hover:underline font-semibold"
              >
                Platform Demo
              </Link>
              <Link
                href="/learn"
                className="px-6 py-3 bg-ink text-paper font-semibold hover:bg-graphite-900 transition-colors"
              >
                Live Platform
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-ink text-paper mb-6">
            <div className="text-xs uppercase tracking-widest font-semibold">Investor Deck</div>
          </div>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-ink mb-6 leading-none">
            Founder Education
            <br />
            <span className="italic">at Scale</span>
          </h1>
          
          <p className="text-2xl text-graphite-700 leading-relaxed max-w-4xl mb-8">
            A premium learning platform that transforms waitlist users into educated founders—while 
            creating a top-of-funnel for our core investor matching business.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16 border-y-2 border-graphite-200">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-ink">
                  {metric.icon}
                </div>
                <div className="text-xs uppercase tracking-widest text-graphite-600">
                  {metric.label}
                </div>
              </div>
              <div className="font-serif text-4xl font-bold text-ink mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-graphite-600">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Opportunity */}
      <div className="bg-ink text-paper py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="font-serif text-4xl font-bold mb-8">
            The Opportunity: Education as Distribution
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border-2 border-paper bg-graphite-900">
              <h3 className="font-serif text-2xl font-bold mb-4">The Problem</h3>
              <ul className="space-y-3 text-graphite-200">
                <li className="flex items-start gap-2">
                  <span className="text-paper font-semibold">•</span>
                  <span><strong>Indian founders lack access</strong> to quality startup education (most content is US-focused, not localized)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-paper font-semibold">•</span>
                  <span><strong>Waitlist users have time</strong> (6-12 months before verification) but no engagement strategy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-paper font-semibold">•</span>
                  <span><strong>Existing platforms are generic</strong> (Medium blogs, YouTube tutorials) without actionable depth</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-paper text-ink">
              <h3 className="font-serif text-2xl font-bold mb-4">Our Solution</h3>
              <ul className="space-y-3 text-graphite-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                  <span><strong>Comprehensive curriculum:</strong> 73 modules covering legal, finance, product, GTM, branding—everything to build a startup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                  <span><strong>India-first content:</strong> SEBI regulations, INR examples, local case studies (Razorpay, Flipkart, Zomato)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                  <span><strong>Premium design:</strong> Editorial magazine aesthetic (NYT-inspired), 21:1 contrast, mobile-first</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                  <span><strong>Built-in distribution:</strong> 10K+ waitlist users already in funnel, engaged before verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Traction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <h2 className="font-serif text-4xl font-bold text-ink mb-12">
          Current Traction & Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traction.map((item, index) => (
            <div key={index} className="p-8 border-2 border-ink hover:bg-graphite-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                    {item.metric}
                  </div>
                  <div className="font-serif text-5xl font-bold text-ink mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm font-semibold text-graphite-700 mb-3">
                    {item.status}
                  </div>
                </div>
                <TrendingUp className="h-6 w-6 text-ink" />
              </div>
              <p className="text-graphite-800">
                {item.trajectory}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Moats */}
      <div className="bg-graphite-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="font-serif text-4xl font-bold text-ink mb-12">
            Competitive Moats & Differentiation
          </h2>

          <div className="space-y-6">
            {moats.map((moat, index) => (
              <div key={index} className="p-8 border-2 border-ink bg-paper">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Target className="h-8 w-8 text-ink" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                      {moat.title}
                    </h3>
                    <p className="text-lg text-graphite-800 mb-4 leading-relaxed">
                      {moat.description}
                    </p>
                    <div className="p-4 bg-graphite-50 border-l-4 border-graphite-400">
                      <div className="text-xs uppercase tracking-widest text-graphite-600 mb-1">
                        Competitive Advantage
                      </div>
                      <p className="text-sm text-graphite-700">
                        {moat.competitive}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <h2 className="font-serif text-4xl font-bold text-ink mb-12">
          Product Roadmap & Milestones
        </h2>

        <div className="space-y-6">
          {roadmap.map((phase, index) => (
            <div
              key={index}
              className={`p-8 border-2 ${
                index === 0
                  ? 'border-ink bg-ink text-paper'
                  : index === 1
                  ? 'border-graphite-600 bg-graphite-900 text-paper'
                  : 'border-graphite-400 bg-paper'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className={`text-xs uppercase tracking-widest mb-2 ${index <= 1 ? 'text-graphite-400' : 'text-graphite-600'}`}>
                    {phase.timeline}
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-2">
                    {phase.phase}
                  </h3>
                </div>
                {index === 0 && (
                  <div className="px-3 py-1 bg-paper text-ink text-xs uppercase tracking-widest font-semibold">
                    Complete ✓
                  </div>
                )}
                {index === 1 && (
                  <div className="px-3 py-1 bg-graphite-700 text-paper text-xs uppercase tracking-widest font-semibold">
                    In Progress
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {index === 0 ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Zap className={`h-5 w-5 flex-shrink-0 mt-0.5 ${index <= 1 ? 'text-paper' : 'text-ink'}`} />
                    )}
                    <span className={index <= 1 ? 'text-graphite-200' : 'text-graphite-800'}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monetization */}
      <div className="bg-ink text-paper py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="font-serif text-4xl font-bold mb-8">
            Monetization Strategy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border-2 border-paper bg-graphite-900">
              <DollarSign className="h-8 w-8 mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                Freemium Model
              </h3>
              <p className="text-graphite-200 mb-4">
                Free access for waitlist users. Premium tier ($29/month) for verified users 
                with advanced content, templates, and community access.
              </p>
              <div className="text-sm text-graphite-400">
                Target: 10% conversion rate → $29K MRR at 10K users
              </div>
            </div>

            <div className="p-8 border-2 border-paper bg-graphite-900">
              <Users className="h-8 w-8 mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                Enterprise Licensing
              </h3>
              <p className="text-graphite-200 mb-4">
                White-label platform for accelerators, incubators, and corporate innovation 
                programs. $5K-$50K annual contracts.
              </p>
              <div className="text-sm text-graphite-400">
                Target: 10 enterprise clients → $100K-$500K ARR
              </div>
            </div>

            <div className="p-8 border-2 border-paper bg-graphite-900">
              <Award className="h-8 w-8 mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                Certification Program
              </h3>
              <p className="text-graphite-200 mb-4">
                &quot;Incubazar Certified Founder&quot; credential. $199 one-time fee. Badge for 
                LinkedIn, verified by investors.
              </p>
              <div className="text-sm text-graphite-400">
                Target: 1,000 certifications/year → $199K annual revenue
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-paper text-ink">
            <h4 className="font-serif text-2xl font-bold mb-4">
              Strategic Value Beyond Revenue
            </h4>
            <ul className="space-y-3 text-graphite-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                <span><strong>Top-of-funnel for core business:</strong> Educated founders → better pitches → higher quality deal flow for investor matching</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                <span><strong>Data goldmine:</strong> User behavior (which modules, time spent) predicts founder readiness → better matching algorithms</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-1" />
                <span><strong>Brand differentiation:</strong> Only investor platform with proprietary education → stickier users, harder to replicate</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-6">
          Experience the Platform
        </h2>
        <p className="text-xl text-graphite-700 mb-8 max-w-3xl mx-auto">
          See the quality of content, design system, and user experience firsthand. 
          Navigate through modules, read case studies, and explore templates.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/learn"
            className="px-8 py-4 bg-ink text-paper font-semibold hover:bg-graphite-900 transition-colors inline-flex items-center gap-2"
          >
            Launch Live Platform
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/showcase/learn"
            className="px-8 py-4 border-2 border-ink hover:bg-graphite-50 transition-colors font-semibold"
          >
            View Detailed Showcase
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-graphite-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <div className="text-center text-sm text-graphite-600">
            <p>Incubazar Investor Deck • October 2024</p>
            <p className="mt-2">Questions? <a href="mailto:investors@incubazar.com" className="underline hover:text-ink">investors@incubazar.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
