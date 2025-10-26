'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import Link from 'next/link';
import { 
  Scale, 
  TrendingUp, 
  Lightbulb, 
  FileText, 
  Briefcase, 
  Users,
  BarChart3,
  Wrench,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const learningPaths = [
  {
    icon: Scale,
    title: 'Incorporation & Legal',
    href: '/learn/incorporation',
    description: 'Company structures, formation, compliance, and legal foundations for Indian & US startups.',
    modules: 8,
    time: '2-3 hours',
    shade: 'dark'
  },
  {
    icon: TrendingUp,
    title: 'Finance & Funding',
    href: '/learn/finance',
    description: 'Funding stages, cap tables, unit economics, burn rate, and investor due diligence.',
    modules: 12,
    time: '3-4 hours',
    shade: 'medium'
  },
  {
    icon: Lightbulb,
    title: 'Product & Go-To-Market',
    href: '/learn/product',
    description: 'Problem discovery, MVP strategy, metrics (CAC, LTV), pricing, and channel playbooks.',
    modules: 10,
    time: '2-3 hours',
    shade: 'light'
  },
  {
    icon: FileText,
    title: 'Pitching & Decks',
    href: '/learn/pitching',
    description: '10-slide deck blueprint, elevator pitches, investor scripts, and winning examples.',
    modules: 6,
    time: '1-2 hours',
    shade: 'dark'
  },
  {
    icon: Briefcase,
    title: 'Brand, Typography & Logo',
    href: '/learn/brand',
    description: 'Deep dive into brand foundations, typography systems, logo design, and case studies.',
    modules: 7,
    time: '2 hours',
    shade: 'medium'
  },
  {
    icon: BarChart3,
    title: 'Industry Trends',
    href: '/learn/trends',
    description: 'Market data, growth rates, and playbooks for 9 industries across India & USA.',
    modules: 9,
    time: '3 hours',
    shade: 'light'
  },
  {
    icon: Users,
    title: 'Case Studies',
    href: '/learn/case-studies',
    description: 'Apple, Nike, Flipkart, Razorpay, Airbnb, Zomato — timelines, pivots, and lessons.',
    modules: 6,
    time: '2 hours',
    shade: 'dark'
  },
  {
    icon: Wrench,
    title: 'Toolkits & Templates',
    href: '/learn/toolkits',
    description: 'Download business plans, pitch decks, cap tables, calculators, and checklists.',
    modules: 15,
    time: '1 hour',
    shade: 'medium'
  },
];

const stats = [
  { label: 'Learning Modules', value: '73' },
  { label: 'Case Studies', value: '6' },
  { label: 'Templates & Tools', value: '15' },
  { label: 'Industry Snapshots', value: '9' },
];

export default function LearnIndexPage() {
  return (
    <LearnLayout>
      {/* Hero Section */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="max-w-4xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-ink text-paper text-xs uppercase tracking-widest font-semibold">
              For Unverified Founders
            </span>
          </div>

          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-ink tracking-tight leading-none mb-8">
            Build <span className="italic">Smart</span>.
          </h1>

          <div className="prose prose-xl max-w-3xl mb-12">
            <p className="text-2xl text-graphite-700 leading-relaxed mb-6">
              A comprehensive, research-backed curriculum covering every foundational aspect 
              of building a startup — from incorporation to exit.
            </p>
            <p className="text-xl text-graphite-600 leading-relaxed">
              While you&apos;re on the waitlist, immerse yourself in editorial-quality lessons, 
              data-backed case studies, and actionable templates. Every claim is cited. 
              Every insight is verified. Every tool is production-ready.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#paths"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper hover:bg-graphite-900 transition-colors text-lg font-semibold"
            >
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/learn/toolkits"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors text-lg font-semibold"
            >
              Browse Templates
              <Wrench className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 border-y-2 border-ink bg-graphite-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-5xl font-bold text-ink mb-2">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-graphite-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-4 sm:px-8 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-8 text-center">
            The Founder&apos;s Manifesto
          </h2>
          
          <div className="space-y-6 text-lg text-graphite-800 leading-relaxed">
            <p className="text-center italic text-2xl text-ink font-serif">
              &quot;Building a company is not luck. It's preparation meeting opportunity.&quot;
            </p>
            
            <p>
              <strong className="text-ink">We believe</strong> that every founder deserves access to 
              the same knowledge that powers Silicon Valley&apos;s most successful startups.
            </p>
            
            <p>
              <strong className="text-ink">We believe</strong> that education should be exhaustive, 
              not superficial — backed by data, not anecdotes.
            </p>
            
            <p>
              <strong className="text-ink">We believe</strong> that founders learn best from real 
              case studies, proven templates, and actionable frameworks.
            </p>
            
            <p className="text-xl text-ink font-semibold pt-4">
              This curriculum is your competitive advantage. Use it.
            </p>
          </div>

          {/* Subtle Services Note */}
          <div className="mt-16 pt-8 border-t border-graphite-200">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-graphite-400 mb-3">
                Beyond Learning
              </p>
              <p className="text-sm text-graphite-600 leading-relaxed">
                For founders who value quality, we also offer select branding and design services—
                <br className="hidden sm:block" />
                from logo design to complete brand identity.{' '}
                <a 
                  href="mailto:founder@incubazar.com" 
                  className="text-ink hover:underline underline-offset-4 font-medium transition-colors"
                >
                  Reach out to learn more
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="paths" className="px-4 sm:px-8 lg:px-12 py-20 bg-paper">
        <div className="mb-16">
          <h2 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
            Choose Your Path
          </h2>
          <p className="text-xl text-graphite-700 max-w-3xl">
            Start anywhere. Each path is self-contained with prerequisites clearly marked. 
            Progress is tracked automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.href}
                href={path.href}
                className={cn(
                  "group block p-8 border-2 border-ink transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                  path.shade === 'dark' && "bg-graphite-900 text-paper hover:bg-ink",
                  path.shade === 'medium' && "bg-graphite-100 text-ink hover:bg-graphite-200",
                  path.shade === 'light' && "bg-paper text-ink hover:bg-graphite-50"
                )}
              >
                <div className="flex items-start justify-between mb-6">
                  <Icon className={cn(
                    "h-12 w-12",
                    path.shade === 'dark' ? "text-paper" : "text-ink"
                  )} />
                  <ArrowRight className={cn(
                    "h-6 w-6 transform group-hover:translate-x-2 transition-transform",
                    path.shade === 'dark' ? "text-paper" : "text-ink"
                  )} />
                </div>

                <h3 className={cn(
                  "font-serif text-3xl font-bold mb-3",
                  path.shade === 'dark' ? "text-paper" : "text-ink"
                )}>
                  {path.title}
                </h3>

                <p className={cn(
                  "text-base leading-relaxed mb-6",
                  path.shade === 'dark' ? "text-graphite-300" : "text-graphite-700"
                )}>
                  {path.description}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <span className={cn(
                    "flex items-center gap-2",
                    path.shade === 'dark' ? "text-graphite-400" : "text-graphite-600"
                  )}>
                    <BookOpen className="h-4 w-4" />
                    {path.modules} modules
                  </span>
                  <span className={path.shade === 'dark' ? "text-graphite-500" : "text-graphite-400"}>
                    •
                  </span>
                  <span className={path.shade === 'dark' ? "text-graphite-400" : "text-graphite-600"}>
                    {path.time}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 bg-ink text-paper">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6 text-paper">
            Ready to Get Verified?
          </h2>
          <p className="text-xl text-paper/80 mb-8">
            Complete your profile, get verified, and unlock access to our investor network.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-paper text-ink hover:bg-graphite-100 transition-colors text-lg font-semibold"
          >
            Complete Your Profile
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </LearnLayout>
  );
}
