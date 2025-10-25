# Nike Logo Files

Add the following logo files to this directory:

## Required Files

1. **swoosh-black.svg** - Nike Swoosh (black)
   - Source: https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg
   - Use: Main brand mark

2. **swoosh-white.svg** - Nike Swoosh (white)
   - Create from swoosh-black.svg (invert colors)
   - Use: Dark backgrounds

3. **jumpman-black.svg** (Optional) - Air Jordan Jumpman logo
   - Source: https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg
   - Use: Sub-brand showcase
   - Year: 1985

4. **logo-full.svg** (Optional) - Nike wordmark + swoosh
   - Complete Nike logo with text
   - Use: Full brand representation

## File Format Guidelines

- **Format:** SVG (vector format, scalable)
- **Size:** Under 50KB
- **Background:** Transparent
- **Naming:** lowercase-with-hyphens.svg

## Brand Colors

```
Black:  #000000
White:  #FFFFFF
Orange: #FF6900 (accent)
```

## Design Story

The Nike Swoosh was designed in 1971 by Carolyn Davidson, a Portland State University student, for just $35. Phil Knight's first reaction: "I don't love it, but it'll grow on me."

Today, the logo is worth an estimated $26 billion in brand value (2024).

## Usage in Code

```tsx
<BrandShowcase
  title="Nike Swoosh: $35 to $26 Billion"
  logos={[
    {
      src: '/brand/logos/nike/swoosh-black.svg',
      alt: 'Nike Swoosh Logo',
      caption: 'The Swoosh',
      year: '1971'
    },
    {
      src: '/brand/logos/nike/jumpman-black.svg',
      alt: 'Nike Air Jordan Jumpman',
      caption: 'Air Jordan Jumpman',
      year: '1985'
    }
  ]}
  brandColors={['#000000', '#FFFFFF', '#FF6900']}
/>
```

## Copyright

Nike Swoosh is a registered trademark of Nike, Inc. Used for educational purposes under Fair Use guidelines.
