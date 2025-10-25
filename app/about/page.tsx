import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Rocket, Shield, Zap, Users, TrendingUp, CheckCircle2, Sparkles, Globe, Target } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium-button'

export const metadata: Metadata = {
  title: 'About Us - Empowering India\'s Startup Ecosystem',
  description: 'Incubazar is a trust-first digital platform simplifying fundraising for early-stage founders and investors in India through AI-driven discovery, automated due diligence, and built-in legal compliance.',
  openGraph: {
    title: 'About Incubazar - We Connect Visionaries',
    description: 'Reimagining how innovation meets capital through technology, trust, and transparency.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-ink/10 bg-paper">
              <Sparkles className="w-4 h-4 text-ink" />
              <span className="text-sm font-medium text-ink uppercase tracking-wide">
                About Incubazar
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-ink">
              Empowering India&apos;s
              <br />
              <span className="italic">Startup Revolution</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-ink/70 max-w-4xl mx-auto leading-relaxed">
              A trust-first digital platform designed to simplify fundraising for early-stage founders and investors in India
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-ink/10 bg-white">
                <Rocket className="w-4 h-4 text-ink" />
                <span className="text-sm font-medium text-ink uppercase tracking-wide">Our Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ink">
                Making Startup–Investor Connections{' '}
                <span className="italic">Transparent & Accessible</span>
              </h2>
              
              <p className="text-lg text-ink/70 leading-relaxed">
                In India's rapidly growing startup ecosystem, where fundraising often feels complex and unstructured, 
                Incubazar bridges the gap by offering a digital platform powered by AI-driven startup discovery, 
                automated due diligence, and built-in legal compliance.
              </p>
              
              <p className="text-lg text-ink/70 leading-relaxed">
                We're here for everyone — from student entrepreneurs taking their first steps to emerging founders 
                scaling their ventures. Our mission is to democratize access to capital and make quality investments 
                accessible to verified investors.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 animate-fade-in-right">
              <div className="space-y-6">
                <div className="p-6 border-2 border-ink bg-white hover:bg-ink hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 border-2 border-ink flex items-center justify-center mb-4 group-hover:border-white transition-colors">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-display">Trust First</h3>
                  <p className="text-sm opacity-70">Built-in compliance and verification</p>
                </div>
                
                <div className="p-6 border-2 border-ink bg-white hover:bg-ink hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 border-2 border-ink flex items-center justify-center mb-4 group-hover:border-white transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-display">AI-Powered</h3>
                  <p className="text-sm opacity-70">Smart matching and insights</p>
                </div>
              </div>
              
              <div className="space-y-6 pt-12">
                <div className="p-6 border-2 border-ink bg-white hover:bg-ink hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 border-2 border-ink flex items-center justify-center mb-4 group-hover:border-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-display">Community</h3>
                  <p className="text-sm opacity-70">Connect with verified ecosystem</p>
                </div>
                
                <div className="p-6 border-2 border-ink bg-white hover:bg-ink hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 border-2 border-ink flex items-center justify-center mb-4 group-hover:border-white transition-colors">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-display">Growth</h3>
                  <p className="text-sm opacity-70">Scale with expert support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Founders Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-ink">
              Built for <span className="italic">Founders</span>
            </h2>
            <p className="text-xl text-ink/70 max-w-3xl mx-auto">
              Everything you need to raise capital and grow your startup — all in one place
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: 'Verified Profiles',
                description: 'Create a comprehensive startup profile with AI-assisted content and automatic verification'
              },
              {
                icon: Shield,
                title: 'Legal Compliance',
                description: 'Generate Section 42 compliant documents and ensure regulatory compliance automatically'
              },
              {
                icon: Users,
                title: 'Investor Network',
                description: 'Connect with verified angel investors and VCs actively looking for opportunities'
              },
              {
                icon: Zap,
                title: 'Smart Matching',
                description: 'AI-powered recommendations connect you with investors aligned with your industry and stage'
              },
              {
                icon: TrendingUp,
                title: 'Data Room',
                description: 'Secure document sharing and automated due diligence to accelerate fundraising'
              },
              {
                icon: Rocket,
                title: 'Growth Tools',
                description: 'Access mentorship, resources, and tools to scale your venture effectively'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border-2 border-ink/10 bg-white hover:border-ink hover:bg-paper transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 border-2 border-ink flex items-center justify-center mb-4 group-hover:bg-ink group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display text-ink">{feature.title}</h3>
                <p className="text-ink/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Investors Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-ink">
              Designed for <span className="italic">Investors</span>
            </h2>
            <p className="text-xl text-ink/70 max-w-3xl mx-auto">
              Discover vetted startups, track your portfolio, and make informed investment decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Curated Deal Flow',
                description: 'Access pre-vetted startups that match your investment thesis and preferences'
              },
              {
                title: 'Smart Analytics',
                description: 'Track portfolio performance with real-time metrics and AI-powered insights'
              },
              {
                title: 'Due Diligence',
                description: 'Automated background checks, financial analysis, and risk assessment tools'
              },
              {
                title: 'Market Insights',
                description: 'Personalized recommendations based on market trends and your risk profile'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 border-2 border-ink/10 bg-white hover:border-ink hover:bg-ink hover:text-white transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 border-2 border-ink flex items-center justify-center mb-6 group-hover:border-white transition-colors">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India's Ecosystem Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-ink/10 bg-white mb-6">
              <Globe className="w-4 h-4 text-ink" />
              <span className="text-sm font-medium text-ink uppercase tracking-wide">India&apos;s Startup Ecosystem</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-ink">
              Reimagining How <span className="italic">Innovation Meets Capital</span>
            </h2>
            <p className="text-xl text-ink/70 max-w-3xl mx-auto">
              With India being the third-largest startup ecosystem in the world, Incubazar is at the forefront 
              of transforming how innovation connects with capital
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                stat: '100,000+',
                label: 'Startups in India',
                description: 'Growing ecosystem of innovation'
              },
              {
                stat: '3rd',
                label: 'Largest Globally',
                description: 'India\'s startup ecosystem rank'
              },
              {
                stat: '₹1000Cr+',
                label: 'Capital Potential',
                description: 'Funding opportunities available'
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 border-2 border-ink bg-white hover:bg-ink hover:text-white transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold font-display mb-4">
                  {stat.stat}
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">{stat.label}</h3>
                <p className="text-sm opacity-70">{stat.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-ink/70 mb-8 max-w-4xl mx-auto leading-relaxed">
              Through technology, trust, and transparency, we&apos;re building the infrastructure that will power 
              the next generation of Indian startups. Join us as we empower entrepreneurs and redefine how 
              startup funding works in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 border-4 border-ink bg-white overflow-hidden animate-fade-in-up">
            
            <div className="relative text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ink">
                Ready to <span className="italic">Get Started?</span>
              </h2>
              
              <p className="text-xl text-ink/70 max-w-2xl mx-auto">
                Join thousands of founders and investors building the future of India&apos;s startup ecosystem
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/waitlist">
                  <PremiumButton size="lg" className="group">
                    Join the Waitlist
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </PremiumButton>
                </Link>
                
                <Link href="/">
                  <PremiumButton variant="outline" size="lg">
                    Learn More
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
