-- Learning Analytics (Optional - for platform insights, not user progress)
-- Track which modules are being read to understand what content is valuable

CREATE TABLE IF NOT EXISTS public.learning_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    module_path TEXT NOT NULL, -- e.g., '/learn/incorporation', '/learn/finance'
    module_title TEXT,
    visited_at TIMESTAMPTZ DEFAULT NOW(),
    time_spent_seconds INTEGER, -- Optional: track how long they stayed
    referrer TEXT, -- Where they came from
    user_role TEXT, -- 'founder', 'investor', 'admin' - for analytics
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_learning_analytics_user ON public.learning_analytics(user_id);
CREATE INDEX idx_learning_analytics_module ON public.learning_analytics(module_path);
CREATE INDEX idx_learning_analytics_visited ON public.learning_analytics(visited_at DESC);

-- RLS Policies
ALTER TABLE public.learning_analytics ENABLE ROW LEVEL SECURITY;

-- Users can only insert their own analytics
CREATE POLICY "Users can insert their own analytics"
    ON public.learning_analytics
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all analytics
CREATE POLICY "Admins can view all analytics"
    ON public.learning_analytics
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Users can view their own analytics (optional feature)
CREATE POLICY "Users can view their own analytics"
    ON public.learning_analytics
    FOR SELECT
    USING (auth.uid() = user_id);

-- COMMENT
COMMENT ON TABLE public.learning_analytics IS 'Optional analytics to track which learning modules are popular. Not for user progress tracking - this is a reference platform, not a course.';
