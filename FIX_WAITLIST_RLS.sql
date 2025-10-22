-- Quick Fix for Waitlist RLS Policies
-- Run this in Supabase SQL Editor if you've already run the migration

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Users can view their own waitlist entry" ON waitlist;
DROP POLICY IF EXISTS "Users can view their own OTPs" ON otp_verifications;
DROP POLICY IF EXISTS "Admins can view all OTPs" ON otp_verifications;

-- Also drop the new ones in case they exist
DROP POLICY IF EXISTS "Anyone can view waitlist by email" ON waitlist;
DROP POLICY IF EXISTS "Public can access OTP verifications" ON otp_verifications;

-- Create new permissive policies for public access
CREATE POLICY "Anyone can view waitlist by email" ON waitlist
  FOR SELECT USING (true);

CREATE POLICY "Public can access OTP verifications" ON otp_verifications
  FOR ALL USING (true) WITH CHECK (true);

-- Verify policies are active
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('waitlist', 'otp_verifications')
ORDER BY tablename, policyname;

