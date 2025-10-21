-- =====================================================
-- FIX RLS POLICIES FOR USER ACCESS
-- This migration fixes the RLS policies to allow proper user access
-- =====================================================

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

-- Create new, working policies for users table
-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT 
    USING (auth.uid() = id);

-- Allow users to insert their own profile (for signup)
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Allow admins to view all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow admins to update all users
CREATE POLICY "Admins can update all users" ON public.users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow admins to delete users
CREATE POLICY "Admins can delete users" ON public.users
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Fix founder profiles policies
DROP POLICY IF EXISTS "Founders can view own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can update own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can insert own profile" ON public.founder_profiles;

CREATE POLICY "Founders can view own profile" ON public.founder_profiles
    FOR SELECT 
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Founders can insert own profile" ON public.founder_profiles
    FOR INSERT 
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Founders can update own profile" ON public.founder_profiles
    FOR UPDATE 
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- Fix investor profiles policies
DROP POLICY IF EXISTS "Investors can view own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can update own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can insert own profile" ON public.investor_profiles;

CREATE POLICY "Investors can view own profile" ON public.investor_profiles
    FOR SELECT 
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Investors can insert own profile" ON public.investor_profiles
    FOR INSERT 
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Investors can update own profile" ON public.investor_profiles
    FOR UPDATE 
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;
GRANT SELECT, INSERT, UPDATE ON public.founder_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.investor_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.startup_deals TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.investor_interests TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.generated_documents TO authenticated;
GRANT SELECT, INSERT ON public.quarterly_updates TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.subscription_payments TO authenticated;

-- Completion message
DO $$ 
BEGIN 
    RAISE NOTICE 'RLS policies fixed successfully!';
END $$;
