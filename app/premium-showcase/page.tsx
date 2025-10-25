'use client'

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  ParallaxSection,
  ScaleOnHover,
  TiltCard,
  ScrollProgress,
  GlassCard,
  PremiumButton,
  GradientBorderCard,
  ShimmerCard,
  GradientText,
  BackgroundGradient,
} from '@/components/premium'

export default function PremiumShowcase() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <BackgroundGradient />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <AnimatedSection direction="up" className="text-center max-w-5xl">
          <FloatingElement range={15} duration={4}>
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6">
              <GradientText animate={true} variant="primary">
                Premium Design System
              </GradientText>
            </h1>
          </FloatingElement>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-body max-w-3xl mx-auto">
            Experience the perfect blend of trust and innovation with our
            blue-purple premium aesthetic
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <PremiumButton size="lg" glow={true}>
              Get Started
            </PremiumButton>
            <PremiumButton variant="outline" size="lg">
              Learn More
            </PremiumButton>
          </div>
        </AnimatedSection>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container-premium">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <GradientText variant="purple">Premium Features</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Explore our collection of premium components and animations
            </p>
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <TiltCard>
                  <GlassCard hover={true}>
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary mb-4 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-muted-foreground font-body">
                      Optimized animations with 60fps performance
                    </p>
                  </GlassCard>
                </TiltCard>
              </StaggerItem>

              <StaggerItem>
                <TiltCard>
                  <GradientBorderCard glowOnHover={true}>
                    <div className="h-12 w-12 rounded-xl bg-gradient-accent mb-4 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      Beautiful Design
                    </h3>
                    <p className="text-muted-foreground font-body">
                      Stunning gradients and glassmorphism effects
                    </p>
                  </GradientBorderCard>
                </TiltCard>
              </StaggerItem>

              <StaggerItem>
                <TiltCard>
                  <ShimmerCard>
                    <div className="h-12 w-12 rounded-xl bg-gradient-purple-pink mb-4 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      Innovative
                    </h3>
                    <p className="text-muted-foreground font-body">
                      Cutting-edge animations and interactions
                    </p>
                  </ShimmerCard>
                </TiltCard>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Button Variants Section */}
      <section className="py-24 px-4 bg-gradient-hero">
        <div className="container-premium">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <GradientText variant="cyan">Button Variants</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground font-body">
              Multiple styles for every use case
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <PremiumButton variant="primary" size="lg" glow={true}>
              Primary Button
            </PremiumButton>
            <PremiumButton variant="secondary" size="lg">
              Secondary Button
            </PremiumButton>
            <PremiumButton variant="outline" size="lg">
              Outline Button
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg">
              Ghost Button
            </PremiumButton>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center mt-8">
            <PremiumButton variant="primary" size="sm">
              Small
            </PremiumButton>
            <PremiumButton variant="primary" size="md">
              Medium
            </PremiumButton>
            <PremiumButton variant="primary" size="lg">
              Large
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-4xl font-display font-bold mb-6">
                Smooth <GradientText>Parallax</GradientText> Effects
              </h2>
              <p className="text-lg text-muted-foreground font-body mb-6">
                Create immersive experiences with smooth scroll-based animations
                that engage your users.
              </p>
              <PremiumButton glow={true}>Explore Features</PremiumButton>
            </AnimatedSection>

            <ParallaxSection offset={100}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
                <div className="relative grid grid-cols-2 gap-4">
                  <ScaleOnHover glow={true}>
                    <div className="aspect-square rounded-2xl bg-gradient-primary p-8 flex items-center justify-center">
                      <span className="text-4xl">🚀</span>
                    </div>
                  </ScaleOnHover>
                  <ScaleOnHover glow={true}>
                    <div className="aspect-square rounded-2xl bg-gradient-accent p-8 flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                  </ScaleOnHover>
                  <ScaleOnHover glow={true}>
                    <div className="aspect-square rounded-2xl bg-gradient-purple-pink p-8 flex items-center justify-center">
                      <span className="text-4xl">💎</span>
                    </div>
                  </ScaleOnHover>
                  <ScaleOnHover glow={true}>
                    <div className="aspect-square rounded-2xl bg-gradient-cyan-blue p-8 flex items-center justify-center">
                      <span className="text-4xl">⚡</span>
                    </div>
                  </ScaleOnHover>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container-premium relative">
          <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto">
            <FloatingElement range={10} duration={3}>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Ready to Build Something
                <br />
                <GradientText animate={true}>Amazing?</GradientText>
              </h2>
            </FloatingElement>
            <p className="text-xl text-muted-foreground font-body mb-12">
              Join thousands of developers creating premium experiences
            </p>
            <PremiumButton size="lg" glow={true}>
              Start Your Journey
            </PremiumButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
