# UI Examples & Design Assets

This directory contains UI mockups, design examples, and visual references for learning modules.

## Directory Structure

```
ui-examples/
├── product-gtm/
│   ├── mvp-examples/         # MVP types (smoke test, prototype, etc.)
│   ├── pricing-tiers/        # Pricing page examples
│   ├── saas-dashboards/      # SaaS product screenshots
│   └── landing-pages/        # GTM landing page examples
│
├── pitching/
│   ├── pitch-decks/          # Example slides from successful decks
│   ├── pitch-scripts/        # Annotated script examples
│   └── demo-slides/          # Product demo slide examples
│
├── brand/
│   ├── typography/           # Typography hierarchy examples
│   ├── color-palettes/       # Brand color system examples
│   ├── grid-systems/         # Layout grid examples
│   └── logo-grids/           # Logo construction grids
│
├── incorporation/
│   ├── documents/            # Sample legal docs (redacted)
│   ├── cap-tables/           # Cap table visualizations
│   └── org-charts/           # Company structure examples
│
└── finance/
    ├── unit-economics/       # CAC/LTV/Payback charts
    ├── financial-models/     # Spreadsheet screenshots
    └── investor-reports/     # Sample investor update slides
```

## File Formats

### Screenshots & Mockups
- **Format:** PNG (preserve UI clarity)
- **Size:** Keep under 500KB
- **Resolution:** 2x for retina displays (1920px+ width)

### Diagrams & Charts
- **Format:** SVG (scalable), PNG fallback
- **Tools:** Figma, Excalidraw, Chart.js exports
- **Size:** Under 200KB

### Documents
- **Format:** PDF thumbnails as PNG
- **Annotation:** Use overlays to highlight key sections
- **Redaction:** Remove sensitive/personal data

## Usage Examples

### Product Module - MVP Types
```tsx
<div className="grid grid-cols-3 gap-6">
  <div>
    <img src="/brand/ui-examples/product-gtm/mvp-examples/smoke-test.png" />
    <h4>Smoke Test</h4>
    <p>Landing page + email signup</p>
  </div>
  <div>
    <img src="/brand/ui-examples/product-gtm/mvp-examples/wizard-oz.png" />
    <h4>Wizard of Oz</h4>
    <p>Manual backend, automated frontend</p>
  </div>
  <div>
    <img src="/brand/ui-examples/product-gtm/mvp-examples/concierge.png" />
    <h4>Concierge MVP</h4>
    <p>Fully manual service</p>
  </div>
</div>
```

### Pitching Module - Deck Examples
```tsx
<BrandShowcase
  title="10-Slide Deck: Real Examples"
  description="Successful pitch decks that raised funding"
  logos={[
    { src: '/brand/ui-examples/pitching/pitch-decks/airbnb-cover.png', caption: 'Airbnb Seed Deck' },
    { src: '/brand/ui-examples/pitching/pitch-decks/buffer-cover.png', caption: 'Buffer Series A' }
  ]}
/>
```

### Brand Module - Typography
```tsx
<img 
  src="/brand/ui-examples/brand/typography/scale-example.svg"
  alt="Typography Scale: 12-96px progression"
  className="border-2 border-ink p-8"
/>
```

## Creating UI Examples

### Screenshots
1. **Clean Browser:** Use incognito/private mode (no extensions)
2. **2x Resolution:** Set browser zoom to 200%, then capture at 100%
3. **Crop Precisely:** Remove unnecessary chrome/whitespace
4. **Annotate:** Add arrows/labels using Figma or Photoshop

### Mockups
1. **Tools:** Figma, Sketch, Adobe XD
2. **Artboards:** Use standard sizes (1440px desktop, 375px mobile)
3. **Export:** 2x PNG with transparent background
4. **Consistency:** Match Incubazar design system (monochrome)

### Diagrams
1. **Tools:** Excalidraw, Miro, Lucidchart
2. **Style:** Hand-drawn aesthetic or clean vectors
3. **Colors:** Stick to monochrome palette (black/gray/white)
4. **Export:** SVG for scalability

## Annotation Best Practices

### Highlighting Key Elements
```
Use colored boxes/arrows to draw attention:
- Red: Problems/mistakes
- Green: Solutions/best practices
- Yellow: Important notes
- Blue: Data/metrics
```

### Text Overlays
```
- Font: DM Sans (match platform)
- Size: 14-18px (readable)
- Background: Semi-transparent box for contrast
- Position: Top-left or top-right (avoid center)
```

## Example Sources

### Pitch Decks (Public)
- Airbnb: http://www.slideshare.net/PitchDeckCoach/airbnb-first-pitch-deck-editable
- Buffer: https://buffer.com/library/seed-stage-deck
- Uber: https://www.slideshare.net/ubernotes/uber-pitch-deck
- LinkedIn: Series B deck (public)

### SaaS Dashboards
- Stripe Dashboard (screenshot with dummy data)
- HubSpot CRM interface
- Notion workspace examples
- Figma canvas screenshots

### Design Systems
- Airbnb Design System
- IBM Carbon Design System
- Shopify Polaris
- Google Material Design

## File Naming

```
{module}-{category}-{description}-{version}.{ext}

Examples:
product-mvp-smoke-test-v1.png
pitching-deck-cover-airbnb.png
brand-typography-scale-example.svg
finance-cap-table-series-a.png
```

## To-Do

- [ ] Create 5 MVP type examples (smoke test, wizard of oz, concierge, prototype, single-feature)
- [ ] Add 3 pitch deck cover slide examples
- [ ] Design typography scale infographic
- [ ] Create cap table visualization (seed → Series A → Series B)
- [ ] Add pricing page examples (freemium, trial, usage-based, tiered)
- [ ] Screenshot SaaS dashboard examples (Razorpay, Stripe, HubSpot)
- [ ] Create logo grid construction examples (Apple, Nike geometric grids)

## Copyright & Attribution

- **Public Decks:** Airbnb, Uber, Buffer decks are publicly shared (provide attribution)
- **Screenshots:** Educational Fair Use (annotate "Example UI - Educational Purposes")
- **Mockups:** Original designs or CC-licensed from Figma Community
- **Diagrams:** Create original or use CC0/public domain templates

Always cite sources and respect intellectual property.
