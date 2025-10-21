-- Create startup_details table to store comprehensive information
CREATE TABLE IF NOT EXISTS public.startup_details (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    founder_profile_id UUID REFERENCES public.founder_profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    
    -- Basic Information
    founded_date TEXT,
    website TEXT,
    
    -- Team Information
    founder_names TEXT,
    team_size TEXT,
    key_team_members TEXT,
    advisor_names TEXT,
    
    -- Product/Solution
    problem_statement TEXT,
    solution_description TEXT,
    unique_value_proposition TEXT,
    target_customer TEXT,
    product_status TEXT,
    
    -- Market & Competition
    market_size TEXT,
    target_market TEXT,
    competitors TEXT,
    competitive_advantage TEXT,
    
    -- Traction & Metrics
    current_users TEXT,
    monthly_revenue TEXT,
    revenue_growth TEXT,
    key_achievements TEXT,
    
    -- Fundraising
    fundraising_goal TEXT,
    funds_use TEXT,
    previous_funding TEXT,
    equity_offered TEXT,
    
    -- Vision
    one_year_goal TEXT,
    three_year_vision TEXT,
    exit_strategy TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for startup_details
ALTER TABLE public.startup_details ENABLE ROW LEVEL SECURITY;

-- Founders can view and edit their own startup details
CREATE POLICY "Founders can view their own startup details"
    ON public.startup_details
    FOR SELECT
    USING (
        founder_profile_id IN (
            SELECT id FROM public.founder_profiles
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Founders can insert their own startup details"
    ON public.startup_details
    FOR INSERT
    WITH CHECK (
        founder_profile_id IN (
            SELECT id FROM public.founder_profiles
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Founders can update their own startup details"
    ON public.startup_details
    FOR UPDATE
    USING (
        founder_profile_id IN (
            SELECT id FROM public.founder_profiles
            WHERE user_id = auth.uid()
        )
    );

-- Investors can view startup details
CREATE POLICY "Investors can view approved startup details"
    ON public.startup_details
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'investor'
        )
        AND founder_profile_id IN (
            SELECT id FROM public.founder_profiles
            WHERE admin_approval_status = 'approved'
        )
    );

-- Admins can view all startup details
CREATE POLICY "Admins can view all startup details"
    ON public.startup_details
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Create index for better query performance
CREATE INDEX idx_startup_details_founder_profile ON public.startup_details(founder_profile_id);

-- Create updated_at trigger
CREATE TRIGGER update_startup_details_updated_at
    BEFORE UPDATE ON public.startup_details
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

