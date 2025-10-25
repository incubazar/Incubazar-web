# 📁 Brand Assets Directory - Index

Complete directory structure for Incubazar Learning Platform brand assets.

## 📂 Directory Tree

```
/public/brand/
│
├── README.md                    # Main documentation
├── DOWNLOAD_CHECKLIST.md        # Step-by-step download guide
│
├── logos/                       # Company logos for case studies
│   ├── apple/
│   │   ├── PLACE_LOGOS_HERE.md
│   │   ├── logo-black.svg       ← Download from Wikimedia
│   │   ├── logo-white.svg       ← Create from black version
│   │   └── logo-rainbow.svg     ← Download from Wikimedia
│   │
│   ├── nike/
│   │   ├── PLACE_LOGOS_HERE.md
│   │   ├── swoosh-black.svg     ← Download from Wikimedia
│   │   ├── swoosh-white.svg     ← Create from black version
│   │   └── jumpman-black.svg    ← Download from Wikimedia
│   │
│   ├── fedex/
│   │   ├── PLACE_LOGOS_HERE.md
│   │   ├── fedex-express.svg    ← Download from Wikimedia
│   │   └── fedex-ground.svg     ← Download from Wikimedia
│   │
│   ├── razorpay/
│   │   ├── PLACE_LOGOS_HERE.md
│   │   ├── logo-full-blue.svg   ← Download from razorpay.com
│   │   ├── logo-white.svg       ← Create from blue version
│   │   └── logo-icon.svg        ← Extract from website
│   │
│   ├── zomato/                  # Future case study
│   │   ├── PLACE_LOGOS_HERE.md
│   │   └── (logos to be added)
│   │
│   ├── flipkart/                # Future case study
│   │   ├── PLACE_LOGOS_HERE.md
│   │   └── (logos to be added)
│   │
│   └── airbnb/                  # Future case study
│       ├── PLACE_LOGOS_HERE.md
│       └── (logos to be added)
│
├── case-studies/                # Hero images & screenshots
│   ├── README.md
│   ├── razorpay/
│   │   ├── hero.jpg            ← Add hero image
│   │   ├── product-ui.png      ← Add dashboard screenshot
│   │   └── (more images)
│   │
│   ├── zomato/                 # Future
│   ├── flipkart/               # Future
│   └── airbnb/                 # Future
│
└── ui-examples/                 # UI mockups for modules
    ├── README.md
    ├── product-gtm/
    │   ├── mvp-examples/
    │   ├── pricing-tiers/
    │   └── saas-dashboards/
    │
    ├── pitching/
    │   ├── pitch-decks/
    │   └── demo-slides/
    │
    ├── brand/
    │   ├── typography/
    │   ├── color-palettes/
    │   └── logo-grids/
    │
    ├── incorporation/
    └── finance/
```

## 🎯 Current Status

### ✅ Completed
- [x] Directory structure created
- [x] README files in all folders
- [x] Download instructions (PLACE_LOGOS_HERE.md in each logo folder)
- [x] Master download checklist
- [x] File naming conventions documented
- [x] Usage examples in code

### 📥 To-Do (Priority 1 - Required)
- [ ] Download 11 logo files for active case studies:
  - Apple (3 files)
  - Nike (3 files)
  - FedEx (2 files)
  - Razorpay (3 files)
- [ ] Optimize all SVG files
- [ ] Update code to use local paths instead of CDN URLs

### 🔮 To-Do (Priority 2 - Future)
- [ ] Add Zomato logos (when case study is written)
- [ ] Add Flipkart logos (when case study is written)
- [ ] Add Airbnb logos (when case study is written)
- [ ] Create UI examples for Product/GTM module
- [ ] Add pitch deck screenshots for Pitching module

## 📋 Quick Start Guide

### Step 1: Download Priority 1 Logos

Open `/public/brand/DOWNLOAD_CHECKLIST.md` and follow the checklist.

**Fastest path:**
1. Visit Wikimedia Commons links (provided in checklist)
2. Download 8 files (Apple, Nike, FedEx logos)
3. For Razorpay: Visit razorpay.com → Inspect element → Find logo SVG in Network tab
4. Total time: ~30 minutes

### Step 2: Optimize Files

```bash
# Option 1: Online tool
Visit: https://jakearchibald.github.io/svgomg/
Drag all SVG files → Download optimized versions

# Option 2: Command line (if you have svgo installed)
npm install -g svgo
svgo -f public/brand/logos/apple/
svgo -f public/brand/logos/nike/
svgo -f public/brand/logos/fedex/
svgo -f public/brand/logos/razorpay/
```

### Step 3: Update Code

Update these 2 files to use local paths:

**1. `/app/learn/brand/page.tsx`** (3 BrandShowcase components)
```tsx
// Apple showcase (around line 600)
<BrandShowcase
  logos={[
    {
      src: '/brand/logos/apple/logo-black.svg',  // ← Changed
      alt: 'Apple Logo - Modern Monochrome',
      caption: 'Monochrome Era',
      year: '1998'
    },
    {
      src: '/brand/logos/apple/logo-rainbow.svg',  // ← Changed
      alt: 'Apple Rainbow Logo',
      caption: 'Rainbow Logo',
      year: '1977'
    }
  ]}
  brandColors={['#000000', '#A6AAAE', '#FFFFFF']}
  gridLayout="2"
/>

// Nike showcase (around line 708)
<BrandShowcase
  logos={[
    {
      src: '/brand/logos/nike/swoosh-black.svg',  // ← Changed
      // ...
    },
    {
      src: '/brand/logos/nike/jumpman-black.svg',  // ← Changed
      // ...
    }
  ]}
/>

// FedEx showcase (around line 800)
<BrandShowcase
  logos={[
    {
      src: '/brand/logos/fedex/fedex-express.svg',  // ← Changed
      // ...
    },
    {
      src: '/brand/logos/fedex/fedex-ground.svg',  // ← Changed
      // ...
    }
  ]}
/>
```

**2. `/app/learn/case-studies/razorpay/page.tsx`** (line 67)
```tsx
<CaseStudyHero
  company="Razorpay"
  logoUrl="/brand/logos/razorpay/logo-full-blue.svg"  // ← Changed
  logoAlt="Razorpay Logo"
  brandColor="#3395FF"
  // ... other props
/>
```

### Step 4: Test

```bash
# Run dev server
npm run dev

# Visit these pages to verify logos appear:
# 1. http://localhost:3000/learn/brand (Apple, Nike, FedEx showcases)
# 2. http://localhost:3000/learn/case-studies/razorpay (Razorpay hero)
```

## 📊 File Count Summary

| Category | Folders | Files (Planned) | Status |
|----------|---------|-----------------|--------|
| **Logos - Active** | 4 | 11 | 🔴 0/11 (0%) |
| **Logos - Future** | 3 | 15 | ⏳ Pending |
| **Case Studies** | 4 | ~20 | ⏳ Pending |
| **UI Examples** | 10+ | ~50 | ⏳ Pending |
| **Documentation** | - | 10 | ✅ Complete |
| **Total** | 21+ | ~106 | 🟡 9% |

## 🛠️ Useful Tools

### Logo Download & Editing
- **Wikimedia Commons:** https://commons.wikimedia.org (free logos)
- **Inkscape:** https://inkscape.org (SVG editor, free)
- **Figma:** https://figma.com (browser-based design tool)

### Optimization
- **SVGOMG:** https://jakearchibald.github.io/svgomg/ (SVG compression)
- **TinyPNG:** https://tinypng.com (PNG compression)
- **Squoosh:** https://squoosh.app (WebP conversion)

### Screenshots
- **macOS:** Cmd+Shift+4 (select area) or Cmd+Shift+5 (screen recorder)
- **Windows:** Snipping Tool or Win+Shift+S
- **Browser:** Awesome Screenshot extension (Chrome/Firefox)

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `/brand/README.md` | Main documentation, usage guide |
| `/brand/DOWNLOAD_CHECKLIST.md` | Step-by-step download instructions |
| `/brand/INDEX.md` | This file - overview |
| `/brand/logos/{company}/PLACE_LOGOS_HERE.md` | Company-specific logo guide |
| `/brand/case-studies/README.md` | Hero image guidelines |
| `/brand/ui-examples/README.md` | UI mockup guidelines |

## 🎨 Design System Compliance

All assets must follow Incubazar monochrome design system:

- **Colors:** Black (#000000), White (#FFFFFF), Graphite (100-900)
- **Logos:** Preserve original brand colors in BrandShowcase
- **Screenshots:** Can include colors, but prefer monochrome UI examples
- **Typography:** DM Sans (sans-serif), Playfair Display (serif)
- **Layout:** 8px grid system, sharp edges (no border-radius)

## 🚀 Next Steps

1. **Download Priority 1 logos** (11 files, ~30 min)
   - Use DOWNLOAD_CHECKLIST.md as guide
   - Start with Wikimedia Commons (easiest)
   
2. **Optimize files** (5 min)
   - Use SVGOMG online tool
   - Compress to <50KB per logo

3. **Update code** (10 min)
   - Change 2 files (brand/page.tsx, razorpay/page.tsx)
   - Replace CDN URLs with local paths

4. **Test locally** (5 min)
   - Run `npm run dev`
   - Visit /learn/brand and /learn/case-studies/razorpay
   - Verify logos display with layered shadow effect

5. **Commit changes** (2 min)
   ```bash
   git add public/brand/
   git commit -m "Add brand logos (Apple, Nike, FedEx, Razorpay)"
   git push
   ```

**Total time:** ~50 minutes to complete Priority 1

## 💡 Pro Tips

1. **Batch download:** Open all Wikimedia links in separate tabs, download simultaneously
2. **Keep originals:** Before optimizing, copy files to a backup folder
3. **SVG > PNG:** Always prefer SVG for logos (scalable, smaller file size)
4. **Test dark mode:** Check white logo versions on dark backgrounds
5. **Attribution:** Keep source URLs in PLACE_LOGOS_HERE.md for future reference

## 📞 Support

If you run into issues:

1. Check `PLACE_LOGOS_HERE.md` in each logo folder for specific instructions
2. Verify file naming (lowercase, hyphens, .svg extension)
3. Ensure files are in correct folders (/brand/logos/{company}/)
4. Test in browser DevTools (check for 404 errors)

---

**Status:** 🟡 Infrastructure ready, awaiting logo downloads

**Last Updated:** October 25, 2024

**Maintained by:** Incubazar Learning Team
