import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Monochrome Background - subtle paper texture */}
      <div className="absolute inset-0 bg-paper" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ink rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-graphite-900 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge - Monochrome */}
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-graphite-100 border border-graphite-300 px-6 py-2 text-sm font-medium shadow-editorial"
            >
              <Sparkles className="w-4 h-4 mr-2 text-ink" />
              Trust-First Platform for India's Startup Ecosystem
            </Badge>
          </div>

          {/* Main Headline - Editorial Typography */}
          <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-8xl text-ink leading-none tracking-tight">
            The Marketplace of{' '}
            <span className="italic border-b-4 border-ink">Innovation</span>
          </h1>

          {/* Subtext - Clean Sans-serif */}
          <p className="text-xl md:text-2xl text-graphite-600 max-w-3xl mx-auto leading-relaxed font-body">
            Where founders meet investors, mentors, and opportunities.
            <br />
            Build your startup. Find your funding. Grow your network.
          </p>

          {/* CTA Buttons - Monochrome with Invert Hover */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/auth/register?role=founder">
              <Button 
                size="lg" 
                className="bg-ink text-paper px-8 py-6 text-lg font-semibold hover:bg-graphite-900 transition-all group w-full sm:w-auto"
              >
                Join as Founder
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/auth/register?role=investor">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-ink text-ink px-8 py-6 text-lg font-semibold hover:bg-ink hover:text-paper transition-all group w-full sm:w-auto"
              >
                Join as Investor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Monochrome */}
          <div className="pt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-graphite-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-graphite-900 rounded-full animate-pulse" />
              <span className="font-medium">100% Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-graphite-800 rounded-full animate-pulse" />
              <span className="font-medium">Curated Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-graphite-700 rounded-full animate-pulse" />
              <span className="font-medium">Expert Mentorship</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Monochrome */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-graphite-400 p-1">
          <div className="w-1.5 h-3 bg-ink mx-auto" />
        </div>
      </div>
    </section>
  )
}
