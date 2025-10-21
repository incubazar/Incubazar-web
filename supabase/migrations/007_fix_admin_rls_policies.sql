-- Fix RLS policies for admin operations
-- The existing "FOR ALL" policies might not be working properly
-- Let's add explicit UPDATE policies for admins

-- Drop existing broad admin policies and recreate them more explicitly
DROP POLICY IF EXISTS "Admins can view all investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can view all founder profiles" ON public.founder_profiles;

-- Investor profiles - Admin policies
CREATE POLICY "Admins can SELECT all investor profiles" ON public.investor_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can UPDATE all investor profiles" ON public.investor_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can INSERT investor profiles" ON public.investor_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can DELETE investor profiles" ON public.investor_profiles
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Founder profiles - Admin policies
CREATE POLICY "Admins can SELECT all founder profiles" ON public.founder_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can UPDATE all founder profiles" ON public.founder_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can INSERT founder profiles" ON public.founder_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can DELETE founder profiles" ON public.founder_profiles
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Recreate other admin "FOR ALL" policies with explicit operations
DROP POLICY IF EXISTS "Admins can view all deals" ON public.startup_deals;

CREATE POLICY "Admins can SELECT all deals" ON public.startup_deals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can UPDATE all deals" ON public.startup_deals
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can INSERT deals" ON public.startup_deals
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can DELETE deals" ON public.startup_deals
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

