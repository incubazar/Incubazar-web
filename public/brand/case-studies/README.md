# Case Study Images

This directory contains hero images, screenshots, and visual assets for case studies.

## Directory Structure

```
case-studies/
├── razorpay/
│   ├── hero.jpg          # Hero image for case study header
│   ├── product-ui.png    # Screenshot of Razorpay dashboard
│   ├── founder.jpg       # Founder photo (optional)
│   └── timeline-*.png    # Historical milestone images
│
├── zomato/
│   ├── hero.jpg
│   ├── app-ui.png
│   └── restaurant.jpg
│
├── flipkart/
│   ├── hero.jpg
│   ├── warehouse.jpg
│   └── big-billion-days.jpg
│
└── airbnb/
    ├── hero.jpg
    ├── host-guest.jpg
    └── property.jpg
```

## Image Guidelines

### File Formats
- **Hero Images:** JPG or WebP (optimized for web)
- **Screenshots:** PNG (preserve UI clarity)
- **Photos:** JPG with 80-85% quality compression

### Dimensions
- **Hero Images:** 1920×1080px or 2560×1440px (16:9 ratio)
- **Screenshots:** Original resolution (maintain clarity)
- **Thumbnails:** 800×600px (if needed)

### File Sizes
- **Hero:** Under 500KB (use WebP for better compression)
- **Screenshots:** Under 300KB
- **Thumbnails:** Under 100KB

### Naming Convention
```
{company}-{type}-{description}.{ext}

Examples:
razorpay-hero-dashboard.jpg
zomato-screenshot-app-home.png
flipkart-photo-warehouse.jpg
airbnb-founder-chesky.jpg
```

## Usage in Components

### Hero Background Image
```tsx
<div 
  className="h-96 bg-cover bg-center"
  style={{ backgroundImage: 'url(/brand/case-studies/razorpay/hero.jpg)' }}
>
  {/* Overlay content */}
</div>
```

### Screenshot Gallery
```tsx
<div className="grid grid-cols-2 gap-4">
  <img 
    src="/brand/case-studies/zomato/app-ui.png" 
    alt="Zomato App Interface"
    className="border-2 border-ink"
  />
  <img 
    src="/brand/case-studies/zomato/restaurant.jpg"
    alt="Restaurant Partner Dashboard"
    className="border-2 border-ink"
  />
</div>
```

## Image Sources

### Free Stock Photos
- **Unsplash:** https://unsplash.com (high-quality, free)
- **Pexels:** https://pexels.com (curated stock photos)
- **Pixabay:** https://pixabay.com (public domain)

### Company Resources
- Official website press kits
- Company blog posts
- Social media (with attribution)
- App Store/Play Store screenshots

### Screenshots
- Use browser DevTools to capture at 2x resolution
- Remove personal/sensitive data
- Ensure UI is in clean state (no errors, loading states)

## Optimization Tools

Before adding images, optimize them:

1. **TinyPNG** - https://tinypng.com (PNG compression)
2. **Squoosh** - https://squoosh.app (WebP conversion)
3. **ImageOptim** - macOS app for batch optimization
4. **Cloudinary** - CDN with automatic optimization (future)

## To-Do

- [ ] Add Razorpay product screenshots
- [ ] Source Zomato app interface images
- [ ] Get Flipkart warehouse/logistics photos
- [ ] Find Airbnb property/host images
- [ ] Create thumbnail versions for case study cards
- [ ] Compress all images to WebP format

## Copyright

All images must either be:
1. Owned by Incubazar (original photography)
2. Licensed from stock photo sites (with attribution if required)
3. Used under Fair Use (screenshots for educational purposes)
4. Provided by companies for press/educational use

Always attribute sources and respect copyright.
