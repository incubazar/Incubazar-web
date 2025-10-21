# 🗄️ Database Structure for Admin System

## Overview: Where Does Each Data Go?

### 📊 Data Flow Summary

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

## 1️⃣ Founder Data Storage

### `founder_profiles` Table
**Stores:** Basic startup information
```sql
- id
- user_id
- startup_name
- incorporation_status (incorporated/not_incorporated)
- incorporation_number (CIN)
- industry_sector
- stage (idea/mvp/early_revenue)
- pitch_deck_url
- logo_url
- profile_completion_percentage
- admin_approval_status (pending/approved/rejected) ✨
- rejection_reason ✨ NEW
- approved_by ✨ NEW  
- approved_date ✨ NEW
- rejected_by ✨ NEW
- rejection_date ✨ NEW
```

### `startup_details` Table
**Stores:** Comprehensive startup information from 6-step onboarding

**Linked by:** `founder_profile_id` (one-to-one relationship)

```sql
BASIC INFORMATION:
- founded_date
- website

TEAM INFORMATION:
- founder_names
- team_size
- key_team_members
- advisor_names

PRODUCT/SOLUTION:
- problem_statement
- solution_description
- unique_value_proposition
- target_customer
- product_status

MARKET & COMPETITION:
- market_size
- target_market
- competitors
- competitive_advantage

TRACTION & METRICS:
- current_users
- monthly_revenue
- revenue_growth
- key_achievements

FUNDRAISING:
- fundraising_goal
- funds_use
- previous_funding
- equity_offered

VISION:
- one_year_goal
- three_year_vision
- exit_strategy
```

**Migration:** `005_startup_details.sql`

---

## 2️⃣ Investor Data Storage

### `investor_profiles` Table
**Stores:** All investor information including preferences

```sql
BASIC INFO:
- id
- user_id
- investor_type (individual/hni/experienced_professional)
- linkedin_url

KYC & VERIFICATION:
- kyc_status (pending/verified/rejected) ✨
- kyc_document_url
- rejection_reason ✨ NEW
- verified_by ✨ NEW
- verified_date ✨ NEW
- rejected_by ✨ NEW
- rejection_date ✨ NEW

PREFERENCES (JSONB field):
- investment_preferences {
    investor_type: string
    preferred_sectors: string[]
    preferred_stages: string[]
    min_investment: number
    max_investment: number
    risk_appetite: string
    experience_level: string
  }

SUBSCRIPTION:
- subscription_tier (free/pro)
- subscription_expires_at

TRACKING:
- total_invested ✨ NEW
- profile_completion_percentage ✨ NEW
```

**Note:** All 5 onboarding steps go into the `investment_preferences` JSONB field

---

## 3️⃣ Admin System Tables

### `admin_notes` Table (NEW)
**Stores:** Internal admin notes on profiles

```sql
- id
- admin_id (who wrote the note)
- profile_type ('founder' or 'investor')
- profile_id (ID of the profile)
- note (the actual note text)
- created_at
- updated_at
```

**Example Use:**
```
Admin adds note: "Called founder, requested incorporation docs"
```

### `approval_history` Table (NEW)
**Stores:** Automatic audit trail of all approvals/rejections

```sql
- id
- admin_id (who performed the action)
- profile_type ('founder' or 'investor')
- profile_id
- action ('approved' / 'rejected' / 'pending')
- reason (rejection reason if applicable)
- previous_status
- new_status
- created_at
```

**Automatically populated by triggers when:**
- Admin approves a founder
- Admin rejects a founder
- Admin verifies an investor
- Admin rejects an investor

---

## 4️⃣ Relationships

```
users (1) ──→ (1) founder_profiles ──→ (1) startup_details
                                    ↓
                              (many) startup_deals
                                    ↓
                              (many) investor_interests
                                    ↑
users (1) ──→ (1) investor_profiles ┘

admin_notes ──→ references any profile (founder or investor)
approval_history ──→ logs all profile status changes
```

---

## 5️⃣ What Data is Collected in Onboarding

### Founder Onboarding (6 Steps):

**Step 1: Basic Information**
→ Goes to: `founder_profiles`
- startup_name
- incorporation_status
- incorporation_number (if incorporated)
- industry_sector
- stage

**Step 2: Team**
→ Goes to: `startup_details`
- founder_names
- founded_date
- team_size
- key_team_members
- advisor_names

**Step 3: Product**
→ Goes to: `startup_details`
- problem_statement
- solution_description
- unique_value_proposition
- target_customer
- product_status

**Step 4: Market**
→ Goes to: `startup_details`
- market_size
- target_market
- competitors
- competitive_advantage

**Step 5: Traction**
→ Goes to: `startup_details`
- current_users
- monthly_revenue
- revenue_growth
- key_achievements

**Step 6: Fundraising**
→ Goes to: `startup_details`
- fundraising_goal
- funds_use
- previous_funding
- equity_offered
- one_year_goal
- three_year_vision
- exit_strategy

---

### Investor Onboarding (5 Steps):

**All steps** → Goes to: `investor_profiles.investment_preferences` (JSONB)

**Step 1: Investor Type**
- investor_type

**Step 2: Sectors of Interest**
- preferred_sectors (array)

**Step 3: Stage Preferences**
- preferred_stages (array)

**Step 4: Investment Range**
- min_investment
- max_investment

**Step 5: Risk & Experience**
- risk_appetite
- experience_level

---

## 6️⃣ Required Migrations

### ✅ Migration 001: Initial Schema
- Creates basic tables
- Sets up founder_profiles with admin_approval_status
- Sets up investor_profiles with kyc_status

### ✅ Migration 005: Startup Details
**File:** `005_startup_details.sql`
**Creates:** `startup_details` table with all comprehensive fields

**Run this if you see error:** "startup_details table does not exist"

### ✅ Migration 006: Admin System
**File:** `006_admin_approval_system.sql`
**Adds:**
- Rejection tracking columns
- Admin tracking columns  
- `admin_notes` table
- `approval_history` table
- Automatic triggers
- RLS policies

**Run this if you see error:** "column rejection_reason does not exist"

---

## 7️⃣ Verification Checklist

Run `/VERIFY_DATABASE.sql` in Supabase SQL Editor to check:

- [ ] `founder_profiles` has 13+ columns including rejection_reason
- [ ] `investor_profiles` has 11+ columns including total_invested
- [ ] `startup_details` table exists (45+ columns)
- [ ] `admin_notes` table exists
- [ ] `approval_history` table exists
- [ ] 2 approval triggers exist
- [ ] `investment_preferences` is JSONB type
- [ ] At least 1 admin user exists

---

## 8️⃣ Common Issues & Solutions

### Issue: "startup_details does not exist"
**Solution:** Run migration 005
```sql
-- Copy and paste entire content of:
/supabase/migrations/005_startup_details.sql
```

### Issue: "column rejection_reason does not exist"
**Solution:** Run migration 006
```sql
-- Copy and paste entire content of:
/supabase/migrations/006_admin_approval_system.sql
```

### Issue: "Cannot read properties of null (reading 'founder_names')"
**Solution:** Founder needs to complete onboarding (creates startup_details entry)

### Issue: "investment_preferences is empty"
**Solution:** Investor needs to complete onboarding (fills JSONB field)

---

## 9️⃣ Data Access Policies (RLS)

### Founders can:
- ✅ View their own `founder_profiles`
- ✅ Edit their own `founder_profiles`
- ✅ View their own `startup_details`
- ✅ Edit their own `startup_details`
- ❌ Cannot change `admin_approval_status`

### Investors can:
- ✅ View their own `investor_profiles`
- ✅ Edit their own `investor_profiles`
- ✅ View approved `startup_details`
- ❌ Cannot view pending/rejected startups
- ❌ Cannot change `kyc_status`

### Admins can:
- ✅ View ALL `founder_profiles`
- ✅ View ALL `investor_profiles`
- ✅ View ALL `startup_details`
- ✅ Update `admin_approval_status`
- ✅ Update `kyc_status`
- ✅ Add `admin_notes`
- ✅ View `approval_history`

---

## 🎯 Quick Reference

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

## ✅ You're All Set If:

- [x] Migration 005 ran (startup_details table exists)
- [x] Migration 006 ran (admin columns & tables exist)
- [x] Recharts installed (`npm install recharts --legacy-peer-deps`)
- [x] At least 1 admin user created
- [x] Dev server running (`npm run dev`)
- [x] Can access `/admin` dashboard

**Everything should work perfectly!** 🚀

