# 🎨 Premium Design System - Quick Reference

## 🎯 Colors

### Primary Colors
```tsx
className="bg-royal-blue-600"      // #2563EB - Primary actions
className="bg-vibrant-violet-700"   // #7C3AED - Accents
className="bg-cyan-accent-400"      // #38BDF8 - Hover states
```

### Gradients
```tsx
className="bg-gradient-primary"         // Blue → Purple
className="bg-gradient-accent"          // Cyan → Purple  
className="bg-gradient-purple-pink"     // Purple → Pink
className="bg-gradient-cyan-blue"       // Cyan → Blue
className="text-gradient"               // Gradient text
```

## 🎭 Components

### Buttons
```tsx
<PremiumButton variant="primary" size="lg" glow={true}>
<PremiumButton variant="secondary">
<PremiumButton variant="outline">
<PremiumButton variant="ghost">
```

### Cards
```tsx
<GlassCard hover={true}>                    // Glassmorphism
<GradientBorderCard glowOnHover={true}>     // Gradient border
<ShimmerCard>                               // Shimmer effect
<div className="card-premium">              // Standard premium
```

### Text
```tsx
<GradientText variant="primary" animate={true}>
<GradientText variant="purple">
<GradientText variant="cyan">
<h1 className="text-gradient">              // Utility class
```

## 🎬 Animations

### Scroll Animations
```tsx
<AnimatedSection direction="up" delay={0.2}>
<AnimatedSection direction="down">
<AnimatedSection direction="left">
<AnimatedSection direction="right">
```

### Sequential Animations
```tsx
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerContainer>
```

### Hover Effects
```tsx
<ScaleOnHover scale={1.05} glow={true}>
<TiltCard>                                  // 3D tilt
```

### Motion Effects
```tsx
<FloatingElement range={15} duration={4}>   // Floating
<ParallaxSection offset={100}>              // Parallax
```

### Global
```tsx
<ScrollProgress />                          // Top progress bar
<BackgroundGradient />                      // Ambient background
```

## 🎨 Utility Classes

### Backgrounds
```css
.bg-mesh              /* Mesh gradient */
.bg-gradient-hero     /* Animated hero BG */
.bg-dots              /* Dot pattern */
.bg-grid              /* Grid pattern */
```

### Effects
```css
.glass-premium        /* Glassmorphism */
.btn-premium          /* Premium button */
.card-premium         /* Premium card */
.hover-lift           /* Lift on hover */
```

### Animations
```css
.animate-gradient-move
.animate-glow-pulse
.animate-bounce-slow
.animate-float
.animate-fade-in-up
.animate-scale-in
```

## 💡 Common Patterns

### Hero Section
```tsx
<section className="relative min-h-screen">
  <BackgroundGradient />
  <AnimatedSection direction="up">
    <FloatingElement>
      <h1 className="text-6xl font-display">
        <GradientText animate={true}>Title</GradientText>
      </h1>
    </FloatingElement>
    <PremiumButton size="lg" glow={true}>CTA</PremiumButton>
  </AnimatedSection>
</section>
```

### Feature Grid
```tsx
<StaggerContainer>
  <div className="grid grid-cols-3 gap-6">
    {features.map(f => (
      <StaggerItem>
        <TiltCard>
          <GlassCard>{f.content}</GlassCard>
        </TiltCard>
      </StaggerItem>
    ))}
  </div>
</StaggerContainer>
```

### Navbar with Blur
```tsx
<nav className={cn(
  'fixed top-0 w-full transition-all',
  scrolled && 'glass-premium shadow-premium-lg'
)}>
```

## 🎯 Typography

```tsx
className="font-display"    // Poppins - Headings
className="font-body"       // DM Sans - Body
className="font-logo"       // Ashing - Brand
className="font-mono"       // Space Grotesk - Code
```

## 🌈 Shadows

```tsx
className="shadow-premium"      // Subtle
className="shadow-premium-lg"   // Large
className="shadow-premium-xl"   // Extra large
className="shadow-glow-purple"  // Purple glow
className="shadow-glow-blue"    // Blue glow
className="shadow-glow-cyan"    // Cyan glow
```

## 📐 Layout

```tsx
className="container-premium"   // Max-width container
className="rounded-2xl"         // Premium border radius
```

## ⚡ Quick Start Template

```tsx
'use client'

import {
  AnimatedSection,
  GlassCard,
  PremiumButton,
  GradientText,
  BackgroundGradient,
  ScrollProgress,
  StaggerContainer,
  StaggerItem
} from '@/components/premium'

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <BackgroundGradient />
      
      <section className="min-h-screen flex items-center justify-center">
        <AnimatedSection direction="up" className="text-center">
          <h1 className="text-6xl font-display font-bold mb-6">
            <GradientText animate={true}>
              Your Title
            </GradientText>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 font-body">
            Your description
          </p>
          <PremiumButton size="lg" glow={true}>
            Get Started
          </PremiumButton>
        </AnimatedSection>
      </section>
      
      <section className="py-24">
        <StaggerContainer>
          <div className="grid grid-cols-3 gap-6">
            <StaggerItem>
              <GlassCard>Feature 1</GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard>Feature 2</GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard>Feature 3</GlassCard>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </section>
    </>
  )
}
```

## 🔗 Links

- Full Docs: `/docs/PREMIUM_DESIGN_SYSTEM.md`
- Demo: `/premium-showcase`
- Implementation Guide: `/docs/IMPLEMENTATION_GUIDE.md`
