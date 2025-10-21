import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-hero dark:gradient-hero-dark" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-golden/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="glass px-6 py-2 text-sm font-medium shadow-soft hover:shadow-medium transition-smooth"
            >
              <Sparkles className="w-4 h-4 mr-2 text-electric" />
              Trust-First Platform for India's Startup Ecosystem
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-graphite-700 dark:text-white leading-tight">
            The Marketplace of{' '}
            <span className="text-gradient-electric">Innovation</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-graphite-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where founders meet investors, mentors, and opportunities.
            <br />
            Build your startup. Find your funding. Grow your network.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/auth/register?role=founder">
              <Button 
                size="lg" 
                className="gradient-electric text-white px-8 py-6 text-lg font-semibold shadow-glow-blue hover:shadow-strong transition-smooth group w-full sm:w-auto"
              >
                Join as Founder
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/auth/register?role=investor">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white dark:bg-graphite-800 border-2 border-graphite-700 dark:border-white text-graphite-700 dark:text-white px-8 py-6 text-lg font-semibold hover:bg-graphite-700 dark:hover:bg-white hover:text-white dark:hover:text-graphite-700 transition-smooth group w-full sm:w-auto"
              >
                Join as Investor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-graphite-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">100% Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
              <span className="font-medium">Curated Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-golden rounded-full animate-pulse" />
              <span className="font-medium">Expert Mentorship</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-graphite-300 dark:border-gray-600 rounded-full p-1">
          <div className="w-1.5 h-3 bg-electric rounded-full mx-auto" />
        </div>
      </div>
    </section>
  )
}
