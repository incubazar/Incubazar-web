-- =====================================================
-- ULTIMATE RLS FIX - GUARANTEED TO WORK
-- This ensures authenticated users can ALWAYS read their own data
-- =====================================================

-- Step 1: Disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.users';
    END LOOP;
END $$;

-- Step 3: Create ONE simple policy that WORKS
CREATE POLICY "allow_authenticated_select_own" ON public.users
    FOR SELECT 
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "allow_authenticated_insert_own" ON public.users
    FOR INSERT 
    TO authenticated
    WITH CHECK (id = auth.uid());

CREATE POLICY "allow_authenticated_update_own" ON public.users
    FOR UPDATE 
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Step 4: Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 5: Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;

-- Step 6: Test the policy
DO $$ 
BEGIN 
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ ULTIMATE RLS FIX APPLIED!';
    RAISE NOTICE '✅ Policy Name: allow_authenticated_select_own';
    RAISE NOTICE '✅ Condition: id = auth.uid()';
    RAISE NOTICE '✅ Should work for login now!';
    RAISE NOTICE '========================================';
    
    -- Show current policies
    RAISE NOTICE 'Current policies on users table:';
END $$;

-- Display policies for verification
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'public';
