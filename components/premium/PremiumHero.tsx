'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PremiumButton } from '@/components/ui/premium-button'
import { DataBadge } from '@/components/ui/data-badge'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, Sparkles } from 'lucide-react'

export default function PremiumHero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20 md:pt-24 pb-12 md:pb-20 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="mesh" className="opacity-60" />
      
      {/* Floating elements for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-3xl animate-float opacity-20" />
        <div className="absolute bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float opacity-20" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      
      <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-16 lg:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Badge */}
          <div className="animate-fade-in-down flex justify-center">
            <DataBadge variant="default" icon={<Shield className="h-3 w-3" />} className="backdrop-blur-sm bg-primary/10 border-primary/20 text-xs md:text-sm">
              <Sparkles className="h-3 w-3 mr-1 inline" />
              Section 42 Compliant Platform
            </DataBadge>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 md:space-y-6 animate-fade-in-up px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold leading-[1.1] tracking-tight">
              We Connect
              <br />
              <span className="relative inline-block text-[1.2em] sm:text-[1.25em] md:text-[1.3em] lg:text-[1.35em]">
                <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x">
                  Visionaries
                </span>
                <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full animate-pulse" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed font-medium px-2">
              And help them turn ideas into{' '}
              <span className="relative inline-block">
                <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x font-semibold">
                  investments
                </span>
              </span>. Connecting early-stage founders with angel investors through a compliant, transparent platform designed for India's startup ecosystem.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center pt-2 md:pt-4 animate-scale-in px-4" style={{ animationDelay: '0.2s' }}>
            <Link href="/waitlist" className="w-full sm:w-auto">
              <PremiumButton 
                size="lg" 
                variant="premium"
                className="w-full sm:min-w-[200px]"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </PremiumButton>
            </Link>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <PremiumButton 
                size="lg" 
                variant="outline"
                className="w-full sm:min-w-[200px]"
              >
                Sign In
                <TrendingUp className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </PremiumButton>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 md:pt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-2 md:space-x-3 group cursor-default justify-center sm:justify-start">
              <div className="p-2 md:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground text-sm md:text-base">Regulatory Compliant</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3 group cursor-default justify-center sm:justify-start">
              <div className="p-2 md:p-2.5 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300 group-hover:scale-110">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              </div>
              <span className="font-semibold text-foreground text-sm md:text-base">Curated Startups</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3 group cursor-default justify-center sm:justify-start">
              <div className="p-2 md:p-2.5 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:scale-110">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              </div>
              <span className="font-semibold text-foreground text-sm md:text-base">Verified Investors</span>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-12 md:pt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.6s' }}>
            <div className="text-center space-y-2 md:space-y-3 group cursor-default">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Section <span className="text-primary">42</span>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium">Compliant Platform</p>
            </div>
            <div className="text-center space-y-2 md:space-y-3 sm:border-x border-border/50 group cursor-default">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                AI <span className="text-primary">Driven</span>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium">Smart Matching</p>
            </div>
            <div className="text-center space-y-2 md:space-y-3 group cursor-default">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                100<span className="text-primary">%</span>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium">Digital & Secure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
