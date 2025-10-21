-- Add missing columns to investor_profiles table
-- These columns are used by the admin panel and investor profile pages

ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS total_invested NUMERIC DEFAULT 0 CHECK (total_invested >= 0);

ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS profile_completion_percentage INTEGER DEFAULT 0 CHECK (profile_completion_percentage >= 0 AND profile_completion_percentage <= 100);

-- Add comment for documentation
COMMENT ON COLUMN public.investor_profiles.total_invested IS 'Total amount invested across all deals by this investor';
COMMENT ON COLUMN public.investor_profiles.profile_completion_percentage IS 'Percentage of profile completion (0-100)';

