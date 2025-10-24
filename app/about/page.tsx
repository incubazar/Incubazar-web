import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Rocket, Shield, Zap, Users, TrendingUp, CheckCircle2, Sparkles, Globe, Target } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium-button'
import { AnimatedBackground } from '@/components/ui/animated-background'

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                About Incubazar
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Empowering India's
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Startup Revolution
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A trust-first digital platform designed to simplify fundraising for early-stage founders and investors in India
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <Rocket className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Our Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Making Startup–Investor Connections{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Transparent & Accessible
                </span>
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                In India's rapidly growing startup ecosystem, where fundraising often feels complex and unstructured, 
                Incubazar bridges the gap by offering a digital platform powered by AI-driven startup discovery, 
                automated due diligence, and built-in legal compliance.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                We're here for everyone — from student entrepreneurs taking their first steps to emerging founders 
                scaling their ventures. Our mission is to democratize access to capital and make quality investments 
                accessible to verified investors.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 animate-fade-in-right">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Trust First</h3>
                  <p className="text-gray-400">Built-in compliance and verification</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI-Powered</h3>
                  <p className="text-gray-400">Smart matching and insights</p>
                </div>
              </div>
              
              <div className="space-y-6 pt-12">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Community</h3>
                  <p className="text-gray-400">Connect with verified ecosystem</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Growth</h3>
                  <p className="text-gray-400">Scale with expert support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Founders Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Built for{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Founders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Investors Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Designed for{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Investors
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover vetted startups, track your portfolio, and make informed investment decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Curated Deal Flow',
                description: 'Access pre-vetted startups that match your investment thesis and preferences',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Smart Analytics',
                description: 'Track portfolio performance with real-time metrics and AI-powered insights',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Due Diligence',
                description: 'Automated background checks, financial analysis, and risk assessment tools',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Market Insights',
                description: 'Personalized recommendations based on market trends and your risk profile',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India's Ecosystem Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-green-500/10 border border-orange-500/20 backdrop-blur-sm mb-6">
              <Globe className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">India's Startup Ecosystem</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Reimagining How{' '}
              <span className="bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Innovation Meets Capital
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  {stat.stat}
                </div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Through technology, trust, and transparency, we're building the infrastructure that will power 
              the next generation of Indian startups. Join us as we empower entrepreneurs and redefine how 
              startup funding works in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-xl overflow-hidden animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse" />
            
            <div className="relative text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Ready to{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Get Started?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of founders and investors building the future of India's startup ecosystem
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
