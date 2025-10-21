-- ============================================================================
-- QUICK CHECK: Founder and Investor Tables
-- Copy and paste these queries in Supabase SQL Editor
-- ============================================================================

-- 1️⃣ CHECK ALL COLUMNS IN FOUNDER_PROFILES
-- This shows you what columns exist and their data types
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'founder_profiles'
ORDER BY ordinal_position;

-- 2️⃣ CHECK ALL COLUMNS IN INVESTOR_PROFILES
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'investor_profiles'
ORDER BY ordinal_position;

-- 3️⃣ CHECK ALL COLUMNS IN STARTUP_DETAILS (if exists)
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'startup_details'
ORDER BY ordinal_position;

-- ============================================================================
-- VIEW ACTUAL DATA
-- ============================================================================

-- 4️⃣ VIEW ALL FOUNDERS WITH KEY INFO
SELECT 
    fp.id,
    u.email,
    u.full_name,
    fp.startup_name,
    fp.incorporation_status,
    fp.incorporation_number,
    fp.industry_sector,
    fp.stage,
    fp.admin_approval_status,
    fp.profile_completion_percentage,
    fp.rejection_reason,
    fp.approved_by,
    fp.created_at
FROM founder_profiles fp
JOIN users u ON fp.user_id = u.id
ORDER BY fp.created_at DESC;

-- 5️⃣ VIEW ALL INVESTORS WITH KEY INFO
SELECT 
    ip.id,
    u.email,
    u.full_name,
    ip.investor_type,
    ip.kyc_status,
    ip.total_invested,
    ip.profile_completion_percentage,
    ip.subscription_tier,
    ip.rejection_reason,
    ip.verified_by,
    ip.investment_preferences,
    ip.created_at
FROM investor_profiles ip
JOIN users u ON ip.user_id = u.id
ORDER BY ip.created_at DESC;

-- 6️⃣ VIEW STARTUP DETAILS (if table exists)
SELECT 
    sd.*,
    fp.startup_name
FROM startup_details sd
JOIN founder_profiles fp ON sd.founder_profile_id = fp.id
ORDER BY sd.created_at DESC;

-- ============================================================================
-- COUNT & SUMMARY
-- ============================================================================

-- 7️⃣ SUMMARY: How many profiles?
SELECT 
    'Total Founders' as category,
    COUNT(*) as count
FROM founder_profiles
UNION ALL
SELECT 
    'Pending Founders' as category,
    COUNT(*) as count
FROM founder_profiles
WHERE admin_approval_status = 'pending'
UNION ALL
SELECT 
    'Approved Founders' as category,
    COUNT(*) as count
FROM founder_profiles
WHERE admin_approval_status = 'approved'
UNION ALL
SELECT 
    'Rejected Founders' as category,
    COUNT(*) as count
FROM founder_profiles
WHERE admin_approval_status = 'rejected'
UNION ALL
SELECT 
    'Total Investors' as category,
    COUNT(*) as count
FROM investor_profiles
UNION ALL
SELECT 
    'Pending Investors' as category,
    COUNT(*) as count
FROM investor_profiles
WHERE kyc_status = 'pending'
UNION ALL
SELECT 
    'Verified Investors' as category,
    COUNT(*) as count
FROM investor_profiles
WHERE kyc_status = 'verified'
UNION ALL
SELECT 
    'Rejected Investors' as category,
    COUNT(*) as count
FROM investor_profiles
WHERE kyc_status = 'rejected';

-- 8️⃣ CHECK SPECIFIC FOUNDER BY EMAIL
-- Replace 'founder@example.com' with actual email
SELECT 
    u.email,
    u.full_name,
    fp.startup_name,
    fp.admin_approval_status,
    fp.stage,
    fp.incorporation_status,
    fp.incorporation_number,
    fp.rejection_reason
FROM users u
JOIN founder_profiles fp ON u.id = fp.user_id
WHERE u.email = 'founder@example.com';

-- 9️⃣ CHECK SPECIFIC INVESTOR BY EMAIL
-- Replace 'investor@example.com' with actual email
SELECT 
    u.email,
    u.full_name,
    ip.kyc_status,
    ip.investor_type,
    ip.investment_preferences,
    ip.rejection_reason
FROM users u
JOIN investor_profiles ip ON u.id = ip.user_id
WHERE u.email = 'investor@example.com';

-- 🔟 CHECK IF FOUNDER HAS STARTUP_DETAILS
SELECT 
    fp.startup_name,
    fp.admin_approval_status,
    CASE 
        WHEN sd.id IS NOT NULL THEN '✅ Has detailed info'
        ELSE '❌ Missing detailed info'
    END as startup_details_status
FROM founder_profiles fp
LEFT JOIN startup_details sd ON fp.id = sd.founder_profile_id;

-- ============================================================================
-- VERIFY NEW COLUMNS FROM MIGRATION 006
-- ============================================================================

-- 1️⃣1️⃣ CHECK IF NEW ADMIN COLUMNS EXIST IN FOUNDER_PROFILES
SELECT 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'founder_profiles' 
        AND column_name = 'rejection_reason'
    ) THEN '✅ rejection_reason EXISTS'
    ELSE '❌ rejection_reason MISSING'
    END as rejection_reason_status,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'founder_profiles' 
        AND column_name = 'approved_by'
    ) THEN '✅ approved_by EXISTS'
    ELSE '❌ approved_by MISSING'
    END as approved_by_status,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'founder_profiles' 
        AND column_name = 'approved_date'
    ) THEN '✅ approved_date EXISTS'
    ELSE '❌ approved_date MISSING'
    END as approved_date_status;

-- 1️⃣2️⃣ CHECK IF NEW ADMIN COLUMNS EXIST IN INVESTOR_PROFILES
SELECT 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'investor_profiles' 
        AND column_name = 'rejection_reason'
    ) THEN '✅ rejection_reason EXISTS'
    ELSE '❌ rejection_reason MISSING'
    END as rejection_reason_status,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'investor_profiles' 
        AND column_name = 'verified_by'
    ) THEN '✅ verified_by EXISTS'
    ELSE '❌ verified_by MISSING'
    END as verified_by_status,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'investor_profiles' 
        AND column_name = 'total_invested'
    ) THEN '✅ total_invested EXISTS'
    ELSE '❌ total_invested MISSING'
    END as total_invested_status,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'investor_profiles' 
        AND column_name = 'profile_completion_percentage'
    ) THEN '✅ profile_completion_percentage EXISTS'
    ELSE '❌ profile_completion_percentage MISSING'
    END as profile_completion_status;

-- 1️⃣3️⃣ CHECK IF STARTUP_DETAILS TABLE EXISTS
SELECT 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'startup_details'
    ) THEN '✅ startup_details TABLE EXISTS'
    ELSE '❌ startup_details TABLE MISSING - Run migration 005!'
    END as startup_details_status;

-- 1️⃣4️⃣ CHECK IF ADMIN_NOTES TABLE EXISTS
SELECT 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'admin_notes'
    ) THEN '✅ admin_notes TABLE EXISTS'
    ELSE '❌ admin_notes TABLE MISSING'
    END as admin_notes_status;

-- 1️⃣5️⃣ CHECK IF APPROVAL_HISTORY TABLE EXISTS
SELECT 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'approval_history'
    ) THEN '✅ approval_history TABLE EXISTS'
    ELSE '❌ approval_history TABLE MISSING'
    END as approval_history_status;

-- ============================================================================
-- SAMPLE DATA FOR TESTING (Optional - Creates test data)
-- ============================================================================

-- Uncomment below if you want to insert test data

/*
-- Create test founder (after you have a user)
INSERT INTO founder_profiles (
    user_id, 
    startup_name, 
    incorporation_status, 
    industry_sector, 
    stage,
    admin_approval_status
) VALUES (
    'YOUR-USER-ID-HERE',
    'Test Startup Inc',
    'incorporated',
    'Technology',
    'early_revenue',
    'pending'
);

-- Create test investor (after you have a user)
INSERT INTO investor_profiles (
    user_id,
    investor_type,
    kyc_status,
    investment_preferences
) VALUES (
    'YOUR-USER-ID-HERE',
    'individual',
    'pending',
    '{"investor_type": "individual", "preferred_sectors": ["Technology", "Healthcare"], "min_investment": 100000, "max_investment": 500000}'::jsonb
);
*/

