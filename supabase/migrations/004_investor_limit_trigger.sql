-- Migration: Enforce 200-investor limit compliance
-- This migration creates triggers and functions to automatically enforce
-- the Section 42 compliance requirement of maximum 200 investors per deal

-- Function to update investor count on startup_deals
CREATE OR REPLACE FUNCTION update_investor_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Only count investors who have actually invested (not just interested)
  UPDATE startup_deals
  SET investor_count = (
    SELECT COUNT(DISTINCT investor_profile_id)
    FROM investor_interests
    WHERE startup_deal_id = COALESCE(NEW.startup_deal_id, OLD.startup_deal_id)
    AND interest_status = 'invested'
  )
  WHERE id = COALESCE(NEW.startup_deal_id, OLD.startup_deal_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to prevent exceeding investor limit
CREATE OR REPLACE FUNCTION enforce_investor_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
  deal_limit INTEGER;
BEGIN
  -- Only enforce on INSERT or UPDATE to 'invested' status
  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.interest_status = 'invested')) THEN
    -- Get current investor count and limit for the deal
    SELECT investor_count, investor_limit 
    INTO current_count, deal_limit
    FROM startup_deals
    WHERE id = NEW.startup_deal_id;
    
    -- Check if adding this investor would exceed the limit
    IF current_count >= deal_limit THEN
      RAISE EXCEPTION 'Cannot add investor: Deal has reached the maximum limit of % investors (Section 42 compliance)', deal_limit;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-close deal when limit is reached
CREATE OR REPLACE FUNCTION auto_close_deal_at_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
  deal_limit INTEGER;
BEGIN
  -- Get updated counts
  SELECT investor_count, investor_limit 
  INTO current_count, deal_limit
  FROM startup_deals
  WHERE id = COALESCE(NEW.startup_deal_id, OLD.startup_deal_id);
  
  -- Auto-close deal if limit reached
  IF current_count >= deal_limit THEN
    UPDATE startup_deals
    SET is_active = false
    WHERE id = COALESCE(NEW.startup_deal_id, OLD.startup_deal_id);
    
    -- Log the closure
    INSERT INTO system_logs (event_type, details, created_at)
    VALUES (
      'DEAL_AUTO_CLOSED',
      jsonb_build_object(
        'deal_id', COALESCE(NEW.startup_deal_id, OLD.startup_deal_id),
        'investor_count', current_count,
        'investor_limit', deal_limit,
        'reason', 'Section 42 compliance - 200 investor limit reached'
      ),
      NOW()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create system_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_update_investor_count ON investor_interests;
DROP TRIGGER IF EXISTS trigger_enforce_investor_limit ON investor_interests;
DROP TRIGGER IF EXISTS trigger_auto_close_deal ON investor_interests;

-- Trigger to update investor count (runs after insert/update/delete)
CREATE TRIGGER trigger_update_investor_count
  AFTER INSERT OR UPDATE OR DELETE ON investor_interests
  FOR EACH ROW
  EXECUTE FUNCTION update_investor_count();

-- Trigger to enforce investor limit (runs before insert/update)
CREATE TRIGGER trigger_enforce_investor_limit
  BEFORE INSERT OR UPDATE ON investor_interests
  FOR EACH ROW
  EXECUTE FUNCTION enforce_investor_limit();

-- Trigger to auto-close deal at limit (runs after investor count update)
CREATE TRIGGER trigger_auto_close_deal
  AFTER INSERT OR UPDATE ON investor_interests
  FOR EACH ROW
  EXECUTE FUNCTION auto_close_deal_at_limit();

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_investor_interests_deal_status 
  ON investor_interests(startup_deal_id, interest_status);

-- Add comment for documentation
COMMENT ON FUNCTION enforce_investor_limit() IS 
  'Enforces Section 42 compliance by preventing deals from exceeding 200 investors';

COMMENT ON FUNCTION auto_close_deal_at_limit() IS 
  'Automatically closes deals when they reach the 200-investor limit for compliance';

-- Initialize investor_count for existing deals
UPDATE startup_deals sd
SET investor_count = (
  SELECT COUNT(DISTINCT investor_profile_id)
  FROM investor_interests ii
  WHERE ii.startup_deal_id = sd.id
  AND ii.interest_status = 'invested'
)
WHERE investor_count IS NULL OR investor_count = 0;



