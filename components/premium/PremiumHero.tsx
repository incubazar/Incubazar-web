import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DataBadge } from '@/components/ui/data-badge'
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users } from 'lucide-react'

export default function PremiumHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      <div className="container-premium py-16 lg:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Badge */}
          <div className="animate-fade-in flex justify-center">
            <DataBadge variant="default" icon={<Shield className="h-3 w-3" />}>
              Section 42 Compliant Platform
            </DataBadge>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              India's Trust-First
              <br />
              <span className="text-gradient">Digital Incubator</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connecting early-stage founders with angel investors through a compliant, transparent platform designed for India's startup ecosystem.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in">
            <Link href="/auth/register?role=founder">
              <Button 
                size="lg" 
                className="px-10 py-7 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity"
              >
                Start Fundraising
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/register?role=investor">
              <Button 
                size="lg" 
                variant="outline"
                className="px-10 py-7 text-lg font-semibold border-2 hover:bg-primary/5"
              >
                Explore Startups
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Regulatory Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">Curated Startups</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-medium">Verified Investors</span>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold tracking-tight">
                500<span className="text-primary">+</span>
              </div>
              <p className="text-base text-muted-foreground font-medium">Active Founders</p>
            </div>
            <div className="text-center space-y-2 border-x border-border">
              <div className="text-5xl md:text-6xl font-bold tracking-tight">
                ₹50<span className="text-primary">Cr+</span>
              </div>
              <p className="text-base text-muted-foreground font-medium">Funds Raised</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold tracking-tight">
                200<span className="text-primary">+</span>
              </div>
              <p className="text-base text-muted-foreground font-medium">Angel Investors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
