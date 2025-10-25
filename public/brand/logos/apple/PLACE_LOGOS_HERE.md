# Apple Logo Files

Add the following logo files to this directory:

## Required Files

1. **logo-black.svg** - Black monochrome logo (current version, 1998-present)
   - Source: https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg
   - Or download from: Apple Brand Guidelines
   - Use: Main logo for light backgrounds

2. **logo-white.svg** - White version for dark backgrounds
   - Create from logo-black.svg (invert colors)
   - Use: Dark background applications

3. **logo-rainbow.svg** (Optional) - Original rainbow logo (1977-1998)
   - Source: https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg
   - Use: Historical comparison in logo evolution showcase

## File Format Guidelines

- **Format:** SVG (preferred) or PNG with transparent background
- **Size:** Keep under 50KB
- **Naming:** Use lowercase with hyphens (logo-black.svg, not Logo_Black.SVG)
- **Color Mode:** RGB for digital use

## Brand Colors

```
Black: #000000
Gray:  #A6AAAE
White: #FFFFFF
```

## Usage in Code

Once files are added, update the BrandShowcase component:

```tsx
<BrandShowcase
  logos={[
    {
      src: '/brand/logos/apple/logo-black.svg',
      alt: 'Apple Logo - Modern Monochrome',
      caption: 'Monochrome Era',
      year: '1998'
    },
    {
      src: '/brand/logos/apple/logo-rainbow.svg',
      alt: 'Apple Rainbow Logo',
      caption: 'Rainbow Logo',
      year: '1977'
    }
  ]}
  brandColors={['#000000', '#A6AAAE', '#FFFFFF']}
/>
```

## Copyright

Apple logo is a registered trademark of Apple Inc. Used for educational purposes under Fair Use guidelines.
