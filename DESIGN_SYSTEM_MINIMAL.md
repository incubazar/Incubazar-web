# IncuBazar - Minimalist Design System

## Overview
This design system provides a clean, professional, and accessible foundation for IncuBazar's interface. It emphasizes clarity, consistency, and ease of use.

---

## Color System

### Light Mode
```css
Background: #FFFFFF (White)
Foreground: #262626 (Dark Gray)
Primary: #1E293B (Navy)
Secondary: #F5F5F5 (Light Gray)
Border: #E5E5E5 (Border Gray)
Muted: #737373 (Mid Gray)
```

### Dark Mode
```css
Background: #1A1A1A (Dark)
Foreground: #F2F2F2 (Light)
Primary: #F2F2F2 (Light)
Secondary: #262626 (Dark Gray)
Border: #333333 (Dark Border)
Muted: #A6A6A6 (Light Gray)
```

### Semantic Colors
```css
Success: #10B981 (Green)
Error: #EF4444 (Red)
Warning: #F59E0B (Orange)
Info: #3B82F6 (Blue)
```

---

## Typography

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Scale
```
Heading 1: 2.5rem (40px) - 3rem (48px)
Heading 2: 2rem (32px) - 2.5rem (40px)
Heading 3: 1.5rem (24px) - 2rem (32px)
Heading 4: 1.25rem (20px) - 1.5rem (24px)
Body Large: 1.125rem (18px)
Body: 1rem (16px)
Body Small: 0.875rem (14px)
Caption: 0.75rem (12px)
```

### Weights
```
Light: 300
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

### Line Heights
```
Tight: 1.25 (headings)
Snug: 1.375 (subheadings)
Normal: 1.5 (body)
Relaxed: 1.625 (large text)
```

---

## Spacing

### Scale (based on 4px)
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Layout Containers
```css
Container: max-width: 1280px (7xl)
Padding: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)
```

---

## Border Radius

```css
sm: 4px (small elements)
base: 8px (default)
lg: 12px (buttons, cards)
full: 9999px (circular)
```

---

## Shadows

Use native browser shadows sparingly. Prefer borders for definition.

```css
Default: 0 1px 2px rgba(0, 0, 0, 0.05)
Focus Ring: 0 0 0 2px offset
```

---

## Components

### Buttons

#### Primary Button
```tsx
<Button>
  Label
</Button>
```
- Background: Primary color
- Text: White
- Border radius: 8px
- Padding: 0.5rem 1rem
- Hover: Slight opacity change (90%)

#### Secondary Button
```tsx
<Button variant="outline">
  Label
</Button>
```
- Background: Transparent
- Text: Foreground
- Border: 1px solid border color
- Hover: Light background

#### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```
- Background: White (dark mode: #1E1E1E)
- Border: 1px solid border color
- Border radius: 8px
- Padding: 1.5rem

### Inputs

```tsx
<Input 
  type="text" 
  placeholder="Enter text"
/>
```
- Height: 2.5rem (40px)
- Border: 1px solid border color
- Border radius: 8px
- Focus: Ring effect

### Navigation

#### Navbar
- Fixed position at top
- Background: White with border bottom
- Height: 64px
- Backdrop blur when scrolled
- Z-index: 50

#### Mobile Menu
- Slide in from right
- Full height overlay
- Close button (X icon)
- Vertical button stack

---

## Layout Patterns

### Hero Section
```
Container (max-w-4xl)
  Centered text
  Heading + Subheading
  CTA Button Row (gap-4)
  Trust Indicators
  Stats Grid (3 columns)
```

### Dashboard Layout
```
Sidebar (fixed, left)
  Logo
  Navigation Items
  User Profile (bottom)

Main Content (flex-1)
  Header (sticky)
  Content Area (padded)
```

### Auth Pages
```
Centered Container (max-w-md)
  Logo + Tagline
  Card
    Form Fields (stacked)
    Submit Button (full width)
    Footer Links
```

---

## Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile-First Approach
- Default styles for mobile
- Use `md:` prefix for tablet
- Use `lg:` prefix for desktop

---

## Iconography

### Icon Library
Use **Lucide React** icons

```tsx
import { Home, User, Settings } from 'lucide-react'

<Home className="w-5 h-5" />
```

### Sizes
```
Small: 16px (w-4 h-4)
Default: 20px (w-5 h-5)
Large: 24px (w-6 h-6)
XLarge: 32px (w-8 h-8)
```

---

## Accessibility

### Contrast Ratios
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: Clear focus states

### Focus States
- Visible ring on all interactive elements
- Ring color: Primary color
- Ring width: 2px
- Ring offset: 2px

### Motion
- Respect `prefers-reduced-motion`
- Keep transitions subtle (200ms)
- No auto-playing animations

---

## Usage Examples

### Landing Page Hero
```tsx
<section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 pt-24">
  <div className="container-premium py-16">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white">
        Your Headline
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
        Your description
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">Primary Action</Button>
        <Button size="lg" variant="outline">Secondary Action</Button>
      </div>
    </div>
  </div>
</section>
```

### Simple Card Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Feature Name</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-400">
        Feature description
      </p>
    </CardContent>
  </Card>
  {/* More cards... */}
</div>
```

### Form Layout
```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input 
      id="email" 
      type="email" 
      placeholder="you@example.com"
    />
  </div>
  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>
```

---

## Best Practices

### Do's ✅
- Use consistent spacing (multiples of 4px)
- Maintain clear visual hierarchy
- Use system fonts for performance
- Keep animations minimal and purposeful
- Test in both light and dark modes
- Ensure proper contrast ratios
- Use semantic HTML elements

### Don'ts ❌
- Don't use gradients or heavy effects
- Avoid auto-playing animations
- Don't mix different border radius values
- Avoid complex nested grids
- Don't use custom fonts (stick to Inter)
- Avoid excessive shadowing
- Don't use pure black (#000000)

---

## Component Checklist

When creating new components:

- [ ] Follows spacing system (4px increments)
- [ ] Uses semantic color tokens
- [ ] Includes dark mode styles
- [ ] Has proper focus states
- [ ] Is keyboard accessible
- [ ] Works on mobile devices
- [ ] Uses consistent border radius
- [ ] Includes loading states (if applicable)
- [ ] Has error states (if applicable)
- [ ] Documented with examples

---

## Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Shadcn UI Components:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref
- **Inter Font:** https://rsms.me/inter

---

**Version:** 1.0  
**Last Updated:** October 20, 2025  
**Maintained by:** IncuBazar Design Team
