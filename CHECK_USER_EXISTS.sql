-- =====================================================
-- CHECK IF USER EXISTS
-- Run this to see if the user is actually in the table
-- =====================================================

-- Replace 'USER_ID_HERE' with the actual user ID from the error:
-- 3a6bca1e-7042-421f-9adb-a80d82e17b54

SELECT 
    id,
    email,
    role,
    verification_status,
    created_at
FROM public.users
WHERE id = '3a6bca1e-7042-421f-9adb-a80d82e17b54';

-- Also check auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE id = '3a6bca1e-7042-421f-9adb-a80d82e17b54';

-- If the user exists in auth.users but NOT in public.users,
-- that's your problem! The signup didn't complete properly.
