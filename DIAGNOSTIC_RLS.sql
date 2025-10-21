-- =====================================================
-- DIAGNOSTIC - Check Current RLS Status
-- Run this to see what's blocking your queries
-- =====================================================

-- 1. Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'users';

-- 2. Check current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual::text as using_expression,
    with_check::text as with_check_expression
FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'public'
ORDER BY policyname;

-- 3. Check grants
SELECT 
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND table_name = 'users'
ORDER BY grantee, privilege_type;

-- 4. Test if a simple query would work
-- (This won't actually run, just shows the query structure)
SELECT 'Test query structure:' as note,
       'SELECT * FROM users WHERE id = auth.uid()' as example_query;
