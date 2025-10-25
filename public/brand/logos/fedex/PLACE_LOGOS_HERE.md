# FedEx Logo Files

Add the following logo files to this directory:

## Required Files

1. **fedex-express.svg** - FedEx Express (Purple/Orange)
   - Source: https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg
   - Colors: Purple (#4D148C) + Orange (#FF6600)
   - Use: Main FedEx brand (Express division)

2. **fedex-ground.svg** - FedEx Ground (Purple/Green)
   - Source: https://upload.wikimedia.org/wikipedia/commons/a/a6/FedEx_Ground_logo.svg
   - Colors: Purple (#4D148C) + Green (#006341)
   - Use: Ground delivery sub-brand

3. **fedex-freight.svg** (Optional) - FedEx Freight (Purple/Red)
   - Colors: Purple (#4D148C) + Red (#C8102E)

4. **fedex-office.svg** (Optional) - FedEx Office (Purple/Blue)
   - Colors: Purple (#4D148C) + Blue (#006BB6)

## The Hidden Arrow

**Key Design Feature:** The negative space between the "E" and "x" creates a forward-pointing arrow, symbolizing speed and precision. This subliminal design element is a masterclass in logo design.

Look closely: → between **E** and **x**

## File Format Guidelines

- **Format:** SVG (vector)
- **Size:** Under 100KB (color logos are larger)
- **Preserve:** Color variations (each FedEx division has unique color)
- **Background:** Transparent

## Brand Colors

```
Purple: #4D148C (constant across all divisions)
Orange: #FF6600 (Express)
Green:  #006341 (Ground)
Yellow: #FDB71A (Freight)
Blue:   #006BB6 (Office)
```

## Design History

- **Year:** 1994
- **Designer:** Landor & Associates
- **Award:** Voted #8 in "The 40 Best Logos Ever" by Rolling Stone

## Usage in Code

```tsx
<BrandShowcase
  title="FedEx: The Hidden Arrow Masterclass"
  description="Subliminal design at its finest. The negative space arrow between E and X communicates speed and precision without saying a word."
  logos={[
    {
      src: '/brand/logos/fedex/fedex-express.svg',
      alt: 'FedEx Logo with Hidden Arrow',
      caption: 'Express (Purple/Orange)',
      year: '1994'
    },
    {
      src: '/brand/logos/fedex/fedex-ground.svg',
      alt: 'FedEx Ground Logo',
      caption: 'Ground (Purple/Green)',
      year: '1998'
    }
  ]}
  brandColors={['#4D148C', '#FF6600', '#006341', '#FDB71A']}
/>
```

## Copyright

FedEx logos are registered trademarks of Federal Express Corporation. Used for educational purposes under Fair Use guidelines.
