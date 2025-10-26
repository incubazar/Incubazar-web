-- Platform Analytics & Metrics System
-- Tracks user engagement, activity patterns, and platform health metrics
-- For production-ready admin dashboard with DAU, WAU, MAU analytics

-- ============================================================================
-- USER ACTIVITY TRACKING
-- ============================================================================

-- User activity events table
CREATE TABLE IF NOT EXISTS public.user_activity_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'login', 'deal_view', 'deal_create', 'message_sent', 'profile_update', etc.
    event_category TEXT NOT NULL, -- 'engagement', 'transaction', 'content', 'social'
    metadata JSONB DEFAULT '{}'::jsonb, -- Additional event data
    session_id TEXT, -- For session tracking
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily active users summary
CREATE TABLE IF NOT EXISTS public.daily_active_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    total_dau INTEGER DEFAULT 0,
    founder_dau INTEGER DEFAULT 0,
    investor_dau INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    returning_users INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform metrics snapshot (daily aggregation)
CREATE TABLE IF NOT EXISTS public.platform_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    
    -- User Metrics
    total_users INTEGER DEFAULT 0,
    active_founders INTEGER DEFAULT 0,
    active_investors INTEGER DEFAULT 0,
    new_signups INTEGER DEFAULT 0,
    
    -- Engagement Metrics
    dau INTEGER DEFAULT 0, -- Daily Active Users
    wau INTEGER DEFAULT 0, -- Weekly Active Users
    mau INTEGER DEFAULT 0, -- Monthly Active Users
    
    -- Activity Metrics
    deals_created INTEGER DEFAULT 0,
    deals_viewed INTEGER DEFAULT 0,
    messages_sent INTEGER DEFAULT 0,
    interests_expressed INTEGER DEFAULT 0,
    profile_updates INTEGER DEFAULT 0,
    
    -- Transaction Metrics
    investments_made INTEGER DEFAULT 0,
    total_invested BIGINT DEFAULT 0, -- in paise
    avg_investment BIGINT DEFAULT 0,
    
    -- Content Metrics
    learning_modules_viewed INTEGER DEFAULT 0,
    documents_uploaded INTEGER DEFAULT 0,
    
    -- Retention Metrics
    retention_rate DECIMAL(5,2), -- Percentage
    churn_rate DECIMAL(5,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User engagement scores (calculated daily)
CREATE TABLE IF NOT EXISTS public.user_engagement_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Activity counts
    logins INTEGER DEFAULT 0,
    actions INTEGER DEFAULT 0, -- Total actions taken
    time_spent_minutes INTEGER DEFAULT 0,
    
    -- Engagement score (0-100)
    engagement_score INTEGER DEFAULT 0,
    engagement_level TEXT, -- 'high', 'medium', 'low', 'inactive'
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, date)
);

-- Session tracking
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    pages_viewed INTEGER DEFAULT 0,
    actions_taken INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_activity_events_user ON public.user_activity_events(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_events_type ON public.user_activity_events(event_type);
CREATE INDEX IF NOT EXISTS idx_activity_events_created ON public.user_activity_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_events_category ON public.user_activity_events(event_category);

CREATE INDEX IF NOT EXISTS idx_dau_date ON public.daily_active_users(date DESC);

CREATE INDEX IF NOT EXISTS idx_platform_metrics_date ON public.platform_metrics(date DESC);

CREATE INDEX IF NOT EXISTS idx_engagement_user_date ON public.user_engagement_scores(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_engagement_level ON public.user_engagement_scores(engagement_level);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON public.user_sessions(started_at DESC);

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE public.user_activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_active_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_engagement_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Activity events: Users can insert their own, admins can view all
CREATE POLICY "Users can insert own activity events"
    ON public.user_activity_events
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity events"
    ON public.user_activity_events
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- DAU: Admin only
CREATE POLICY "Admins can view DAU"
    ON public.daily_active_users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Platform metrics: Admin only
CREATE POLICY "Admins can view platform metrics"
    ON public.platform_metrics
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Engagement scores: Users can view own, admins view all
CREATE POLICY "Users can view own engagement scores"
    ON public.user_engagement_scores
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all engagement scores"
    ON public.user_engagement_scores
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Sessions: Users can view own, admins view all
CREATE POLICY "Users can view own sessions"
    ON public.user_sessions
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions"
    ON public.user_sessions
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to calculate DAU for a specific date
CREATE OR REPLACE FUNCTION calculate_dau(target_date DATE)
RETURNS TABLE (
    total_dau BIGINT,
    founder_dau BIGINT,
    investor_dau BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(DISTINCT ae.user_id)::BIGINT as total_dau,
        COUNT(DISTINCT CASE WHEN u.role = 'founder' THEN ae.user_id END)::BIGINT as founder_dau,
        COUNT(DISTINCT CASE WHEN u.role = 'investor' THEN ae.user_id END)::BIGINT as investor_dau
    FROM user_activity_events ae
    LEFT JOIN users u ON ae.user_id = u.id
    WHERE DATE(ae.created_at) = target_date;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate WAU (last 7 days)
CREATE OR REPLACE FUNCTION calculate_wau(target_date DATE)
RETURNS BIGINT AS $$
DECLARE
    wau_count BIGINT;
BEGIN
    SELECT COUNT(DISTINCT user_id)
    INTO wau_count
    FROM user_activity_events
    WHERE created_at >= target_date - INTERVAL '7 days'
    AND created_at < target_date + INTERVAL '1 day';
    
    RETURN COALESCE(wau_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to calculate MAU (last 30 days)
CREATE OR REPLACE FUNCTION calculate_mau(target_date DATE)
RETURNS BIGINT AS $$
DECLARE
    mau_count BIGINT;
BEGIN
    SELECT COUNT(DISTINCT user_id)
    INTO mau_count
    FROM user_activity_events
    WHERE created_at >= target_date - INTERVAL '30 days'
    AND created_at < target_date + INTERVAL '1 day';
    
    RETURN COALESCE(mau_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to update daily metrics (to be run daily via cron)
CREATE OR REPLACE FUNCTION update_daily_metrics()
RETURNS void AS $$
DECLARE
    today DATE := CURRENT_DATE;
    dau_result RECORD;
    wau_count BIGINT;
    mau_count BIGINT;
BEGIN
    -- Calculate DAU
    SELECT * INTO dau_result FROM calculate_dau(today);
    
    -- Calculate WAU
    wau_count := calculate_wau(today);
    
    -- Calculate MAU
    mau_count := calculate_mau(today);
    
    -- Insert or update daily active users
    INSERT INTO daily_active_users (date, total_dau, founder_dau, investor_dau)
    VALUES (today, dau_result.total_dau, dau_result.founder_dau, dau_result.investor_dau)
    ON CONFLICT (date) 
    DO UPDATE SET 
        total_dau = EXCLUDED.total_dau,
        founder_dau = EXCLUDED.founder_dau,
        investor_dau = EXCLUDED.investor_dau,
        updated_at = NOW();
    
    -- Update platform metrics
    INSERT INTO platform_metrics (
        date, dau, wau, mau
    )
    VALUES (
        today, dau_result.total_dau::INTEGER, wau_count::INTEGER, mau_count::INTEGER
    )
    ON CONFLICT (date)
    DO UPDATE SET
        dau = EXCLUDED.dau,
        wau = EXCLUDED.wau,
        mau = EXCLUDED.mau,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEWS FOR EASY QUERYING
-- ============================================================================

-- Recent activity summary
CREATE OR REPLACE VIEW recent_activity_summary AS
SELECT 
    event_type,
    event_category,
    COUNT(*) as event_count,
    COUNT(DISTINCT user_id) as unique_users,
    DATE(created_at) as event_date
FROM user_activity_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY event_type, event_category, DATE(created_at)
ORDER BY event_date DESC, event_count DESC;

-- User engagement summary
CREATE OR REPLACE VIEW user_engagement_summary AS
SELECT 
    u.id,
    u.email,
    u.role,
    ues.engagement_level,
    ues.engagement_score,
    ues.logins,
    ues.actions,
    ues.time_spent_minutes,
    u.created_at as user_since
FROM users u
LEFT JOIN LATERAL (
    SELECT * FROM user_engagement_scores
    WHERE user_id = u.id
    ORDER BY date DESC
    LIMIT 1
) ues ON true;

-- Platform health dashboard
CREATE OR REPLACE VIEW platform_health AS
SELECT 
    date,
    dau,
    wau,
    mau,
    CASE 
        WHEN mau > 0 THEN ROUND((dau::DECIMAL / mau) * 100, 2)
        ELSE 0 
    END as dau_mau_ratio,
    CASE 
        WHEN wau > 0 THEN ROUND((dau::DECIMAL / wau) * 100, 2)
        ELSE 0 
    END as dau_wau_ratio,
    total_users,
    new_signups,
    deals_created,
    investments_made,
    total_invested
FROM platform_metrics
ORDER BY date DESC
LIMIT 90; -- Last 90 days

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.user_activity_events IS 'Tracks all user activity events for analytics and engagement tracking';
COMMENT ON TABLE public.daily_active_users IS 'Daily snapshot of active user counts (DAU)';
COMMENT ON TABLE public.platform_metrics IS 'Comprehensive platform metrics including DAU, WAU, MAU, and business KPIs';
COMMENT ON TABLE public.user_engagement_scores IS 'Individual user engagement scores and activity levels';
COMMENT ON TABLE public.user_sessions IS 'User session tracking for session-based analytics';

COMMENT ON FUNCTION calculate_dau IS 'Calculates Daily Active Users for a specific date';
COMMENT ON FUNCTION calculate_wau IS 'Calculates Weekly Active Users (7-day window)';
COMMENT ON FUNCTION calculate_mau IS 'Calculates Monthly Active Users (30-day window)';
COMMENT ON FUNCTION update_daily_metrics IS 'Updates all daily metrics - should be run via cron job';
