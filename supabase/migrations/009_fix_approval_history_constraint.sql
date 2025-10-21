-- Fix the approval_history check constraint to allow 'verified' status
-- The investor_profiles table uses 'verified' instead of 'approved'

-- Drop the old constraint
ALTER TABLE approval_history 
DROP CONSTRAINT IF EXISTS approval_history_action_check;

-- Add new constraint that includes 'verified'
ALTER TABLE approval_history 
ADD CONSTRAINT approval_history_action_check 
CHECK (action IN ('approved', 'rejected', 'pending', 'verified'));

-- Add missing columns to investor_profiles that the trigger expects
ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES public.users(id) ON DELETE SET NULL;

ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add comments for documentation
COMMENT ON CONSTRAINT approval_history_action_check ON approval_history 
IS 'Allows approved, rejected, pending, and verified status values';

COMMENT ON COLUMN public.investor_profiles.verified_by IS 'Admin user who verified this investor';
COMMENT ON COLUMN public.investor_profiles.rejection_reason IS 'Reason for rejection if kyc_status is rejected';

