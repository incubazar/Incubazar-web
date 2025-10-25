# 🚀 Quick Start: Download Brand Logos

**TL;DR:** Run this one command to download all logos automatically:

```bash
bash scripts/setup-brand-assets.sh
```

That's it! The script will:
1. ✅ Download 6 logos from Wikimedia Commons
2. ✅ Update your code to use local paths
3. ✅ Verify everything worked

**Time:** ~2 minutes

---

## What Gets Downloaded

### Apple (2 logos)
- `logo-black.svg` - Current monochrome logo (1998+)
- `logo-rainbow.svg` - Historical rainbow logo (1977-1998)

### Nike (2 logos)
- `swoosh-black.svg` - Nike Swoosh
- `jumpman-black.svg` - Air Jordan Jumpman

### FedEx (2 logos)
- `fedex-express.svg` - FedEx Express (Purple/Orange)
- `fedex-ground.svg` - FedEx Ground (Purple/Green)

**Total:** 6 files, ~300KB

---

## After Running the Script

### ✅ Test It Works

```bash
# 1. Start dev server (if not running)
npm run dev

# 2. Visit the brand module
open http://localhost:3000/learn/brand
```

You should see **3 logo showcases** with the NYT-style layered shadow effect:
- Apple Logo Evolution (monochrome vs rainbow)
- Nike Swoosh: $35 to $26 Billion
- FedEx: The Hidden Arrow Masterclass

---

## Manual Steps (Optional)

### 1. Create White Logo Versions

For dark backgrounds, create white versions:

**Option A: Using Inkscape (Free)**
1. Download Inkscape: https://inkscape.org
2. Open `logo-black.svg`
3. Select all (Cmd+A)
4. Fill & Stroke panel → Set fill to white (#FFFFFF)
5. Save as `logo-white.svg`

**Option B: Using sed (Quick)**
```bash
# Apple white logo
sed 's/fill="#000"/fill="#FFF"/g' public/brand/logos/apple/logo-black.svg > public/brand/logos/apple/logo-white.svg

# Nike white logo
sed 's/fill="#000"/fill="#FFF"/g' public/brand/logos/nike/swoosh-black.svg > public/brand/logos/nike/swoosh-white.svg
```

### 2. Download Razorpay Logo

The Razorpay logo needs to be downloaded manually (not on Wikimedia):

**Method 1: From razorpay.com**
1. Visit https://razorpay.com
2. Open DevTools (F12 or Cmd+Opt+I)
3. Go to "Network" tab
4. Reload page
5. Search for "logo.svg" in filter
6. Click on the logo request
7. Right-click → "Open in new tab"
8. Save file as `public/brand/logos/razorpay/logo-full-blue.svg`

**Method 2: Using curl (if you find the direct URL)**
```bash
curl -o public/brand/logos/razorpay/logo-full-blue.svg \
     "https://razorpay.com/build/_next/static/media/logo.XXXXXXX.svg"
```

---

## Troubleshooting

### "Command not found: curl"
Install curl:
```bash
brew install curl  # macOS
```

### "Permission denied"
Make scripts executable:
```bash
chmod +x scripts/*.sh
```

### Logos not showing in browser
1. Check files exist:
   ```bash
   ls -lh public/brand/logos/apple/
   ls -lh public/brand/logos/nike/
   ls -lh public/brand/logos/fedex/
   ```

2. Verify paths were updated:
   ```bash
   grep "/brand/logos" app/learn/brand/page.tsx
   ```

3. Clear browser cache (Cmd+Shift+R)

### Script hangs or times out
Check internet connection. The script downloads from:
- `upload.wikimedia.org` (Wikimedia Commons CDN)

---

## File Locations After Setup

```
public/brand/logos/
├── apple/
│   ├── logo-black.svg       ✅ Downloaded
│   ├── logo-rainbow.svg     ✅ Downloaded
│   └── logo-white.svg       ⏳ Manual (optional)
│
├── nike/
│   ├── swoosh-black.svg     ✅ Downloaded
│   ├── jumpman-black.svg    ✅ Downloaded
│   └── swoosh-white.svg     ⏳ Manual (optional)
│
├── fedex/
│   ├── fedex-express.svg    ✅ Downloaded
│   └── fedex-ground.svg     ✅ Downloaded
│
└── razorpay/
    ├── logo-full-blue.svg   ⏳ Manual
    ├── logo-white.svg       ⏳ Manual (optional)
    └── logo-icon.svg        ⏳ Manual (optional)
```

---

## Alternative: Manual Download

If you prefer to download manually, follow the links in:
```
/public/brand/DOWNLOAD_CHECKLIST.md
```

Each logo folder also has a `PLACE_LOGOS_HERE.md` with specific instructions.

---

## Next Steps

Once logos are downloaded and displaying correctly:

1. **Optimize files** (optional):
   ```bash
   # Visit https://jakearchibald.github.io/svgomg/
   # Drag all SVG files → Download optimized versions
   ```

2. **Add more case studies**:
   - Zomato (future)
   - Flipkart (future)
   - Airbnb (future)

3. **Commit changes**:
   ```bash
   git add public/brand/logos/
   git add app/learn/brand/page.tsx
   git add app/learn/case-studies/razorpay/page.tsx
   git commit -m "Add brand logos (Apple, Nike, FedEx)"
   git push
   ```

---

## Questions?

- **Full docs:** `/public/brand/README.md`
- **Download checklist:** `/public/brand/DOWNLOAD_CHECKLIST.md`
- **Directory index:** `/public/brand/INDEX.md`

**Need help?** Check the detailed guides in `/public/brand/logos/{company}/PLACE_LOGOS_HERE.md`
