# ✅ Setup Checklist - Admin Approval System

## You said: "I run it, it got success"

Great! Migration 006 is done. Now let's make sure **everything else** is in place.

---

## 🎯 Step-by-Step Checklist

### Step 1: Verify Database Structure ✅

Run this in **Supabase SQL Editor**:

```sql
-- Quick check: Should return 5 tables
SELECT table_name FROM information_schema.tables 
WHERE table_name IN (
  'founder_profiles', 
  'investor_profiles', 
  'startup_details', 
  'admin_notes', 
  'approval_history'
);
```

**Expected Result:** All 5 tables listed

**If `startup_details` is MISSING:**
→ You need to run migration 005 first!
→ Go to Supabase SQL Editor
→ Copy/paste entire content of `/supabase/migrations/005_startup_details.sql`
→ Click "Run"

---

### Step 2: Create Admin User ⚠️

Run this in **Supabase SQL Editor** (replace with your email):

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Verify it worked:
SELECT email, role FROM users WHERE role = 'admin';
```

**Expected Result:** Your email shows up with role = 'admin'

---

### Step 3: Install Recharts 📊

In your terminal:

```bash
npm install recharts --legacy-peer-deps
```

**Expected Result:** "added X packages" message

---

### Step 4: Start Dev Server 🚀

```bash
npm run dev
```

**Expected Result:** Server starts on http://localhost:3000

---

### Step 5: Test Admin Dashboard 🎨

1. **Login** with your admin email
2. Go to: **http://localhost:3000/admin**
3. You should see:
   - ✅ Beautiful dashboard with charts
   - ✅ 4 stat cards (Users, Pending, Deals, Raised)
   - ✅ 2 action cards (Founder Approvals, Investor Verifications)
   - ✅ Line chart (Platform Growth)
   - ✅ Pie chart (Sector Distribution)
   - ✅ Bar chart (Stage Distribution)

**If you see error:** "Unauthorized: Admin access only"
→ Your user is not admin, go back to Step 2

---

### Step 6: Test Founder Flow 👨‍💼

1. **Sign up** as a new founder (different email)
2. **Complete** all 6 onboarding steps
3. After submitting, you should see:
   - ✅ **Pending approval screen** (yellow gradient, animated clock)
   - ✅ Timeline showing "Admin Review (Current)"
   - ✅ Expected time: 2-3 business days

**If you see error about startup_details:**
→ Migration 005 is missing, go back to Step 1

---

### Step 7: Test Approval System ✨

As **admin** (http://localhost:3000/admin):

1. Click **"Founder Approvals"** card (orange)
2. You should see:
   - ✅ The pending founder you just created
   - ✅ Their startup name and details
3. Click on the founder card
4. You should see:
   - ✅ Full profile details
   - ✅ Stage-based verification requirements
   - ✅ If "Early Revenue" without CIN → Warning shown
   - ✅ Approve/Reject buttons

5. Click **Approve**
   - ✅ Success toast
   - ✅ Founder disappears from pending list

6. As **founder**, refresh dashboard
   - ✅ Should now see full dashboard (not pending screen anymore!)

---

### Step 8: Test Investor Flow 💼

1. **Sign up** as a new investor
2. **Complete** all 5 onboarding steps (including preferences)
3. After submitting:
   - ✅ Should see **pending verification screen**

As **admin**:
1. Go to http://localhost:3000/admin/users
2. Should see pending investor
3. Click to review
4. See investment preferences
5. Click **Verify**

As **investor**, refresh:
   - ✅ Should now see deals page!

---

### Step 9: Test Rejection Flow ❌

As **admin**, reject a profile:

1. Select a pending founder/investor
2. Click **Reject**
3. Enter reason: "Please provide more details"
4. Confirm rejection

As **that user**, refresh:
   - ✅ Should see **rejection screen** (red gradient)
   - ✅ Shows the reason you entered
   - ✅ Shows "Update & Resubmit" button

---

## 🔍 Complete Verification

Run the comprehensive check in **Supabase SQL Editor**:

Open and run: `/VERIFY_DATABASE.sql`

Expected results:
- ✅ Founder Profiles Columns: PASS
- ✅ Investor Profiles Columns: PASS  
- ✅ Startup Details Table: EXISTS
- ✅ Admin Notes Table: EXISTS
- ✅ Approval History Table: EXISTS
- ✅ Approval Triggers: PASS - 2 triggers found
- ✅ Investment Preferences Field: PASS
- ✅ Admin Role Setup: PASS - 1+ admins found

---

## 📊 What Data Goes Where?

### Founder Onboarding (6 steps):
```
Step 1-2: Basic Info → founder_profiles
Step 3-6: Detailed Info → startup_details
```

### Investor Onboarding (5 steps):
```
All steps → investor_profiles.investment_preferences (JSONB)
```

### Admin Actions:
```
Approvals → Updates admin_approval_status / kyc_status
Notes → Saved in admin_notes table
History → Auto-logged in approval_history table
```

Full details: See `/DATABASE_STRUCTURE.md`

---

## ⚠️ Common Issues

### "Table startup_details does not exist"
**Fix:** Run migration 005
```bash
# In Supabase SQL Editor, run:
/supabase/migrations/005_startup_details.sql
```

### "Column rejection_reason does not exist"  
**Fix:** Run migration 006 (you said you did this ✅)

### "Unauthorized: Admin access only"
**Fix:** Make yourself admin
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### Charts not showing
**Fix:** Install Recharts
```bash
npm install recharts --legacy-peer-deps
```

### Founder stuck on pending screen
**Fix:** Admin needs to review and approve at `/admin/review`

---

## ✅ Success Indicators

You're ready when ALL these are true:

- [ ] Migration 005 run (startup_details exists)
- [ ] Migration 006 run (rejection_reason columns exist)
- [ ] At least 1 admin user created
- [ ] Recharts installed
- [ ] Can access /admin and see charts
- [ ] Can see pending founders at /admin/review
- [ ] Can see pending investors at /admin/users
- [ ] Founders see pending screen after onboarding
- [ ] Investors see pending screen after onboarding
- [ ] Approval/rejection flow works
- [ ] Rejected users see rejection screen with reason

---

## 🎉 You're Done!

Once all checkboxes are ✅, your admin approval system is **fully functional**!

**Next:** Deploy to production
1. Push to GitHub
2. Vercel auto-deploys
3. Run migrations on production Supabase
4. Create admin user on production
5. Test!

---

## 📞 Quick Help

**See full documentation:**
- `/ADMIN_SYSTEM_COMPLETE.md` - Complete guide
- `/DATABASE_STRUCTURE.md` - Database reference
- `/QUICK_START_ADMIN.md` - Quick start
- `/RUN_MIGRATION.md` - Migration help

**Questions?** Check these docs first! Everything is explained in detail.

---

**Good luck! You've got this!** 🚀

