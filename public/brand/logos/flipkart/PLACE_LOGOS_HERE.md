# Flipkart Logo Files

Add the following logo files to this directory (for future case study):

## Required Files

1. **logo-full.svg** - Complete Flipkart logo
   - Blue (#047BD5) + Yellow (#FFD700)
   - Include both icon and wordmark

2. **logo-icon.svg** - Flipkart "F" icon only
   - The shopping bag with "F"
   - Use: App icon, compact applications

3. **logo-white.svg** - White version
   - Use: Dark backgrounds

4. **logo-old-2007.svg** (Optional) - Original 2007 logo
   - For logo evolution showcase
   - Comparison: 2007 vs 2015 redesign

## File Format Guidelines

- **Format:** SVG (vector)
- **Size:** Under 100KB
- **Background:** Transparent
- **Preserve:** Both blue and yellow colors

## Brand Colors

```
Flipkart Blue:   #047BD5
Flipkart Yellow: #FFD700
White:           #FFFFFF
Dark Blue:       #00376C
```

## Company Info

- **Founded:** 2007
- **Founders:** Sachin Bansal, Binny Bansal
- **HQ:** Bangalore, India
- **Parent:** Walmart (acquired 77% stake in 2018 for $16B)
- **Category:** E-commerce, Marketplace

## Logo Evolution

- **2007:** Original logo (simpler design)
- **2015:** Major redesign (current logo with shopping bag + "F")
- **Key Design:** Shopping bag symbolizes e-commerce, yellow star represents deals/value

## Future Case Study Topics

- E-commerce localization playbook (beating Amazon in India)
- Building supply chain from scratch (50+ warehouses)
- Cash-on-delivery innovation (80% of orders in early days)
- Festive sales strategy (Big Billion Days)
- Walmart acquisition and post-merger strategy

## Usage in Code (Future)

```tsx
<CaseStudyHero
  company="Flipkart"
  logoUrl="/brand/logos/flipkart/logo-full.svg"
  logoAlt="Flipkart Logo"
  brandColor="#047BD5"
  tagline="How two IIT graduates beat Amazon in India"
  foundedYear={2007}
  headquarters="Bangalore, India"
  founders={['Sachin Bansal', 'Binny Bansal']}
/>

<BrandShowcase
  title="Flipkart Logo Evolution"
  logos={[
    {
      src: '/brand/logos/flipkart/logo-old-2007.svg',
      caption: 'Original Design',
      year: '2007'
    },
    {
      src: '/brand/logos/flipkart/logo-full.svg',
      caption: 'Redesign',
      year: '2015'
    }
  ]}
  brandColors={['#047BD5', '#FFD700', '#FFFFFF']}
/>
```

## Where to Get Logos

1. **Official:** Flipkart press kit / brand guidelines
2. **Website:** flipkart.com header/footer
3. **App Store:** High-res app icon
4. **Wikipedia:** https://en.wikipedia.org/wiki/Flipkart

## Copyright

Flipkart logo is a registered trademark of Flipkart Private Limited. Used for educational purposes under Fair Use guidelines.
