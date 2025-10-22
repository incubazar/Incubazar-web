-- MVP Features Migration
-- This migration adds all necessary tables and schema modifications for the complete MVP

-- ============================================================================
-- PART 1: INVITE CODES SYSTEM
-- ============================================================================

-- Table: invite_codes
-- Stores invite codes for cohort-based onboarding
CREATE TABLE IF NOT EXISTS invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  code_type VARCHAR(20) NOT NULL CHECK (code_type IN ('founder', 'investor', 'both')),
  usage_limit INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for faster lookups
CREATE INDEX idx_invite_codes_code ON invite_codes(code);
CREATE INDEX idx_invite_codes_active ON invite_codes(is_active) WHERE is_active = true;

-- Add invite_code_used to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS invite_code_used VARCHAR(50);
ALTER TABLE users ADD CONSTRAINT fk_users_invite_code 
  FOREIGN KEY (invite_code_used) REFERENCES invite_codes(code);

-- ============================================================================
-- PART 2: MESSAGING SYSTEM
-- ============================================================================

-- Table: messages
-- Stores messages between founders and investors (post-investment only)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  startup_deal_id UUID REFERENCES startup_deals(id) ON DELETE SET NULL,
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX idx_messages_sender ON messages(sender_id, created_at DESC);
CREATE INDEX idx_messages_recipient ON messages(recipient_id, created_at DESC);
CREATE INDEX idx_messages_deal ON messages(startup_deal_id);
CREATE INDEX idx_messages_unread ON messages(recipient_id, is_read) WHERE is_read = false;

-- ============================================================================
-- PART 3: DATA ROOM FILES
-- ============================================================================

-- Table: data_room_files
-- Tracks files uploaded to founder data rooms with organized folder structure
CREATE TABLE IF NOT EXISTS data_room_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_profile_id UUID NOT NULL REFERENCES founder_profiles(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  file_type VARCHAR(100),
  folder_category VARCHAR(50) NOT NULL CHECK (folder_category IN (
    'pitch_deck', 'financial_model', 'team_resumes', 
    'legal_documents', 'product_demo', 'other'
  )),
  uploaded_by UUID NOT NULL REFERENCES users(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_data_room_founder ON data_room_files(founder_profile_id);
CREATE INDEX idx_data_room_category ON data_room_files(founder_profile_id, folder_category);

-- Table: data_room_access
-- Tracks which investors have been granted access to which data rooms
CREATE TABLE IF NOT EXISTS data_room_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_profile_id UUID NOT NULL REFERENCES founder_profiles(id) ON DELETE CASCADE,
  investor_profile_id UUID NOT NULL REFERENCES investor_profiles(id) ON DELETE CASCADE,
  access_granted_by UUID NOT NULL REFERENCES users(id),
  access_status VARCHAR(20) DEFAULT 'pending' CHECK (access_status IN ('pending', 'granted', 'revoked')),
  granted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(founder_profile_id, investor_profile_id)
);

-- Indexes
CREATE INDEX idx_data_room_access_founder ON data_room_access(founder_profile_id);
CREATE INDEX idx_data_room_access_investor ON data_room_access(investor_profile_id);

-- ============================================================================
-- PART 4: DEAL ADMIN REVIEWS & CURATION
-- ============================================================================

-- Add columns to startup_deals table for admin review
ALTER TABLE startup_deals ADD COLUMN IF NOT EXISTS admin_approval_status VARCHAR(20) DEFAULT 'pending' 
  CHECK (admin_approval_status IN ('pending', 'approved', 'rejected'));
ALTER TABLE startup_deals ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE startup_deals ADD COLUMN IF NOT EXISTS readiness_score INTEGER CHECK (readiness_score >= 0 AND readiness_score <= 100);
ALTER TABLE startup_deals ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE startup_deals ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES users(id);
ALTER TABLE startup_deals ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

-- Indexes for deal queries
CREATE INDEX idx_deals_admin_status ON startup_deals(admin_approval_status);
CREATE INDEX idx_deals_featured ON startup_deals(is_featured) WHERE is_featured = true;
CREATE INDEX idx_deals_active_approved ON startup_deals(is_active, admin_approval_status) 
  WHERE is_active = true AND admin_approval_status = 'approved';

-- ============================================================================
-- PART 5: FOUNDER PROFILE ENHANCEMENTS
-- ============================================================================

-- Add readiness_score to founder_profiles
ALTER TABLE founder_profiles ADD COLUMN IF NOT EXISTS readiness_score INTEGER CHECK (readiness_score >= 0 AND readiness_score <= 100);

-- ============================================================================
-- PART 6: PLATFORM CONTENT MANAGEMENT
-- ============================================================================

-- Table: platform_content
-- Simple CMS for managing platform content
CREATE TABLE IF NOT EXISTS platform_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN (
    'resource_article', 'legal_page', 'help_guide', 'compliance_notice'
  )),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  is_published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_platform_content_type ON platform_content(content_type);
CREATE INDEX idx_platform_content_slug ON platform_content(slug);
CREATE INDEX idx_platform_content_published ON platform_content(is_published) WHERE is_published = true;

-- ============================================================================
-- PART 7: DOCUMENT GENERATION TRACKING
-- ============================================================================

-- Extend generated_documents table if needed
ALTER TABLE generated_documents ADD COLUMN IF NOT EXISTS is_finalized BOOLEAN DEFAULT false;
ALTER TABLE generated_documents ADD COLUMN IF NOT EXISTS finalized_at TIMESTAMPTZ;

-- ============================================================================
-- PART 8: ENHANCED INVESTOR INTERESTS
-- ============================================================================

-- Add columns to investor_interests for better tracking
ALTER TABLE investor_interests ADD COLUMN IF NOT EXISTS connection_status VARCHAR(20) DEFAULT 'pending'
  CHECK (connection_status IN ('pending', 'accepted', 'declined', 'invested'));
ALTER TABLE investor_interests ADD COLUMN IF NOT EXISTS responded_at TIMESTAMPTZ;
ALTER TABLE investor_interests ADD COLUMN IF NOT EXISTS data_room_access_requested BOOLEAN DEFAULT false;
ALTER TABLE investor_interests ADD COLUMN IF NOT EXISTS data_room_access_granted BOOLEAN DEFAULT false;

-- Index for connection management
CREATE INDEX idx_investor_interests_connection ON investor_interests(startup_deal_id, connection_status);

-- ============================================================================
-- PART 9: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_room_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_room_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invite_codes
-- Admins can do everything
CREATE POLICY "Admins can manage invite codes" ON invite_codes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Anyone can read active codes for validation during signup
CREATE POLICY "Anyone can read active invite codes" ON invite_codes
  FOR SELECT USING (is_active = true);

-- RLS Policies for messages
-- Users can read messages sent to them or by them
CREATE POLICY "Users can read their own messages" ON messages
  FOR SELECT USING (
    sender_id = auth.uid() OR recipient_id = auth.uid()
  );

-- Users can send messages
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
  );

-- Users can update their own messages (mark as read)
CREATE POLICY "Users can update their messages" ON messages
  FOR UPDATE USING (
    recipient_id = auth.uid()
  );

-- RLS Policies for data_room_files
-- Founders can manage their own data room files
CREATE POLICY "Founders can manage their data room" ON data_room_files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM founder_profiles 
      WHERE founder_profiles.id = data_room_files.founder_profile_id 
      AND founder_profiles.user_id = auth.uid()
    )
  );

-- Investors can view files if they have access
CREATE POLICY "Investors can view granted data room files" ON data_room_files
  FOR SELECT USING (
    is_public = true OR
    EXISTS (
      SELECT 1 FROM data_room_access dra
      JOIN investor_profiles ip ON ip.id = dra.investor_profile_id
      WHERE dra.founder_profile_id = data_room_files.founder_profile_id
      AND ip.user_id = auth.uid()
      AND dra.access_status = 'granted'
    )
  );

-- Admins can view all
CREATE POLICY "Admins can view all data room files" ON data_room_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for data_room_access
-- Founders can manage access to their data rooms
CREATE POLICY "Founders can manage data room access" ON data_room_access
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM founder_profiles 
      WHERE founder_profiles.id = data_room_access.founder_profile_id 
      AND founder_profiles.user_id = auth.uid()
    )
  );

-- Investors can view their own access requests
CREATE POLICY "Investors can view their access requests" ON data_room_access
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM investor_profiles 
      WHERE investor_profiles.id = data_room_access.investor_profile_id 
      AND investor_profiles.user_id = auth.uid()
    )
  );

-- Investors can request access
CREATE POLICY "Investors can request data room access" ON data_room_access
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM investor_profiles 
      WHERE investor_profiles.id = data_room_access.investor_profile_id 
      AND investor_profiles.user_id = auth.uid()
    )
  );

-- RLS Policies for platform_content
-- Published content is readable by all authenticated users
CREATE POLICY "Anyone can read published content" ON platform_content
  FOR SELECT USING (is_published = true);

-- Admins can manage all content
CREATE POLICY "Admins can manage platform content" ON platform_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- ============================================================================
-- PART 10: FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_room_files_updated_at BEFORE UPDATE ON data_room_files
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_room_access_updated_at BEFORE UPDATE ON data_room_access
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_content_updated_at BEFORE UPDATE ON platform_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment invite code usage
CREATE OR REPLACE FUNCTION increment_invite_code_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE invite_codes 
  SET times_used = times_used + 1 
  WHERE code = NEW.invite_code_used;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment usage when user registers with code
CREATE TRIGGER track_invite_code_usage AFTER INSERT ON users
  FOR EACH ROW 
  WHEN (NEW.invite_code_used IS NOT NULL)
  EXECUTE FUNCTION increment_invite_code_usage();

-- ============================================================================
-- PART 11: INITIAL DATA
-- ============================================================================

-- Insert default platform content (can be customized later via CMS)
INSERT INTO platform_content (content_type, title, slug, content, is_published, published_at) VALUES
  (
    'compliance_notice',
    'Section 42 Compliance Notice',
    'section-42-compliance',
    'All deals on Incubazar are conducted as private placements under Section 42 of the Companies Act 2013. Each deal is limited to a maximum of 200 investors. This platform acts as a technology facilitator only and does not provide investment advice.',
    true,
    NOW()
  ),
  (
    'legal_page',
    'Risk Disclaimer',
    'risk-disclaimer',
    'Investment in startups carries substantial risk. You may lose your entire investment. Past performance is not indicative of future results. Please conduct your own due diligence and consult with financial advisors before making investment decisions.',
    true,
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TABLE: data_room_access_requests
-- ============================================================================
CREATE TABLE IF NOT EXISTS data_room_access_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_profile_id UUID NOT NULL REFERENCES investor_profiles(id) ON DELETE CASCADE,
  founder_profile_id UUID NOT NULL REFERENCES founder_profiles(id) ON DELETE CASCADE,
  deal_id UUID NOT NULL REFERENCES startup_deals(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'granted', 'denied')),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(investor_profile_id, deal_id)
);

-- Indexes for data_room_access_requests
CREATE INDEX idx_data_room_access_investor ON data_room_access_requests(investor_profile_id);
CREATE INDEX idx_data_room_access_founder ON data_room_access_requests(founder_profile_id);
CREATE INDEX idx_data_room_access_deal ON data_room_access_requests(deal_id);
CREATE INDEX idx_data_room_access_status ON data_room_access_requests(status);

-- RLS for data_room_access_requests
ALTER TABLE data_room_access_requests ENABLE ROW LEVEL SECURITY;

-- Investors can view their own requests
CREATE POLICY data_room_access_investor_view ON data_room_access_requests
  FOR SELECT
  USING (
    investor_profile_id IN (
      SELECT id FROM investor_profiles WHERE user_id = auth.uid()
    )
  );

-- Investors can create requests
CREATE POLICY data_room_access_investor_create ON data_room_access_requests
  FOR INSERT
  WITH CHECK (
    investor_profile_id IN (
      SELECT id FROM investor_profiles WHERE user_id = auth.uid()
    )
  );

-- Founders can view requests for their deals
CREATE POLICY data_room_access_founder_view ON data_room_access_requests
  FOR SELECT
  USING (
    founder_profile_id IN (
      SELECT id FROM founder_profiles WHERE user_id = auth.uid()
    )
  );

-- Founders can update requests (approve/deny)
CREATE POLICY data_room_access_founder_update ON data_room_access_requests
  FOR UPDATE
  USING (
    founder_profile_id IN (
      SELECT id FROM founder_profiles WHERE user_id = auth.uid()
    )
  );

-- Admins can view and update all requests
CREATE POLICY data_room_access_admin_all ON data_room_access_requests
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

