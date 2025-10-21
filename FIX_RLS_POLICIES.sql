-- =====================================================
-- COMPLETE FIX FOR RLS AND PERMISSIONS
-- Run this SQL in Supabase SQL Editor
-- =====================================================

-- First, drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Admins can delete users" ON public.users;

DROP POLICY IF EXISTS "Founders can view own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can insert own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can update own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Admins can view all founder profiles" ON public.founder_profiles;

DROP POLICY IF EXISTS "Investors can view own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can insert own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can update own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can view all investor profiles" ON public.investor_profiles;

DROP POLICY IF EXISTS "Authenticated users can view approved deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Founders can view own deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Founders can insert own deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Founders can update own deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Admins can view all deals" ON public.startup_deals;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Allow authenticated users to read their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = id);

-- Allow service role to insert users (for signup via API)
CREATE POLICY "Service can insert users" ON public.users
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE 
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Allow admins to view all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow admins full control
CREATE POLICY "Admins can manage all users" ON public.users
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- FOUNDER PROFILES POLICIES
-- =====================================================

CREATE POLICY "Founders can view own profile" ON public.founder_profiles
    FOR SELECT 
    TO authenticated
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Founders can insert own profile" ON public.founder_profiles
    FOR INSERT 
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Founders can update own profile" ON public.founder_profiles
    FOR UPDATE 
    TO authenticated
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can manage founder profiles" ON public.founder_profiles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- =====================================================
-- INVESTOR PROFILES POLICIES
-- =====================================================

CREATE POLICY "Investors can view own profile" ON public.investor_profiles
    FOR SELECT 
    TO authenticated
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Investors can insert own profile" ON public.investor_profiles
    FOR INSERT 
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Investors can update own profile" ON public.investor_profiles
    FOR UPDATE 
    TO authenticated
    USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can manage investor profiles" ON public.investor_profiles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- =====================================================
-- STARTUP DEALS POLICIES
-- =====================================================

-- Authenticated users can view approved deals
CREATE POLICY "Users can view approved deals" ON public.startup_deals
    FOR SELECT 
    TO authenticated
    USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.admin_approval_status = 'approved'
        )
    );

-- Founders can view their own deals (even if not approved)
CREATE POLICY "Founders can view own deals" ON public.startup_deals
    FOR SELECT 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can create deals
CREATE POLICY "Founders can insert own deals" ON public.startup_deals
    FOR INSERT 
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can update their own deals
CREATE POLICY "Founders can update own deals" ON public.startup_deals
    FOR UPDATE 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Admins can manage all deals
CREATE POLICY "Admins can manage all deals" ON public.startup_deals
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.founder_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investor_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.startup_deals TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investor_interests TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.generated_documents TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.quarterly_updates TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.subscription_payments TO authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$ 
BEGIN 
    RAISE NOTICE '✅ RLS policies and permissions fixed successfully!';
    RAISE NOTICE '✅ Users can now access their own data';
    RAISE NOTICE '✅ Admins have full access';
    RAISE NOTICE '✅ All authenticated operations should work';
END $$;
