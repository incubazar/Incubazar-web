-- Setup Admin Account
-- Run this in Supabase SQL Editor

-- First, check if the user exists
SELECT id, email, role FROM users WHERE email = 'deepakpandey911494@gmail.com';

-- If the user exists, update their role to admin
UPDATE users 
SET role = 'admin'
WHERE email = 'deepakpandey911494@gmail.com';

-- Verify it worked
SELECT id, email, role FROM users WHERE email = 'deepakpandey911494@gmail.com';

-- Also check all waitlist entries to make sure they exist
SELECT id, email, full_name, user_type, status, created_at 
FROM waitlist 
ORDER BY created_at DESC 
LIMIT 10;

