# Scripts Directory

Utility scripts for database operations and maintenance. Cleaned and consolidated.

## `/sql` - SQL Utilities (4 files)

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

