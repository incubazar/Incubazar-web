-- Fix users table to allow signup from registration
-- Run this in Supabase SQL Editor

-- Drop existing restrictive policies that might block registration
DROP POLICY IF EXISTS "Users can insert their own record" ON users;

-- Allow authenticated users to insert their own record during signup
CREATE POLICY "Users can create their own record during signup" ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies 
WHERE tablename = 'users' AND cmd = 'INSERT';

