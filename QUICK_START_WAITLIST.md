# Quick Start Guide - Waitlist System

## 🚀 Getting Started

Your new waitlist system is ready! Here's how to test it.

## Step 1: Apply Database Migration

First, run the new migration to create the waitlist tables:

```bash
# If using Supabase CLI
supabase db push

# OR manually run the migration in Supabase Dashboard
# Go to SQL Editor and run: supabase/migrations/20240123000000_waitlist_system.sql
```

## Step 2: Create Admin User (if not already exists)

You need an admin account to approve waitlist applications.

```sql
-- Run this in Supabase SQL Editor
-- Update the email to your actual admin email

UPDATE users 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

## Step 3: Test the Flow

### A. Join Waitlist

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit the waitlist page:**
   - Go to: `http://localhost:3000/waitlist`
   - Fill out the form as a Founder:
     - Email: `test.founder@example.com`
     - Name: `John Founder`
     - Startup Name: `TechStartup`
     - Business Idea: `Building AI-powered solutions...`
     - Fill other fields
   - Submit the form

3. **Check your console** - You should see:
   ```
   ====================================
   📧 ADMIN NOTIFICATION - New Waitlist Entry
   ====================================
   Name: John Founder
   Email: test.founder@example.com
   Type: founder
   Startup: TechStartup
   ====================================
   ```

### B. Approve Application (Admin)

1. **Login as admin** at `/auth/login`

2. **Go to admin waitlist:**
   - Visit: `/admin/waitlist`
   - You should see the pending application

3. **Click "Approve"**
   - Confirm the approval
   - Check your console for the OTP:
   ```
   ====================================
   📧 OTP EMAIL
   ====================================
   To: test.founder@example.com
   Name: John Founder
   OTP: 123456
   ====================================
   ```

4. **Copy the OTP** from console (e.g., `123456`)

### C. Complete Registration

1. **Go to registration page:**
   - Visit: `/auth/register`

2. **Step 1 - Enter Email:**
   - Enter: `test.founder@example.com`
   - Click "Continue"

3. **Step 2 - Enter OTP:**
   - Paste the OTP from console
   - Click "Verify OTP"

4. **Step 3 - Create Password:**
   - Your details are pre-filled!
   - Create a password
   - Click "Create Account"

5. **Success!** 🎉
   - You're redirected to the founder dashboard
   - Account is fully created

## Testing as Investor

Repeat the same process but:
- Select "Investor" in waitlist form
- Fill investor-specific fields (investment range, etc.)
- After approval and registration, you'll go to investor dashboard

## Common Issues & Solutions

### Issue: "Email not on waitlist"
**Solution:** Make sure you joined the waitlist first at `/waitlist`

### Issue: "Application still pending"
**Solution:** Admin needs to approve it at `/admin/waitlist`

### Issue: "Invalid or expired OTP"
**Solutions:**
1. Check console for the correct OTP
2. OTP expires in 30 minutes - click "Resend OTP"
3. Make sure you're using the right email

### Issue: Can't access admin panel
**Solution:** Make sure your user has `role = 'admin'` in database

### Issue: Not seeing OTP in console
**Solution:** 
1. Check terminal/console output
2. Email sending is in development mode (logs to console)
3. For production, you'll integrate real email service

## Database Queries for Testing

### Check waitlist entries
```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

### Check OTP status
```sql
SELECT 
  email, 
  full_name, 
  status, 
  otp_code, 
  otp_verified,
  otp_expires_at 
FROM waitlist 
WHERE status = 'approved';
```

### View all users
```sql
SELECT id, email, role, verification_status, email_verified_via_otp 
FROM users 
ORDER BY created_at DESC;
```

### Reset a waitlist entry for re-testing
```sql
UPDATE waitlist 
SET 
  status = 'pending',
  otp_code = NULL,
  otp_verified = false,
  approved_at = NULL
WHERE email = 'test.founder@example.com';
```

## Navigation Quick Links

| Page | URL | Access |
|------|-----|--------|
| Home | `/` | Public |
| Waitlist Form | `/waitlist` | Public |
| Login | `/auth/login` | Public |
| Registration | `/auth/register` | Public (with waitlist approval) |
| Admin Waitlist | `/admin/waitlist` | Admin only |
| Founder Dashboard | `/founder` | Founders only |
| Investor Dashboard | `/investor` | Investors only |

## What Happens After Registration?

Based on user role, they're redirected to:

**Founders:**
- Dashboard: `/founder`
- Can create deals
- Upload to data room
- View investor interests

**Investors:**
- Dashboard: `/investor`
- Browse deals
- Express interest
- Access data rooms (when granted)

## Production Deployment

Before deploying to production:

1. **Setup Email Service:**
   - Choose provider (SendGrid, AWS SES, Resend)
   - Add API keys to environment variables
   - Update `/lib/email/sendOTP.ts` with actual email sending code

2. **Run Migration:**
   - Run the migration in production database
   - Verify tables created successfully

3. **Test Full Flow:**
   - Test on staging environment
   - Verify emails are sent
   - Check all user roles work correctly

4. **Security:**
   - Add rate limiting for OTP requests
   - Consider adding CAPTCHA to waitlist form
   - Monitor for abuse

## Need Help?

Check these files:
- 📄 `WAITLIST_SYSTEM_IMPLEMENTATION.md` - Full technical documentation
- 🗄️ `supabase/migrations/20240123000000_waitlist_system.sql` - Database schema
- 📧 `lib/email/sendOTP.ts` - Email utilities
- 🎨 `app/waitlist/page.tsx` - Waitlist form
- ⚙️ `app/api/waitlist/route.ts` - Waitlist API
- 👤 `app/admin/waitlist/page.tsx` - Admin interface

---

**Happy Testing! 🎉**

