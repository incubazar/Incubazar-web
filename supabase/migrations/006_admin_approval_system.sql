-- Admin Approval System Enhancements
-- Adds rejection tracking, admin notes, and approval history

-- Add rejection tracking to founder_profiles
ALTER TABLE founder_profiles 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS rejection_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS rejected_by UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS approved_date TIMESTAMP;

-- Add rejection tracking to investor_profiles
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_notes_profile ON admin_notes(profile_type, profile_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_admin ON admin_notes(admin_id);
CREATE INDEX IF NOT EXISTS idx_approval_history_profile ON approval_history(profile_type, profile_id);
CREATE INDEX IF NOT EXISTS idx_approval_history_admin ON approval_history(admin_id);
CREATE INDEX IF NOT EXISTS idx_approval_history_created ON approval_history(created_at DESC);

-- Create function to automatically track approval history
CREATE OR REPLACE FUNCTION track_founder_approval_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.admin_approval_status IS DISTINCT FROM NEW.admin_approval_status THEN
    INSERT INTO approval_history (
      admin_id,
      profile_type,
      profile_id,
      action,
      reason,
      previous_status,
      new_status
    ) VALUES (
      NEW.approved_by,
      'founder',
      NEW.id,
      NEW.admin_approval_status,
      NEW.rejection_reason,
      OLD.admin_approval_status,
      NEW.admin_approval_status
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION track_investor_approval_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.kyc_status IS DISTINCT FROM NEW.kyc_status THEN
    INSERT INTO approval_history (
      admin_id,
      profile_type,
      profile_id,
      action,
      reason,
      previous_status,
      new_status
    ) VALUES (
      NEW.verified_by,
      'investor',
      NEW.id,
      NEW.kyc_status,
      NEW.rejection_reason,
      OLD.kyc_status,
      NEW.kyc_status
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS founder_approval_history_trigger ON founder_profiles;
CREATE TRIGGER founder_approval_history_trigger
AFTER UPDATE ON founder_profiles
FOR EACH ROW
EXECUTE FUNCTION track_founder_approval_history();

DROP TRIGGER IF EXISTS investor_approval_history_trigger ON investor_profiles;
CREATE TRIGGER investor_approval_history_trigger
AFTER UPDATE ON investor_profiles
FOR EACH ROW
EXECUTE FUNCTION track_investor_approval_history();

-- RLS Policies for admin_notes
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all notes"
ON admin_notes FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can create notes"
ON admin_notes FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can update their own notes"
ON admin_notes FOR UPDATE
TO authenticated
USING (admin_id = auth.uid())
WITH CHECK (admin_id = auth.uid());

-- RLS Policies for approval_history
ALTER TABLE approval_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all approval history"
ON approval_history FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "System can create approval history"
ON approval_history FOR INSERT
TO authenticated
WITH CHECK (true); -- Allow trigger to insert

-- Update founder_profiles RLS to allow admins to update approval status
DROP POLICY IF EXISTS "Admins can update founder profiles" ON founder_profiles;
CREATE POLICY "Admins can update founder profiles"
ON founder_profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Update investor_profiles RLS to allow admins to update KYC status
DROP POLICY IF EXISTS "Admins can update investor profiles" ON investor_profiles;
CREATE POLICY "Admins can update investor profiles"
ON investor_profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Comment on tables
COMMENT ON TABLE admin_notes IS 'Internal admin notes on founder and investor profiles';
COMMENT ON TABLE approval_history IS 'Historical log of all approval/rejection actions';
COMMENT ON COLUMN founder_profiles.rejection_reason IS 'Reason for profile rejection (shown to founder)';
COMMENT ON COLUMN investor_profiles.rejection_reason IS 'Reason for profile rejection (shown to investor)';

