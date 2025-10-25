# Premium Blue-Purple Design System

## Overview
Incubazar now features a premium blue-purple design system that creates a tech-luxury aesthetic, balancing trust (blue) and innovation (purple).

## 🎨 Color Palette

### Primary Colors
- **Royal Blue**: `#2563EB` - Primary actions, trust, authority
- **Vibrant Violet**: `#7C3AED` - Innovation, highlights, accents
- **Cyan Accent**: `#38BDF8` - Hover states, subtle highlights

### Extended Color Scales
All colors come with full 50-950 scales for maximum flexibility in:
- `royal-blue-{50-950}`
- `vibrant-violet-{50-950}`
- `cyan-accent-{50-950}`
- `emerald-{50-950}` (success)
- `amber-{50-950}` (warnings)

### Gradient Combinations
```css
/* Primary Gradient */
bg-gradient-primary: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)

/* Accent Gradient */
bg-gradient-accent: linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)

/* Purple Gradient */
bg-gradient-purple-pink: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)

/* Cyan Blue Gradient */
bg-gradient-cyan-blue: linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)
```

## 📐 Typography

### Font Families
- **Display/Headings**: Poppins (clean, futuristic)
- **Body Text**: DM Sans (readable, modern)
- **Logo**: Ashing (custom branded font)
- **Monospace**: Space Grotesk

### Usage
```tsx
className="font-display" // For headings
className="font-body"    // For body text
className="font-logo"    // For logo/brand
```

## 🎭 Animation Components

### 1. AnimatedSection
Scroll-triggered fade and slide animations:
```tsx
import { AnimatedSection } from '@/components/premium'

<AnimatedSection direction="up" delay={0.2}>
  <h2>Your Content</h2>
</AnimatedSection>
```

### 2. StaggerContainer & StaggerItem
Sequential animations for lists and grids:
```tsx
import { StaggerContainer, StaggerItem } from '@/components/premium'

<StaggerContainer staggerDelay={0.1}>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerContainer>
```

### 3. FloatingElement
Subtle floating animation for hero elements:
```tsx
import { FloatingElement } from '@/components/premium'

<FloatingElement range={15} duration={4}>
  <Logo />
</FloatingElement>
```

### 4. ParallaxSection
Smooth parallax scrolling effect:
```tsx
import { ParallaxSection } from '@/components/premium'

<ParallaxSection offset={100}>
  <BackgroundImage />
</ParallaxSection>
```

### 5. ScaleOnHover
Interactive hover scaling with optional glow:
```tsx
import { ScaleOnHover } from '@/components/premium'

<ScaleOnHover scale={1.05} glow={true}>
  <Card />
</ScaleOnHover>
```

### 6. TiltCard
3D tilt effect on hover:
```tsx
import { TiltCard } from '@/components/premium'

<TiltCard>
  <FeatureCard />
</TiltCard>
```

### 7. ScrollProgress
Top progress bar showing scroll position:
```tsx
import { ScrollProgress } from '@/components/premium'

<ScrollProgress />
```

## 🎨 Premium UI Components

### 1. GlassCard
Glassmorphism card with blur effect:
```tsx
import { GlassCard } from '@/components/premium'

<GlassCard hover={true}>
  <p>Premium content with glass effect</p>
</GlassCard>
```

### 2. PremiumButton
Gradient button with shimmer effect:
```tsx
import { PremiumButton } from '@/components/premium'

<PremiumButton variant="primary" size="lg" glow={true}>
  Get Started
</PremiumButton>

// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
```

### 3. GradientBorderCard
Card with animated gradient border:
```tsx
import { GradientBorderCard } from '@/components/premium'

<GradientBorderCard glowOnHover={true}>
  <Content />
</GradientBorderCard>
```

### 4. ShimmerCard
Card with periodic shimmer animation:
```tsx
import { ShimmerCard } from '@/components/premium'

<ShimmerCard>
  <HighlightedContent />
</ShimmerCard>
```

### 5. GradientText
Animated gradient text:
```tsx
import { GradientText } from '@/components/premium'

<GradientText variant="primary" animate={true}>
  Premium Headline
</GradientText>

// Variants: primary, purple, cyan
```

### 6. BackgroundGradient
Animated background with floating orbs:
```tsx
import { BackgroundGradient } from '@/components/premium'

<BackgroundGradient />
```

## 💫 Utility Classes

### Gradients
- `gradient-primary` - Blue to purple gradient
- `gradient-accent` - Cyan to purple gradient
- `text-gradient` - Gradient text (primary)
- `text-gradient-purple` - Purple gradient text
- `text-gradient-cyan` - Cyan gradient text

### Cards
- `card-premium` - Premium card with hover effect
- `glass-premium` - Glassmorphism effect
- `card-glow` - Card with shimmer on hover

### Buttons
- `btn-premium` - Premium gradient button with shimmer

### Backgrounds
- `bg-mesh` - Mesh gradient background
- `bg-gradient-hero` - Animated hero background
- `bg-gradient-radial` - Radial gradient
- `bg-dots` - Subtle dot pattern
- `bg-grid` - Subtle grid pattern

### Animations
- `animate-gradient-move` - Slow gradient animation
- `animate-glow-pulse` - Pulsing glow effect
- `animate-bounce-slow` - Gentle bounce
- `animate-tilt` - Subtle tilt animation
- `animate-float` - Floating effect
- `animate-fade-in-up` - Fade in from bottom
- `animate-scale-in` - Scale in animation

## 🌓 Dark Mode

All components automatically support dark mode with appropriate color adjustments:
- Light mode: Soft Off-White background (#F9FAFB)
- Dark mode: Deep Charcoal background (#0F172A)

## 🎯 Shadow System

### Box Shadows
- `shadow-premium` - Subtle premium shadow
- `shadow-premium-lg` - Large premium shadow
- `shadow-premium-xl` - Extra large with glow
- `shadow-glow-blue` - Blue glow
- `shadow-glow-purple` - Purple glow
- `shadow-glow-cyan` - Cyan glow
- `shadow-inner-glow` - Inner glow effect

## 📱 Example: Hero Section

```tsx
import {
  AnimatedSection,
  GradientText,
  PremiumButton,
  FloatingElement,
  BackgroundGradient,
  ScrollProgress
} from '@/components/premium'

export function Hero() {
  return (
    <>
      <ScrollProgress />
      <BackgroundGradient />
      
      <section className="relative min-h-screen flex items-center justify-center">
        <AnimatedSection direction="up" className="text-center">
          <FloatingElement>
            <h1 className="text-6xl font-display font-bold mb-6">
              <GradientText animate={true}>
                Premium Innovation
              </GradientText>
            </h1>
          </FloatingElement>
          
          <p className="text-xl text-muted-foreground mb-8 font-body">
            Experience the future of design
          </p>
          
          <PremiumButton size="lg" glow={true}>
            Get Started
          </PremiumButton>
        </AnimatedSection>
      </section>
    </>
  )
}
```

## 🚀 Best Practices

1. **Use gradients sparingly** - Apply to primary CTAs and hero sections
2. **Maintain hierarchy** - Use Royal Blue for primary actions, Violet for accents
3. **Animate with purpose** - Keep animations smooth (0.3-0.6s duration)
4. **Generous spacing** - Use padding generously for a premium feel
5. **Combine effects** - Layer glassmorphism + gradient borders for impact
6. **Test dark mode** - Always verify appearance in both themes

## 📦 Installation

All components are ready to use. Simply import from `@/components/premium`:

```tsx
import {
  AnimatedSection,
  GlassCard,
  PremiumButton,
  GradientText,
  // ... etc
} from '@/components/premium'
```

---

**Design Philosophy**: This system creates an immersive, futuristic, trustworthy, and elegant experience that makes users go "Whoa, this feels like something big" 🚀
