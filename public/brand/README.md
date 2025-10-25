# Brand Assets Directory

This directory contains brand logos, images, and visual assets for case studies and learning modules.

## Directory Structure

```
public/brand/
├── logos/          # Company/startup logos for case studies
│   ├── apple/
│   ├── nike/
│   ├── fedex/
│   └── razorpay/
├── case-studies/   # Hero images for case studies
└── ui-examples/    # UI/design examples for learning modules
```

## How to Add Logos

### For Case Studies

1. Create a folder named after the company (lowercase, no spaces):
   ```
   public/brand/logos/company-name/
   ```

2. Add logo variations:
   ```
   logo-full.svg       # Full logo with text
   logo-icon.svg       # Icon/symbol only
   logo-white.svg      # White version for dark backgrounds
   logo-color.svg      # Color version (if applicable)
   ```

3. Use in case studies:
   ```tsx
   <CaseStudyHero
     logoUrl="/brand/logos/company-name/logo-full.svg"
     logoAlt="Company Name Logo"
     brandColor="#HEX-COLOR"
   />
   ```

### For BrandShowcase Components

Add logos with layered design effect:

```tsx
<BrandShowcase
  title="Logo Evolution"
  description="How the logo changed over time..."
  logos={[
    {
      src: '/brand/logos/company/logo-v1.svg',
      alt: 'Company Logo Version 1',
      caption: 'Original Design',
      year: '2014'
    },
    {
      src: '/brand/logos/company/logo-v2.svg',
      alt: 'Company Logo Version 2',
      caption: 'Redesign',
      year: '2018'
    }
  ]}
  brandColors={['#000000', '#3395FF', '#FFFFFF']}
  gridLayout="3"
/>
```

## Current Assets

### Apple
- Using: Wikimedia Commons SVG (https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg)
- License: Public Domain
- Brand Color: #000000 (Black)

### Nike
- Using: Wikimedia Commons SVG (https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg)
- License: Public Domain
- Brand Color: #000000 (Black) / #FF6900 (Orange accent)

### FedEx
- Using: Wikimedia Commons SVG (https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg)
- License: Trademark (Fair Use for educational purposes)
- Brand Colors: #4D148C (Purple) / #FF6600 (Orange)

### Razorpay
- Using: razorpay.com CDN logo
- License: Trademark (Fair Use for case study/educational content)
- Brand Color: #3395FF (Blue)

## Image Guidelines

### File Formats
- **Logos**: SVG (preferred) or PNG with transparent background
- **Screenshots**: PNG or WebP
- **Photography**: JPG or WebP (optimized for web)

### File Sizes
- Keep logos under 50KB
- Optimize PNGs with tools like TinyPNG
- Use WebP for hero images (better compression)

### Naming Convention
```
{company}-{type}-{variation}.{ext}

Examples:
razorpay-logo-full.svg
apple-logo-white.svg
nike-swoosh-icon.svg
fedex-wordmark-express.svg
```

## Design System Integration

All logos use the **layered shadow effect** from our monochrome design system:

```tsx
{/* Layered Shadow Effect */}
<div className="relative group">
  <div className="absolute inset-0 bg-graphite-200 translate-x-3 translate-y-3" />
  <div className="absolute inset-0 bg-graphite-300 translate-x-1.5 translate-y-1.5" />
  <div className="relative bg-paper border-2 border-ink p-8">
    <img src={logo.src} alt={logo.alt} />
  </div>
</div>
```

This creates a **NYT Sunday Review paper-cut aesthetic** with depth and dimensionality.

## Copyright & Attribution

All logos are property of their respective owners and are used for educational purposes under Fair Use guidelines. If you're a rights holder and would like attribution or removal, please contact [your-email@incubazar.com].

## To-Do

- [ ] Add Zomato logo (future case study)
- [ ] Add Flipkart logo (future case study)
- [ ] Add Airbnb logo (future case study)
- [ ] Create custom Incubazar logo variations
- [ ] Add UI mockups for Product/GTM module
- [ ] Add pitch deck examples for Pitching module
