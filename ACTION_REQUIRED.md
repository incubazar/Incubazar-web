# 🎯 Action Required: Fix Database RLS Policies

## ⚠️ IMPORTANT: You still have 406 errors!

The **code** is fixed, but you need to fix the **database** RLS policies in Supabase.

## 📋 Quick Fix (5 minutes)

### Step 1: Open Supabase Dashboard
Go to: https://supabase.com/dashboard

### Step 2: Navigate to SQL Editor
Click: **Your Project** → **SQL Editor** (left sidebar)

### Step 3: Copy the SQL
Open the file `FIX_RLS_406_ERRORS.sql` in this project and copy all the content.

### Step 4: Paste and Run
1. Paste the SQL into the Supabase SQL Editor
2. Click **"Run"** button (or press Cmd+Enter)
3. Wait for "Success" message

### Step 5: Refresh Browser
Hard refresh your browser:
- **Mac**: Cmd + Shift + R
- **Windows**: Ctrl + Shift + R

## ✅ What Will Happen

After running the SQL:
- ✅ 406 errors will disappear
- ✅ Users can access their own profiles
- ✅ Investor dashboard will load properly
- ✅ Founder dashboard will load properly
- ✅ App will work normally

## 🔍 Why This Happened

**Row Level Security (RLS)** in Supabase is protecting your data (which is good!), but the policies were either:
1. Missing
2. Too restrictive
3. Not properly configured

The SQL file fixes all these issues.

## 📚 Documentation

For more details, see:
- **FIX_406_GUIDE.md** - Detailed explanation
- **CONSOLE_ERRORS_FIXED.md** - All changes made
- **FIX_RLS_406_ERRORS.sql** - The SQL to run

## 🆘 Still Having Issues?

If you still see 406 errors after running the SQL:

1. **Check you're logged in**: Refresh the page and log in again
2. **Check Supabase logs**: Project → Logs → Search for "RLS"
3. **Verify SQL ran successfully**: Check for any error messages in Supabase

## 💡 Quick Test

After fixing, test these pages:
- `/investor` - Should load without errors
- `/founder` - Should load without errors
- Console should be clean (F12 → Console tab)

---

**TL;DR**: Run `FIX_RLS_406_ERRORS.sql` in Supabase SQL Editor, then refresh browser. That's it! 🚀
