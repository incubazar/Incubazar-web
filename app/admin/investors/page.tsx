"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Loader2,
  ArrowLeft,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface InvestorData {
  id: string
  user_id: string
  kyc_status: string
  investment_preferences: any
  total_invested: number
  profile_completion_percentage: number
  created_at: string
  users: {
    full_name: string
    email: string
    phone: string
  }
  investor_interests?: Array<{
    id: string
    investment_amount: number
    interest_status: string
    created_at: string
    startup_deals?: {
      startup_name: string
      founder_profiles?: {
        startup_name: string
      }
    }
  }>
}

export default function AdminInvestorsPage() {
  const [investors, setInvestors] = useState<InvestorData[]>([])
  const [filteredInvestors, setFilteredInvestors] = useState<InvestorData[]>([])
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchInvestors()
  }, [])

  useEffect(() => {
    filterInvestors()
  }, [searchTerm, statusFilter, typeFilter, investors])

  const fetchInvestors = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!user || user.role !== 'admin') {
        router.push('/')
        return
      }

      // Fetch all investor profiles with related data
      const { data: investorProfiles, error: profileError } = await supabase
        .from('investor_profiles')
        .select(`
          *,
          users!user_id (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false })

      if (profileError) {
        console.error('Profile fetch error:', profileError)
        throw profileError
      }

      // Fetch investor interests separately for better reliability
      const profilesWithInterests = await Promise.all(
        (investorProfiles || []).map(async (profile) => {
          try {
            const { data: interests, error: interestsError } = await supabase
              .from('investor_interests')
              .select(`
                id,
                investment_amount,
                interest_status,
                created_at,
                deal_id
              `)
              .eq('investor_id', profile.id)
              .order('created_at', { ascending: false })

            if (interestsError) {
              console.warn(`Failed to fetch interests for investor ${profile.id}:`, interestsError)
            }

            // Fetch startup names for each interest (with error handling)
            const interestsWithStartups = await Promise.all(
              (interests || []).map(async (interest) => {
                try {
                  if (!interest.deal_id) return interest

                  const { data: deal } = await supabase
                    .from('startup_deals')
                    .select(`id, founder_profile_id`)
                    .eq('id', interest.deal_id)
                    .maybeSingle()

                  if (deal?.founder_profile_id) {
                    const { data: founderProfile } = await supabase
                      .from('founder_profiles')
                      .select('startup_name')
                      .eq('id', deal.founder_profile_id)
                      .maybeSingle()

                    if (founderProfile) {
                      return {
                        ...interest,
                        startup_deals: {
                          founder_profiles: founderProfile
                        }
                      }
                    }
                  }
                } catch (err) {
                  console.warn(`Failed to fetch startup for interest ${interest.id}:`, err)
                }

                return interest
              })
            )

            return {
              ...profile,
              investor_interests: interestsWithStartups
            }
          } catch (err) {
            console.warn(`Failed to process profile ${profile.id}:`, err)
            return {
              ...profile,
              investor_interests: []
            }
          }
        })
      )

      setInvestors(profilesWithInterests || [])
    } catch (error) {
      logger.error('Failed to fetch investors', error as Error, {
        component: 'ADMIN_INVESTORS',
        action: 'FETCH'
      })
      console.error('Investors fetch error:', error)
      toast.error('Failed to load investors. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const filterInvestors = () => {
    let filtered = [...investors]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.users.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inv.investment_preferences?.investor_type && 
         inv.investment_preferences.investor_type.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inv => inv.kyc_status === statusFilter)
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(inv => 
        inv.investment_preferences?.investor_type === typeFilter
      )
    }

    setFilteredInvestors(filtered)
  }

  const getUniqueInvestorTypes = () => {
    const types = new Set(
      investors
        .filter(inv => inv.investment_preferences?.investor_type)
        .map(inv => inv.investment_preferences.investor_type)
    )
    return Array.from(types).sort()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500">Verified</Badge>
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
    const totalInvested = investors.reduce((sum, inv) => sum + (inv.total_invested || 0), 0)
    const activeInvestors = investors.filter(inv => 
      inv.investor_interests && inv.investor_interests.length > 0
    ).length

    return {
      total: investors.length,
      verified: investors.filter(inv => inv.kyc_status === 'verified').length,
      pending: investors.filter(inv => inv.kyc_status === 'pending').length,
      rejected: investors.filter(inv => inv.kyc_status === 'rejected').length,
      activeInvestors,
      totalInvested,
      avgInvestment: activeInvestors > 0 ? totalInvested / activeInvestors : 0
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
            <h1 className="text-4xl font-bold text-gray-900">All Investors</h1>
            <p className="text-lg text-gray-600">Comprehensive view of all registered investors</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
              <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
              <p className="text-sm text-gray-600">Verified</p>
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
              <p className="text-3xl font-bold text-blue-600">{stats.activeInvestors}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalInvested)}</p>
              <p className="text-sm text-gray-600">Total Invested</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(stats.avgInvestment)}</p>
              <p className="text-sm text-gray-600">Avg Investment</p>
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
              placeholder="Search by name, email, or investor type..."
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
                variant={statusFilter === 'verified' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('verified')}
              >
                Verified
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
              <span className="text-sm text-gray-600 mt-2">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                {getUniqueInvestorTypes().map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredInvestors.length} of {investors.length} investors
          </p>
        </CardContent>
      </Card>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investors List */}
        <div className="lg:col-span-1 space-y-3 max-h-[800px] overflow-y-auto">
          {filteredInvestors.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No investors found</p>
              </CardContent>
            </Card>
          ) : (
            filteredInvestors.map((investor) => (
              <Card
                key={investor.id}
                className={`cursor-pointer hover-lift transition-all ${
                  selectedInvestor?.id === investor.id ? 'border-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedInvestor(investor)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{investor.users.full_name}</h3>
                      <p className="text-sm text-gray-600">{investor.users.email}</p>
                    </div>
                    {getStatusBadge(investor.kyc_status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    {investor.investment_preferences?.investor_type && (
                      <div className="flex items-center text-gray-600">
                        <Target className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate capitalize">
                          {investor.investment_preferences.investor_type.replace('_', ' ')}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      {investor.total_invested > 0 && (
                        <span className="text-green-600 font-semibold">
                          {formatCurrency(investor.total_invested)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(investor.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {investor.investor_interests && investor.investor_interests.length > 0 && (
                      <div className="flex items-center text-blue-600 font-semibold">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {investor.investor_interests.length} Investment(s)
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Investor Details */}
        <div className="lg:col-span-2">
          {!selectedInvestor ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select an investor to view details</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 max-h-[800px] overflow-y-auto">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{selectedInvestor.users.full_name}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {selectedInvestor.investment_preferences?.investor_type && (
                          <span className="capitalize">
                            {selectedInvestor.investment_preferences.investor_type.replace('_', ' ')}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(selectedInvestor.kyc_status)}
                      <Badge variant="outline">
                        {selectedInvestor.profile_completion_percentage}% Complete
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </p>
                      <p className="font-semibold text-sm">{selectedInvestor.users.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </p>
                      <p className="font-semibold">{selectedInvestor.users.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Registered
                      </p>
                      <p className="font-semibold">{new Date(selectedInvestor.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Total Invested
                      </p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(selectedInvestor.total_invested)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Preferences */}
              {selectedInvestor.investment_preferences && Object.keys(selectedInvestor.investment_preferences).length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Investment Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {selectedInvestor.investment_preferences.experience_level && (
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Experience Level
                          </p>
                          <p className="font-semibold capitalize">
                            {selectedInvestor.investment_preferences.experience_level}
                          </p>
                        </div>
                      )}

                      {selectedInvestor.investment_preferences.risk_appetite && (
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Risk Appetite
                          </p>
                          <Badge variant="outline" className="capitalize">
                            {selectedInvestor.investment_preferences.risk_appetite}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {selectedInvestor.investment_preferences.preferred_stages && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Preferred Stages</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedInvestor.investment_preferences.preferred_stages.map((stage: string) => (
                            <Badge key={stage} variant="secondary">
                              {stage === 'seed' ? 'Seed' :
                               stage === 'pre_seed' ? 'Pre-Seed' :
                               stage === 'series_a' ? 'Series A' :
                               stage === 'growth' ? 'Growth' : stage}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedInvestor.investment_preferences.preferred_sectors && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Preferred Sectors</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedInvestor.investment_preferences.preferred_sectors.map((sector: string) => (
                            <Badge key={sector} variant="default">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedInvestor.investment_preferences.min_investment && selectedInvestor.investment_preferences.max_investment && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mt-4">
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Investment Range
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(selectedInvestor.investment_preferences.min_investment)} - {formatCurrency(selectedInvestor.investment_preferences.max_investment)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-800">No Investment Preferences</p>
                        <p className="text-sm text-yellow-700">This investor hasn't set up their investment preferences yet.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Investment History */}
              {selectedInvestor.investor_interests && selectedInvestor.investor_interests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Investment History ({selectedInvestor.investor_interests.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedInvestor.investor_interests.map((interest) => (
                      <div
                        key={interest.id}
                        className={`p-4 rounded-lg border-2 ${
                          interest.interest_status === 'invested' 
                            ? 'bg-green-50 border-green-200' 
                            : interest.interest_status === 'interested'
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={
                            interest.interest_status === 'invested' ? 'default' : 'secondary'
                          } className="capitalize">
                            {interest.interest_status}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {new Date(interest.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {interest.startup_deals?.founder_profiles?.startup_name && (
                            <div>
                              <p className="text-sm text-gray-600">Startup</p>
                              <p className="font-semibold">
                                {interest.startup_deals.founder_profiles.startup_name}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-600">Investment Amount</p>
                            <p className="font-bold text-primary text-lg">
                              {formatCurrency(interest.investment_amount)}
                            </p>
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
                    <Link href={`/admin/users`} className="flex-1">
                      <Button className="w-full" variant="outline">
                        Review for Verification
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => {
                      toast.info('Email functionality coming soon')
                    }}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Investor
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

