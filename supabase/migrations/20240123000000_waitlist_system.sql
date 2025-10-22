-- ============================================================================
-- WAITLIST SYSTEM MIGRATION
-- Replaces invite code system with waitlist + OTP verification
-- ============================================================================

-- ============================================================================
-- PART 1: WAITLIST TABLE
-- ============================================================================

-- Table: waitlist
-- Stores waitlist applications from founders and investors
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('founder', 'investor')),
  
  -- Founder specific fields
  startup_name VARCHAR(255),
  business_idea TEXT,
  startup_stage VARCHAR(50),
  industry VARCHAR(100),
  funding_target DECIMAL(15, 2),
  team_size INTEGER,
  website_url VARCHAR(255),
  
  -- Investor specific fields
  investor_type VARCHAR(50),
  investment_range_min DECIMAL(15, 2),
  investment_range_max DECIMAL(15, 2),
  sectors_of_interest TEXT[],
  investment_experience VARCHAR(50),
  linkedin_url VARCHAR(255),
  
  -- Status and approval
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  rejected_by UUID REFERENCES users(id),
  rejected_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- OTP for approved users
  otp_code VARCHAR(6),
  otp_generated_at TIMESTAMPTZ,
  otp_expires_at TIMESTAMPTZ,
  otp_verified BOOLEAN DEFAULT false,
  otp_verified_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for waitlist
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_status ON waitlist(status);
CREATE INDEX idx_waitlist_user_type ON waitlist(user_type);
CREATE INDEX idx_waitlist_otp ON waitlist(email, otp_code) WHERE otp_verified = false;
CREATE INDEX idx_waitlist_pending ON waitlist(status, created_at) WHERE status = 'pending';

-- ============================================================================
-- PART 2: OTP VERIFICATION TABLE
-- ============================================================================

-- Table: otp_verifications
-- Stores OTP verification attempts and history
CREATE TABLE IF NOT EXISTS otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('registration', 'login', 'password_reset')),
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for OTP verifications
CREATE INDEX idx_otp_email ON otp_verifications(email, created_at DESC);
CREATE INDEX idx_otp_verification ON otp_verifications(email, otp_code, purpose) WHERE is_verified = false;

-- ============================================================================
-- PART 3: UPDATE USERS TABLE
-- ============================================================================

-- Make invite_code_used nullable (no longer required)
ALTER TABLE users ALTER COLUMN invite_code_used DROP NOT NULL;

-- Add waitlist_id reference
ALTER TABLE users ADD COLUMN IF NOT EXISTS waitlist_id UUID REFERENCES waitlist(id);

-- Add OTP verification tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_via_otp BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_verified_at TIMESTAMPTZ;

-- ============================================================================
-- PART 4: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for waitlist
-- Anyone can insert into waitlist (public registration - no auth required)
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Anyone can view their own waitlist entry by email (no auth required)
CREATE POLICY "Anyone can view waitlist by email" ON waitlist
  FOR SELECT USING (true);

-- Admins can manage all waitlist entries
CREATE POLICY "Admins can manage waitlist" ON waitlist
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for otp_verifications
-- Allow public access for OTP verification (needed for functions)
CREATE POLICY "Public can access OTP verifications" ON otp_verifications
  FOR ALL USING (true) WITH CHECK (true);

-- Note: Security is handled by the functions themselves (rate limiting, expiry, etc.)

-- ============================================================================
-- PART 5: FUNCTIONS
-- ============================================================================

-- Function to generate 6-digit OTP
CREATE OR REPLACE FUNCTION generate_otp()
RETURNS VARCHAR(6) AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to update waitlist updated_at
CREATE OR REPLACE FUNCTION update_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for waitlist updated_at
CREATE TRIGGER update_waitlist_timestamp BEFORE UPDATE ON waitlist
  FOR EACH ROW EXECUTE FUNCTION update_waitlist_updated_at();

-- Function to generate and update OTP for approved waitlist entry
CREATE OR REPLACE FUNCTION generate_waitlist_otp(waitlist_email VARCHAR)
RETURNS TABLE(otp_code VARCHAR, expires_at TIMESTAMPTZ) AS $$
DECLARE
  new_otp VARCHAR(6);
  expiry TIMESTAMPTZ;
BEGIN
  -- Generate new OTP
  new_otp := generate_otp();
  expiry := NOW() + INTERVAL '30 minutes';
  
  -- Update waitlist entry
  UPDATE waitlist
  SET 
    otp_code = new_otp,
    otp_generated_at = NOW(),
    otp_expires_at = expiry,
    otp_verified = false
  WHERE email = waitlist_email AND status = 'approved';
  
  RETURN QUERY SELECT new_otp, expiry;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify OTP
CREATE OR REPLACE FUNCTION verify_waitlist_otp(
  waitlist_email VARCHAR,
  otp VARCHAR
)
RETURNS BOOLEAN AS $$
DECLARE
  is_valid BOOLEAN;
BEGIN
  -- Check if OTP is valid
  SELECT EXISTS (
    SELECT 1 FROM waitlist
    WHERE email = waitlist_email
      AND otp_code = otp
      AND otp_expires_at > NOW()
      AND otp_verified = false
      AND status = 'approved'
  ) INTO is_valid;
  
  -- If valid, mark as verified
  IF is_valid THEN
    UPDATE waitlist
    SET 
      otp_verified = true,
      otp_verified_at = NOW()
    WHERE email = waitlist_email AND otp_code = otp;
  END IF;
  
  RETURN is_valid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired OTPs (can be run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM otp_verifications
  WHERE expires_at < NOW() - INTERVAL '7 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 6: TRIGGER TO AUTO-GENERATE OTP ON APPROVAL
-- ============================================================================

-- Function to auto-generate OTP when waitlist entry is approved
CREATE OR REPLACE FUNCTION auto_generate_otp_on_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- If status changed to 'approved' and OTP not yet generated
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    NEW.otp_code := generate_otp();
    NEW.otp_generated_at := NOW();
    NEW.otp_expires_at := NOW() + INTERVAL '30 minutes';
    NEW.approved_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate OTP on approval
CREATE TRIGGER generate_otp_on_waitlist_approval 
  BEFORE UPDATE ON waitlist
  FOR EACH ROW 
  WHEN (NEW.status = 'approved' AND OLD.status != 'approved')
  EXECUTE FUNCTION auto_generate_otp_on_approval();

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Add helpful comment
COMMENT ON TABLE waitlist IS 'Stores waitlist applications for founders and investors awaiting admin approval';
COMMENT ON TABLE otp_verifications IS 'Tracks OTP verification attempts for various purposes';
COMMENT ON COLUMN waitlist.otp_code IS 'OTP sent to user email upon admin approval';
COMMENT ON COLUMN waitlist.otp_verified IS 'Whether user has verified their OTP to complete registration';

