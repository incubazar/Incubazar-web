'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Code, Zap, Target, Globe } from 'lucide-react';

const caseStudies = [
  {
    id: 'razorpay',
    slug: 'razorpay',
    company: 'Razorpay',
    tagline: 'Developer-First Fintech Revolution',
    category: 'Fintech',
    founded: 2014,
    valuation: '$7.5B',
    keyMetric: '$90B+ TPV',
    headquarters: 'Bangalore, India',
    readTime: 35,
    excerpt: 'How two IIT graduates transformed Indian payments by putting developers—not businesses—at the center of payment infrastructure.',
    lessons: ['Developer experience as moat', 'Localization ≠ translation', 'Expand horizontal, not vertical'],
    icon: <Code className="h-12 w-12" />,
    color: 'ink'
  },
  {
    id: 'zomato',
    slug: 'zomato',
    company: 'Zomato',
    tagline: 'Hyperlocal Execution Excellence',
    category: 'Food-Tech',
    founded: 2008,
    valuation: '$10B',
    keyMetric: '2.5M+ orders/day',
    headquarters: 'Gurugram, India',
    readTime: 38,
    excerpt: 'From restaurant discovery to food delivery empire—how Zomato conquered India\'s chaos through execution, not innovation.',
    lessons: ['Execution > innovation in hyperlocal', 'Own logistics = own destiny', 'Unit economics before growth'],
    icon: <Target className="h-12 w-12" />,
    color: 'graphite-900'
  },
  {
    id: 'flipkart',
    slug: 'flipkart',
    company: 'Flipkart',
    tagline: 'How Localization Beat Amazon',
    category: 'E-Commerce',
    founded: 2007,
    valuation: '$37.6B',
    keyMetric: '48% market share',
    headquarters: 'Bangalore, India',
    readTime: 40,
    excerpt: 'How Flipkart beat Amazon in India by understanding that cash-on-delivery, vernacular commerce, and hyperlocal fulfillment weren\'t features—they were the product.',
    lessons: ['Local > global playbooks', 'Trust before transactions', 'Build infrastructure others won\'t'],
    icon: <Globe className="h-12 w-12" />,
    color: 'graphite-800'
  }
];

export default function CaseStudiesLanding() {
  return (
    <LearnLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block px-4 py-2 bg-ink text-paper mb-6">
            <div className="text-xs uppercase tracking-widest font-semibold">Case Studies</div>
          </div>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-ink mb-6 leading-none">
            How Startups
            <br />
            <span className="italic">Actually</span> Win
          </h1>
          
          <p className="text-2xl text-graphite-700 leading-relaxed max-w-4xl">
            Real stories of Indian startups that built billion-dollar businesses. No fluff, 
            no motivational quotes—just strategy, execution, pivots, and lessons you can steal.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-16 pb-16 border-b-2 border-graphite-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
              Companies
            </div>
            <div className="font-serif text-4xl font-bold text-ink">
              {caseStudies.length}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
              Combined Valuation
            </div>
            <div className="font-serif text-4xl font-bold text-ink">
              $55.1B+
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
              Total Reading Time
            </div>
            <div className="font-serif text-4xl font-bold text-ink">
              {caseStudies.reduce((sum, cs) => sum + cs.readTime, 0)} min
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Link
              key={study.id}
              href={`/learn/case-studies/${study.slug}`}
              className="block group"
            >
              <div className="border-2 border-ink hover:bg-ink transition-all duration-300">
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Icon & Company */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className={`mb-6 text-${study.color} group-hover:text-paper transition-colors`}>
                          {study.icon}
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink group-hover:text-paper mb-3 transition-colors">
                          {study.company}
                        </h2>
                        <div className="text-sm text-graphite-600 group-hover:text-graphite-300 transition-colors">
                          {study.founded} • {study.headquarters}
                        </div>
                      </div>

                      <div className="mt-6 md:mt-0">
                        <div className="inline-flex items-center gap-2 text-ink group-hover:text-paper font-semibold group-hover:gap-4 transition-all">
                          Read Case Study
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    {/* Middle: Content */}
                    <div className="md:col-span-2">
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1 bg-graphite-900 group-hover:bg-paper text-paper group-hover:text-ink text-xs uppercase tracking-widest font-semibold mb-4 transition-colors">
                          {study.category}
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink group-hover:text-paper mb-4 transition-colors">
                          {study.tagline}
                        </h3>
                        <p className="text-lg text-graphite-700 group-hover:text-graphite-200 leading-relaxed mb-6 transition-colors">
                          {study.excerpt}
                        </p>
                      </div>

                      {/* Key Lessons */}
                      <div className="mb-6">
                        <div className="text-xs uppercase tracking-widest text-graphite-500 group-hover:text-graphite-400 mb-3 transition-colors">
                          Key Lessons
                        </div>
                        <div className="space-y-2">
                          {study.lessons.map((lesson, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="flex-shrink-0 w-5 h-5 border-2 border-ink group-hover:border-paper group-hover:bg-paper transition-colors" />
                              <span className="text-graphite-800 group-hover:text-graphite-200 transition-colors">
                                {lesson}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-graphite-300 group-hover:border-graphite-700 transition-colors">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-graphite-500 group-hover:text-graphite-400 mb-1 transition-colors">
                            Valuation
                          </div>
                          <div className="font-semibold text-ink group-hover:text-paper transition-colors">
                            {study.valuation}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-graphite-500 group-hover:text-graphite-400 mb-1 transition-colors">
                            Key Metric
                          </div>
                          <div className="font-semibold text-ink group-hover:text-paper transition-colors">
                            {study.keyMetric}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-graphite-500 group-hover:text-graphite-400 mb-1 transition-colors">
                            Read Time
                          </div>
                          <div className="font-semibold text-ink group-hover:text-paper transition-colors">
                            {study.readTime} min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-16 border-t-2 border-graphite-200">
          <div className="p-12 bg-ink text-paper">
            <h3 className="font-serif text-3xl font-bold mb-4">
              More Case Studies Coming Soon
            </h3>
            <p className="text-xl text-graphite-200 leading-relaxed mb-6 max-w-3xl">
              We&apos;re adding deep-dive analyses of Airbnb (trust design), Nike (brand equity), 
              Apple (simplicity), Paytm (QR code revolution), and more. Request a specific 
              company study via <a href="mailto:learn@incubazar.com" className="underline hover:text-paper transition-colors">learn@incubazar.com</a>.
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-paper hover:bg-paper hover:text-ink transition-all font-semibold"
            >
              Back to All Modules
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}
