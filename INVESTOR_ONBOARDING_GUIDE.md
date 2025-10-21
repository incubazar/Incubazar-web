# Investor Onboarding Guide

## Overview
When an investor signs in for the first time, they **must** complete their investment preferences and profile to help us match them with relevant startup deals. This ensures a personalized deal flow based on their interests and criteria.

## Onboarding Flow

### 1. **Sign In / Sign Up**
- Investor creates an account and signs in as "Investor"
- System checks if they have completed their investment preferences

### 2. **Automatic Redirect**
- If no profile exists or preferences are incomplete → Redirect to `/investor/onboarding`
- If profile is complete → Access to investor dashboard and deal flow

### 3. **5-Step Onboarding Form**

#### Step 1: Personal Profile
- **Investor Type** * (Required)
  - Individual Investor
  - High Net Worth Individual (HNI)
  - Experienced Professional
- **LinkedIn Profile URL**
- **Current Occupation/Role**
- **Years of Professional Experience** (0-5, 5-10, 10-15, 15-20, 20+)
- **Professional Background** - Brief overview

#### Step 2: Investment Preferences
- **Preferred Sectors** * (Required - Multiple selection)
  - Technology, Healthcare, Fintech, Edtech, E-commerce
  - SaaS, AI/ML, Blockchain, CleanTech, AgriTech
  - Food & Beverage, Manufacturing, Real Estate, Travel
  - Entertainment, Sports, Fashion, Beauty, Other
  
- **Preferred Stages** (Multiple selection)
  - Idea Stage
  - MVP Stage
  - Early Revenue
  - Growth Stage
  - Series A+
  
- **Geographic Preference**
  - Local (same city/state)
  - National (anywhere in India)
  - No Preference
  
- **Investment Range**
  - Minimum Investment Amount
  - Maximum Investment Amount
  - Typical Check Size (₹1-5L, ₹5-10L, ₹10-25L, ₹25-50L, ₹50L+)

#### Step 3: Investment Criteria
- **Investment Philosophy** - Investment approach and decision-making process
- **Risk Appetite**
  - Conservative - Prefer proven business models
  - Moderate - Balance of risk and stability
  - Aggressive - High risk, high return
  
- **Expected Return**
  - 5-10x in 5-7 years
  - 10-20x in 5-7 years
  - 20x+ in 5-7 years
  
- **Investment Horizon**
  - 3-5 years
  - 5-7 years
  - 7-10 years
  - 10+ years
  
- **Value You Can Add** - Beyond capital (mentorship, network, expertise)

#### Step 4: Experience & Track Record
- **Number of Previous Investments**
  - First time investor
  - 1-3 investments
  - 4-10 investments
  - 10+ investments
  
- **Previous Investments** - Companies invested in, sectors, current status
- **Successful Exits** - Acquisitions, IPOs, etc.
- **Notable Portfolio Companies** - Companies you're proud of

#### Step 5: Investment Goals & Style
- **Level of Involvement**
  - Hands-off - Capital only
  - Advisory - Quarterly meetings
  - Active - Regular involvement
  - Board seat preferred
  
- **Decision-Making Timeline**
  - 1-2 weeks
  - 2-4 weeks
  - 1-2 months
  - Flexible
  
- **Co-Investment Interest**
  - Yes - Open to co-investing
  - Prefer co-investing
  - Prefer solo investing
  - Flexible
  
- **Investment Goals** - What you hope to achieve through angel investing

### 4. **Profile Submission**
- All preferences saved to `investor_profiles.investment_preferences` (JSONB field)
- Investor redirected to dashboard
- Deal flow automatically filtered based on preferences

### 5. **Personalized Deal Flow**
- Dashboard shows deals matching investor's preferred:
  - Sectors
  - Stages
  - Investment amounts
  - Geographic location

## Database Schema

### `investor_profiles` Table (Existing)
```sql
- id (UUID)
- user_id (UUID) - References users table
- investor_type (ENUM: individual/hni/experienced_professional)
- linkedin_url (TEXT)
- kyc_status (ENUM: pending/verified/rejected)
- kyc_document_url (TEXT)
- investment_preferences (JSONB) - NEW: Stores all preferences
- subscription_tier (ENUM: free/pro)
- subscription_expires_at (TIMESTAMP)
```

### `investment_preferences` JSONB Structure
```json
{
  "preferred_sectors": ["Technology", "Fintech", "AI/ML"],
  "preferred_stages": ["MVP Stage", "Early Revenue"],
  "geographic_preference": "national",
  "min_investment_amount": "₹2 Lakhs",
  "max_investment_amount": "₹25 Lakhs",
  "typical_check_size": "5-10L",
  "investment_philosophy": "Looking for strong teams...",
  "risk_appetite": "moderate",
  "expected_return": "10-20x",
  "investment_horizon": "5-7",
  "value_add": "Can help with GTM strategy...",
  "previous_investments": "Company A, Company B...",
  "number_of_investments": "4-10",
  "successful_exits": "Company X acquired by...",
  "portfolio_companies": "Company Y, Company Z...",
  "involvement_level": "advisory",
  "decision_timeline": "2-4weeks",
  "co_investment_interest": "yes",
  "investment_goals": "Portfolio diversification...",
  "professional_background": "20 years in tech...",
  "current_occupation": "CEO at TechCorp",
  "years_of_experience": "20+"
}
```

## Smart Matching System

### Deal Recommendations Based On:
1. **Sector Match** - Show deals in preferred sectors
2. **Stage Match** - Show deals at preferred stages
3. **Investment Range** - Show deals within investment capacity
4. **Geographic** - Prioritize deals based on location preference
5. **Risk Profile** - Match risk appetite with startup stage

### Scoring Algorithm (Future Enhancement)
```
Match Score = 
  (Sector Match × 30%) +
  (Stage Match × 25%) +
  (Investment Range Match × 20%) +
  (Geographic Match × 15%) +
  (Risk Profile Match × 10%)
```

## Key Features

### ✅ Personalized Experience
- Every investor gets customized deal recommendations
- Filter deals based on comprehensive preferences
- Save time by only seeing relevant opportunities

### ✅ Comprehensive Profiling
- Understand investor's background and experience
- Capture investment philosophy and criteria
- Know what value investors can add beyond capital

### ✅ Mandatory Completion
- Investors cannot access dashboard without completing preferences
- Ensures quality matches between investors and startups

### ✅ Easy Updates
- Investors can update preferences anytime
- Immediate effect on deal recommendations
- Track investment history and portfolio

## For Founders

### Benefits:
- **Qualified Leads**: Only see investors genuinely interested in your sector/stage
- **Better Context**: Know investor's background and what they can offer
- **Faster Decisions**: Understand investor's decision timeline
- **Value Add**: See what expertise/network investors bring

### Investor Profile Shows:
- Professional background and experience
- Investment preferences and criteria
- Previous investments and track record
- Expected involvement level
- Decision-making timeline
- Value they can add

## Usage

### For Investors:
1. Sign up/Login to Incubazar
2. Complete all 5 steps of the onboarding form
3. Submit preferences
4. Browse personalized deal flow
5. Express interest in relevant startups
6. Update preferences anytime from profile settings

### For Founders:
When an investor expresses interest, see:
- Their complete profile and background
- Investment preferences and criteria
- Previous investments and exits
- What value they can add
- Decision timeline and involvement level

## Files Created/Modified

### New Files:
- `/app/investor/onboarding/page.tsx` - Investor onboarding form
- `/components/ui/checkbox.tsx` - Checkbox UI component

### Modified Files:
- `/app/investor/page.tsx` - Added redirect logic
- `investor_profiles` table - Using JSONB for preferences

## Next Steps

1. **Smart Filtering**: Implement deal filtering based on preferences
2. **Match Scoring**: Add scoring algorithm for deal recommendations
3. **Email Notifications**: 
   - Welcome email with tips
   - Weekly digest of new matching deals
   - Notifications when founders respond
4. **Analytics**: Show investors their portfolio performance
5. **Advanced Filters**: Add more granular filtering options

## Preference Update Flow

### Updating Preferences:
1. Go to `/investor/profile` or `/investor/settings`
2. Edit any preferences
3. Save changes
4. Deal flow automatically updates

## Privacy & Security

### Data Protection:
- Investment preferences are private
- Only basic profile visible to founders
- Full details shown only when investor expresses interest
- RLS policies protect sensitive data

### Row Level Security:
- Investors can view and edit their own preferences
- Founders cannot see investor preferences until interest is expressed
- Admins can view all profiles for moderation

## Comparison: Founder vs Investor Onboarding

| Feature | Founder Onboarding | Investor Onboarding |
|---------|-------------------|---------------------|
| **Steps** | 6 steps | 5 steps |
| **Focus** | Startup details | Investment preferences |
| **Required Info** | Complete startup story | Investment criteria |
| **Approval** | Yes (Admin approval) | No (Immediate access) |
| **Purpose** | Showcase to investors | Personalize deal flow |
| **Output** | Public profile for investors | Private preferences for matching |

## Success Metrics

Track:
- Onboarding completion rate
- Time to complete onboarding
- Preference update frequency
- Match quality (interests expressed)
- Investor satisfaction with recommendations

---

This comprehensive investor onboarding ensures that investors see only the most relevant deals while helping founders connect with the right investors who can add value beyond capital! 💼🎯

