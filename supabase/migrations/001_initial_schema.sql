-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('founder', 'investor', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE incorporation_status AS ENUM ('incorporated', 'not_incorporated');
CREATE TYPE startup_stage AS ENUM ('idea', 'mvp', 'early_revenue');
CREATE TYPE investor_type AS ENUM ('individual', 'hni', 'experienced_professional');
CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE subscription_tier AS ENUM ('free', 'pro');
CREATE TYPE instrument_type AS ENUM ('safe', 'ccd', 'equity');
CREATE TYPE interest_status AS ENUM ('viewed', 'interested', 'documents_requested', 'invested');
CREATE TYPE document_type AS ENUM ('term_sheet', 'pas4', 'subscription_agreement');
CREATE TYPE signature_status AS ENUM ('draft', 'sent', 'signed');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE plan_type AS ENUM ('founder_basic', 'founder_pro', 'investor_pro');
CREATE TYPE admin_approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create users table (extends auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL,
    full_name TEXT,
    phone TEXT,
    verification_status verification_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create founder_profiles table
CREATE TABLE public.founder_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    startup_name TEXT NOT NULL,
    incorporation_status incorporation_status NOT NULL,
    incorporation_number TEXT,
    industry_sector TEXT NOT NULL,
    stage startup_stage NOT NULL,
    pitch_deck_url TEXT,
    logo_url TEXT,
    profile_completion_percentage INTEGER DEFAULT 0 CHECK (profile_completion_percentage >= 0 AND profile_completion_percentage <= 100),
    admin_approval_status admin_approval_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investor_profiles table
CREATE TABLE public.investor_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    investor_type investor_type NOT NULL,
    linkedin_url TEXT,
    kyc_status kyc_status DEFAULT 'pending',
    kyc_document_url TEXT,
    investment_preferences JSONB NOT NULL DEFAULT '{}',
    subscription_tier subscription_tier DEFAULT 'free',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create startup_deals table
CREATE TABLE public.startup_deals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    founder_profile_id UUID REFERENCES public.founder_profiles(id) ON DELETE CASCADE NOT NULL,
    deal_title TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    solution TEXT NOT NULL,
    market_size TEXT NOT NULL,
    business_model TEXT NOT NULL,
    traction_metrics JSONB NOT NULL DEFAULT '{}',
    fundraising_goal NUMERIC NOT NULL CHECK (fundraising_goal > 0),
    min_investment NUMERIC NOT NULL CHECK (min_investment > 0),
    max_investment NUMERIC NOT NULL CHECK (max_investment > 0),
    instrument_type instrument_type NOT NULL,
    investor_count INTEGER DEFAULT 0 CHECK (investor_count >= 0),
    investor_limit INTEGER DEFAULT 200 CHECK (investor_limit > 0),
    is_active BOOLEAN DEFAULT true,
    platform_scorecard JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_investment_range CHECK (max_investment >= min_investment)
);

-- Create investor_interests table
CREATE TABLE public.investor_interests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    investor_profile_id UUID REFERENCES public.investor_profiles(id) ON DELETE CASCADE NOT NULL,
    startup_deal_id UUID REFERENCES public.startup_deals(id) ON DELETE CASCADE NOT NULL,
    interest_status interest_status DEFAULT 'viewed',
    investment_amount NUMERIC CHECK (investment_amount > 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(investor_profile_id, startup_deal_id)
);

-- Create generated_documents table
CREATE TABLE public.generated_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    startup_deal_id UUID REFERENCES public.startup_deals(id) ON DELETE CASCADE NOT NULL,
    document_type document_type NOT NULL,
    document_url TEXT NOT NULL,
    signature_status signature_status DEFAULT 'draft',
    docusign_envelope_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quarterly_updates table
CREATE TABLE public.quarterly_updates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    startup_deal_id UUID REFERENCES public.startup_deals(id) ON DELETE CASCADE NOT NULL,
    quarter TEXT NOT NULL,
    revenue NUMERIC NOT NULL CHECK (revenue >= 0),
    burn_rate NUMERIC NOT NULL CHECK (burn_rate >= 0),
    key_metrics JSONB NOT NULL DEFAULT '{}',
    progress_summary TEXT NOT NULL,
    challenges TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription_payments table
CREATE TABLE public.subscription_payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    razorpay_payment_id TEXT NOT NULL UNIQUE,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    plan_type plan_type NOT NULL,
    status payment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_verification_status ON public.users(verification_status);
CREATE INDEX idx_founder_profiles_user_id ON public.founder_profiles(user_id);
CREATE INDEX idx_founder_profiles_admin_approval_status ON public.founder_profiles(admin_approval_status);
CREATE INDEX idx_investor_profiles_user_id ON public.investor_profiles(user_id);
CREATE INDEX idx_investor_profiles_kyc_status ON public.investor_profiles(kyc_status);
CREATE INDEX idx_startup_deals_founder_profile_id ON public.startup_deals(founder_profile_id);
CREATE INDEX idx_startup_deals_is_active ON public.startup_deals(is_active);
CREATE INDEX idx_investor_interests_investor_profile_id ON public.investor_interests(investor_profile_id);
CREATE INDEX idx_investor_interests_startup_deal_id ON public.investor_interests(startup_deal_id);
CREATE INDEX idx_investor_interests_interest_status ON public.investor_interests(interest_status);
CREATE INDEX idx_generated_documents_startup_deal_id ON public.generated_documents(startup_deal_id);
CREATE INDEX idx_quarterly_updates_startup_deal_id ON public.quarterly_updates(startup_deal_id);
CREATE INDEX idx_subscription_payments_user_id ON public.subscription_payments(user_id);
CREATE INDEX idx_subscription_payments_status ON public.subscription_payments(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_founder_profiles_updated_at BEFORE UPDATE ON public.founder_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_profiles_updated_at BEFORE UPDATE ON public.investor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_startup_deals_updated_at BEFORE UPDATE ON public.startup_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_interests_updated_at BEFORE UPDATE ON public.investor_interests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_generated_documents_updated_at BEFORE UPDATE ON public.generated_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to enforce 200-investor limit
CREATE OR REPLACE FUNCTION check_investor_limit()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if adding this interest would exceed the limit
    IF (SELECT investor_count FROM public.startup_deals WHERE id = NEW.startup_deal_id) >= 
       (SELECT investor_limit FROM public.startup_deals WHERE id = NEW.startup_deal_id) THEN
        RAISE EXCEPTION 'Cannot add more investors. Deal has reached the 200-investor limit.';
    END IF;
    
    -- Update the investor count when a new interest is added
    IF NEW.interest_status = 'invested' THEN
        UPDATE public.startup_deals 
        SET investor_count = investor_count + 1 
        WHERE id = NEW.startup_deal_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to enforce investor limit
CREATE TRIGGER enforce_investor_limit 
    BEFORE INSERT OR UPDATE ON public.investor_interests 
    FOR EACH ROW EXECUTE FUNCTION check_investor_limit();

-- Create functions for investor count management
CREATE OR REPLACE FUNCTION increment_investor_count(deal_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE startup_deals 
    SET investor_count = investor_count + 1,
        updated_at = NOW()
    WHERE id = deal_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_investor_count(deal_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE startup_deals 
    SET investor_count = GREATEST(investor_count - 1, 0),
        updated_at = NOW()
    WHERE id = deal_id;
END;
$$ LANGUAGE plpgsql;
