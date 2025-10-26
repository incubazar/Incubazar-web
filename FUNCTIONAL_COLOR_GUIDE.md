# Functional Color Guide - Incubazar

**Created:** October 26, 2025  
**Status:** Official Design System Extension

---

## Design Philosophy

Incubazar maintains a **pure monochrome branding** (black, white, grayscale) across all marketing, editorial, and branding touchpoints. However, we make **strategic exceptions for functional elements** where color significantly improves usability and data comprehension.

---

## Branding vs. Functional Zones

### ✅ **Pure Monochrome (Branding Zones)**
- Landing pages
- Hero sections
- Marketing content
- Editorial content (`/learn/*` pages)
- Navigation
- Footer
- Logo and brand elements
- Typography and layout

### 🎨 **Functional Colors Allowed (Data Zones)**
- Charts and graphs
- Data visualizations
- Status indicators (health/warning/error)
- Progress bars in calculators
- Compliance alerts
- Metric dashboards
- Match quality scores
- Real-time status badges

---

## Functional Color Palette

### Primary Status Colors

#### 🟢 Success/Healthy/Positive
```css
/* Use for: Positive metrics, healthy status, success states */
--success-bg: #F0FDF4      /* green-50 */
--success-border: #BBF7D0  /* green-200 */
--success-text: #16A34A    /* green-600 */
--success-strong: #15803D  /* green-700 */
```

#### 🔵 Info/Neutral/Good
```css
/* Use for: Information, moderate status, neutral data */
--info-bg: #EFF6FF         /* blue-50 */
--info-border: #BFDBFE     /* blue-200 */
--info-text: #2563EB       /* blue-600 */
--info-strong: #1D4ED8     /* blue-700 */
```

#### 🟡 Warning/Caution/Fair
```css
/* Use for: Warnings, approaching limits, fair status */
--warning-bg: #FEF3C7      /* yellow-50 / amber-50 */
--warning-border: #FDE68A  /* yellow-200 */
--warning-text: #D97706    /* amber-600 */
--warning-strong: #B45309  /* amber-700 */
```

#### 🔴 Error/Critical/Urgent
```css
/* Use for: Errors, critical status, urgent actions */
--error-bg: #FEE2E2        /* red-50 */
--error-border: #FECACA    /* red-200 */
--error-text: #DC2626      /* red-600 */
--error-strong: #B91C1C    /* red-700 */
```

#### 🟣 Special/Featured (Limited Use)
```css
/* Use for: Premium features, special indicators */
--special-bg: #F3E8FF      /* purple-50 */
--special-border: #E9D5FF  /* purple-200 */
--special-text: #9333EA    /* purple-600 */
```

#### 🟠 Alert/Moderate (Limited Use)
```css
/* Use for: Moderate alerts, secondary warnings */
--alert-bg: #FFF7ED        /* orange-50 */
--alert-border: #FED7AA    /* orange-200 */
--alert-text: #EA580C      /* orange-600 */
```

---

## Usage Rules

### ✅ DO Use Functional Colors For:

1. **Status Indicators**
   - Runway calculator health status
   - Compliance limit trackers
   - Match quality scores
   - Data room access status

2. **Charts & Graphs**
   - Bar charts
   - Line graphs
   - Pie charts
   - Progress bars (when showing data)

3. **Alerts & Notifications**
   - System alerts
   - Compliance warnings
   - Error messages
   - Success confirmations

4. **Real-Time Data**
   - Active user counts
   - Live metrics
   - Platform pulse indicators

5. **Interactive Data Elements**
   - Hover states on data points
   - Selected data segments
   - Comparison highlights

### ❌ DON'T Use Functional Colors For:

1. **Branding Elements**
   - Logos
   - Hero sections
   - Marketing copy
   - Editorial headlines

2. **Navigation**
   - Menu items
   - Breadcrumbs
   - Tab navigation

3. **Content Typography**
   - Body text
   - Headings (unless data-driven)
   - Quotes and callouts

4. **Decorative Elements**
   - Borders (unless functional)
   - Backgrounds (unless status-driven)
   - Icons (unless status indicators)

---

## Implementation Guidelines

### Component-Level Decision Matrix

| Component Type | Colors Allowed? | Example |
|---------------|-----------------|---------|
| Hero Section | ❌ No | Monochrome only |
| Calculator Results | ✅ Yes | Green/Yellow/Red for status |
| Product Cards | ❌ No | Grayscale with ink accents |
| Progress Bars (Data) | ✅ Yes | Conditional colors |
| Progress Bars (UI) | ❌ No | Grayscale only |
| Alerts (System) | ✅ Yes | Status-based colors |
| Alerts (Marketing) | ❌ No | Ink borders only |
| Charts/Graphs | ✅ Yes | Full functional palette |
| Match Scores | ✅ Yes | Green/Blue/Yellow |
| Messaging Badges | ✅ Yes | Blue for unread count |
| Feature Highlights | ❌ No | Graphite emphasis |

---

## Color Intensity Guidelines

### Light Mode
- **Backgrounds**: Use `-50` variants (very light)
- **Borders**: Use `-200` variants (subtle)
- **Text**: Use `-600` to `-700` variants (readable)
- **Icons**: Match text color

### Dark Mode
- **Backgrounds**: Use `-950` variants
- **Borders**: Use `-800` variants
- **Text**: Use `-400` to `-300` variants
- **Icons**: Match text color

---

## Accessibility Requirements

All functional colors must meet WCAG 2.1 AA standards:
- **Text contrast**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **Interactive elements**: Minimum 3:1 ratio

### Approved Combinations

✅ **Good Contrast:**
```
text-green-700 on bg-green-50
text-blue-600 on bg-blue-50
text-red-600 on bg-red-50
text-amber-700 on bg-yellow-50
```

❌ **Poor Contrast:**
```
text-green-400 on bg-green-50
text-blue-300 on bg-blue-50
```

---

## Migration from Monochrome

When converting a component from pure monochrome to functional colors:

1. **Assess necessity**: Is color truly improving comprehension?
2. **Document reason**: Why is monochrome insufficient?
3. **Use sparingly**: Apply color only to key data points
4. **Maintain hierarchy**: Monochrome should still dominate

### Example: Status Indicator

**Before (Pure Monochrome):**
```tsx
<div className="border-2 border-graphite-900 bg-graphite-50">
  <p className="text-ink font-bold">Critical: 3 months runway</p>
</div>
```

**After (Functional Colors):**
```tsx
<div className="border-2 border-red-200 bg-red-50">
  <p className="text-red-700 font-bold">Critical: 3 months runway</p>
</div>
```

---

## Component Examples

### ✅ Approved Functional Components

1. **RunwayCalculator** - Status colors for financial health
2. **QuickMetricsWidget** - Multi-color for different metrics
3. **InvestorLimitTracker** - Red/Yellow/Green for compliance
4. **ComplianceMonitor** - Status-based coloring
5. **RecommendedDeals** - Match quality colors
6. **MessageThread** - Blue for messaging UI
7. **DataRoomAccess** - Status indicators
8. **UnitEconomicsCalculator** - Financial health colors

### ❌ Must Stay Monochrome

1. **EditorialHero** - Pure branding
2. **PremiumHero** - Marketing focus
3. **LearnToolkits** - Editorial content
4. **BrandPage** - Brand guidelines
5. **Footer** - Navigation/branding
6. **Navbar** - Navigation
7. **LandingFeatures** - Marketing cards

---

## Testing Checklist

Before using functional colors in a component:

- [ ] Is this component data-focused or branding-focused?
- [ ] Does color significantly improve comprehension?
- [ ] Have I used the minimum necessary colors?
- [ ] Do all colors meet accessibility standards?
- [ ] Is the component documented in this guide?
- [ ] Does it follow the approved palette?

---

## Future Considerations

### Chart Libraries
When implementing charts, use these color sequences:

**Primary Sequence (for multi-series data):**
1. `#2563EB` (blue-600)
2. `#16A34A` (green-600)
3. `#D97706` (amber-600)
4. `#DC2626` (red-600)
5. `#9333EA` (purple-600)

**Monochromatic Sequence (preferred for branding consistency):**
1. `#000000` (ink)
2. `#404040` (graphite-700)
3. `#737373` (graphite-500)
4. `#A3A3A3` (graphite-400)
5. `#D4D4D4` (graphite-300)

---

## Maintenance

This guide should be reviewed:
- When adding new functional components
- When user feedback suggests confusion
- Quarterly with design team
- Before major feature launches

**Last Updated:** October 26, 2025  
**Next Review:** January 26, 2026
