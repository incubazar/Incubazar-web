-- =====================================================
-- SIMPLE RLS FIX - NO RECURSION
-- This removes all complex policies and uses simple ones
-- =====================================================

-- Step 1: Disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_deals DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies and functions
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Service can insert users" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Admins can delete users" ON public.users;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_select_admin" ON public.users;
DROP POLICY IF EXISTS "users_all_admin" ON public.users;
DROP POLICY IF EXISTS "users_update_admin" ON public.users;
DROP POLICY IF EXISTS "users_delete_admin" ON public.users;

DROP POLICY IF EXISTS "Founders can view own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can insert own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Founders can update own profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Admins can view all founder profiles" ON public.founder_profiles;
DROP POLICY IF EXISTS "Admins can manage founder profiles" ON public.founder_profiles;
DROP POLICY IF EXISTS "founder_profiles_select" ON public.founder_profiles;
DROP POLICY IF EXISTS "founder_profiles_insert" ON public.founder_profiles;
DROP POLICY IF EXISTS "founder_profiles_update" ON public.founder_profiles;
DROP POLICY IF EXISTS "founder_profiles_delete" ON public.founder_profiles;

DROP POLICY IF EXISTS "Investors can view own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can insert own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Investors can update own profile" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can view all investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can manage investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "investor_profiles_select" ON public.investor_profiles;
DROP POLICY IF EXISTS "investor_profiles_insert" ON public.investor_profiles;
DROP POLICY IF EXISTS "investor_profiles_update" ON public.investor_profiles;
DROP POLICY IF EXISTS "investor_profiles_delete" ON public.investor_profiles;

DROP POLICY IF EXISTS "Users can view approved deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Authenticated users can view approved deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Founders can view own deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Founders can insert own deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Founders can update own deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Admins can view all deals" ON public.startup_deals;
DROP POLICY IF EXISTS "Admins can manage all deals" ON public.startup_deals;
DROP POLICY IF EXISTS "deals_select_approved" ON public.startup_deals;
DROP POLICY IF EXISTS "deals_select_own" ON public.startup_deals;
DROP POLICY IF EXISTS "deals_insert" ON public.startup_deals;
DROP POLICY IF EXISTS "deals_update_own" ON public.startup_deals;
DROP POLICY IF EXISTS "deals_admin" ON public.startup_deals;

-- Drop the helper function if it exists
DROP FUNCTION IF EXISTS public.get_user_role(UUID);

-- Step 3: Create SIMPLE policies - authenticated users can access their own data
-- USERS TABLE - Allow users to read/write their own data
CREATE POLICY "users_all_own" ON public.users
    FOR ALL
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- FOUNDER PROFILES - Users can access their own profile
CREATE POLICY "founder_profiles_all_own" ON public.founder_profiles
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- INVESTOR PROFILES - Users can access their own profile
CREATE POLICY "investor_profiles_all_own" ON public.investor_profiles
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- STARTUP DEALS - Founders can manage their own deals
CREATE POLICY "deals_select_approved" ON public.startup_deals
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

CREATE POLICY "deals_all_own" ON public.startup_deals
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- INVESTOR INTERESTS
CREATE POLICY "investor_interests_all_own" ON public.investor_interests
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.investor_profiles ip
            WHERE ip.id = investor_profile_id 
            AND ip.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.investor_profiles ip
            WHERE ip.id = investor_profile_id 
            AND ip.user_id = auth.uid()
        )
    );

CREATE POLICY "investor_interests_founder_view" ON public.investor_interests
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- GENERATED DOCUMENTS
CREATE POLICY "documents_all_own" ON public.generated_documents
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- QUARTERLY UPDATES
CREATE POLICY "updates_founder_all" ON public.quarterly_updates
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

CREATE POLICY "updates_investor_view" ON public.quarterly_updates
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.investor_interests ii
            JOIN public.investor_profiles ip ON ip.id = ii.investor_profile_id
            WHERE ii.startup_deal_id = startup_deal_id 
            AND ip.user_id = auth.uid()
        )
    );

-- SUBSCRIPTION PAYMENTS
CREATE POLICY "payments_all_own" ON public.subscription_payments
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Step 4: Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quarterly_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_payments ENABLE ROW LEVEL SECURITY;

-- Step 5: Grant ALL permissions to authenticated users
-- RLS policies will handle the actual restrictions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Step 6: For anon users (registration), allow reading users table
GRANT SELECT ON public.users TO anon;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$ 
BEGIN 
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ SIMPLE RLS POLICIES APPLIED!';
    RAISE NOTICE '✅ No circular dependencies';
    RAISE NOTICE '✅ No helper functions needed';
    RAISE NOTICE '✅ Users can access their own data';
    RAISE NOTICE '✅ Should work now!';
    RAISE NOTICE '========================================';
END $$;
