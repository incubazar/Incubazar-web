'use client'

import { PremiumCard, PremiumCardContent, PremiumCardDescription, PremiumCardHeader, PremiumCardTitle } from '@/components/ui/premium-card'
import { Rocket, Shield, Users, TrendingUp, FileCheck, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Rocket,
    title: 'Smart Matchmaking',
    description: 'Our platform intelligently connects founders with compatible investors based on sector alignment, stage, and investment thesis.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Regulatory Compliance',
    description: 'Facilitate Section 42 compliant private placements with complete transparency and adherence to Indian regulations.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Users,
    title: 'Curated Network',
    description: 'Access a vetted community of 200+ angel investors and 500+ validated startup founders ready to connect.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Deal Flow Matching',
    description: 'AI-powered matching connects startups with investors who have the right expertise, interests, and capacity.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FileCheck,
    title: 'Document Facilitation',
    description: 'Streamlined document generation for term sheets, agreements, and compliance paperwork to accelerate connections.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Sparkles,
    title: 'Connection Platform',
    description: 'Enterprise-grade matching platform with analytics, transparent communication, and deal tracking tools.',
    color: 'from-amber-500 to-yellow-500',
  },
]

export default function PremiumFeatures() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      <div className="container-premium relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            Built for{' '}
            <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x">
              Connections
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to find and connect with the right partners in one intelligent matching platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PremiumCard hover glow className="h-full group">
                  <PremiumCardHeader>
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <PremiumCardTitle>{feature.title}</PremiumCardTitle>
                  </PremiumCardHeader>
                  <PremiumCardContent>
                    <PremiumCardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </PremiumCardDescription>
                  </PremiumCardContent>
                </PremiumCard>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-6">
            Join hundreds of successful connections between founders and investors
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Matching Platform', 'Investor Network', 'Founder Community', 'Deal Facilitation'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
