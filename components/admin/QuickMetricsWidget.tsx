/**
 * Quick Metrics Widget
 * Compact display of key platform metrics
 * Can be embedded in any admin page
 */

"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp, Activity, Target } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface QuickMetrics {
  dau: number
  wau: number
  mau: number
  dau_mau_ratio: number
  active_now: number
}

export function QuickMetricsWidget() {
  const [metrics, setMetrics] = useState<QuickMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuickMetrics = async () => {
      const supabase = createClient()
      
      try {
        // Get latest platform metrics
        const { data: latestMetrics } = await supabase
          .from('platform_metrics')
          .select('dau, wau, mau')
          .order('date', { ascending: false })
          .limit(1)
          .single()

        // Get active users in last hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
        const { data: recentActivity } = await supabase
          .from('user_activity_events')
          .select('user_id')
          .gte('created_at', oneHourAgo.toISOString())

        const activeNow = new Set(recentActivity?.map(a => a.user_id) || []).size

        if (latestMetrics) {
          setMetrics({
            dau: latestMetrics.dau || 0,
            wau: latestMetrics.wau || 0,
            mau: latestMetrics.mau || 0,
            dau_mau_ratio: latestMetrics.mau > 0 
              ? (latestMetrics.dau / latestMetrics.mau) * 100 
              : 0,
            active_now: activeNow,
          })
        }
      } catch (error) {
        console.error('Failed to fetch quick metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuickMetrics()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchQuickMetrics, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse">Loading metrics...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!metrics) return null

  const getStickinessLevel = (ratio: number) => {
    if (ratio >= 30) return { label: 'Excellent', color: 'bg-green-500' }
    if (ratio >= 20) return { label: 'Good', color: 'bg-blue-500' }
    if (ratio >= 10) return { label: 'Fair', color: 'bg-yellow-500' }
    return { label: 'Needs Work', color: 'bg-orange-500' }
  }

  const stickiness = getStickinessLevel(metrics.dau_mau_ratio)

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Platform Pulse
          </span>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Active Now */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2" />
              <span className="text-xs text-gray-600">Active Now</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{metrics.active_now}</div>
          </div>

          {/* DAU */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-3 w-3 text-blue-600 mr-1" />
              <span className="text-xs text-gray-600">DAU</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{metrics.dau}</div>
          </div>

          {/* WAU */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className="h-3 w-3 text-indigo-600 mr-1" />
              <span className="text-xs text-gray-600">WAU</span>
            </div>
            <div className="text-2xl font-bold text-indigo-600">{metrics.wau}</div>
          </div>

          {/* MAU */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-3 w-3 text-purple-600 mr-1" />
              <span className="text-xs text-gray-600">MAU</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{metrics.mau}</div>
          </div>

          {/* Stickiness */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-3 w-3 text-orange-600 mr-1" />
              <span className="text-xs text-gray-600">Stickiness</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="text-2xl font-bold text-orange-600">
                {metrics.dau_mau_ratio.toFixed(1)}%
              </div>
              <Badge className={`${stickiness.color} text-white text-[10px] px-1`}>
                {stickiness.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 pt-3 border-t border-blue-200">
          <p className="text-xs text-center text-gray-600">
            DAU/MAU ratio (stickiness) indicates how often users return. Industry benchmark: 20-30%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
