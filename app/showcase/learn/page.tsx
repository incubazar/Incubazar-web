'use client';

import Link from 'next/link';
import { BookOpen, Users, TrendingUp, Award, CheckCircle, ArrowRight, Download, BarChart3, Target, Zap } from 'lucide-react';

export default function LearnShowcasePage() {
  const stats = [
    { label: 'Learning Modules', value: '73+', icon: <BookOpen className="h-6 w-6" /> },
    { label: 'Case Studies', value: '6', icon: <Award className="h-6 w-6" /> },
    { label: 'Templates & Tools', value: '15+', icon: <Download className="h-6 w-6" /> },
    { label: 'Total Reading Time', value: '245+ min', icon: <TrendingUp className="h-6 w-6" /> },
  ];

  const completedModules = [
    {
      title: 'Incorporation & Legal Foundations',
      duration: '45 min',
      topics: ['5 business structures (Pvt Ltd, LLP, OPC)', 'India vs USA comparison', 'Compliance checklist', '5 authoritative citations'],
      path: '/learn/incorporation'
    },
    {
      title: 'Finance, Funding & Cap Tables',
      duration: '55 min',
      topics: ['Funding stages (Pre-seed to Series C)', 'Equity vs Debt vs Revenue-based', 'Cap table math & dilution', 'Unit economics (CAC, LTV, NRR)', 'Burn rate & runway'],
      path: '/learn/finance'
    },
    {
      title: 'Product & Go-To-Market Strategy',
      duration: '50 min',
      topics: ['MVP strategy (5 types)', 'Product-market fit (Sean Ellis 40% rule)', '10 SaaS metrics dashboard', 'Pricing models', 'B2B vs B2C GTM playbooks'],
      path: '/learn/product'
    },
    {
      title: 'Brand, Typography & Logo Design',
      duration: '60 min',
      topics: ['Brand foundations', 'Typography system deep-dive', 'Logo design process', '3 case studies (Apple, Nike, FedEx)', 'WCAG AAA accessibility'],
      path: '/learn/brand'
    },
    {
      title: 'Case Study: Razorpay',
      duration: '35 min',
      topics: ['Developer-first fintech strategy', '10-year timeline (2014-2024)', '$7.5B valuation journey', '6 lessons for founders', 'Unit economics breakdown'],
      path: '/learn/case-studies/razorpay'
    }
  ];

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Research-Backed Content',
      description: 'Every claim cited with authoritative sources (SEBI, Y Combinator, Sequoia, First Round, CB Insights). Academic-level rigor.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Actionable Templates',
      description: 'Downloadable cap table calculators, financial models, checklists, pricing worksheets—ready to use in Excel/PDF.'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Data-Driven Insights',
      description: 'Real benchmarks: CAC, LTV, churn rates, NRR targets, pricing psychology, GTM playbooks with actual numbers.'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Editorial Magazine Design',
      description: 'NYT-inspired monochrome aesthetic. 21:1 contrast (WCAG AAA). Playfair Display serif + DM Sans for readability.'
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
                href="/learn"
                className="px-6 py-3 bg-ink text-paper font-semibold hover:bg-graphite-900 transition-colors"
              >
                View Platform
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-ink text-paper mb-6">
            <div className="text-xs uppercase tracking-widest font-semibold">Platform Showcase</div>
          </div>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-ink mb-6 leading-none">
            Founder Learning
            <br />
            <span className="italic">& Growth</span>
          </h1>
          
          <p className="text-2xl text-graphite-700 leading-relaxed max-w-4xl mb-8">
            A production-ready, magazine-style educational platform for waitlist users. 
            Comprehensive curriculum covering incorporation to scaling—backed by data, 
            citations, and real-world case studies.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#modules"
              className="px-6 py-3 border-2 border-ink hover:bg-ink hover:text-paper transition-all font-semibold inline-flex items-center gap-2"
            >
              Explore Modules
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#demo"
              className="px-6 py-3 border-2 border-graphite-400 hover:border-ink transition-colors font-semibold"
            >
              Live Demo
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16 border-y-2 border-graphite-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3 text-ink">
                {stat.icon}
              </div>
              <div className="font-serif text-4xl font-bold text-ink mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-graphite-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-graphite-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="font-serif text-4xl font-bold text-ink mb-12">
            Why This Platform Stands Out
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 border-2 border-ink bg-paper hover:bg-ink hover:text-paper transition-all group">
                <div className="mb-4 text-ink group-hover:text-paper transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-graphite-700 group-hover:text-graphite-200 leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Modules */}
      <div id="modules" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="mb-12">
          <h2 className="font-serif text-4xl font-bold text-ink mb-4">
            Production-Ready Modules (7/73 Complete)
          </h2>
          <p className="text-xl text-graphite-700">
            Each module is fully written, cited, and includes downloadable templates. 
            Click any module to see live content.
          </p>
        </div>

        <div className="space-y-6">
          {completedModules.map((module, index) => (
            <Link
              key={index}
              href={module.path}
              className="block border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-ink flex-shrink-0" />
                      <h3 className="font-serif text-2xl font-bold text-ink group-hover:underline">
                        {module.title}
                      </h3>
                    </div>
                    <div className="text-sm text-graphite-600 mb-4">
                      {module.duration} read • Intermediate level
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-ink flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {module.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-graphite-800">
                      <span className="text-ink font-semibold">•</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Case Studies Preview */}
        <div className="mt-12 p-8 bg-ink text-paper">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-3">
                Case Studies: Real Startup Stories
              </h3>
              <p className="text-xl text-graphite-200 leading-relaxed max-w-3xl">
                NYT-inspired editorial design with timeline components, before/after pivot 
                analysis, metrics showcases, and actionable lessons.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 border-2 border-paper">
              <div className="text-xs uppercase tracking-widest text-graphite-400 mb-2">
                ✅ Complete
              </div>
              <h4 className="font-serif text-xl font-bold mb-2">Razorpay</h4>
              <p className="text-sm text-graphite-300 mb-4">
                Developer-first fintech revolution. $7.5B valuation, 10-year timeline, 
                6 lessons for founders.
              </p>
              <Link
                href="/learn/case-studies/razorpay"
                className="text-sm font-semibold underline hover:text-graphite-200 transition-colors"
              >
                Read Case Study →
              </Link>
            </div>

            <div className="p-6 border-2 border-graphite-700 bg-graphite-900">
              <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
                Coming Soon
              </div>
              <h4 className="font-serif text-xl font-bold mb-2">Zomato</h4>
              <p className="text-sm text-graphite-400 mb-4">
                Hyperlocal execution excellence. From restaurant discovery to food 
                delivery empire.
              </p>
            </div>

            <div className="p-6 border-2 border-graphite-700 bg-graphite-900">
              <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
                Coming Soon
              </div>
              <h4 className="font-serif text-xl font-bold mb-2">Flipkart</h4>
              <p className="text-sm text-graphite-400 mb-4">
                E-commerce localization playbook. How Flipkart beat Amazon in India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Design System */}
      <div className="bg-graphite-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="font-serif text-4xl font-bold text-ink mb-8">
            Design System & Accessibility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border-2 border-ink bg-paper">
              <h3 className="font-serif text-2xl font-bold text-ink mb-4">
                Monochrome Editorial Aesthetic
              </h3>
              <ul className="space-y-3 text-graphite-800">
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Typography:</strong> Playfair Display (serif) + DM Sans (sans-serif)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Color Palette:</strong> Black (#000), white (#FFF), graphite 50-950</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Layout:</strong> Sharp edges (0 border radius), 8px grid system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Inspiration:</strong> New York Times, The Economist, Financial Times</span>
                </li>
              </ul>
            </div>

            <div className="p-8 border-2 border-ink bg-paper">
              <h3 className="font-serif text-2xl font-bold text-ink mb-4">
                WCAG AAA Compliance
              </h3>
              <ul className="space-y-3 text-graphite-800">
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Contrast Ratio:</strong> 21:1 (black on white) — exceeds AAA standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Typography:</strong> 18px body text, 1.75 line-height for readability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Responsive:</strong> Mobile-first (320px → 1920px)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span><strong>Navigation:</strong> Keyboard accessible, screen reader compatible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <h2 className="font-serif text-4xl font-bold text-ink mb-8">
          Technical Implementation
        </h2>

        <div className="p-8 border-2 border-ink bg-paper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-ink mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm text-graphite-800">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS 3.4</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-3">Components</h3>
              <ul className="space-y-2 text-sm text-graphite-800">
                <li>• 14 Article components</li>
                <li>• 9 Case Study components</li>
                <li>• Reusable citation system</li>
                <li>• Interactive metrics cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-3">Content</h3>
              <ul className="space-y-2 text-sm text-graphite-800">
                <li>• 7 complete modules</li>
                <li>• 245+ min reading time</li>
                <li>• 40+ authoritative citations</li>
                <li>• 15+ downloadable templates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-ink text-paper py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-graphite-200 mb-8 max-w-3xl mx-auto">
            Experience the platform yourself. Navigate through modules, read case studies, 
            and see the quality of content designed for founder education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/learn"
              className="px-8 py-4 bg-paper text-ink font-semibold hover:bg-graphite-100 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              Launch Platform
            </Link>
            <Link
              href="/learn/case-studies/razorpay"
              className="px-8 py-4 border-2 border-paper hover:bg-paper hover:text-ink transition-all font-semibold"
            >
              View Case Study Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-graphite-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <div className="text-center text-sm text-graphite-600">
            <p>Built by Incubazar • October 2024</p>
            <p className="mt-2">Contact: <a href="mailto:learn@incubazar.com" className="underline hover:text-ink">learn@incubazar.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
