# Scripts Directory

Utility scripts for database operations, brand assets, and maintenance.

## 🎨 Brand Asset Scripts (NEW)

Automated scripts to download and set up brand logos for the learning platform:

### **`setup-brand-assets.sh`** - Master Setup Script ⭐
**One command to download all logos and update code:**
```bash
bash scripts/setup-brand-assets.sh
```

This script:
- ✓ Downloads 6 logos from Wikimedia Commons (Apple, Nike, FedEx)
- ✓ Updates code to use local paths instead of CDN URLs
- ✓ Verifies all files downloaded successfully
- ✓ Shows remaining manual steps (Razorpay logo)

**Estimated time:** ~2 minutes

---

### **`download-logos.sh`** - Download Logos Only
Downloads Priority 1 logos (Apple, Nike, FedEx) from Wikimedia:
```bash
bash scripts/download-logos.sh
```

**Downloads:**
- `public/brand/logos/apple/logo-black.svg`
- `public/brand/logos/apple/logo-rainbow.svg`
- `public/brand/logos/nike/swoosh-black.svg`
- `public/brand/logos/nike/jumpman-black.svg`
- `public/brand/logos/fedex/fedex-express.svg`
- `public/brand/logos/fedex/fedex-ground.svg`

---

### **`update-logo-paths.sh`** - Update Code Paths
Updates code to use local logo paths:
```bash
bash scripts/update-logo-paths.sh
```

**Updates:**
- `app/learn/brand/page.tsx` (6 BrandShowcase components)
- `app/learn/case-studies/razorpay/page.tsx` (1 CaseStudyHero)

---

## 📁 SQL Utilities (4 files)

Essential SQL scripts for database verification, diagnostics, and fixes:

### 🔍 Verification Scripts
- **`VERIFY_DATABASE.sql`** - Complete database verification (recommended)
- **`CHECK_TABLES.sql`** - View table structures and data
- **`DIAGNOSTIC_RLS.sql`** - Diagnose RLS (Row Level Security) issues

### 🔧 Fix Scripts
- **`FIX_RLS_FINAL.sql`** - Complete RLS policy fixes (use this one)

## Usage

These scripts are primarily for database maintenance and troubleshooting. For regular database migrations, use the files in `/supabase/migrations/`.

### Running SQL Scripts

**Via Supabase CLI:**
```bash
supabase db execute -f scripts/sql/<script-name>.sql
```

**Via psql:**
```bash
psql -h <host> -U <user> -d <database> -f scripts/sql/<script-name>.sql
```

**Via Supabase Dashboard:**
1. Go to SQL Editor in your Supabase project
2. Copy and paste the script contents
3. Run the query

## Note

These are utility scripts separate from the main migration flow. Always test on a development database first before running on production.

