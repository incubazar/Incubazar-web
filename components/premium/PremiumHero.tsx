'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PremiumButton } from '@/components/ui/premium-button'
import { DataBadge } from '@/components/ui/data-badge'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, Sparkles } from 'lucide-react'

export default function PremiumHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="mesh" className="opacity-60" />
      
      {/* Floating elements for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float opacity-20" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      
      <div className="container-premium py-16 lg:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Badge */}
          <div className="animate-fade-in-down flex justify-center">
            <DataBadge variant="default" icon={<Shield className="h-3 w-3" />} className="backdrop-blur-sm bg-primary/10 border-primary/20">
              <Sparkles className="h-3 w-3 mr-1 inline" />
              Section 42 Compliant Platform
            </DataBadge>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold leading-[1.1] tracking-tight">
              We Connect
              <br />
              <span className="relative inline-block">
                <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x">
                  Visionaries
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full animate-pulse" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-light">
              And help them turn ideas into{' '}
              <span className="text-foreground font-medium">investments</span>. Connecting early-stage founders with angel investors through a compliant, transparent platform designed for India's startup ecosystem.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/waitlist">
              <PremiumButton 
                size="xl" 
                variant="premium"
                className="min-w-[200px]"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
            </Link>
            <Link href="/auth/login">
              <PremiumButton 
                size="xl" 
                variant="outline"
                className="min-w-[200px]"
              >
                Sign In
                <TrendingUp className="ml-2 h-5 w-5" />
              </PremiumButton>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Regulatory Compliant</span>
            </div>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="p-2.5 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300 group-hover:scale-110">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-semibold text-foreground">Curated Startups</span>
            </div>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="p-2.5 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:scale-110">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-semibold text-foreground">Verified Investors</span>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center space-y-3 group cursor-default">
              <div className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                500<span className="text-primary">+</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-medium">Active Founders</p>
            </div>
            <div className="text-center space-y-3 border-x border-border/50 group cursor-default">
              <div className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                ₹50<span className="text-primary">Cr+</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-medium">Funds Raised</p>
            </div>
            <div className="text-center space-y-3 group cursor-default">
              <div className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                200<span className="text-primary">+</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-medium">Angel Investors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
