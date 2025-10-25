/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Editorial Magazine Color System - Pure Monochrome Only
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Pure Monochrome Editorial Palette
        // Black shades - for text, backgrounds, high contrast
        'ink': {
          DEFAULT: '#000000',      // Pure black
          light: '#111111',        // Deep grey
          lighter: '#1A1A1A',      // Softer dark grey
        },
        // White shades - for backgrounds, text on dark
        'paper': {
          DEFAULT: '#FFFFFF',      // Pure white
          warm: '#FAFAFA',         // Slightly off-white
          off: '#F8F8F8',          // Light grey background
        },
        // Complete grayscale spectrum
        'graphite': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },
      // Editorial Magazine Typography
      fontFamily: {
        sans: ['Satoshi', 'DM Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Satoshi', 'DM Sans', 'Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'Consolas', 'monospace'],
        logo: ['Playfair Display', 'serif'],
      },
      // Editorial Font Sizes
      fontSize: {
        'display-xl': ['7rem', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['5.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subhead': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.15em', fontWeight: '600', textTransform: 'uppercase' }],
      },
      // Editorial Spacing
      spacing: {
        'section': '8rem',
        'section-sm': '4rem',
        'article': '3rem',
        'paragraph': '2rem',
      },
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'paper-texture': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'editorial': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'editorial-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'editorial-xl': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'inner-subtle': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Cinematic Editorial Animations
        'fade-in-slow': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up-editorial': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-text': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'page-turn': {
          '0%': { opacity: '0', transform: 'translateX(-100px) rotateY(10deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotateY(0deg)' },
        },
        'parallax': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        'scale-in-editorial': {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'draw-line': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in-slow': 'fade-in-slow 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up-editorial': 'fade-in-up-editorial 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'reveal-text': 'reveal-text 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'page-turn': 'page-turn 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'parallax': 'parallax 2s ease-out',
        'scale-in-editorial': 'scale-in-editorial 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'draw-line': 'draw-line 1s ease-out',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
