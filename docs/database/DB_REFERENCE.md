# 🗄️ Complete Database Reference

## Quick Navigation
- [Database Structure](#database-structure)
- [Table Schemas](#table-schemas)
- [Admin Approval System](#admin-approval-system)
- [RLS Policies](#rls-policies)
- [Verification Queries](#verification-queries)
- [Common Issues](#common-issues)

---

## Database Structure

### Data Flow Summary

```
FOUNDER ONBOARDING (6 steps)
├─ Step 1-2: Basic Info → founder_profiles table
└─ Step 3-6: Detailed Info → startup_details table

INVESTOR ONBOARDING (5 steps)  
└─ All steps → investor_profiles.investment_preferences (JSONB)

ADMIN ACTIONS
├─ Approvals/Rejections → founder_profiles / investor_profiles
├─ Internal Notes → admin_notes table
└─ History Log → approval_history table (automatic)
```

---

## Table Schemas

### 1. `founder_profiles`
Stores basic startup information

```sql
Columns:
- id (uuid, primary key)
- user_id (uuid, foreign key → users.id)
- startup_name (text)
- incorporation_status (text: incorporated/not_incorporated)
- incorporation_number (text, CIN)
- industry_sector (text)
- stage (text: idea/mvp/early_revenue)
- pitch_deck_url (text)
- logo_url (text)
- profile_completion_percentage (integer)
- admin_approval_status (text: pending/approved/rejected)
- rejection_reason (text)
- approved_by (uuid)
- approved_date (timestamp)
- rejected_by (uuid)
- rejection_date (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

### 2. `startup_details`
Comprehensive startup information from 6-step onboarding

```sql
Columns:
- id (uuid, primary key)
- founder_profile_id (uuid, foreign key → founder_profiles.id)

BASIC:
- founded_date, website

TEAM:
- founder_names, team_size, key_team_members, advisor_names

PRODUCT:
- problem_statement, solution_description
- unique_value_proposition, target_customer, product_status

MARKET:
- market_size, target_market, competitors, competitive_advantage

TRACTION:
- current_users, monthly_revenue, revenue_growth, key_achievements

FUNDRAISING:
- fundraising_goal, funds_use, previous_funding, equity_offered

VISION:
- one_year_goal, three_year_vision, exit_strategy

- created_at, updated_at
```

### 3. `investor_profiles`
All investor information including preferences

```sql
Columns:
- id (uuid, primary key)
- user_id (uuid, foreign key → users.id)
- investor_type (text: individual/hni/experienced_professional)
- linkedin_url (text)
- kyc_status (text: pending/verified/rejected)
- kyc_document_url (text)
- rejection_reason (text)
- verified_by (uuid)
- verified_date (timestamp)
- rejected_by (uuid)
- rejection_date (timestamp)
- investment_preferences (jsonb)
- subscription_tier (text: free/pro)
- subscription_expires_at (timestamp)
- total_invested (numeric)
- profile_completion_percentage (integer)
- created_at, updated_at
```

**Investment Preferences JSONB Structure:**
```json
{
  "investor_type": "individual",
  "preferred_sectors": ["Technology", "Healthcare"],
  "preferred_stages": ["mvp", "early_revenue"],
  "min_investment": 100000,
  "max_investment": 500000,
  "risk_appetite": "moderate",
  "experience_level": "intermediate"
}
```

### 4. `admin_notes`
Internal admin notes on profiles

```sql
Columns:
- id (uuid, primary key)
- admin_id (uuid, who wrote the note)
- profile_type (text: 'founder' or 'investor')
- profile_id (uuid, ID of the profile)
- note (text, the actual note)
- created_at (timestamp)
- updated_at (timestamp)
```

### 5. `approval_history`
Automatic audit trail of all approvals/rejections

```sql
Columns:
- id (uuid, primary key)
- admin_id (uuid, who performed the action)
- profile_type (text: 'founder' or 'investor')
- profile_id (uuid)
- action (text: 'approved'/'rejected'/'pending')
- reason (text, rejection reason if applicable)
- previous_status (text)
- new_status (text)
- created_at (timestamp)
```

**Automatically populated by triggers when:**
- Admin approves/rejects a founder
- Admin verifies/rejects an investor

---

## Admin Approval System

### Founder Approval Workflow
1. Founder completes onboarding → `admin_approval_status = 'pending'`
2. Admin reviews in `/admin` dashboard
3. Admin approves/rejects:
   - **Approve**: Sets `admin_approval_status = 'approved'`, records `approved_by` and `approved_date`
   - **Reject**: Sets `admin_approval_status = 'rejected'`, stores `rejection_reason`, records `rejected_by` and `rejection_date`
4. Trigger automatically logs action in `approval_history` table

### Investor KYC Workflow
1. Investor completes onboarding → `kyc_status = 'pending'`
2. Admin reviews in `/admin` dashboard
3. Admin verifies/rejects:
   - **Verify**: Sets `kyc_status = 'verified'`, records `verified_by` and `verified_date`
   - **Reject**: Sets `kyc_status = 'rejected'`, stores `rejection_reason`, records `rejected_by` and `rejection_date`
4. Trigger automatically logs action in `approval_history` table

---

## RLS Policies

### Overview
RLS (Row Level Security) ensures users can only access data they're authorized to see.

### Founder Permissions
- ✅ View their own `founder_profiles`
- ✅ Edit their own `founder_profiles`
- ✅ View their own `startup_details`
- ✅ Edit their own `startup_details`
- ❌ Cannot change `admin_approval_status`

### Investor Permissions
- ✅ View their own `investor_profiles`
- ✅ Edit their own `investor_profiles`
- ✅ View approved `startup_details`
- ❌ Cannot view pending/rejected startups
- ❌ Cannot change `kyc_status`

### Admin Permissions
- ✅ View ALL `founder_profiles`
- ✅ View ALL `investor_profiles`
- ✅ View ALL `startup_details`
- ✅ Update `admin_approval_status` and `kyc_status`
- ✅ Add `admin_notes`
- ✅ View `approval_history`

### Key RLS Functions

```sql
-- Helper function to get user role (prevents circular dependencies)
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text FROM public.users WHERE id = auth.uid();
$$;
```

**Policy Examples:**

```sql
-- Founders can view their own profiles
CREATE POLICY "founder_profiles_select" ON public.founder_profiles
    FOR SELECT 
    TO authenticated
    USING (user_id = auth.uid() OR auth.user_role() = 'admin');

-- Admins can update any profile
CREATE POLICY "founder_profiles_update" ON public.founder_profiles
    FOR UPDATE 
    TO authenticated
    USING (user_id = auth.uid() OR auth.user_role() = 'admin');
```

---

## Verification Queries

### Quick Health Check
```sql
-- Run this to verify all tables and columns exist
SELECT 
    'Founder Profiles' as table_name,
    COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_name = 'founder_profiles'
UNION ALL
SELECT 
    'Investor Profiles' as table_name,
    COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_name = 'investor_profiles'
UNION ALL
SELECT 
    'Startup Details' as table_name,
    COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_name = 'startup_details'
UNION ALL
SELECT 
    'Admin Notes' as table_name,
    COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_name = 'admin_notes'
UNION ALL
SELECT 
    'Approval History' as table_name,
    COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_name = 'approval_history';
```

### Check Profile Counts
```sql
SELECT 
    'Total Founders' as category, COUNT(*) as count
FROM founder_profiles
UNION ALL
SELECT 'Pending Founders', COUNT(*) FROM founder_profiles WHERE admin_approval_status = 'pending'
UNION ALL
SELECT 'Approved Founders', COUNT(*) FROM founder_profiles WHERE admin_approval_status = 'approved'
UNION ALL
SELECT 'Rejected Founders', COUNT(*) FROM founder_profiles WHERE admin_approval_status = 'rejected'
UNION ALL
SELECT 'Total Investors', COUNT(*) FROM investor_profiles
UNION ALL
SELECT 'Pending KYC', COUNT(*) FROM investor_profiles WHERE kyc_status = 'pending'
UNION ALL
SELECT 'Verified Investors', COUNT(*) FROM investor_profiles WHERE kyc_status = 'verified'
UNION ALL
SELECT 'Rejected Investors', COUNT(*) FROM investor_profiles WHERE kyc_status = 'rejected';
```

### Check Admin Users
```sql
SELECT 
    email,
    full_name,
    role,
    created_at
FROM users 
WHERE role = 'admin'
ORDER BY created_at;
```

### Verify RLS is Enabled
```sql
SELECT 
    schemaname,
    tablename,
    rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'founder_profiles', 'investor_profiles', 'startup_details')
ORDER BY tablename;
```

### Check Approval Triggers
```sql
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table
FROM information_schema.triggers 
WHERE trigger_name LIKE '%approval_history%'
ORDER BY trigger_name;
```

---

## Common Issues

### Issue: "startup_details does not exist"
**Solution:** Run migration 005
```bash
supabase db push
# Or manually run: /supabase/migrations/005_startup_details.sql
```

### Issue: "column rejection_reason does not exist"
**Solution:** Run migration 006
```bash
supabase db push
# Or manually run: /supabase/migrations/006_admin_approval_system.sql
```

### Issue: "Cannot read properties of null (reading 'founder_names')"
**Solution:** Founder needs to complete onboarding (creates startup_details entry)

### Issue: "investment_preferences is empty"
**Solution:** Investor needs to complete onboarding (fills JSONB field)

### Issue: "500 error on /admin page"
**Solution:** RLS policy issues - run FIX_RLS_FINAL.sql from `/scripts/sql/`

### Issue: "No admin users found"
**Solution:** Create an admin user
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

---

## Required Migrations

### Migration Order
1. `001_initial_schema.sql` - Creates basic tables
2. `005_startup_details.sql` - Creates startup_details table
3. `006_admin_approval_system.sql` - Adds admin system
4. `009_fix_approval_history_constraint.sql` - Fixes constraints

### Running Migrations
```bash
# Via Supabase CLI (recommended)
supabase db push

# Or manually in Supabase SQL Editor
# Copy/paste migration files one by one
```

---

## Quick Reference Table

| Data Type | Table | Field/Location |
|-----------|-------|----------------|
| Startup Name | `founder_profiles` | `startup_name` |
| CIN | `founder_profiles` | `incorporation_number` |
| Stage | `founder_profiles` | `stage` |
| Approval Status | `founder_profiles` | `admin_approval_status` |
| Team Info | `startup_details` | `founder_names`, `team_size`, etc. |
| Problem/Solution | `startup_details` | `problem_statement`, `solution_description` |
| Traction | `startup_details` | `current_users`, `monthly_revenue` |
| Investment Range | `investor_profiles` | `investment_preferences.min_investment` |
| Sectors | `investor_profiles` | `investment_preferences.preferred_sectors` |
| KYC Status | `investor_profiles` | `kyc_status` |
| Admin Notes | `admin_notes` | `note` |
| Approval History | `approval_history` | Automatic logging |

---

## Useful SQL Scripts

See `/scripts/sql/` for:
- `VERIFY_DATABASE.sql` - Complete database verification
- `CHECK_TABLES.sql` - View table structures and data
- `DIAGNOSTIC_RLS.sql` - Diagnose RLS issues
- `FIX_RLS_FINAL.sql` - Fix RLS policies if needed

---

**Last Updated:** October 2025  
**Maintainer:** IncuBazar Dev Team


