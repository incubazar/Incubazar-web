# Razorpay Logo Files

Add the following logo files to this directory:

## Required Files

1. **logo-full-blue.svg** - Full Razorpay logo with wordmark (blue)
   - Source: Download from Razorpay Brand Assets or capture from razorpay.com
   - Color: #3395FF (primary blue)
   - Use: Main logo for case study hero

2. **logo-icon.svg** - Razorpay icon/symbol only
   - Just the "R" symbol without text
   - Use: Compact spaces (favicons, app icons)

3. **logo-white.svg** - White version for dark backgrounds
   - Same as logo-full-blue but white color
   - Use: Dark mode, inverted sections

4. **logo-monochrome.svg** (Optional) - Black/grayscale version
   - Use: Print materials, monochrome contexts

## File Format Guidelines

- **Format:** SVG (scalable vector graphics)
- **Size:** Keep under 75KB
- **Background:** Transparent (no white background box)
- **Naming:** lowercase-with-hyphens.svg

## Brand Colors

```
Primary Blue:   #3395FF
Secondary Blue: #0D6EFD
Dark Blue:      #1A1F36
White:          #FFFFFF
```

## Company Info

- **Founded:** 2014
- **Founders:** Harshil Mathur, Shashank Kumar
- **HQ:** Bangalore, India
- **Valuation:** $7.5B (Unicorn)
- **Category:** Fintech / Payment Gateway

## Usage in Code

**Case Study Hero:**
```tsx
<CaseStudyHero
  company="Razorpay"
  logoUrl="/brand/logos/razorpay/logo-full-blue.svg"
  logoAlt="Razorpay Logo"
  brandColor="#3395FF"
  tagline="We built the payment infrastructure developers wish existed..."
  foundedYear={2014}
  headquarters="Bangalore, India"
  founders={['Harshil Mathur', 'Shashank Kumar']}
/>
```

**Logo Showcase (Optional - if you have historical versions):**
```tsx
<BrandShowcase
  title="Razorpay Brand Evolution"
  logos={[
    {
      src: '/brand/logos/razorpay/logo-full-blue.svg',
      alt: 'Razorpay Logo',
      caption: 'Current Logo',
      year: '2014'
    }
  ]}
  brandColors={['#3395FF', '#0D6EFD', '#1A1F36']}
/>
```

## Where to Get Logos

1. **Official Source:** Contact Razorpay marketing team for brand assets
2. **Website:** Right-click and save logo from razorpay.com (ensure high resolution)
3. **Alternative:** Use browser DevTools to download SVG from their CDN
4. **Brand Guidelines:** Check if Razorpay has public brand guidelines PDF

## Copyright

Razorpay logo is a registered trademark of Razorpay Software Private Limited. Used for case study and educational purposes under Fair Use guidelines.
