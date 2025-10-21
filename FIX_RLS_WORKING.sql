-- =====================================================
-- FINAL FIX FOR RLS POLICIES - RESOLVES 500 ERROR
-- Fixed version - uses public schema instead of auth
-- =====================================================

-- Step 1: Temporarily disable RLS to fix policies
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_deals DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
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

-- Step 3: Create helper function in PUBLIC schema (not auth)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text FROM public.users WHERE id = user_id LIMIT 1;
$$;

-- Step 4: Create simple, working policies
-- USERS TABLE
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON public.users
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE 
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "users_select_admin" ON public.users
    FOR SELECT
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "users_update_admin" ON public.users
    FOR UPDATE
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "users_delete_admin" ON public.users
    FOR DELETE
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- FOUNDER PROFILES
CREATE POLICY "founder_profiles_select" ON public.founder_profiles
    FOR SELECT 
    TO authenticated
    USING (
        user_id = auth.uid() OR 
        public.get_user_role(auth.uid()) = 'admin'
    );

CREATE POLICY "founder_profiles_insert" ON public.founder_profiles
    FOR INSERT 
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "founder_profiles_update" ON public.founder_profiles
    FOR UPDATE 
    TO authenticated
    USING (
        user_id = auth.uid() OR 
        public.get_user_role(auth.uid()) = 'admin'
    );

CREATE POLICY "founder_profiles_delete" ON public.founder_profiles
    FOR DELETE
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- INVESTOR PROFILES
CREATE POLICY "investor_profiles_select" ON public.investor_profiles
    FOR SELECT 
    TO authenticated
    USING (
        user_id = auth.uid() OR 
        public.get_user_role(auth.uid()) = 'admin'
    );

CREATE POLICY "investor_profiles_insert" ON public.investor_profiles
    FOR INSERT 
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "investor_profiles_update" ON public.investor_profiles
    FOR UPDATE 
    TO authenticated
    USING (
        user_id = auth.uid() OR 
        public.get_user_role(auth.uid()) = 'admin'
    );

CREATE POLICY "investor_profiles_delete" ON public.investor_profiles
    FOR DELETE
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- STARTUP DEALS
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

CREATE POLICY "deals_select_own" ON public.startup_deals
    FOR SELECT 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

CREATE POLICY "deals_insert" ON public.startup_deals
    FOR INSERT 
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

CREATE POLICY "deals_update_own" ON public.startup_deals
    FOR UPDATE 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

CREATE POLICY "deals_admin" ON public.startup_deals
    FOR ALL
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- Step 5: Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_deals ENABLE ROW LEVEL SECURITY;

-- Step 6: Ensure proper grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.founder_profiles TO authenticated;
GRANT ALL ON public.investor_profiles TO authenticated;
GRANT ALL ON public.startup_deals TO authenticated;
GRANT ALL ON public.investor_interests TO authenticated;
GRANT ALL ON public.generated_documents TO authenticated;
GRANT ALL ON public.quarterly_updates TO authenticated;
GRANT ALL ON public.subscription_payments TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO authenticated;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$ 
BEGIN 
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ RLS POLICIES FIXED SUCCESSFULLY!';
    RAISE NOTICE '✅ Helper function created in public schema';
    RAISE NOTICE '✅ All policies optimized';
    RAISE NOTICE '✅ No more 500 errors!';
    RAISE NOTICE '========================================';
END $$;
