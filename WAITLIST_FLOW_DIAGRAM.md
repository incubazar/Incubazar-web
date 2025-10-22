# Waitlist System - User Flow Diagram

## 📊 Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE                                 │
│                      http://localhost:3000                           │
│                                                                      │
│  ┌──────────────────────────────────────────────────────┐          │
│  │  Premium Hero Section                                │          │
│  │                                                       │          │
│  │  [Join Waitlist] Button  →  /waitlist                │          │
│  │  [Sign In] Button        →  /auth/login              │          │
│  └──────────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    WAITLIST APPLICATION FORM                         │
│                        /waitlist                                     │
│                                                                      │
│  Step 1: Choose Role                                                │
│  ○ Founder    ○ Investor                                           │
│                                                                      │
│  Step 2: Basic Info                                                 │
│  • Full Name                                                        │
│  • Email                                                            │
│  • Phone                                                            │
│                                                                      │
│  Step 3: Role-Specific Info                                        │
│                                                                      │
│  ┌─────────────────────┐  ┌────────────────────────┐              │
│  │   IF FOUNDER        │  │   IF INVESTOR          │              │
│  │                     │  │                        │              │
│  │ • Startup Name      │  │ • Investor Type        │              │
│  │ • Business Idea     │  │ • Investment Range     │              │
│  │ • Stage             │  │ • Experience           │              │
│  │ • Industry          │  │ • Sectors Interest     │              │
│  │ • Funding Target    │  │ • LinkedIn URL         │              │
│  │ • Team Size         │  │                        │              │
│  │ • Website           │  │                        │              │
│  └─────────────────────┘  └────────────────────────┘              │
│                                                                      │
│  [Submit Application] ───→ Stored in Database                      │
│                                                                      │
│  ✉️  Admin gets notification (in dev: console log)                 │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         ADMIN REVIEW                                 │
│                      /admin/waitlist                                 │
│                                                                      │
│  ┌────────────────────────────────────────────────────┐            │
│  │  Pending Applications Tab                          │            │
│  │                                                     │            │
│  │  ┌──────────────────────────────────────────────┐ │            │
│  │  │ John Founder                         [FOUNDER]│ │            │
│  │  │ john@startup.com | TechStartup               │ │            │
│  │  │ "Building AI-powered solutions..."           │ │            │
│  │  │                                               │ │            │
│  │  │ [✓ Approve]  [✗ Reject]                      │ │            │
│  │  └──────────────────────────────────────────────┘ │            │
│  └────────────────────────────────────────────────────┘            │
│                                                                      │
│  Admin clicks [Approve]:                                           │
│  1. Status → 'approved'                                            │
│  2. Auto-generate 6-digit OTP (trigger in DB)                      │
│  3. Send email with OTP                                            │
│     (in dev: logs to console)                                       │
│                                                                      │
│  ✉️  User receives: "Your OTP is: 123456"                          │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    REGISTRATION PROCESS                              │
│                      /auth/register                                  │
│                                                                      │
│  ┌──────────────────────────────────────────────────┐              │
│  │  STEP 1: Email Verification                      │              │
│  │                                                   │              │
│  │  Email Address: [________________]                │              │
│  │                                                   │              │
│  │  [Continue] ──→ Checks waitlist DB                │              │
│  │                                                   │              │
│  │  ✓ Email exists in waitlist?                     │              │
│  │  ✓ Status = 'approved'?                          │              │
│  │  ✓ Not already verified?                         │              │
│  └──────────────────────────────────────────────────┘              │
│                          ↓                                           │
│  ┌──────────────────────────────────────────────────┐              │
│  │  STEP 2: OTP Verification                        │              │
│  │                                                   │              │
│  │  Enter OTP sent to john@startup.com              │              │
│  │                                                   │              │
│  │  OTP: [1][2][3][4][5][6]                         │              │
│  │                                                   │              │
│  │  [Verify OTP]  [Resend OTP]                      │              │
│  │                                                   │              │
│  │  ✓ OTP matches database?                         │              │
│  │  ✓ Not expired? (30 min limit)                   │              │
│  └──────────────────────────────────────────────────┘              │
│                          ↓                                           │
│  ┌──────────────────────────────────────────────────┐              │
│  │  STEP 3: Create Password                         │              │
│  │                                                   │              │
│  │  Your Details (Auto-filled from waitlist):       │              │
│  │  ┌────────────────────────────────────────────┐ │              │
│  │  │ Email: john@startup.com                    │ │              │
│  │  │ Name:  John Founder                        │ │              │
│  │  │ Role:  Founder                             │ │              │
│  │  │ Phone: +91 9876543210                      │ │              │
│  │  └────────────────────────────────────────────┘ │              │
│  │                                                   │              │
│  │  Password:        [________________]              │              │
│  │  Confirm Password:[________________]              │              │
│  │                                                   │              │
│  │  [Create Account]                                 │              │
│  │                                                   │              │
│  │  ✓ Creates auth.users account                    │              │
│  │  ✓ Creates users table record                    │              │
│  │  ✓ Links to waitlist entry                       │              │
│  └──────────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      SUCCESS & REDIRECT                              │
│                                                                      │
│  ┌──────────────────────────────────────────────────┐              │
│  │  ✓ Account Created Successfully!                 │              │
│  │                                                   │              │
│  │  Redirecting to your dashboard...                │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                      │
│  IF FOUNDER  →  /founder   (Founder Dashboard)                     │
│  IF INVESTOR →  /investor  (Investor Dashboard)                    │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔄 Alternative Flows

### Already Registered User
```
Landing Page → [Sign In] → /auth/login → Dashboard
```

### Waitlist Status Check
```
/waitlist → Submit Form → "Already on waitlist" message
→ Shows current status (pending/approved/rejected)
```

### Rejected Application
```
Admin Panel → [Reject] with reason
→ User sees: "Application rejected: [reason]"
→ Can reapply with improvements
```

### Resend OTP Flow
```
Registration Step 2 → [Resend OTP]
→ New OTP generated → Email sent → Use new OTP
```

## 🎯 Key Decision Points

| Point | Condition | Next Step |
|-------|-----------|-----------|
| Waitlist Form | Email already exists | Show "Already on waitlist" |
| Admin Panel | Approve clicked | Generate OTP → Send email |
| Admin Panel | Reject clicked | Save reason → Notify user |
| Registration Step 1 | Email not on waitlist | Show "Join waitlist first" |
| Registration Step 1 | Status = pending | Show "Wait for approval" |
| Registration Step 1 | Already verified | Show "Go to login" |
| Registration Step 2 | Wrong OTP | Show error → Allow retry |
| Registration Step 2 | Expired OTP | Show "Resend OTP" |
| Registration Step 3 | Valid password | Create account → Redirect |

## 📧 Email Triggers

| Event | Recipient | Content |
|-------|-----------|---------|
| Waitlist Join | Admin | New application notification |
| Approval | User | OTP email (6-digit code) |
| Rejection | User | Rejection notification with reason |
| Registration | User | Welcome email (optional) |

## 🗄️ Database Updates

### On Waitlist Join
```sql
INSERT INTO waitlist (email, full_name, user_type, ...)
VALUES ('john@startup.com', 'John Founder', 'founder', ...)
```

### On Admin Approval (Trigger Auto-runs)
```sql
UPDATE waitlist SET
  status = 'approved',
  otp_code = generate_otp(),  -- Auto: 123456
  otp_expires_at = NOW() + 30 minutes,
  approved_by = admin_user_id,
  approved_at = NOW()
WHERE id = waitlist_id
```

### On OTP Verification
```sql
UPDATE waitlist SET
  otp_verified = true,
  otp_verified_at = NOW()
WHERE email = 'john@startup.com' AND otp_code = '123456'
```

### On Registration Complete
```sql
-- Create auth user (Supabase)
INSERT INTO auth.users (email, password_hash, ...)

-- Create app user
INSERT INTO users (id, email, role, full_name, waitlist_id, ...)
VALUES (auth_user_id, 'john@startup.com', 'founder', 'John Founder', ...)
```

## ⏱️ Timeline Example

| Time | Action | Status |
|------|--------|--------|
| 10:00 AM | User joins waitlist | Pending |
| 10:05 AM | Admin reviews | Pending |
| 10:10 AM | Admin approves | Approved, OTP sent |
| 10:15 AM | User checks email | OTP received |
| 10:20 AM | User starts registration | Step 1: Email ✓ |
| 10:21 AM | User enters OTP | Step 2: OTP ✓ |
| 10:22 AM | User creates password | Step 3: Password ✓ |
| 10:23 AM | Registration complete | Active User |

## 🔐 Security Checks

```
Waitlist Form
├─ Email format validation
├─ Required fields check
└─ Duplicate email prevention

OTP Generation
├─ Random 6-digit code
├─ 30-minute expiry
├─ One-time use
└─ Secure storage (hashed in prod)

Registration
├─ Email exists in waitlist
├─ Status = approved
├─ Valid OTP
├─ OTP not expired
├─ OTP not already used
├─ Password strength
└─ Password match
```

---

This flow ensures a controlled, secure, and user-friendly onboarding process! 🎉

