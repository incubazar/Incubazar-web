# 🔐 Login Debug Guide

## Problem: 400 Bad Request on Login

```
POST https://svcqghrofsxpthmetwmp.supabase.co/auth/v1/token?grant_type=password
Status: 400 (Bad Request)
```

---

## Common Causes & Solutions

### 1. ✅ **User Doesn't Exist**

**Symptom:** First time trying to login, no account created yet

**Solution:** Create an account first
```bash
# Go to: http://localhost:3000/auth/register
# Select role (Founder or Investor)
# Complete registration
```

---

### 2. ✅ **Wrong Email or Password**

**Symptom:** Typo in email or password

**Solution:** 
- Check email is correct (no spaces, correct domain)
- Check password (case-sensitive)
- Try resetting password if needed

---

### 3. ✅ **Email Not Verified**

**Symptom:** User registered but email not confirmed

**Solution:** Check Supabase settings
```bash
# In Supabase Dashboard:
# Authentication → Settings → Email Auth
# Make sure "Confirm Email" is disabled for development
# OR check your email inbox for verification link
```

---

### 4. ✅ **Supabase Configuration Issue**

**Symptom:** Environment variables not set correctly

**Solution:** Verify `.env.local`
```bash
# Check these variables exist:
NEXT_PUBLIC_SUPABASE_URL=https://svcqghrofsxpthmetwmp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

---

### 5. ✅ **User in Supabase Auth but NOT in `users` Table**

**Symptom:** Can't login even with correct credentials

**Solution:** Check if user exists in database

**Run this in Supabase SQL Editor:**
```sql
-- Check if user exists in Supabase Auth
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- Check if user exists in your users table
SELECT id, email, role, verification_status, created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 5;
```

**If user is in `auth.users` but NOT in `public.users`, run:**
```sql
-- Create missing user record (replace with actual values)
INSERT INTO public.users (id, email, role, full_name, phone, verification_status)
VALUES (
  'USER_ID_FROM_AUTH_USERS',  -- Copy from auth.users
  'user@example.com',
  'founder',  -- or 'investor' or 'admin'
  'Full Name',
  '+91XXXXXXXXXX',
  'pending'
);
```

---

## 🧪 Test Login Flow

### Step 1: Create a Test Account

```bash
# Go to: http://localhost:3000/auth/register

# Fill in:
Email: test@incubazar.com
Password: Test@123456
Role: Founder
Full Name: Test User
Phone: +919876543210
```

### Step 2: Check Supabase

**In Supabase Dashboard:**

1. **Authentication → Users**
   - User should appear here
   - Check `email_confirmed_at` column

2. **Table Editor → users**
   - User should appear here too
   - Check `role` and `verification_status`

### Step 3: Try Login

```bash
# Go to: http://localhost:3000/auth/login

# Use same credentials:
Email: test@incubazar.com
Password: Test@123456
```

---

## 🔍 Enable Debug Mode

Add this to your login page temporarily to see exact error:

```tsx
// In app/auth/login/page.tsx, update the catch block:

if (error) {
  console.log('Full Supabase Error:', error)  // Debug line
  console.log('Error message:', error.message)  // Debug line
  console.log('Error status:', error.status)  // Debug line
  setError(error.message)
  return
}
```

Then check browser console for detailed error.

---

## 💡 Quick Fixes

### Disable Email Confirmation (Development Only)

**Supabase Dashboard:**
1. Go to: Authentication → Email Templates
2. Click "Settings" tab
3. **Disable "Email Confirmations"** toggle
4. Save changes

Now users can login immediately without email verification.

### Create Admin User Directly

**Run in Supabase SQL Editor:**
```sql
-- First register normally, then run this to make admin:
UPDATE public.users 
SET 
  role = 'admin',
  verification_status = 'verified'
WHERE email = 'your-email@example.com';
```

---

## 🎯 Most Likely Issue

Based on the error pattern (multiple 400 requests), this is probably:

**✅ Email not verified** OR **✅ Wrong password**

### Immediate Solution:

1. Go to Supabase Dashboard
2. Authentication → Users
3. Find your user
4. Click "..." menu → "Send Magic Link"
5. OR manually verify email by clicking user → Edit → Set `email_confirmed_at` to current timestamp

---

## 🔄 Reset & Start Fresh

If nothing works, create a completely new test account:

```bash
# 1. Register with new email
http://localhost:3000/auth/register
Email: newtestuser@gmail.com
Password: NewTest@123

# 2. In Supabase Dashboard → Authentication → Users
# Find the new user and manually confirm email

# 3. Try login with new credentials
```

---

## 📞 Still Not Working?

**Provide these details:**

1. Error message from browser console
2. Screenshot of Supabase → Authentication → Users
3. Screenshot of Table Editor → users table
4. Are you using email/password or magic link?
5. Is email confirmation enabled in Supabase?

---

**Last Updated:** October 21, 2025

