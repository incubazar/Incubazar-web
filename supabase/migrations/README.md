# Database Migrations

This directory contains **all database migrations** in sequential order. These files define the database schema evolution.

## ⚠️ IMPORTANT

**DO NOT delete, rename, or reorder these files!**
- Migrations are sequential and order-dependent
- Supabase tracks which migrations have been applied
- Altering these files can break your database state

---

## Migration Files (9 total)

### 1. `001_initial_schema.sql` (9.8K)
**Purpose:** Creates initial database schema
- Creates `users` table with roles (founder/investor/admin)
- Creates `founder_profiles` table with approval status
- Creates `investor_profiles` table with KYC status
- Creates `startup_deals` table
- Creates `investor_interests` table
- Sets up basic relationships and indexes

### 2. `002_rls_policies.sql` (10K)
**Purpose:** Implements Row Level Security (RLS) policies
- Enables RLS on all tables
- Creates policies for users, founders, investors
- Defines admin access policies
- Sets up security rules for data access

### 3. `003_fix_rls_policies.sql` (4.2K)
**Purpose:** Fixes RLS policy issues
- Resolves circular dependency issues
- Updates admin policies
- Fixes policy conflicts

### 4. `004_investor_limit_trigger.sql` (4.5K)
**Purpose:** Adds investor interest limits
- Creates trigger to limit interests per investor
- Prevents spam/abuse
- Enforces business rules

### 5. `005_startup_details.sql` (3.2K)
**Purpose:** Creates comprehensive startup details table
- Adds `startup_details` table (45+ columns)
- Stores 6-step onboarding data
- Links to `founder_profiles` via `founder_profile_id`
- Includes: team info, product details, market data, traction, fundraising goals

### 6. `006_admin_approval_system.sql` (6.3K)
**Purpose:** Implements admin approval system
- Adds approval/rejection tracking columns to founder_profiles
- Adds verification tracking columns to investor_profiles
- Creates `admin_notes` table
- Creates `approval_history` table with automatic triggers
- Sets up audit trail for all admin actions

### 7. `007_fix_admin_rls_policies.sql` (3.3K)
**Purpose:** Fixes admin RLS policies
- Updates RLS policies for admin access
- Fixes permission issues on new tables
- Ensures admins can access all data

### 8. `008_add_missing_investor_columns.sql` (720B)
**Purpose:** Adds missing investor profile columns
- Adds `total_invested` column
- Adds `profile_completion_percentage` column
- Updates investor tracking fields

### 9. `009_fix_approval_history_constraint.sql` (1.1K)
**Purpose:** Fixes approval history constraints
- Fixes foreign key constraints
- Resolves constraint violation issues
- Ensures data integrity

---

## Running Migrations

### Via Supabase CLI (Recommended)
```bash
# Push all pending migrations
supabase db push

# Reset database (⚠️ DESTRUCTIVE - loses all data)
supabase db reset
```

### Via Supabase Dashboard
1. Go to SQL Editor in Supabase Dashboard
2. Copy/paste migration file contents
3. Run the query

### Check Migration Status
```bash
# See which migrations have been applied
supabase migration list

# Check current database version
supabase db version
```

---

## Creating New Migrations

### Using Supabase CLI
```bash
# Create a new migration file
supabase migration new <migration_name>

# Example:
supabase migration new add_user_preferences
```

This will create: `supabase/migrations/YYYYMMDDHHMMSS_add_user_preferences.sql`

### Naming Convention
- Use descriptive names: `add_<feature>`, `fix_<issue>`, `update_<table>`
- Keep names concise but clear
- Use lowercase with underscores

---

## Migration Best Practices

1. **Never modify existing migrations** after they've been deployed
2. **Always create new migrations** for changes
3. **Test migrations** on development database first
4. **Keep migrations small** and focused on one change
5. **Document what each migration does** in comments
6. **Use transactions** when possible for rollback safety

---

## Database Schema Overview

**Current Tables:**
- `users` - User authentication and roles
- `founder_profiles` - Founder basic info with approval status
- `startup_details` - Comprehensive startup information
- `investor_profiles` - Investor info with KYC status
- `startup_deals` - Active fundraising deals
- `investor_interests` - Investor expressions of interest
- `admin_notes` - Internal admin notes on profiles
- `approval_history` - Audit trail of admin actions

**See:** `/docs/database/DB_REFERENCE.md` for complete schema documentation

---

## Troubleshooting

### Migration fails with "column already exists"
The migration may have been partially applied. Check your database state.

### Migration fails with "table does not exist"
Ensure you've run all previous migrations in order.

### Want to rollback a migration
Create a new migration that reverses the changes (no automatic rollback in Supabase).

### RLS policy errors after migration
See `/scripts/sql/FIX_RLS_FINAL.sql` for RLS fixes.

---

**Last Updated:** October 2025  
**Total Migrations:** 9  
**Database Version:** Based on latest migration applied


