/**
 * Platform Analytics & Metrics
 * Production-ready analytics system for tracking DAU, WAU, MAU, and other key metrics
 */

import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'

// ============================================================================
// TYPES
// ============================================================================

export interface PlatformMetrics {
  date: string
  
  // User Metrics
  total_users: number
  active_founders: number
  active_investors: number
  new_signups: number
  
  // Engagement Metrics
  dau: number // Daily Active Users
  wau: number // Weekly Active Users
  mau: number // Monthly Active Users
  dau_mau_ratio: number // Stickiness ratio (%)
  dau_wau_ratio: number // Daily engagement rate (%)
  
  // Activity Metrics
  deals_created: number
  deals_viewed: number
  messages_sent: number
  interests_expressed: number
  profile_updates: number
  
  // Transaction Metrics
  investments_made: number
  total_invested: number // in rupees
  avg_investment: number
  
  // Content Metrics
  learning_modules_viewed: number
  documents_uploaded: number
  
  // Retention Metrics
  retention_rate?: number
  churn_rate?: number
}

export interface UserActivityEvent {
  user_id: string
  event_type: string
  event_category: 'engagement' | 'transaction' | 'content' | 'social'
  metadata?: Record<string, any>
  session_id?: string
}

export interface EngagementMetrics {
  high_engagement: number
  medium_engagement: number
  low_engagement: number
  inactive: number
}

export interface CohortAnalysis {
  cohort_month: string
  total_users: number
  retained_users: number
  retention_rate: number
}

export interface GrowthMetrics {
  period: string
  new_users: number
  churned_users: number
  net_growth: number
  growth_rate: number
}

// ============================================================================
// ACTIVITY TRACKING
// ============================================================================

/**
 * Track a user activity event
 */
export async function trackActivity(event: UserActivityEvent): Promise<void> {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('user_activity_events')
      .insert({
        user_id: event.user_id,
        event_type: event.event_type,
        event_category: event.event_category,
        metadata: event.metadata || {},
        session_id: event.session_id,
      })
    
    if (error) {
      logger.error('Failed to track activity', error, {
        component: 'ANALYTICS',
        event_type: event.event_type
      })
    }
  } catch (error) {
    logger.error('Error tracking activity', error as Error, {
      component: 'ANALYTICS'
    })
  }
}

/**
 * Track user login
 */
export async function trackLogin(userId: string, sessionId?: string): Promise<void> {
  await trackActivity({
    user_id: userId,
    event_type: 'login',
    event_category: 'engagement',
    session_id: sessionId,
  })
}

/**
 * Track deal view
 */
export async function trackDealView(userId: string, dealId: string): Promise<void> {
  await trackActivity({
    user_id: userId,
    event_type: 'deal_view',
    event_category: 'engagement',
    metadata: { deal_id: dealId },
  })
}

/**
 * Track deal creation
 */
export async function trackDealCreate(userId: string, dealId: string): Promise<void> {
  await trackActivity({
    user_id: userId,
    event_type: 'deal_create',
    event_category: 'transaction',
    metadata: { deal_id: dealId },
  })
}

/**
 * Track message sent
 */
export async function trackMessage(userId: string, recipientId: string): Promise<void> {
  await trackActivity({
    user_id: userId,
    event_type: 'message_sent',
    event_category: 'social',
    metadata: { recipient_id: recipientId },
  })
}

/**
 * Track interest expressed
 */
export async function trackInterest(userId: string, dealId: string, amount: number): Promise<void> {
  await trackActivity({
    user_id: userId,
    event_type: 'interest_expressed',
    event_category: 'transaction',
    metadata: { deal_id: dealId, amount },
  })
}

/**
 * Track learning module view
 */
export async function trackLearningView(userId: string, modulePath: string): Promise<void> {
  await trackActivity({
    user_id: userId,
    event_type: 'learning_view',
    event_category: 'content',
    metadata: { module_path: modulePath },
  })
}

// ============================================================================
// METRICS CALCULATION
// ============================================================================

/**
 * Get current platform metrics
 */
export async function getCurrentMetrics(): Promise<PlatformMetrics | null> {
  try {
    const supabase = createClient()
    
    // Get today's date
    const today = new Date().toISOString().split('T')[0]
    
    // Try to get existing metrics
    const { data, error } = await supabase
      .from('platform_metrics')
      .select('*')
      .eq('date', today)
      .single()
    
    if (error && error.code !== 'PGRST116') { // Not found is OK
      logger.error('Failed to fetch current metrics', error, {
        component: 'ANALYTICS'
      })
      return null
    }
    
    if (data) {
      return {
        ...data,
        total_invested: data.total_invested / 100, // Convert paise to rupees
        avg_investment: data.avg_investment / 100,
        dau_mau_ratio: data.mau > 0 ? (data.dau / data.mau) * 100 : 0,
        dau_wau_ratio: data.wau > 0 ? (data.dau / data.wau) * 100 : 0,
      }
    }
    
    return null
  } catch (error) {
    logger.error('Error fetching current metrics', error as Error, {
      component: 'ANALYTICS'
    })
    return null
  }
}

/**
 * Get metrics for a date range
 */
export async function getMetricsRange(
  startDate: string,
  endDate: string
): Promise<PlatformMetrics[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('platform_metrics')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })
    
    if (error) {
      logger.error('Failed to fetch metrics range', error, {
        component: 'ANALYTICS'
      })
      return []
    }
    
    return (data || []).map(m => ({
      ...m,
      total_invested: m.total_invested / 100,
      avg_investment: m.avg_investment / 100,
      dau_mau_ratio: m.mau > 0 ? (m.dau / m.mau) * 100 : 0,
      dau_wau_ratio: m.wau > 0 ? (m.dau / m.wau) * 100 : 0,
    }))
  } catch (error) {
    logger.error('Error fetching metrics range', error as Error, {
      component: 'ANALYTICS'
    })
    return []
  }
}

/**
 * Calculate DAU, WAU, MAU from raw activity data
 */
export async function calculateEngagementMetrics(): Promise<{
  dau: number
  wau: number
  mau: number
} | null> {
  try {
    const supabase = createClient()
    const now = new Date()
    
    // Calculate DAU (last 24 hours)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const { data: dauData } = await supabase
      .from('user_activity_events')
      .select('user_id')
      .gte('created_at', oneDayAgo.toISOString())
    
    const dau = new Set(dauData?.map(d => d.user_id) || []).size
    
    // Calculate WAU (last 7 days)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const { data: wauData } = await supabase
      .from('user_activity_events')
      .select('user_id')
      .gte('created_at', sevenDaysAgo.toISOString())
    
    const wau = new Set(wauData?.map(d => d.user_id) || []).size
    
    // Calculate MAU (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const { data: mauData } = await supabase
      .from('user_activity_events')
      .select('user_id')
      .gte('created_at', thirtyDaysAgo.toISOString())
    
    const mau = new Set(mauData?.map(d => d.user_id) || []).size
    
    return { dau, wau, mau }
  } catch (error) {
    logger.error('Error calculating engagement metrics', error as Error, {
      component: 'ANALYTICS'
    })
    return null
  }
}

/**
 * Get user engagement breakdown
 */
export async function getEngagementBreakdown(): Promise<EngagementMetrics | null> {
  try {
    const supabase = createClient()
    
    // Get latest engagement scores for all users
    const { data, error } = await supabase
      .from('user_engagement_scores')
      .select('engagement_level')
      .order('date', { ascending: false })
    
    if (error) {
      logger.error('Failed to fetch engagement breakdown', error, {
        component: 'ANALYTICS'
      })
      return null
    }
    
    const breakdown: EngagementMetrics = {
      high_engagement: 0,
      medium_engagement: 0,
      low_engagement: 0,
      inactive: 0,
    }
    
    // Count by engagement level
    const userLevels = new Map<string, string>()
    data?.forEach(score => {
      if (score.engagement_level) {
        userLevels.set(score.engagement_level, score.engagement_level)
      }
    })
    
    userLevels.forEach(level => {
      switch (level) {
        case 'high':
          breakdown.high_engagement++
          break
        case 'medium':
          breakdown.medium_engagement++
          break
        case 'low':
          breakdown.low_engagement++
          break
        case 'inactive':
          breakdown.inactive++
          break
      }
    })
    
    return breakdown
  } catch (error) {
    logger.error('Error fetching engagement breakdown', error as Error, {
      component: 'ANALYTICS'
    })
    return null
  }
}

/**
 * Get growth metrics over time
 */
export async function getGrowthMetrics(months: number = 6): Promise<GrowthMetrics[]> {
  try {
    const supabase = createClient()
    const result: GrowthMetrics[] = []
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      // Get new users in this month
      const { data: newUsers } = await supabase
        .from('users')
        .select('id')
        .gte('created_at', monthStart.toISOString())
        .lte('created_at', monthEnd.toISOString())
      
      // Calculate churned users (users who haven't been active in 30 days)
      const { data: activeUsers } = await supabase
        .from('user_activity_events')
        .select('user_id')
        .gte('created_at', monthStart.toISOString())
        .lte('created_at', monthEnd.toISOString())
      
      const newUserCount = newUsers?.length || 0
      const activeUserCount = new Set(activeUsers?.map(u => u.user_id) || []).size
      
      result.push({
        period: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        new_users: newUserCount,
        churned_users: 0, // To be calculated based on previous month
        net_growth: newUserCount,
        growth_rate: 0, // To be calculated
      })
    }
    
    return result
  } catch (error) {
    logger.error('Error fetching growth metrics', error as Error, {
      component: 'ANALYTICS'
    })
    return []
  }
}

/**
 * Get real-time stats (last hour)
 */
export async function getRealTimeStats(): Promise<{
  active_users: number
  events_count: number
  deals_viewed: number
  messages_sent: number
} | null> {
  try {
    const supabase = createClient()
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    
    const { data, error } = await supabase
      .from('user_activity_events')
      .select('user_id, event_type')
      .gte('created_at', oneHourAgo.toISOString())
    
    if (error) {
      logger.error('Failed to fetch real-time stats', error, {
        component: 'ANALYTICS'
      })
      return null
    }
    
    const activeUsers = new Set(data?.map(d => d.user_id) || []).size
    const dealsViewed = data?.filter(d => d.event_type === 'deal_view').length || 0
    const messagesSent = data?.filter(d => d.event_type === 'message_sent').length || 0
    
    return {
      active_users: activeUsers,
      events_count: data?.length || 0,
      deals_viewed: dealsViewed,
      messages_sent: messagesSent,
    }
  } catch (error) {
    logger.error('Error fetching real-time stats', error as Error, {
      component: 'ANALYTICS'
    })
    return null
  }
}

// ============================================================================
// ADMIN HELPERS
// ============================================================================

/**
 * Update today's metrics (should be called periodically)
 */
export async function updateTodayMetrics(): Promise<boolean> {
  try {
    const supabase = createClient()
    
    // Call the database function to update metrics
    const { error } = await supabase.rpc('update_daily_metrics')
    
    if (error) {
      logger.error('Failed to update daily metrics', error, {
        component: 'ANALYTICS'
      })
      return false
    }
    
    return true
  } catch (error) {
    logger.error('Error updating daily metrics', error as Error, {
      component: 'ANALYTICS'
    })
    return false
  }
}

/**
 * Export metrics to CSV (for reporting)
 */
export function exportMetricsToCSV(metrics: PlatformMetrics[]): string {
  const headers = [
    'Date',
    'DAU',
    'WAU',
    'MAU',
    'DAU/MAU %',
    'Total Users',
    'New Signups',
    'Deals Created',
    'Investments Made',
    'Total Invested (₹)',
    'Retention %',
  ]
  
  const rows = metrics.map(m => [
    m.date,
    m.dau,
    m.wau,
    m.mau,
    m.dau_mau_ratio.toFixed(2),
    m.total_users,
    m.new_signups,
    m.deals_created,
    m.investments_made,
    m.total_invested.toFixed(2),
    m.retention_rate?.toFixed(2) || '0',
  ])
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  return csv
}
