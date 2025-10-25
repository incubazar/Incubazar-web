'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Rocket, 
  Target, 
  FileText, 
  Users, 
  TrendingUp, 
  Shield, 
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function ForWhom() {
  const [activeTab, setActiveTab] = useState<'founders' | 'investors'>('founders')

  const founderFeatures = [
    {
      icon: Rocket,
      title: 'Launch Your Startup',
      description: 'Create a compelling profile and pitch deck with our guided templates',
    },
    {
      icon: Users,
      title: 'Meet Investors',
      description: 'Connect with angel investors actively seeking opportunities in your sector',
    },
    {
      icon: FileText,
      title: 'Legal Support',
      description: 'Access compliance tools, document templates, and regulatory guidance',
    },
    {
      icon: Target,
      title: 'Expert Mentorship',
      description: 'Learn from successful founders and industry experts in your domain',
    },
  ]

  const investorFeatures = [
    {
      icon: TrendingUp,
      title: 'Curated Deal Flow',
      description: 'Access pre-vetted startups with verified documentation and due diligence',
    },
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Invest with confidence through our compliant investment framework',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Management',
      description: 'Track your investments, monitor progress, and receive regular updates',
    },
    {
      icon: CheckCircle2,
      title: 'Verified Founders',
      description: 'Connect with serious, committed founders who have been background-checked',
    },
  ]

  const features = activeTab === 'founders' ? founderFeatures : investorFeatures

  return (
    <section id="for-founders" className="py-24 lg:py-32 bg-paper">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header - Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-ink tracking-tight">
            Built for Your Success
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 font-body">
            Tailored features for founders and investors at every stage
          </p>
        </div>

        {/* Tabs - Monochrome */}
        <div className="flex justify-center mb-12">
          <div className="bg-graphite-100 border border-graphite-300 p-2 inline-flex">
            <button
              onClick={() => setActiveTab('founders')}
              className={`px-8 py-3 font-semibold transition-all ${
                activeTab === 'founders'
                  ? 'bg-ink text-paper'
                  : 'text-graphite-600 hover:bg-graphite-200'
              }`}
            >
              For Founders
            </button>
            <button
              onClick={() => setActiveTab('investors')}
              className={`px-8 py-3 font-semibold transition-all ${
                activeTab === 'investors'
                  ? 'bg-ink text-paper'
                  : 'text-graphite-600 hover:bg-graphite-200'
              }`}
            >
              For Investors
            </button>
          </div>
        </div>

        {/* Features Grid - Monochrome Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 bg-paper border-2 border-graphite-200 hover:border-ink transition-all hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-ink flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-paper" />
                </div>
              </div>
              <h3 className="text-lg font-serif font-semibold text-ink mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-graphite-600 leading-relaxed font-body">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Section - Monochrome Invert */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-ink border-0 p-8 lg:p-12 text-center shadow-editorial-xl">
            <Badge className="bg-graphite-800 text-paper border border-graphite-700 mb-4">
              Limited Time Offer
            </Badge>
            <h3 className="text-2xl lg:text-4xl font-serif font-bold text-paper mb-4">
              {activeTab === 'founders' 
                ? 'Ready to Launch Your Startup?' 
                : 'Ready to Discover Your Next Investment?'}
            </h3>
            <p className="text-graphite-300 text-lg mb-8 max-w-2xl mx-auto font-body">
              {activeTab === 'founders'
                ? 'Join hundreds of founders who have raised funding through Incubazar'
                : 'Get exclusive access to pre-vetted, high-potential startup deals'}
            </p>
            <Link href={`/auth/register?role=${activeTab === 'founders' ? 'founder' : 'investor'}`}>
              <Button 
                size="lg"
                className="bg-paper text-ink hover:bg-graphite-100 px-8 py-6 text-lg font-semibold group"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  )
}
