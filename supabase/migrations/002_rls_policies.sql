-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quarterly_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_payments ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Admins can see all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Founder profiles policies
-- Founders can only see their own profile
CREATE POLICY "Founders can view own profile" ON public.founder_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Founders can update their own profile
CREATE POLICY "Founders can update own profile" ON public.founder_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Founders can insert their own profile
CREATE POLICY "Founders can insert own profile" ON public.founder_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can see all founder profiles
CREATE POLICY "Admins can view all founder profiles" ON public.founder_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Investor profiles policies
-- Investors can only see their own profile
CREATE POLICY "Investors can view own profile" ON public.investor_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Investors can update their own profile
CREATE POLICY "Investors can update own profile" ON public.investor_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Investors can insert their own profile
CREATE POLICY "Investors can insert own profile" ON public.investor_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can see all investor profiles
CREATE POLICY "Admins can view all investor profiles" ON public.investor_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Startup deals policies
-- Only authenticated users can see approved deals
CREATE POLICY "Authenticated users can view approved deals" ON public.startup_deals
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.admin_approval_status = 'approved'
        )
    );

-- Founders can see their own deals
CREATE POLICY "Founders can view own deals" ON public.startup_deals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can insert their own deals
CREATE POLICY "Founders can insert own deals" ON public.startup_deals
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can update their own deals
CREATE POLICY "Founders can update own deals" ON public.startup_deals
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.founder_profiles fp
            WHERE fp.id = founder_profile_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Admins can see all deals
CREATE POLICY "Admins can view all deals" ON public.startup_deals
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Investor interests policies
-- Investors can see their own interests
CREATE POLICY "Investors can view own interests" ON public.investor_interests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.investor_profiles ip
            WHERE ip.id = investor_profile_id 
            AND ip.user_id = auth.uid()
        )
    );

-- Investors can insert their own interests
CREATE POLICY "Investors can insert own interests" ON public.investor_interests
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.investor_profiles ip
            WHERE ip.id = investor_profile_id 
            AND ip.user_id = auth.uid()
        )
    );

-- Investors can update their own interests
CREATE POLICY "Investors can update own interests" ON public.investor_interests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.investor_profiles ip
            WHERE ip.id = investor_profile_id 
            AND ip.user_id = auth.uid()
        )
    );

-- Founders can see interests in their deals
CREATE POLICY "Founders can view interests in their deals" ON public.investor_interests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Admins can see all interests
CREATE POLICY "Admins can view all interests" ON public.investor_interests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Generated documents policies
-- Founders can see documents for their deals
CREATE POLICY "Founders can view own deal documents" ON public.generated_documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can insert documents for their deals
CREATE POLICY "Founders can insert own deal documents" ON public.generated_documents
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can update documents for their deals
CREATE POLICY "Founders can update own deal documents" ON public.generated_documents
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Admins can see all documents
CREATE POLICY "Admins can view all documents" ON public.generated_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Quarterly updates policies
-- Founders can see updates for their deals
CREATE POLICY "Founders can view own deal updates" ON public.quarterly_updates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Founders can insert updates for their deals
CREATE POLICY "Founders can insert own deal updates" ON public.quarterly_updates
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.startup_deals sd
            JOIN public.founder_profiles fp ON fp.id = sd.founder_profile_id
            WHERE sd.id = startup_deal_id 
            AND fp.user_id = auth.uid()
        )
    );

-- Investors can see updates for deals they're interested in
CREATE POLICY "Investors can view updates for interested deals" ON public.quarterly_updates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.investor_interests ii
            JOIN public.investor_profiles ip ON ip.id = ii.investor_profile_id
            WHERE ii.startup_deal_id = startup_deal_id 
            AND ip.user_id = auth.uid()
        )
    );

-- Admins can see all updates
CREATE POLICY "Admins can view all updates" ON public.quarterly_updates
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Subscription payments policies
-- Users can see their own payments
CREATE POLICY "Users can view own payments" ON public.subscription_payments
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own payments
CREATE POLICY "Users can insert own payments" ON public.subscription_payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can see all payments
CREATE POLICY "Admins can view all payments" ON public.subscription_payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is founder
CREATE OR REPLACE FUNCTION is_founder()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'founder'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is investor
CREATE OR REPLACE FUNCTION is_investor()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'investor'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
