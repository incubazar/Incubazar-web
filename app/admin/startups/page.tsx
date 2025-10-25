"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Users,
  TrendingUp,
  Loader2,
  ArrowLeft,
  Search,
  Filter,
  DollarSign,
  FileText,
  Mail,
  Phone,
  Globe,
  MapPin,
  Target
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface StartupData {
  id: string
  user_id: string
  startup_name: string
  incorporation_status: string
  incorporation_number: string | null
  industry_sector: string
  stage: string
  admin_approval_status: string
  profile_completion_percentage: number
  created_at: string
  users: {
    full_name: string
    email: string
    phone: string
  }
  startup_details?: {
    founder_names: string
    founded_date: string
    website: string
    team_size: string
    problem_statement: string
    solution_description: string
    fundraising_goal: string
    current_users: string
    monthly_revenue: string
    location: string
  }
  startup_deals?: Array<{
    id: string
    fundraising_goal: number
    minimum_investment: number
    is_active: boolean
    created_at: string
  }>
}

export default function AdminStartupsPage() {
  const [startups, setStartups] = useState<StartupData[]>([])
  const [filteredStartups, setFilteredStartups] = useState<StartupData[]>([])
  const [selectedStartup, setSelectedStartup] = useState<StartupData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [stageFilter, setStageFilter] = useState<'all' | 'idea' | 'mvp' | 'early_revenue'>('all')
  const [sectorFilter, setSectorFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  const fetchStartups = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()

      if (userError || !user || user.role !== 'admin') {
        router.push('/')
        return
      }

      // Fetch all founder profiles with related data
      const { data: founderProfiles, error } = await supabase
        .from('founder_profiles')
        .select(`
          *,
          users!user_id (
            full_name,
            email,
            phone
          ),
          startup_details (*),
          startup_deals (
            id,
            fundraising_goal,
            minimum_investment,
            is_active,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      setStartups(founderProfiles || [])
    } catch (error) {
      logger.error('Failed to fetch startups', error as Error, {
        component: 'ADMIN_STARTUPS',
        action: 'FETCH'
      })
      toast.error('Failed to load startups')
    } finally {
      setLoading(false)
    }
  }, [router, supabase])

  const filterStartups = useCallback(() => {
    let filtered = [...startups]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.startup_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.users.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.industry_sector.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.admin_approval_status === statusFilter)
    }

    // Stage filter
    if (stageFilter !== 'all') {
      filtered = filtered.filter(s => s.stage === stageFilter)
    }

    // Sector filter
    if (sectorFilter !== 'all') {
      filtered = filtered.filter(s => s.industry_sector === sectorFilter)
    }

    setFilteredStartups(filtered)
  }, [startups, searchTerm, statusFilter, stageFilter, sectorFilter])

  useEffect(() => {
    fetchStartups()
  }, [fetchStartups])

  useEffect(() => {
    filterStartups()
  }, [filterStartups])

  const getUniqueSecrors = () => {
    const sectors = new Set(startups.map(s => s.industry_sector))
    return Array.from(sectors).sort()
  }

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      'idea': 'Idea Stage',
      'mvp': 'MVP Stage',
      'early_revenue': 'Early Revenue'
    }
    return labels[stage] || stage
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    return `₹${amount.toLocaleString()}`
  }

  const getStats = () => {
    return {
      total: startups.length,
      approved: startups.filter(s => s.admin_approval_status === 'approved').length,
      pending: startups.filter(s => s.admin_approval_status === 'pending').length,
      rejected: startups.filter(s => s.admin_approval_status === 'rejected').length,
      idea: startups.filter(s => s.stage === 'idea').length,
      mvp: startups.filter(s => s.stage === 'mvp').length,
      earlyRevenue: startups.filter(s => s.stage === 'early_revenue').length,
      activeDeals: startups.filter(s => s.startup_deals?.some(d => d.is_active)).length
    }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">All Startups</h1>
            <p className="text-lg text-gray-600">Comprehensive view of all registered startups</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.idea}</p>
              <p className="text-sm text-gray-600">Idea</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.mvp}</p>
              <p className="text-sm text-gray-600">MVP</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{stats.earlyRevenue}</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{stats.activeDeals}</p>
              <p className="text-sm text-gray-600">Active Deals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by startup name, founder, email, or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <Filter className="h-5 w-5 text-gray-400 mt-2" />
              <span className="text-sm text-gray-600 mt-2">Status:</span>
              <Button
                size="sm"
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('approved')}
              >
                Approved
              </Button>
              <Button
                size="sm"
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                size="sm"
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected
              </Button>
            </div>

            <div className="flex gap-2">
              <span className="text-sm text-gray-600 mt-2">Stage:</span>
              <Button
                size="sm"
                variant={stageFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStageFilter('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={stageFilter === 'idea' ? 'default' : 'outline'}
                onClick={() => setStageFilter('idea')}
              >
                Idea
              </Button>
              <Button
                size="sm"
                variant={stageFilter === 'mvp' ? 'default' : 'outline'}
                onClick={() => setStageFilter('mvp')}
              >
                MVP
              </Button>
              <Button
                size="sm"
                variant={stageFilter === 'early_revenue' ? 'default' : 'outline'}
                onClick={() => setStageFilter('early_revenue')}
              >
                Early Revenue
              </Button>
            </div>

            <div className="flex gap-2">
              <span className="text-sm text-gray-600 mt-2">Sector:</span>
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Sectors</option>
                {getUniqueSecrors().map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredStartups.length} of {startups.length} startups
          </p>
        </CardContent>
      </Card>

      {/* Startups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Startups List */}
        <div className="lg:col-span-1 space-y-3 max-h-[800px] overflow-y-auto">
          {filteredStartups.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No startups found</p>
              </CardContent>
            </Card>
          ) : (
            filteredStartups.map((startup) => (
              <Card
                key={startup.id}
                className={`cursor-pointer hover-lift transition-all ${
                  selectedStartup?.id === startup.id ? 'border-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedStartup(startup)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg line-clamp-1">{startup.startup_name}</h3>
                      <p className="text-sm text-gray-600">{startup.users.full_name}</p>
                    </div>
                    {getStatusBadge(startup.admin_approval_status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{startup.industry_sector}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {getStageLabel(startup.stage)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(startup.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {startup.startup_deals && startup.startup_deals.length > 0 && (
                      <div className="flex items-center text-green-600 font-semibold">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {startup.startup_deals.filter(d => d.is_active).length} Active Deal(s)
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Startup Details */}
        <div className="lg:col-span-2">
          {!selectedStartup ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a startup to view details</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 max-h-[800px] overflow-y-auto">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{selectedStartup.startup_name}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {selectedStartup.industry_sector} • {getStageLabel(selectedStartup.stage)}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(selectedStartup.admin_approval_status)}
                      <Badge variant="outline">
                        {selectedStartup.profile_completion_percentage}% Complete
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Founder
                      </p>
                      <p className="font-semibold">{selectedStartup.users.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </p>
                      <p className="font-semibold text-sm">{selectedStartup.users.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </p>
                      <p className="font-semibold">{selectedStartup.users.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Registered
                      </p>
                      <p className="font-semibold">{new Date(selectedStartup.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Incorporation Status</p>
                      <p className="font-semibold capitalize">{selectedStartup.incorporation_status.replace('_', ' ')}</p>
                    </div>
                    {selectedStartup.incorporation_number && (
                      <div>
                        <p className="text-sm text-gray-600">CIN Number</p>
                        <p className="font-semibold">{selectedStartup.incorporation_number}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Startup Details */}
              {selectedStartup.startup_details && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Startup Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedStartup.startup_details.website && (
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Website
                        </p>
                        <a 
                          href={selectedStartup.startup_details.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold"
                        >
                          {selectedStartup.startup_details.website}
                        </a>
                      </div>
                    )}

                    {selectedStartup.startup_details.location && (
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </p>
                        <p className="font-semibold">{selectedStartup.startup_details.location}</p>
                      </div>
                    )}

                    {selectedStartup.startup_details.problem_statement && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Problem Statement</p>
                        <p className="text-gray-800">{selectedStartup.startup_details.problem_statement}</p>
                      </div>
                    )}

                    {selectedStartup.startup_details.solution_description && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Solution</p>
                        <p className="text-gray-800">{selectedStartup.startup_details.solution_description}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      {selectedStartup.startup_details.founded_date && (
                        <div>
                          <p className="text-sm text-gray-600">Founded</p>
                          <p className="font-semibold">{selectedStartup.startup_details.founded_date}</p>
                        </div>
                      )}
                      {selectedStartup.startup_details.team_size && (
                        <div>
                          <p className="text-sm text-gray-600">Team Size</p>
                          <p className="font-semibold">{selectedStartup.startup_details.team_size}</p>
                        </div>
                      )}
                      {selectedStartup.startup_details.current_users && (
                        <div>
                          <p className="text-sm text-gray-600">Current Users</p>
                          <p className="font-semibold">{selectedStartup.startup_details.current_users}</p>
                        </div>
                      )}
                      {selectedStartup.startup_details.monthly_revenue && (
                        <div>
                          <p className="text-sm text-gray-600">Monthly Revenue</p>
                          <p className="font-semibold text-green-600">{selectedStartup.startup_details.monthly_revenue}</p>
                        </div>
                      )}
                      {selectedStartup.startup_details.fundraising_goal && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">Fundraising Goal</p>
                          <p className="font-semibold text-primary text-xl">{selectedStartup.startup_details.fundraising_goal}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Active Deals */}
              {selectedStartup.startup_deals && selectedStartup.startup_deals.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Fundraising Deals ({selectedStartup.startup_deals.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedStartup.startup_deals.map((deal) => (
                      <div
                        key={deal.id}
                        className={`p-4 rounded-lg border-2 ${
                          deal.is_active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={deal.is_active ? 'default' : 'secondary'}>
                            {deal.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {new Date(deal.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-gray-600">Fundraising Goal</p>
                            <p className="font-bold text-primary">{formatCurrency(deal.fundraising_goal)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Minimum Investment</p>
                            <p className="font-bold">{formatCurrency(deal.minimum_investment)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Link href={`/admin/review`} className="flex-1">
                      <Button className="w-full" variant="outline">
                        Review for Approval
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => {
                      toast.info('Email functionality coming soon')
                    }}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Founder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


