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
    <section id="for-founders" className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-graphite-800 dark:to-graphite-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-graphite-700 dark:text-white">
            Built for Your Success
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 dark:text-gray-300">
            Tailored features for founders and investors at every stage
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-2xl p-2 inline-flex shadow-soft">
            <button
              onClick={() => setActiveTab('founders')}
              className={`px-8 py-3 rounded-xl font-semibold transition-smooth ${
                activeTab === 'founders'
                  ? 'gradient-electric text-white shadow-medium'
                  : 'text-graphite-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-graphite-700/50'
              }`}
            >
              For Founders
            </button>
            <button
              onClick={() => setActiveTab('investors')}
              className={`px-8 py-3 rounded-xl font-semibold transition-smooth ${
                activeTab === 'investors'
                  ? 'gradient-electric text-white shadow-medium'
                  : 'text-graphite-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-graphite-700/50'
              }`}
            >
              For Investors
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 bg-white dark:bg-graphite-800 border-0 rounded-xl shadow-soft hover:shadow-strong transition-smooth transform hover:scale-105 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center shadow-glow-blue">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-graphite-700 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-graphite-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-electric-500 to-electric-700 border-0 rounded-2xl p-8 lg:p-12 text-center shadow-strong">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Limited Time Offer
            </Badge>
            <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-white mb-4">
              {activeTab === 'founders' 
                ? 'Ready to Launch Your Startup?' 
                : 'Ready to Discover Your Next Investment?'}
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {activeTab === 'founders'
                ? 'Join hundreds of founders who have raised funding through Incubazar'
                : 'Get exclusive access to pre-vetted, high-potential startup deals'}
            </p>
            <Link href={`/auth/register?role=${activeTab === 'founders' ? 'founder' : 'investor'}`}>
              <Button 
                size="lg"
                className="bg-white text-electric-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-strong group"
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
