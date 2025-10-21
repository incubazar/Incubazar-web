# Founder Onboarding Guide

## Overview
After a founder signs in for the first time, they **must** complete a comprehensive startup profile before accessing the dashboard. This ensures investors have all the information they need to make informed investment decisions.

## Onboarding Flow

### 1. **Sign In / Sign Up**
- Founder creates an account and signs in
- System checks if they have completed their profile

### 2. **Automatic Redirect**
- If no profile exists or profile is incomplete → Redirect to `/founder/onboarding`
- If profile is complete → Access to founder dashboard

### 3. **6-Step Onboarding Form**

#### Step 1: Basic Information
- **Startup Name** * (Required)
- **Industry Sector** * (Required)
- **Founded Date**
- **Website URL**
- **Current Stage** * (Idea / MVP / Early Revenue)
- **Incorporation Status** * (Incorporated / Not Incorporated)
- **Incorporation Number** (CIN - if incorporated)

#### Step 2: Team Information
- **Founder Names** * (Required)
- **Team Size** (Select from dropdown)
- **Key Team Members & Roles** (Background and expertise)
- **Advisors** (Optional)

#### Step 3: Product & Solution
- **Problem Statement** * (Required) - What problem are you solving?
- **Solution Description** * (Required) - How does your product solve it?
- **Unique Value Proposition** * (Required) - What makes you unique?
- **Target Customer** - Who are your customers?
- **Product Status** - Current state of your product

#### Step 4: Market & Competition
- **Target Market** - Market description
- **Market Size** - TAM/SAM/SOM breakdown
- **Main Competitors** - Who are you competing with?
- **Competitive Advantage** - Your edge over competitors

#### Step 5: Traction & Metrics
- **Current Users/Customers** - User count
- **Monthly Revenue** - Current revenue (if any)
- **Revenue Growth Rate** - Growth metrics
- **Key Achievements** - Milestones, awards, partnerships, press coverage

#### Step 6: Fundraising Details
- **Fundraising Goal** * (Required) - Target amount
- **Equity Offered** - Percentage of equity
- **Use of Funds** - Breakdown of how funds will be used
- **Previous Funding** - Prior rounds (if any)
- **1-Year Goal** - Short-term vision
- **3-Year Vision** - Long-term goals
- **Exit Strategy** - Acquisition, IPO, etc.

### 4. **Profile Submission**
- All data is saved to:
  - `founder_profiles` table (basic info)
  - `startup_details` table (comprehensive details)
- Profile status set to **"Pending Approval"**
- Founder is redirected to dashboard

### 5. **Admin Approval**
- Admin reviews the submitted profile
- Admin can approve or reject
- Once approved, founder can create deals and connect with investors

## Database Schema

### `founder_profiles` Table
```sql
- id (UUID)
- user_id (UUID) - References users table
- startup_name (TEXT)
- incorporation_status (ENUM)
- incorporation_number (TEXT)
- industry_sector (TEXT)
- stage (ENUM)
- profile_completion_percentage (INTEGER)
- admin_approval_status (ENUM: pending/approved/rejected)
```

### `startup_details` Table
```sql
- id (UUID)
- founder_profile_id (UUID) - References founder_profiles
- founded_date, website, founder_names, team_size
- key_team_members, advisor_names
- problem_statement, solution_description, unique_value_proposition
- target_customer, product_status
- market_size, target_market, competitors, competitive_advantage
- current_users, monthly_revenue, revenue_growth, key_achievements
- fundraising_goal, funds_use, previous_funding, equity_offered
- one_year_goal, three_year_vision, exit_strategy
```

## Investor View

### `/investor/deals/[id]` - Startup Detail Page
Investors can view comprehensive startup information including:

1. **Header Section**
   - Startup name, industry, stage
   - Website link
   - Express Interest button

2. **Quick Stats Cards**
   - Founded date
   - Team size
   - Current users
   - Monthly revenue

3. **Detailed Sections**
   - **Team**: Founders, team members, advisors
   - **Product & Solution**: Problem, solution, UVP, target customer
   - **Market & Competition**: Market size, competitors, advantage
   - **Traction**: Users, revenue, growth, achievements
   - **Fundraising**: Goal, equity, use of funds, previous funding
   - **Vision**: 1-year goal, 3-year vision, exit strategy

4. **Call to Action**
   - Express Interest button to connect with founders

## Security & Permissions

### Row Level Security (RLS) Policies

#### Founders can:
- View and edit their own startup details
- Insert their own profile data

#### Investors can:
- View startup details ONLY for approved startups
- Cannot edit any startup information

#### Admins can:
- View all startup details
- Approve/reject profiles

## Key Features

### ✅ Comprehensive Data Collection
- Collects ALL information investors need to make decisions
- Multi-step form for better UX
- Progress bar shows completion status

### ✅ Mandatory Completion
- Founders cannot access dashboard without completing profile
- Automatic redirect to onboarding if incomplete

### ✅ Admin Approval Workflow
- All profiles require admin approval before being visible to investors
- Quality control on startup submissions

### ✅ Rich Investor Experience
- Investors see detailed, structured startup information
- Easy-to-read cards and sections
- Professional presentation

## Usage

### For Founders:
1. Sign up/Login to Incubazar
2. Complete all 6 steps of the onboarding form
3. Submit profile for review
4. Wait for admin approval
5. Once approved, create deals and connect with investors

### For Investors:
1. Browse available deals
2. Click on a startup to view full details
3. Express interest if interested
4. Founders will be notified of your interest

### For Admins:
1. Review submitted founder profiles
2. Approve or reject based on quality/completeness
3. Monitor startup submissions

## Files Modified/Created

### New Files:
- `/app/founder/onboarding/page.tsx` - Onboarding form
- `/app/investor/deals/[id]/page.tsx` - Startup detail view for investors
- `/supabase/migrations/005_startup_details.sql` - Database migration
- `/components/ui/separator.tsx` - UI component

### Modified Files:
- `/app/founder/page.tsx` - Added redirect logic
- Database schema with new `startup_details` table

## Next Steps

1. **Run Migration**: Apply the database migration to create `startup_details` table
2. **Test Flow**: Test the complete onboarding flow
3. **Admin Panel**: Create admin interface for approving/rejecting profiles
4. **Email Notifications**: Send emails when:
   - Profile is submitted (to admin)
   - Profile is approved/rejected (to founder)
   - Investor expresses interest (to founder)

## Notes

- **Required fields are marked with * **
- All text fields support multi-line input
- Founders can edit their profile later from `/founder/profile`
- System automatically calculates profile completion percentage
- Profile must be 100% complete to proceed

---

This comprehensive onboarding system ensures that investors have all the information they need to make informed investment decisions while providing a smooth, guided experience for founders to showcase their startups! 🚀

