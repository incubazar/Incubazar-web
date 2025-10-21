# Incubazar Design System Documentation

## 🎨 Overview

This document outlines the complete design system for Incubazar, a premium marketplace connecting founders, investors, and mentors. The design is inspired by platforms like AngelList, Y Combinator, and ProductHunt, but optimized for speed, accessibility, and the Indian startup ecosystem.

---

## 🌈 Color Palette

### Primary Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Electric Blue** | `#2962FF` | Primary CTAs, links, brand accents |
| **Golden Orange** | `#FFA000` | Secondary CTAs, highlights, success states |
| **Graphite Gray** | `#212121` | Text, headers, dark mode backgrounds |
| **White** | `#FFFFFF` | Backgrounds, cards, clean spaces |

### Color Scales

#### Electric Blue Scale
```css
electric-50:  #E3EEFF
electric-100: #C7DDFF
electric-200: #8FBBFF
electric-300: #5799FF
electric-400: #2962FF (Primary)
electric-500: #0043DB
electric-600: #0034A3
electric-700: #00256B
electric-800: #001633
electric-900: #000711
```

#### Golden Orange Scale
```css
golden-50:  #FFF3E0
golden-100: #FFE7C1
golden-200: #FFCF83
golden-300: #FFB745
golden-400: #FFA000 (Primary)
golden-500: #C77C00
golden-600: #8F5800
golden-700: #573400
golden-800: #1F1000
golden-900: #070300
```

#### Graphite Gray Scale
```css
graphite-50:  #F5F5F5
graphite-100: #E0E0E0
graphite-200: #BDBDBD
graphite-300: #9E9E9E
graphite-400: #757575
graphite-500: #616161
graphite-600: #424242
graphite-700: #212121 (Primary)
graphite-800: #121212
graphite-900: #000000
```

### Usage Guidelines

- **Electric Blue**: Use for primary actions, navigation active states, important links
- **Golden Orange**: Use for secondary actions, badges, achievement indicators
- **Graphite**: Use for text hierarchy, backgrounds in dark mode
- **White**: Use for light mode backgrounds, card surfaces

---

## ✍️ Typography

### Font Families

1. **Poppins** - Headlines, titles, CTAs (Bold, SemiBold, Medium)
2. **Inter** - Body text, UI elements (Regular, Medium, SemiBold)
3. **Nunito Sans** - Alternative for comfortable reading (Regular, SemiBold)

### Type Scale

```css
/* Headlines */
h1: 3.5rem - 4.5rem (56px - 72px) - Poppins Bold
h2: 2.5rem - 3.5rem (40px - 56px) - Poppins SemiBold
h3: 2rem - 2.5rem (32px - 40px) - Poppins SemiBold
h4: 1.5rem - 2rem (24px - 32px) - Poppins Medium

/* Body */
Large: 1.25rem (20px) - Inter Regular
Regular: 1rem (16px) - Inter Regular
Small: 0.875rem (14px) - Inter Regular
XSmall: 0.75rem (12px) - Inter Medium
```

### Line Heights
- Headlines: 1.2 - 1.3
- Body text: 1.5 - 1.6
- Captions: 1.4

### Letter Spacing
- Headlines: -0.02em (tight)
- Body: 0em (normal)
- Captions: 0.01em

---

## 📐 Spacing & Layout

### Spacing Scale (Tailwind)
```
2: 0.5rem (8px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
24: 6rem (96px)
32: 8rem (128px)
```

### Container Widths
- Narrow: 1024px (max-w-4xl)
- Wide: 1280px (max-w-7xl)
- Full: 100% with padding

### Grid System
- Mobile: 1 column
- Tablet: 2 columns (md:grid-cols-2)
- Desktop: 3-4 columns (lg:grid-cols-3, lg:grid-cols-4)

---

## 🔘 Components

### Buttons

#### Primary Button
```tsx
<Button className="gradient-electric text-white shadow-glow-blue hover:shadow-strong">
  Get Started
</Button>
```
- Background: Electric Blue gradient
- Text: White
- Padding: px-8 py-3 (lg: px-10 py-4)
- Border Radius: 12px
- Shadow: Glow effect on hover

#### Secondary Button
```tsx
<Button variant="outline" className="border-2 border-graphite-700">
  Learn More
</Button>
```
- Background: Transparent
- Border: 2px Graphite
- Text: Graphite
- Hover: Fill with Graphite, text white

### Cards

#### Standard Card
```tsx
<Card className="p-6 bg-white dark:bg-graphite-800 border-0 rounded-xl shadow-soft hover:shadow-strong">
  {/* Content */}
</Card>
```
- Border Radius: 16px (rounded-xl)
- Padding: 24px
- Shadow: Soft → Strong on hover
- Transition: 300ms ease-out

#### Feature Card
```tsx
<Card className="p-8 rounded-2xl shadow-medium hover:scale-105 transform duration-300">
  {/* Icon + Title + Description */}
</Card>
```

### Badges
```tsx
<Badge className="bg-electric-100 text-electric-700 border-0">
  New Feature
</Badge>
```

---

## 🎭 Shadows

### Shadow System
```css
shadow-soft: 0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)
shadow-medium: 0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)
shadow-strong: 0 8px 24px rgba(0,0,0,0.12), 0 16px 48px rgba(0,0,0,0.16)
shadow-glow-blue: 0 0 24px rgba(41,98,255,0.25)
shadow-glow-golden: 0 0 24px rgba(255,160,0,0.25)
```

### Usage
- Cards: shadow-soft (default), shadow-strong (hover)
- CTAs: shadow-glow-blue or shadow-glow-golden
- Modals: shadow-strong

---

## 🎬 Animations

### Keyframes
```css
fade-in: Opacity 0 → 1, translateY 10px → 0
slide-in-left: Opacity 0 → 1, translateX -20px → 0
slide-in-right: Opacity 0 → 1, translateX 20px → 0
scale-in: Opacity 0 → 1, scale 0.95 → 1
```

### Transitions
- Default: `transition-all duration-300 ease-out`
- Quick: `transition-all duration-200 ease-in-out`
- Slow: `transition-all duration-500 ease-out`

### Hover Effects
- Scale: `hover:scale-105`
- Shadow: `hover:shadow-strong`
- Color: `hover:text-electric`
- Transform: `hover:translate-x-1`

---

## 🌓 Dark Mode

### Implementation
Uses Tailwind's `dark:` prefix and CSS variables.

```css
/* Light Mode */
--background: #FFFFFF
--foreground: #212121
--primary: #2962FF

/* Dark Mode */
--background: #121212
--foreground: #F5F5F5
--primary: #5799FF (lighter)
```

### Dark Mode Guidelines
- Use graphite-800/900 for backgrounds
- Increase primary color brightness by 1-2 shades
- Reduce shadow opacity
- Use border-white/10 for subtle borders

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px
```

### Mobile-First Approach
1. Design for mobile (320px+)
2. Enhance for tablet (768px+)
3. Optimize for desktop (1024px+)

### Key Patterns
- Stack on mobile, grid on desktop
- Full-width buttons on mobile, inline on desktop
- Simplified navigation on mobile (hamburger menu)

---

## ♿ Accessibility

### Color Contrast
- AA Compliant: 4.5:1 for normal text
- AAA Preferred: 7:1 for body text
- Electric Blue on white: ✅ Passes AA
- Golden Orange on white: ✅ Passes AA

### Interactive Elements
- Minimum touch target: 44x44px
- Focus states: 2px ring with electric color
- Keyboard navigation: Full support
- ARIA labels: Required for icons-only buttons

### Motion
- Respect `prefers-reduced-motion`
- Disable animations for users with motion sensitivity

---

## 🚀 Performance

### Optimization Checklist
- ✅ Use system fonts as fallback
- ✅ Lazy load below-fold images
- ✅ Minimize animation complexity
- ✅ Use CSS transforms (GPU accelerated)
- ✅ Avoid heavy background videos
- ✅ Compress images (WebP format)
- ✅ Critical CSS inline

### Lighthouse Goals
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 📦 Component Library

### Available Components

#### Layout
- `Navbar` - Sticky navigation with glassmorphism
- `Footer` - Multi-column footer with newsletter
- `HeroSection` - Full-screen hero with gradient background
- `Container` - Responsive content wrapper

#### Content
- `HowItWorks` - 3-step process cards
- `ForWhom` - Tabbed feature showcase
- `CommunityEvents` - Event and partner grid
- `Testimonials` - Carousel with auto-rotation

#### UI Elements
- `Button` - Primary, Secondary, Outline variants
- `Card` - Container with shadow and hover effects
- `Badge` - Status and category indicators
- `Avatar` - User profile images

---

## 🎯 Usage Examples

### Creating a CTA Section
```tsx
<section className="py-24 bg-gradient-to-br from-electric-50 to-blue-50">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-poppins font-bold mb-6">
      Ready to Get Started?
    </h2>
    <Button className="gradient-electric text-white shadow-glow-blue">
      Join Now <ArrowRight className="ml-2" />
    </Button>
  </div>
</section>
```

### Creating a Feature Card
```tsx
<Card className="p-8 rounded-xl shadow-soft hover:shadow-strong transition-smooth">
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl font-poppins font-semibold mb-2">Feature Title</h3>
  <p className="text-graphite-600">Feature description goes here.</p>
</Card>
```

---

## 🔧 Utility Classes

### Custom Utilities
```css
.glass - Glassmorphism effect (backdrop-blur)
.gradient-electric - Electric blue gradient
.gradient-golden - Golden orange gradient
.text-gradient-electric - Electric text gradient
.shadow-premium - Multi-layer shadow
.transition-smooth - 300ms ease-out transition
.container-narrow - Max-width 1024px
.container-wide - Max-width 1280px
```

---

## 📋 Design Checklist

### Before Launch
- [ ] All images optimized (WebP, compressed)
- [ ] Dark mode tested across all components
- [ ] Mobile responsiveness verified (320px - 1920px)
- [ ] Accessibility audit completed (WCAG AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance benchmark (Lighthouse 90+)
- [ ] Font loading optimized (FOUT prevention)
- [ ] Hover states on all interactive elements
- [ ] Loading states for async actions
- [ ] Error states designed and implemented

---

## 🎨 Figma/Design Tools

### Recommended Setup
1. Import Google Fonts (Poppins, Inter, Nunito Sans)
2. Create color styles for all palette colors
3. Create text styles for typography scale
4. Build component library with variants
5. Use Auto Layout for responsive designs
6. Create design tokens JSON for export

---

## 📞 Support

For design system questions or updates:
- Email: design@incubazar.com
- Slack: #design-system
- Documentation: /docs/design-system

---

**Last Updated:** October 2025
**Version:** 1.0.0
**Maintained by:** Incubazar Design Team
