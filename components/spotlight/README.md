# Spotlight Card Flow - Apple-Grade Scroll Animation

A premium, scroll-synchronized card carousel component with spotlight effects, built for Next.js 15 with GSAP ScrollTrigger, Lenis smooth scrolling, and Framer Motion micro-interactions.

## ✨ Features

- **Scroll-Synchronized**: Cards smoothly scroll into a central spotlight position
- **GSAP ScrollTrigger**: Professional-grade scroll animations with pinning and scrubbing
- **Lenis Smooth Scroll**: Buttery smooth momentum scrolling
- **Framer Motion**: Micro-interactions, 3D parallax, and hover effects
- **Mobile Haptics**: Tactile feedback on card transitions (iOS/Android)
- **Accessibility**: Full keyboard navigation, reduced motion support, ARIA labels
- **Performance**: LQIP placeholders, lazy loading, GPU acceleration
- **Premium Design**: Blue-purple gradients, glows, Apple-inspired aesthetics

## 🚀 Quick Start

### 1. Installation

Dependencies are already installed:
- `gsap` (with ScrollTrigger)
- `lenis` (smooth scrolling)
- `framer-motion` (micro-interactions)

### 2. Basic Usage

```tsx
import SpotlightCardFlow from '@/components/spotlight/SpotlightCardFlow';
import type { SpotlightCard } from '@/components/spotlight/SpotlightCardFlow';

const cards: SpotlightCard[] = [
  {
    id: 'card-1',
    title: 'Discover Startups',
    subtitle: 'Connect with Innovation',
    description: 'Explore cutting-edge startups transforming industries.',
    image: '/images/card-1.jpg',
    imageLQIP: '/images/card-1-tiny.jpg', // Low quality placeholder
    ctaText: 'Explore Now',
    ctaLink: '/startups',
  },
  // Add more cards...
];

export default function MyPage() {
  return (
    <SpotlightCardFlow
      cards={cards}
      onCardClick={(card) => console.log('Clicked:', card)}
      enableHaptics={true}
      enableParallax={true}
    />
  );
}
```

### 3. With Smooth Scrolling (Optional but Recommended)

Wrap your app or page with the smooth scroll provider:

```tsx
// app/layout.tsx or specific page
import SmoothScrollProvider from '@/components/spotlight/SmoothScrollProvider';

export default function Layout({ children }) {
  return (
    <SmoothScrollProvider enabled={true}>
      {children}
    </SmoothScrollProvider>
  );
}
```

## 📋 API Reference

### SpotlightCardFlow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cards` | `SpotlightCard[]` | **required** | Array of card data objects |
| `onCardClick` | `(card: SpotlightCard) => void` | `undefined` | Callback when card is clicked |
| `enableHaptics` | `boolean` | `true` | Enable mobile haptic feedback |
| `enableParallax` | `boolean` | `true` | Enable 3D parallax effects |
| `className` | `string` | `''` | Additional CSS classes |

### SpotlightCard Interface

```typescript
interface SpotlightCard {
  id: string;                    // Unique identifier
  title: string;                 // Main heading
  subtitle: string;              // Secondary heading
  description: string;           // Body text
  image: string;                 // Full-resolution image URL
  imageLQIP?: string;            // Low-quality placeholder (optional)
  ctaText?: string;              // Button text (optional)
  ctaLink?: string;              // Button link (optional)
  backgroundGradient?: string;   // Custom Tailwind gradient class (optional)
}
```

### SmoothScrollProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable smooth scrolling |
| `duration` | `number` | `1.2` | Scroll animation duration (seconds) |
| `smoothWheel` | `boolean` | `true` | Enable smooth wheel scrolling |

## 🎯 How It Works

### 1. **Card Entry Animation**
- Card slides up from 40px below viewport
- Opacity: `0 → 1`
- Scale: `0.985 → 1.00`
- Duration mapped to scroll progress (scrub)

### 2. **Spotlight State**
- Card remains pinned in center 55% of viewport
- Internal content staggers in: title → subtitle → description → CTA
- Each element has 120ms delay
- Micro-parallax: background moves -6px, foreground +8px

### 3. **Card Exit Animation**
- Scale down to `0.98`
- Opacity to `0.5`
- Translate Y to `-40px`
- Next card enters as current exits

### 4. **Snap Behavior**
- When card reaches >85% of entry timeline
- Short spring animation
- Single haptic pulse: `navigator.vibrate([8])`

## ⌨️ Keyboard Navigation

- **Arrow Down**: Scroll to next card
- **Arrow Up**: Scroll to previous card
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate focused button

All interactive elements have visible focus styles.

## ♿ Accessibility

### Reduced Motion Support

Automatically detects `prefers-reduced-motion: reduce` and provides fallback:
- No parallax effects
- No GSAP pinning/scrubbing
- Simple fade-in/out transitions
- All animations disabled

### ARIA Labels

- Container: `role="region"` with `aria-label`
- Live region: `aria-live="polite"` for content changes
- Progress indicators include current card state

### Testing Reduced Motion

```bash
# macOS System Preferences
System Preferences → Accessibility → Display → Reduce Motion

# Chrome DevTools
DevTools → Rendering → Emulate CSS media feature → prefers-reduced-motion: reduce
```

## 🚀 Performance Checklist

### Before Deployment

- [ ] Generate LQIP (Low Quality Image Placeholders) for all images
- [ ] Optimize images: WebP format, 1200px width max
- [ ] Test on low-end devices (mobile CPU throttling)
- [ ] Verify no layout shift (CLS) during card transitions
- [ ] Check memory usage in Chrome DevTools Performance tab
- [ ] Test with slow 3G network throttling
- [ ] Limit to max 2 pinned sections per page
- [ ] Ensure first card image uses `loading="eager"`
- [ ] Subsequent cards use `loading="lazy"`

### Image Optimization

```bash
# Generate LQIP with Sharp (Node.js)
npm install sharp
node scripts/generate-lqip.js

# Or use online tools
# - Squoosh.app
# - TinyPNG
# - ImageOptim (macOS)
```

### Performance Tips

1. **Use WebP**: ~30% smaller than JPEG
2. **Preload first card**: `<link rel="preload" as="image" href="/card-1.webp">`
3. **Lazy load subsequent cards**: `loading="lazy"`
4. **GPU acceleration**: Already applied via transforms
5. **Debounce scroll events**: Handled by Lenis
6. **Limit pinned sections**: Max 2 per page

## 🧪 Testing Guide

### Manual Testing

1. **Scroll Animation**
   - Scroll slowly: Cards should smoothly transition
   - Scroll fast: Cards should snap to center
   - Test in both directions

2. **Parallax Effects**
   - Hover over card
   - Move mouse in circular motion
   - Card should tilt slightly (max 6deg)

3. **Haptics (Mobile)**
   - Open on iPhone/Android
   - Scroll through cards
   - Feel gentle pulse at each snap

4. **Keyboard Navigation**
   - Press Tab to focus elements
   - Press Arrow Down/Up
   - Verify smooth scrolling

5. **Reduced Motion**
   - Enable in OS settings
   - Reload page
   - Verify simple fade transitions

### Browser Testing

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Firefox | 88+ | ✅ Fully supported |
| Edge | 90+ | ✅ Fully supported |
| iOS Safari | 14+ | ✅ Supported (no haptics on some models) |
| Chrome Mobile | 90+ | ✅ Fully supported |

### Device Testing

- **Desktop**: 1920x1080, 2560x1440
- **Laptop**: 1440x900, 1920x1200
- **Tablet**: iPad Pro, Surface Pro
- **Mobile**: iPhone 12+, Samsung Galaxy S21+

## 🎨 Customization

### Custom Colors

Override Tailwind colors in `tailwind.config.js`:

```javascript
colors: {
  'royal-blue': {
    600: '#YOUR_COLOR',
  },
  'vibrant-violet': {
    600: '#YOUR_COLOR',
  },
}
```

### Custom Animations

Modify animation timings in `SpotlightCardFlow.tsx`:

```typescript
// Entry animation duration
duration: 1, // Default: 1 second

// Stagger delay
stagger: 0.12, // Default: 120ms

// Scroll scrub smoothness
scrub: 0.7, // Default: 0.7 (lower = faster)
```

### Custom Gradients

Add to card data:

```typescript
backgroundGradient: 'bg-gradient-to-br from-blue-900 to-purple-900'
```

## 🐛 Troubleshooting

### Cards not animating

**Issue**: GSAP ScrollTrigger not working

**Fix**: Ensure GSAP is registered:
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Smooth scrolling not working

**Issue**: Lenis not initialized

**Fix**: Wrap app with `SmoothScrollProvider`:
```tsx
<SmoothScrollProvider>
  <SpotlightCardFlow cards={cards} />
</SmoothScrollProvider>
```

### Images not loading

**Issue**: CORS or invalid URLs

**Fix**: 
1. Use absolute URLs or Next.js Image component
2. Verify image paths are correct
3. Check browser console for errors

### Haptics not working

**Issue**: Browser doesn't support Vibration API

**Fix**: Only works on mobile Chrome/Safari. Feature detection is built-in.

### TypeScript errors

**Issue**: Module not found

**Fix**: Ensure all imports use correct paths:
```typescript
import SpotlightCardFlow from '@/components/spotlight/SpotlightCardFlow';
```

## 📦 File Structure

```
components/spotlight/
├── SpotlightCardFlow.tsx          # Main component
├── SpotlightCardFlow.module.css   # CSS effects
├── SmoothScrollProvider.tsx       # Lenis wrapper
├── SpotlightExample.tsx           # Example usage
└── README.md                      # This file
```

## 🔧 Advanced Usage

### Custom Scroll Speed

```tsx
<SmoothScrollProvider duration={1.5}>
  <SpotlightCardFlow cards={cards} />
</SmoothScrollProvider>
```

### Programmatic Scrolling

```typescript
import { useLenis } from '@/components/spotlight/SmoothScrollProvider';

function MyComponent() {
  const lenis = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  return <button onClick={scrollToTop}>Scroll to Top</button>;
}
```

### Multiple Spotlight Sections

```tsx
<div>
  <SpotlightCardFlow cards={section1Cards} />
  <div className="h-screen">Other content...</div>
  <SpotlightCardFlow cards={section2Cards} />
</div>
```

**Note**: Limit to max 2 sections per page for performance.

## 📝 License

This component is part of the Incubazar project. See project LICENSE for details.

## 🙋 Support

For issues or questions:
1. Check this README
2. Review example implementation in `SpotlightExample.tsx`
3. Test with `prefers-reduced-motion` disabled
4. Open an issue with reproduction steps

## 🎉 Credits

Built with:
- [GSAP](https://greensock.com/gsap/) - Professional animation library
- [Lenis](https://github.com/studio-freight/lenis) - Smooth scrolling
- [Framer Motion](https://www.framer.com/motion/) - React animations
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

Inspired by:
- Apple's product pages
- Linear's landing page
- Vercel's design system
