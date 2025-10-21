-- ============================================================================
-- DATABASE VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor to check if everything is set up correctly
-- ============================================================================

-- 1. CHECK: Founder profiles has all required columns
SELECT 
    'Founder Profiles Columns' as check_name,
    CASE 
        WHEN COUNT(*) >= 13 THEN '✅ PASS'
        ELSE '❌ FAIL - Missing columns'
    END as status,
    array_agg(column_name) as existing_columns
FROM information_schema.columns 
WHERE table_name = 'founder_profiles'
AND column_name IN (
    'id', 'user_id', 'startup_name', 'incorporation_status', 
    'incorporation_number', 'industry_sector', 'stage',
    'admin_approval_status', 'profile_completion_percentage',
    'rejection_reason', 'approved_by', 'approved_date', 'rejected_by'
);

-- 2. CHECK: Investor profiles has all required columns
SELECT 
    'Investor Profiles Columns' as check_name,
    CASE 
        WHEN COUNT(*) >= 11 THEN '✅ PASS'
        ELSE '❌ FAIL - Missing columns'
    END as status,
    array_agg(column_name) as existing_columns
FROM information_schema.columns 
WHERE table_name = 'investor_profiles'
AND column_name IN (
    'id', 'user_id', 'kyc_status', 'investment_preferences',
    'total_invested', 'profile_completion_percentage',
    'rejection_reason', 'verified_by', 'verified_date', 'rejected_by',
    'subscription_tier'
);

-- 3. CHECK: Startup details table exists
SELECT 
    'Startup Details Table' as check_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'startup_details'
        ) THEN '✅ EXISTS'
        ELSE '❌ MISSING - Need to run migration 005'
    END as status;

-- 4. CHECK: Admin notes table exists
SELECT 
    'Admin Notes Table' as check_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'admin_notes'
        ) THEN '✅ EXISTS'
        ELSE '❌ MISSING - Need to run migration 006'
    END as status;

-- 5. CHECK: Approval history table exists
SELECT 
    'Approval History Table' as check_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'approval_history'
        ) THEN '✅ EXISTS'
        ELSE '❌ MISSING - Need to run migration 006'
    END as status;

-- 6. CHECK: Approval history triggers exist
SELECT 
    'Approval Triggers' as check_name,
    CASE 
        WHEN COUNT(*) >= 2 THEN '✅ PASS - ' || COUNT(*)::text || ' triggers found'
        ELSE '❌ FAIL - Missing triggers'
    END as status,
    array_agg(trigger_name) as existing_triggers
FROM information_schema.triggers 
WHERE trigger_name IN (
    'founder_approval_history_trigger',
    'investor_approval_history_trigger'
);

-- 7. CHECK: Investment preferences structure
SELECT 
    'Investment Preferences Field' as check_name,
    CASE 
        WHEN data_type = 'jsonb' THEN '✅ PASS - JSONB field exists'
        ELSE '❌ FAIL - Wrong type or missing'
    END as status
FROM information_schema.columns 
WHERE table_name = 'investor_profiles'
AND column_name = 'investment_preferences';

-- 8. CHECK: Admin role exists in users
SELECT 
    'Admin Role Setup' as check_name,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ PASS - ' || COUNT(*)::text || ' admin(s) found'
        ELSE '❌ FAIL - No admin users (run: UPDATE users SET role = ''admin'' WHERE email = ''your@email.com'')'
    END as status
FROM users 
WHERE role = 'admin';

-- ============================================================================
-- DETAILED VERIFICATION (Optional - Run individually if needed)
-- ============================================================================

-- List all columns in founder_profiles
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'founder_profiles' ORDER BY ordinal_position;

-- List all columns in investor_profiles  
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'investor_profiles' ORDER BY ordinal_position;

-- List all columns in startup_details
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'startup_details' ORDER BY ordinal_position;

-- Check RLS policies
-- SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('founder_profiles', 'investor_profiles', 'startup_details', 'admin_notes', 'approval_history');

-- ============================================================================
-- SUMMARY
-- ============================================================================
SELECT 
    '🎯 Database Status Summary' as title,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN ('founder_profiles', 'investor_profiles', 'startup_details', 'admin_notes', 'approval_history'))::text || ' / 5 tables' as tables_status,
    (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_name LIKE '%approval_history_trigger')::text || ' / 2 triggers' as triggers_status,
    (SELECT COUNT(*) FROM users WHERE role = 'admin')::text || ' admin users' as admin_status;

