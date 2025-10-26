"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  Download,
  RefreshCw,
  Loader2,
  AlertCircle,
  Clock,
  UserCheck,
  Zap,
  Target,
  TrendingDown,
  Calendar,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { getMetricsRange, exportMetricsToCSV, PlatformMetrics } from '@/lib/analytics/metrics'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

interface AnalyticsData {
  // Current metrics
  currentMetrics: PlatformMetrics | null
  
  // Historical data
  dailyMetrics: PlatformMetrics[]
  dailyTrend: any[]
  weeklyTrend: any[]
  monthlyTrend: any[]
  
  // Engagement breakdown
  engagementData: any[]
  
  // Growth metrics
  growthData: any[]
  
  // Real-time
  realTime: {
    active_now: number
    events_hour: number
  }
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const router = useRouter()
  const supabase = createClient()

  const fetchAnalytics = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Check admin access
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()

      if (userError || !user || user.role !== 'admin') {
        setError('Unauthorized: Admin access only')
        return
      }

      // Calculate date range
      const endDate = new Date()
      const startDate = new Date()
      if (timeRange === '7d') startDate.setDate(startDate.getDate() - 7)
      else if (timeRange === '30d') startDate.setDate(startDate.getDate() - 30)
      else startDate.setDate(startDate.getDate() - 90)

      // Fetch metrics from database
      const { data: metricsData, error: metricsError } = await supabase
        .from('platform_metrics')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (metricsError) {
        logger.error('Failed to fetch metrics', metricsError, {
          component: 'ADMIN_ANALYTICS'
        })
      }

      const metrics = metricsData || []
      const currentMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null

      // Calculate DAU/WAU/MAU trend
      const dailyTrend = metrics.map(m => ({
        date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        DAU: m.dau || 0,
        WAU: m.wau || 0,
        MAU: m.mau || 0,
        'DAU/MAU %': m.mau > 0 ? ((m.dau / m.mau) * 100).toFixed(1) : 0,
      }))

      // Weekly aggregation
      const weeklyTrend = []
      for (let i = 0; i < metrics.length; i += 7) {
        const weekMetrics = metrics.slice(i, Math.min(i + 7, metrics.length))
        if (weekMetrics.length > 0) {
          weeklyTrend.push({
            week: `Week ${Math.floor(i / 7) + 1}`,
            avgDAU: Math.round(weekMetrics.reduce((sum, m) => sum + (m.dau || 0), 0) / weekMetrics.length),
            avgWAU: Math.round(weekMetrics.reduce((sum, m) => sum + (m.wau || 0), 0) / weekMetrics.length),
            newUsers: weekMetrics.reduce((sum, m) => sum + (m.new_signups || 0), 0),
          })
        }
      }

      // Monthly aggregation
      const monthlyMap = new Map<string, PlatformMetrics[]>()
      metrics.forEach(m => {
        const month = new Date(m.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        if (!monthlyMap.has(month)) monthlyMap.set(month, [])
        monthlyMap.get(month)!.push(m)
      })

      const monthlyTrend = Array.from(monthlyMap.entries()).map(([month, monthMetrics]) => ({
        month,
        avgDAU: Math.round(monthMetrics.reduce((sum, m) => sum + (m.dau || 0), 0) / monthMetrics.length),
        avgMAU: Math.round(monthMetrics.reduce((sum, m) => sum + (m.mau || 0), 0) / monthMetrics.length),
        newSignups: monthMetrics.reduce((sum, m) => sum + (m.new_signups || 0), 0),
        dealsCreated: monthMetrics.reduce((sum, m) => sum + (m.deals_created || 0), 0),
        investmentsMade: monthMetrics.reduce((sum, m) => sum + (m.investments_made || 0), 0),
      }))

      // Engagement breakdown (mock data - replace with actual query)
      const engagementData = [
        { name: 'High Engagement', value: 35, fill: '#10B981' },
        { name: 'Medium Engagement', value: 45, fill: '#3B82F6' },
        { name: 'Low Engagement', value: 15, fill: '#F59E0B' },
        { name: 'Inactive', value: 5, fill: '#EF4444' },
      ]

      // Growth data
      const growthData = monthlyTrend.map((m, i) => {
        const prevMonth = i > 0 ? monthlyTrend[i - 1] : null
        const growth = prevMonth ? ((m.newSignups - prevMonth.newSignups) / prevMonth.newSignups) * 100 : 0
        return {
          month: m.month,
          newSignups: m.newSignups,
          growth: growth.toFixed(1),
        }
      })

      // Real-time stats (last hour activity)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const { data: recentActivity } = await supabase
        .from('user_activity_events')
        .select('user_id, event_type')
        .gte('created_at', oneHourAgo.toISOString())

      const activeNow = new Set(recentActivity?.map(a => a.user_id) || []).size
      const eventsHour = recentActivity?.length || 0

      setData({
        currentMetrics: currentMetrics ? {
          ...currentMetrics,
          dau_mau_ratio: currentMetrics.mau > 0 ? (currentMetrics.dau / currentMetrics.mau) * 100 : 0,
          dau_wau_ratio: currentMetrics.wau > 0 ? (currentMetrics.dau / currentMetrics.wau) * 100 : 0,
        } : null,
        dailyMetrics: metrics,
        dailyTrend,
        weeklyTrend,
        monthlyTrend,
        engagementData,
        growthData,
        realTime: {
          active_now: activeNow,
          events_hour: eventsHour,
        },
      })

    } catch (error) {
      logger.error('Failed to fetch analytics', error as Error, {
        component: 'ADMIN_ANALYTICS'
      })
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [timeRange, router, supabase])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchAnalytics()
  }

  const handleExport = () => {
    if (!data?.dailyMetrics) return
    const csv = exportMetricsToCSV(data.dailyMetrics)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `incubazar-metrics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">{error}</h3>
          </CardContent>
        </Card>
      </div>
    )
  }

  const metrics = data?.currentMetrics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">Platform metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        <Button
          variant={timeRange === '7d' ? 'default' : 'outline'}
          onClick={() => setTimeRange('7d')}
        >
          Last 7 Days
        </Button>
        <Button
          variant={timeRange === '30d' ? 'default' : 'outline'}
          onClick={() => setTimeRange('30d')}
        >
          Last 30 Days
        </Button>
        <Button
          variant={timeRange === '90d' ? 'default' : 'outline'}
          onClick={() => setTimeRange('90d')}
        >
          Last 90 Days
        </Button>
      </div>

      {/* Real-Time Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-600" />
            Real-Time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Active Now</p>
              <p className="text-3xl font-bold text-green-600">{data?.realTime.active_now || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Events (Last Hour)</p>
              <p className="text-3xl font-bold text-green-600">{data?.realTime.events_hour || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics - DAU, WAU, MAU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="DAU (Daily Active Users)"
          value={metrics?.dau || 0}
          description="Users active today"
          icon={Users}
          variant="gradient-blue"
        />
        <StatCard
          title="WAU (Weekly Active Users)"
          value={metrics?.wau || 0}
          description="Users active this week"
          icon={Activity}
          variant="gradient-green"
        />
        <StatCard
          title="MAU (Monthly Active Users)"
          value={metrics?.mau || 0}
          description="Users active this month"
          icon={TrendingUp}
          variant="gradient-purple"
        />
        <StatCard
          title="DAU/MAU Ratio"
          value={`${metrics?.dau_mau_ratio?.toFixed(1) || 0}%`}
          description="Stickiness score"
          icon={Target}
          variant="gradient-orange"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Signups</p>
                <p className="text-2xl font-bold">{metrics?.new_signups || 0}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deals Created</p>
                <p className="text-2xl font-bold">{metrics?.deals_created || 0}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold">{metrics?.messages_sent || 0}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Investments Made</p>
                <p className="text-2xl font-bold">{metrics?.investments_made || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DAU/WAU/MAU Trend */}
            <Card>
              <CardHeader>
                <CardTitle>DAU / WAU / MAU Trend</CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data?.dailyTrend || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="DAU" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="WAU" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="MAU" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Distribution</CardTitle>
                <CardDescription>Breakdown by engagement level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data?.engagementData || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(data?.engagementData || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Stickiness Ratio */}
          <Card>
            <CardHeader>
              <CardTitle>Stickiness (DAU/MAU Ratio)</CardTitle>
              <CardDescription>Higher is better - indicates daily usage habits</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data?.dailyTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="DAU/MAU %" stroke="#F59E0B" fill="#FEF3C7" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Growth Tab */}
        <TabsContent value="growth" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Signups */}
            <Card>
              <CardHeader>
                <CardTitle>New User Signups</CardTitle>
                <CardDescription>User acquisition over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.growthData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newSignups" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Growth Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Month-over-Month Growth</CardTitle>
                <CardDescription>Growth rate percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.growthData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="growth" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
              <CardDescription>User actions and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data?.monthlyTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dealsCreated" fill="#3B82F6" name="Deals Created" />
                  <Bar dataKey="investmentsMade" fill="#10B981" name="Investments Made" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>Week-over-week comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data?.weeklyTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgDAU" stroke="#3B82F6" strokeWidth={2} name="Avg DAU" />
                  <Line type="monotone" dataKey="avgWAU" stroke="#10B981" strokeWidth={2} name="Avg WAU" />
                  <Line type="monotone" dataKey="newUsers" stroke="#F59E0B" strokeWidth={2} name="New Users" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights & Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="default">DAU/MAU</Badge>
            <p className="text-sm text-gray-700">
              Your stickiness ratio is <strong>{metrics?.dau_mau_ratio?.toFixed(1)}%</strong>.
              Industry benchmark: 20-30% for marketplace platforms.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="default">Growth</Badge>
            <p className="text-sm text-gray-700">
              Total users: <strong>{metrics?.total_users || 0}</strong>.
              New signups today: <strong>{metrics?.new_signups || 0}</strong>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="default">Activity</Badge>
            <p className="text-sm text-gray-700">
              Platform activity is {data?.realTime.events_hour! > 50 ? 'high' : 'moderate'} with{' '}
              <strong>{data?.realTime.events_hour}</strong> events in the last hour.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
