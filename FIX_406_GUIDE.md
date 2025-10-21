# Fixing 406 Not Acceptable Errors

## The Problem
You're seeing `406 (Not Acceptable)` errors when trying to access `investor_profiles`. This is a **Row Level Security (RLS)** issue in Supabase.

## Why This Happens
- Supabase RLS is enabled on your tables (which is good for security!)
- But the policies are either missing or too restrictive
- When a policy blocks a request, Supabase returns a 406 error

## Quick Fix - Run SQL in Supabase

1. **Go to your Supabase Dashboard** at https://supabase.com/dashboard
2. **Navigate to**: Your Project → SQL Editor
3. **Copy and paste** the contents of `FIX_RLS_406_ERRORS.sql` 
4. **Click "Run"**

This will:
- Reset all RLS policies for investor_profiles and founder_profiles
- Create proper policies that allow users to access their own data
- Keep admins' ability to see everything

## What the Fix Does

### Before:
```sql
-- Old policy (might be missing or wrong)
CREATE POLICY "Investors can view own profile" 
ON public.investor_profiles
FOR SELECT USING (auth.uid() = user_id);
```

### After:
```sql
-- New explicit policies for all operations
CREATE POLICY "investor_profiles_select_own" 
ON public.investor_profiles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "investor_profiles_insert_own" 
ON public.investor_profiles
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "investor_profiles_update_own" 
ON public.investor_profiles
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

## Alternative: Disable RLS (NOT RECOMMENDED)

If you're in development and want to quickly test without RLS:

```sql
-- ⚠️ WARNING: Only for development!
ALTER TABLE public.investor_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles DISABLE ROW LEVEL SECURITY;
```

**Never do this in production!** Your data would be accessible to anyone.

## Verify the Fix

After running the SQL:

1. **Refresh your browser** (hard refresh: Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Check the console** - 406 errors should be gone
3. **Test the page** - Data should load properly

## Code Changes Made

I also updated these files to handle RLS errors gracefully:

1. **app/investor/page.tsx** - Better error handling
2. **app/investor/layout.tsx** - Proper auth state management
3. **lib/logger.ts** - Suppress expected errors (PGRST116 = "not found")

These changes mean even if RLS blocks something, the app won't show scary errors to users.

## Still Getting Errors?

If you still see 406 errors after running the SQL:

### Check 1: Are you logged in?
```sql
-- Run this in Supabase SQL Editor
SELECT auth.uid();
```
If this returns NULL, you're not logged in.

### Check 2: Does your profile exist?
```sql
-- Run this in Supabase SQL Editor (replace the ID)
SELECT * FROM investor_profiles 
WHERE user_id = 'YOUR-USER-ID-HERE';
```

### Check 3: Check Supabase Logs
Go to: Your Project → Logs → Search for "RLS"

This will show you exactly why RLS is blocking requests.

## Understanding RLS Errors

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 406 Not Acceptable | RLS policy blocks request | Run the SQL fix |
| PGRST116 | Row not found | Normal for new users |
| PGRST301 | Ambiguous reference | Check your query |

## Next Steps

1. ✅ Run `FIX_RLS_406_ERRORS.sql` in Supabase
2. ✅ Refresh browser
3. ✅ Check console is clean
4. ✅ Test investor and founder dashboards

The app should work smoothly after this!
