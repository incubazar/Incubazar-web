'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Palette, 
  Type, 
  Layers, 
  Zap,
  CheckCircle2,
  Star,
  Award,
  TrendingUp,
  Users,
  Heart,
  Instagram,
  MessageCircle,
  Send
} from 'lucide-react';
import EditorialNavbar from '@/components/editorial/EditorialNavbar';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import { cn } from '@/lib/utils';

export default function BrandingServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Complete brand systems that tell your story',
      features: [
        'Logo Design & Variants',
        'Color Palette Strategy',
        'Brand Guidelines',
        'Visual Language',
        'Brand Voice & Tone'
      ]
    },
    {
      icon: Type,
      title: 'Typography Systems',
      description: 'Fonts that speak your brand language',
      features: [
        'Custom Typography',
        'Type Scale Design',
        'Font Pairing',
        'Hierarchy Systems',
        'Digital & Print Specs'
      ]
    },
    {
      icon: Layers,
      title: 'Design Systems',
      description: 'Scalable design frameworks that grow with you',
      features: [
        'Component Libraries',
        'UI/UX Patterns',
        'Spacing & Layout',
        'Icon Systems',
        'Style Documentation'
      ]
    },
    {
      icon: Zap,
      title: 'Digital Presence',
      description: 'Make your brand shine across all platforms',
      features: [
        'Social Media Templates',
        'Pitch Deck Design',
        'Website Design',
        'Marketing Collateral',
        'Brand Applications'
      ]
    }
  ];

  const portfolio = [
    { name: 'Tech Startup', category: 'SaaS' },
    { name: 'Fintech Co', category: 'Finance' },
    { name: 'Health App', category: 'Healthcare' },
    { name: 'EdTech', category: 'Education' },
    { name: 'E-commerce', category: 'Retail' },
    { name: 'AI Platform', category: 'Technology' }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Deep dive into your vision, values, and target audience',
      icon: Users
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Craft a brand strategy that positions you for success',
      icon: TrendingUp
    },
    {
      step: '03',
      title: 'Design',
      description: 'Create stunning visuals that capture your essence',
      icon: Palette
    },
    {
      step: '04',
      title: 'Deliver',
      description: 'Launch your brand with a complete toolkit',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <EditorialNavbar />
      
      {/* Hero Section with Layered Design */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-ink">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-20 right-0 w-[600px] h-[600px] border-[80px] border-ink/5 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[500px] h-[500px] border-[60px] border-ink/5 rounded-full"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink bg-white"
            >
              <Sparkles className="w-4 h-4 text-ink" />
              <span className="text-xs font-bold text-ink uppercase tracking-[0.25em]">
                Premium Branding Services
              </span>
            </motion.div>

            {/* Main Headline - Editorial Style */}
            <div className="max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-ink leading-[0.9]"
              >
                Brands That
                <br />
                <span className="relative inline-block italic">
                  Make History
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-ink"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>
            </div>

            {/* Subheadline - Two Column Layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 gap-8 max-w-5xl pt-8"
            >
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl text-ink/80 leading-relaxed">
                  We don&apos;t just design logos. We craft brand experiences that captivate, 
                  convert, and create lasting impressions.
                </p>
              </div>
              <div className="flex items-end">
                <p className="text-sm text-ink/60 leading-relaxed border-l-2 border-ink/20 pl-4">
                  From early-stage startups to established companies, we build brands that 
                  stand out in crowded markets and resonate with audiences.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <Link href="mailto:founder@incubazar.com?subject=Branding Services Inquiry">
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 bg-ink text-white font-bold text-lg border-2 border-ink hover:bg-white hover:text-ink transition-all duration-300 flex items-center gap-3"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="#portfolio">
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-ink font-bold text-lg border-2 border-ink hover:bg-ink hover:text-white transition-all duration-300"
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats - Editorial Style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-8 max-w-4xl pt-16 border-t-2 border-ink/20"
            >
              {[
                { number: '50+', label: 'Brands Created', description: 'From concept to launch' },
                { number: '100%', label: 'Satisfaction', description: 'Client success rate' },
                { number: '2 Weeks', label: 'Avg Delivery', description: 'Fast turnaround' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="group"
                >
                  <div className="text-4xl sm:text-5xl font-display font-bold text-ink mb-2 group-hover:text-ink/70 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-ink/80 uppercase tracking-wider font-bold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-ink/50">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Magazine Style */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 border-b-2 border-ink pb-8"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-ink/60 mb-4">
              What We Offer
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-ink leading-tight">
                Our <span className="italic">Expertise</span>
              </h2>
              <div className="flex items-end">
                <p className="text-lg text-ink/70 leading-relaxed">
                  Four core services that transform startups into memorable brands. 
                  Each crafted with precision, delivered with excellence.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Services Grid - 2x2 Flip Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-[300px]"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    className="relative w-full h-full cursor-pointer"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front Side - Just Title */}
                    <div 
                      className="absolute inset-0 border-2 border-ink bg-white flex flex-col items-center justify-center p-6"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Number Badge */}
                      <div className="absolute top-4 right-4 text-lg font-display font-bold text-ink/30">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-16 h-16 border-2 border-ink flex items-center justify-center mb-5">
                        <Icon className="w-8 h-8 text-ink" />
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-display font-bold text-ink text-center">
                        {service.title}
                      </h3>

                      {/* Hover hint */}
                      <div className="absolute bottom-4 text-[10px] uppercase tracking-widest text-ink/40">
                        Hover to explore
                      </div>
                    </div>

                    {/* Back Side - Full Details */}
                    <div 
                      className="absolute inset-0 border-2 border-ink bg-ink text-white p-5 flex flex-col overflow-hidden"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Number Badge */}
                      <div className="text-right text-lg font-display font-bold text-white/30 mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-10 h-10 border-2 border-white flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/90 mb-3 text-xs leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-1.5 flex-1 overflow-y-auto">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-white/90"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Decorative Bottom Line */}
                      <div className="w-full h-0.5 bg-white mt-3" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y-2 border-ink">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-ink mb-6">
              Our <span className="italic">Process</span>
            </h2>
            <p className="text-xl text-ink/70 max-w-3xl mx-auto">
              From concept to launch in 4 seamless steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-ink/20 hidden lg:block" />
            
            <div className="grid lg:grid-cols-4 gap-8 relative">
              {process.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ink border-4 border-white rounded-full hidden lg:block z-10" />
                    
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="text-center space-y-4 p-6 border-2 border-ink/10 bg-white hover:border-ink hover:bg-paper transition-all duration-300"
                    >
                      <div className="inline-block p-4 border-2 border-ink">
                        <Icon className="w-8 h-8 text-ink" />
                      </div>
                      <div className="text-5xl font-display font-bold text-ink/20">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="text-ink/70">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Feature - Inspired by NYT Style */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-paper relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="border-t-4 border-ink pt-6 mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="text-xs uppercase tracking-widest text-ink/60">
                Brand Philosophy
              </div>
              <div className="text-xs text-ink/60">
                Incubazar Design Studio
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-ink leading-tight">
                Design as
                <br />
                <span className="italic">Strategy</span>
              </h2>

              <div className="space-y-6 text-lg text-ink/80 leading-relaxed">
                <p className="text-xl font-medium text-ink">
                  In the high-stakes world of startup fundraising, your brand is not decoration—it&apos;s your first impression, your last chance, and everything in between.
                </p>
                
                <p>
                  We&apos;ve studied the brands that made history. Apple. Nike. Airbnb. They didn&apos;t succeed despite their design—they succeeded because of it. Every pixel, every curve, every choice was deliberate.
                </p>

                <p>
                  <strong className="text-ink">The difference?</strong> Most startups treat branding as an afterthought. A logo ordered on Fiverr. A color picked because "it looks nice." A typeface chosen at random.
                </p>

                <p>
                  We treat it as architecture. As psychology. As the visual manifestation of your company&apos;s DNA.
                </p>

                <div className="border-l-4 border-ink pl-6 my-8">
                  <p className="text-2xl font-display italic text-ink leading-relaxed">
                    "A brand is not what you say about yourself. It&apos;s what investors remember after you leave the room."
                  </p>
                  <p className="text-sm text-ink/60 mt-4">
                    — Deepak, Founder
                  </p>
                </div>

                <p>
                  The startups we work with don&apos;t just get a logo. They get a system. A language. A competitive advantage that scales with every pitch deck, every social post, every investor meeting.
                </p>

                <p className="text-sm text-ink/60 border-t border-ink/10 pt-6">
                  Our process is rigorous: deep research into your market, your competitors, your audience. Strategic positioning that differentiates you from the noise. Execution that&apos;s both timeless and contemporary.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Layered Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] lg:h-[800px]"
            >
              {/* Layer 5 - Background */}
              <motion.div
                className="absolute inset-0 bg-ink/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Layer 4 - Bottom curve */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-64 bg-ink/10 rounded-t-[100px]"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              />

              {/* Layer 3 - Middle curve */}
              <motion.div
                className="absolute bottom-32 left-8 right-8 h-80 bg-ink/20 rounded-t-[120px]"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              />

              {/* Layer 2 - Top curve */}
              <motion.div
                className="absolute bottom-48 left-16 right-16 h-96 bg-ink/30 rounded-t-[140px]"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              />

              {/* Layer 1 - Icon/Symbol */}
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-24 h-24 text-ink" strokeWidth={1.5} />
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-20 right-20 w-3 h-3 bg-ink rounded-full"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/3 left-12 w-2 h-2 bg-ink rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8 mt-24 pt-16 border-t-2 border-ink/10"
          >
            {[
              { number: '50+', label: 'Brands Designed' },
              { number: '2 Weeks', label: 'Average Delivery' },
              { number: '100%', label: 'Custom Work' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-display font-bold text-ink mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-ink/60 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Minimal */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-ink">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-xs uppercase tracking-widest text-ink/60 mb-4">
              Selected Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink">
              Recent Projects
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
            {portfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square bg-white hover:bg-paper transition-colors duration-300"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-2xl font-display font-bold text-ink mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-ink/60 uppercase tracking-wider">
                    {item.category}
                  </p>
                  
                  {/* Hover Effect */}
                  <motion.div 
                    className="absolute inset-0 border-2 border-ink opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Editorial Style */}
      <section className="relative py-0 overflow-hidden border-t-4 border-ink">
        {/* Large Typography Section */}
        <div className="relative bg-paper py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Editorial Header */}
              <div className="border-b-2 border-ink pb-6">
                <div className="text-xs uppercase tracking-[0.3em] text-ink/60 mb-2">
                  Premium Branding Services
                </div>
                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-ink leading-[0.9] tracking-tight">
                  Ready to Build
                  <br />
                  <span className="italic">Something</span>
                  <br />
                  Extraordinary?
                </h2>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 pt-8">
                {/* Left Column - Message */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-2xl sm:text-3xl font-display text-ink leading-relaxed">
                      Let&apos;s create something extraordinary together.
                    </p>
                    <p className="text-lg text-ink/70 leading-relaxed">
                      Your vision. Our expertise. Unlimited possibilities.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-ink/20">
                    <div>
                      <div className="text-4xl font-display font-bold text-ink mb-1">50+</div>
                      <div className="text-sm text-ink/60 uppercase tracking-wider">Brands Created</div>
                    </div>
                    <div>
                      <div className="text-4xl font-display font-bold text-ink mb-1">100%</div>
                      <div className="text-sm text-ink/60 uppercase tracking-wider">Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - CTA */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <Link href="mailto:founder@incubazar.com?subject=Let's Create Something Amazing">
                      <motion.div
                        whileHover={{ x: 8 }}
                        className="group flex items-center justify-between p-6 border-2 border-ink bg-white hover:bg-ink transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <Send className="w-6 h-6 text-ink group-hover:text-white transition-colors" />
                          <span className="text-xl font-bold text-ink group-hover:text-white transition-colors">
                            Let&apos;s Talk
                          </span>
                        </div>
                        <ArrowRight className="w-6 h-6 text-ink group-hover:text-white group-hover:translate-x-2 transition-all" />
                      </motion.div>
                    </Link>

                    <Link href="https://instagram.com/incubazar" target="_blank">
                      <motion.div
                        whileHover={{ x: 8 }}
                        className="group flex items-center justify-between p-6 border-2 border-ink bg-white hover:bg-ink transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <Instagram className="w-6 h-6 text-ink group-hover:text-white transition-colors" />
                          <span className="text-xl font-bold text-ink group-hover:text-white transition-colors">
                            See More Work
                          </span>
                        </div>
                        <ArrowRight className="w-6 h-6 text-ink group-hover:text-white group-hover:translate-x-2 transition-all" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="pt-12 border-t border-ink/20">
                <p className="text-sm text-ink/50 italic text-center">
                  We work with a select number of clients to ensure exceptional quality and attention to detail.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Black Footer Strip */}
        <div className="bg-ink text-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-white/60">
              Incubazar Branding Services
            </p>
            <p className="text-xs text-white/60">
              © 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
