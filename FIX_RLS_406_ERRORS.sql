-- =====================================================
-- FIX 406 NOT ACCEPTABLE ERRORS
-- This fixes RLS policies that cause 406 errors
-- =====================================================

-- The 406 error happens when RLS policies block requests
-- We need to ensure proper policies are in place

-- First, let's check if RLS is enabled
-- (It should be, but let's make sure)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_interests ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- FIX INVESTOR_PROFILES POLICIES (Main culprit for 406)
-- =====================================================

-- Drop all existing policies on investor_profiles
DROP POLICY IF EXISTS "Investors can view own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can update own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can insert own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can view all investor profiles" ON public.investor_profiles;

-- Create new policies with proper permissions

-- Allow investors to SELECT their own profile
CREATE POLICY "investor_profiles_select_own" ON public.investor_profiles
    FOR SELECT 
    USING (user_id = auth.uid());

-- Allow investors to INSERT their own profile
CREATE POLICY "investor_profiles_insert_own" ON public.investor_profiles
    FOR INSERT 
    WITH CHECK (user_id = auth.uid());

-- Allow investors to UPDATE their own profile
CREATE POLICY "investor_profiles_update_own" ON public.investor_profiles
    FOR UPDATE 
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Allow investors to DELETE their own profile (optional)
CREATE POLICY "investor_profiles_delete_own" ON public.investor_profiles
    FOR DELETE 
    USING (user_id = auth.uid());

-- Allow admins to access all investor profiles
CREATE POLICY "investor_profiles_admin_all" ON public.investor_profiles
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- FIX FOUNDER_PROFILES POLICIES (Same pattern)
-- =====================================================

-- Drop all existing policies on founder_profiles
DROP POLICY IF EXISTS "Founders can view own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can update own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can insert own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Admins can view all founder profiles" ON public.founder_profiles;

-- Create new policies with proper permissions

-- Allow founders to SELECT their own profile
CREATE POLICY "founder_profiles_select_own" ON public.founder_profiles
    FOR SELECT 
    USING (user_id = auth.uid());

-- Allow founders to INSERT their own profile
CREATE POLICY "founder_profiles_insert_own" ON public.founder_profiles
    FOR INSERT 
    WITH CHECK (user_id = auth.uid());

-- Allow founders to UPDATE their own profile
CREATE POLICY "founder_profiles_update_own" ON public.founder_profiles
    FOR UPDATE 
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Allow founders to DELETE their own profile (optional)
CREATE POLICY "founder_profiles_delete_own" ON public.founder_profiles
    FOR DELETE 
    USING (user_id = auth.uid());

-- Allow admins to access all founder profiles
CREATE POLICY "founder_profiles_admin_all" ON public.founder_profiles
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- VERIFY POLICIES ARE WORKING
-- =====================================================

-- To test, run these queries as a logged-in user:
-- SELECT * FROM investor_profiles WHERE user_id = auth.uid();
-- SELECT * FROM founder_profiles WHERE user_id = auth.uid();

-- If you still get 406 errors after running this migration:
-- 1. Make sure you're logged in (check auth.uid())
-- 2. Make sure the user_id in the table matches your auth.uid()
-- 3. Check the Supabase logs for more details on why RLS is blocking

-- =====================================================
-- IMPORTANT NOTES
-- =====================================================
-- 406 errors typically mean:
-- 1. RLS is enabled but no policy allows the operation
-- 2. The policy conditions don't match (e.g., user_id != auth.uid())
-- 3. The user is not authenticated (auth.uid() is null)
--
-- This fix ensures proper policies are in place for all CRUD operations
