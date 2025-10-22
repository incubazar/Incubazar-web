"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Loader2,
  Search,
  Filter,
  MessageSquare,
  Eye,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'
import { InvestorLimitTracker } from '@/components/compliance/InvestorLimitTracker'

interface InvestorInterest {
  id: string
  interest_status: string
  connection_status: string
  investment_amount: number | null
  notes: string | null
  created_at: string
  investor_profile: {
    id: string
    investor_type: string
    investment_preferences: any
    user: {
      full_name: string
      email: string
    }
  }
  startup_deal: {
    id: string
    deal_title: string
    investor_count: number
    investor_limit: number
  }
}

export default function InvestorInterestsPage() {
  const [interests, setInterests] = useState<InvestorInterest[]>([])
  const [filteredInterests, setFilteredInterests] = useState<InvestorInterest[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchInterests()
  }, [])

  useEffect(() => {
    filterInterests()
  }, [interests, searchTerm, statusFilter])

  const fetchInterests = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      // Get founder profile
      const { data: founderProfile } = await supabase
        .from('founder_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (!founderProfile) return

      // Get all deals for this founder
      const { data: deals } = await supabase
        .from('startup_deals')
        .select('id')
        .eq('founder_profile_id', founderProfile.id)

      if (!deals || deals.length === 0) {
        setLoading(false)
        return
      }

      const dealIds = deals.map(d => d.id)

      // Get investor interests
      const { data: interestsData, error } = await supabase
        .from('investor_interests')
        .select(`
          *,
          investor_profile:investor_profiles(
            id,
            investor_type,
            investment_preferences,
            user:users!user_id(full_name, email)
          ),
          startup_deal:startup_deals(
            id,
            deal_title,
            investor_count,
            investor_limit
          )
        `)
        .in('startup_deal_id', dealIds)
        .order('created_at', { ascending: false })

      if (error) throw error

      setInterests(interestsData || [])
    } catch (error) {
      logger.error('Failed to fetch investor interests', error as Error, {
        component: 'INVESTOR_INTERESTS_PAGE',
        action: 'FETCH'
      })
      toast.error('Failed to load investor interests')
    } finally {
      setLoading(false)
    }
  }

  const filterInterests = () => {
    let filtered = interests

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(i => i.connection_status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(i =>
        i.investor_profile.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.investor_profile.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.startup_deal.deal_title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredInterests(filtered)
  }

  const handleConnectionAction = async (interestId: string, action: 'accepted' | 'declined') => {
    setProcessing(interestId)
    try {
      const { error } = await supabase
        .from('investor_interests')
        .update({
          connection_status: action,
          responded_at: new Date().toISOString()
        })
        .eq('id', interestId)

      if (error) throw error

      toast.success(`Connection ${action}`)
      fetchInterests()
    } catch (error) {
      logger.error('Failed to update connection status', error as Error, {
        component: 'INVESTOR_INTERESTS_PAGE',
        action: 'UPDATE_CONNECTION'
      })
      toast.error('Failed to update connection status')
    } finally {
      setProcessing(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'accepted':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>
      case 'declined':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Declined</Badge>
      case 'invested':
        return <Badge className="bg-green-500"><TrendingUp className="h-3 w-3 mr-1" />Invested</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInvestorTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      individual: 'Individual',
      hni: 'HNI',
      experienced_professional: 'Angel Investor'
    }
    return labels[type] || type
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const pendingCount = interests.filter(i => i.connection_status === 'pending').length
  const acceptedCount = interests.filter(i => i.connection_status === 'accepted').length
  const investedCount = interests.filter(i => i.connection_status === 'invested').length

  // Get unique deals for compliance tracking
  const uniqueDeals = Array.from(new Set(interests.map(i => i.startup_deal.id)))
    .map(dealId => interests.find(i => i.startup_deal.id === dealId)?.startup_deal)
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investor Interests</h1>
        <p className="text-gray-600">Manage investors who have expressed interest in your deals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interests</p>
                <p className="text-2xl font-bold">{interests.length}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-blue-600">{acceptedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Invested</p>
                <p className="text-2xl font-bold text-green-600">{investedCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Trackers */}
      {uniqueDeals.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {uniqueDeals.map((deal: any) => {
            const dealInterests = interests.filter(i => i.startup_deal.id === deal.id)
            const acceptedForDeal = dealInterests.filter(i => 
              i.connection_status === 'accepted' || i.connection_status === 'invested'
            ).length

            return (
              <InvestorLimitTracker
                key={deal.id}
                currentCount={acceptedForDeal}
                limit={deal.investor_limit}
                dealTitle={deal.deal_title}
              />
            )
          })}
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search investors or deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                All ({interests.length})
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('pending')}
                size="sm"
              >
                Pending ({pendingCount})
              </Button>
              <Button
                variant={statusFilter === 'accepted' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('accepted')}
                size="sm"
              >
                Connected ({acceptedCount})
              </Button>
              <Button
                variant={statusFilter === 'invested' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('invested')}
                size="sm"
              >
                Invested ({investedCount})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interests List */}
      {filteredInterests.length === 0 ? (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No matches found' : 'No investor interests yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Investors who express interest in your deals will appear here'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredInterests.map((interest) => (
            <Card key={interest.id} className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {interest.investor_profile.user.full_name}
                          </h3>
                          {getStatusBadge(interest.connection_status)}
                          <Badge variant="outline">
                            {getInvestorTypeLabel(interest.investor_profile.investor_type)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {interest.investor_profile.user.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Interested in: <span className="font-medium text-gray-900">{interest.startup_deal.deal_title}</span>
                          </div>
                          {interest.investment_amount && (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              Investment Amount: <span className="font-medium text-primary">₹{interest.investment_amount.toLocaleString()}</span>
                            </div>
                          )}
                          <p className="text-xs text-gray-500">
                            Expressed interest on {new Date(interest.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        {interest.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Note:</strong> {interest.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {interest.connection_status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleConnectionAction(interest.id, 'accepted')}
                              disabled={processing === interest.id}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              {processing === interest.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Accept
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleConnectionAction(interest.id, 'declined')}
                              disabled={processing === interest.id}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </>
                        )}
                        {interest.connection_status === 'accepted' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/messages?investor=${interest.investor_profile.id}`)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        )}
                        {interest.connection_status === 'invested' && (
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800 text-xs">
                              Investment completed
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
