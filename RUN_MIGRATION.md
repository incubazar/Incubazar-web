# 🚀 How to Run Database Migration

## What This Migration Adds:

✅ **New columns to track rejections:**
- `rejection_reason` - why profile was rejected
- `rejection_date` - when rejected
- `rejected_by` / `approved_by` / `verified_by` - which admin

✅ **New columns for investors:**
- `total_invested` - track investment amount
- `profile_completion_percentage` - track profile progress

✅ **New tables:**
- `admin_notes` - internal admin notes
- `approval_history` - audit trail (every action logged)

✅ **Automatic triggers:**
- Auto-logs every approval/rejection
- Creates audit trail

✅ **Security policies:**
- Only admins can update profiles
- Only admins can view history

---

## 📋 Step-by-Step Instructions

### Method 1: Via Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Go to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy the Migration**
   - Open the file: `/supabase/migrations/006_admin_approval_system.sql`
   - Copy ALL content (Ctrl+A, Ctrl+C)

4. **Paste and Run**
   - Paste into SQL Editor
   - Click "Run" button (or Ctrl+Enter)

5. **Verify Success**
   - You should see: "Success. No rows returned"
   - Check "Table Editor" to see new columns

---

### Method 2: Via Supabase CLI

```bash
# If you have Supabase CLI installed:
supabase db push

# Or run specific migration:
supabase migration up
```

---

### Method 3: Copy-Paste Direct SQL

Here's the complete SQL to run:

```sql
-- Admin Approval System Migration

-- Add columns to founder_profiles
ALTER TABLE founder_profiles 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS rejection_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS rejected_by UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS approved_date TIMESTAMP;

-- Add columns to investor_profiles
ALTER TABLE investor_profiles 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS rejection_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS rejected_by UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS verified_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS total_invested NUMERIC DEFAULT 0 CHECK (total_invested >= 0),
ADD COLUMN IF NOT EXISTS profile_completion_percentage INTEGER DEFAULT 0 CHECK (profile_completion_percentage >= 0 AND profile_completion_percentage <= 100);

-- Create admin_notes table
CREATE TABLE IF NOT EXISTS admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('founder', 'investor')),
  profile_id UUID NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create approval_history table
CREATE TABLE IF NOT EXISTS approval_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('founder', 'investor')),
  profile_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('approved', 'rejected', 'pending')),
  reason TEXT,
  previous_status TEXT,
  new_status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_notes_profile ON admin_notes(profile_type, profile_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_admin ON admin_notes(admin_id);
CREATE INDEX IF NOT EXISTS idx_approval_history_profile ON approval_history(profile_type, profile_id);
CREATE INDEX IF NOT EXISTS idx_approval_history_admin ON approval_history(admin_id);
CREATE INDEX IF NOT EXISTS idx_approval_history_created ON approval_history(created_at DESC);

-- Create trigger function for founder approval history
CREATE OR REPLACE FUNCTION track_founder_approval_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.admin_approval_status IS DISTINCT FROM NEW.admin_approval_status THEN
    INSERT INTO approval_history (
      admin_id, profile_type, profile_id, action, reason, previous_status, new_status
    ) VALUES (
      NEW.approved_by, 'founder', NEW.id, NEW.admin_approval_status, 
      NEW.rejection_reason, OLD.admin_approval_status, NEW.admin_approval_status
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger function for investor approval history
CREATE OR REPLACE FUNCTION track_investor_approval_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.kyc_status IS DISTINCT FROM NEW.kyc_status THEN
    INSERT INTO approval_history (
      admin_id, profile_type, profile_id, action, reason, previous_status, new_status
    ) VALUES (
      NEW.verified_by, 'investor', NEW.id, NEW.kyc_status, 
      NEW.rejection_reason, OLD.kyc_status, NEW.kyc_status
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS founder_approval_history_trigger ON founder_profiles;
CREATE TRIGGER founder_approval_history_trigger
AFTER UPDATE ON founder_profiles FOR EACH ROW
EXECUTE FUNCTION track_founder_approval_history();

DROP TRIGGER IF EXISTS investor_approval_history_trigger ON investor_profiles;
CREATE TRIGGER investor_approval_history_trigger
AFTER UPDATE ON investor_profiles FOR EACH ROW
EXECUTE FUNCTION track_investor_approval_history();

-- Enable RLS on new tables
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin_notes
CREATE POLICY "Admins can view all notes" ON admin_notes FOR SELECT
TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

CREATE POLICY "Admins can create notes" ON admin_notes FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

CREATE POLICY "Admins can update their own notes" ON admin_notes FOR UPDATE
TO authenticated USING (admin_id = auth.uid()) WITH CHECK (admin_id = auth.uid());

-- RLS policies for approval_history
CREATE POLICY "Admins can view all approval history" ON approval_history FOR SELECT
TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

CREATE POLICY "System can create approval history" ON approval_history FOR INSERT
TO authenticated WITH CHECK (true);

-- Update RLS for founder_profiles
DROP POLICY IF EXISTS "Admins can update founder profiles" ON founder_profiles;
CREATE POLICY "Admins can update founder profiles" ON founder_profiles FOR UPDATE
TO authenticated 
USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

-- Update RLS for investor_profiles
DROP POLICY IF EXISTS "Admins can update investor profiles" ON investor_profiles;
CREATE POLICY "Admins can update investor profiles" ON investor_profiles FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));
```

---

## ✅ Verify Migration Success

After running, check these:

### 1. Check New Columns
```sql
-- Check founder_profiles columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'founder_profiles' 
AND column_name IN ('rejection_reason', 'approved_by', 'approved_date');

-- Check investor_profiles columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'investor_profiles' 
AND column_name IN ('rejection_reason', 'verified_by', 'total_invested', 'profile_completion_percentage');
```

### 2. Check New Tables
```sql
-- Should return 2 tables
SELECT table_name FROM information_schema.tables 
WHERE table_name IN ('admin_notes', 'approval_history');
```

### 3. Check Triggers
```sql
-- Should return 2 triggers
SELECT trigger_name FROM information_schema.triggers 
WHERE trigger_name LIKE '%approval_history_trigger';
```

---

## 🔐 Create Your First Admin

After migration, make yourself admin:

```sql
-- Replace with your email
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

---

## 🎯 What Happens After Migration

**For Founders:**
- When they complete onboarding → `admin_approval_status` = 'pending'
- They see pending screen until admin approves
- If rejected → `rejection_reason` is shown to them

**For Investors:**
- When they complete onboarding → `kyc_status` = 'pending'
- They see pending screen until admin verifies
- If rejected → `rejection_reason` is shown to them

**For Admins:**
- Can view all pending profiles at `/admin/review` and `/admin/users`
- Can approve or reject with reason
- Every action is logged in `approval_history` table
- Can add internal notes in `admin_notes` table

---

## ⚠️ Troubleshooting

**Error: "relation already exists"**
→ It's okay! The migration uses `IF NOT EXISTS`, so it's safe to run multiple times

**Error: "permission denied"**
→ Make sure you're logged in to Supabase and have admin access

**Error: "syntax error"**
→ Make sure you copied the entire SQL (all lines)

**Columns not showing?**
→ Refresh the Table Editor page in Supabase

---

## 📞 Next Steps

After running migration:

1. ✅ Run the migration SQL
2. ✅ Create admin user (UPDATE users SET role = 'admin'...)
3. ✅ Install Recharts: `npm install recharts --legacy-peer-deps`
4. ✅ Start dev server: `npm run dev`
5. ✅ Test at `http://localhost:3000/admin`

---

## 🎉 Done!

Once the migration runs successfully, your admin approval system is fully functional!

Check the admin dashboard at `/admin` to see:
- Beautiful charts
- Pending approvals count
- All metrics

**Everything is ready!** 🚀

