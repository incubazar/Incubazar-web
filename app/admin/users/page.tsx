"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Briefcase,
  Loader2,
  ArrowLeft,
  Shield,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface InvestorProfile {
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
  } | null
}

export default function InvestorVerificationPage() {
  const [profiles, setProfiles] = useState<InvestorProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<InvestorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [filter, setFilter] = useState<'pending' | 'verified' | 'rejected'>('pending')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchProfiles()
  }, [filter])

  const fetchProfiles = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Check if user is admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()

      if (userError || !user || user.role !== 'admin') {
        router.push('/')
        return
      }

      // Fetch investor profiles
      const { data: investorProfiles, error } = await supabase
        .from('investor_profiles')
        .select(`
          *,
          users!user_id (
            full_name,
            email,
            phone
          )
        `)
        .eq('kyc_status', filter)
        .order('created_at', { ascending: false })

      if (error) throw error

      setProfiles(investorProfiles || [])
    } catch (error) {
      logger.error('Failed to fetch investor profiles', error as Error, {
        component: 'ADMIN_USERS',
        action: 'FETCH'
      })
      toast.error('Failed to load profiles')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedProfile) return

    setProcessing(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      const { data, error } = await supabase
        .from('investor_profiles')
        .update({ 
          kyc_status: 'verified',
          verified_by: session?.user?.id
        })
        .eq('id', selectedProfile.id)
        .select()

      if (error) {
        logger.error('Supabase update error during investor verification', error as Error, {
          component: 'ADMIN_USERS',
          action: 'UPDATE_VERIFY'
        })
        throw error
      }

      logger.info('Investor verified successfully', {
        component: 'ADMIN_USERS',
        action: 'VERIFY',
        profileId: selectedProfile.id
      })
      toast.success(`${selectedProfile.users?.full_name || 'User'} verified!`)
      setSelectedProfile(null)
      fetchProfiles()
    } catch (error) {
      logger.error('Failed to verify profile', error as Error, {
        component: 'ADMIN_USERS',
        action: 'VERIFY'
      })
      toast.error(`Failed to verify profile: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedProfile || !rejectionReason) {
      toast.error('Please provide a rejection reason')
      return
    }

    setProcessing(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      const { error } = await supabase
        .from('investor_profiles')
        .update({ 
          kyc_status: 'rejected',
          rejection_reason: rejectionReason,
          verified_by: session?.user?.id
        })
        .eq('id', selectedProfile.id)

      if (error) throw error

      // TODO: Send email with rejection reason

      toast.success('Profile rejected')
      setSelectedProfile(null)
      setRejectionReason('')
      fetchProfiles()
    } catch (error) {
      logger.error('Failed to reject profile', error as Error, {
        component: 'ADMIN_USERS',
        action: 'REJECT'
      })
      toast.error('Failed to reject profile')
    } finally {
      setProcessing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    return `₹${amount.toLocaleString()}`
  }

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
            <h1 className="text-4xl font-bold text-gray-900">Investor Verifications</h1>
            <p className="text-lg text-gray-600">Review and verify investor profiles</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Pending ({profiles.length})
            </Button>
            <Button
              variant={filter === 'verified' ? 'default' : 'outline'}
              onClick={() => setFilter('verified')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Verified
            </Button>
            <Button
              variant={filter === 'rejected' ? 'default' : 'outline'}
              onClick={() => setFilter('rejected')}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Rejected
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profiles List */}
        <div className="lg:col-span-1 space-y-3">
          {profiles.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No {filter} profiles</p>
              </CardContent>
            </Card>
          ) : (
            profiles.map((profile) => (
              <Card
                key={profile.id}
                className={`cursor-pointer hover-lift ${
                  selectedProfile?.id === profile.id ? 'border-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedProfile(profile)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{profile.users?.full_name || 'Unknown User'}</h3>
                      <p className="text-sm text-gray-600">{profile.users?.email || 'No email'}</p>
                    </div>
                    <Badge variant={profile.kyc_status === 'verified' ? 'default' : 'secondary'}>
                      {profile.kyc_status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    {profile.investment_preferences && (
                      <div className="flex items-center text-gray-600">
                        <Target className="h-4 w-4 mr-2" />
                        {profile.investment_preferences.investor_type || 'Type not set'}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(profile.created_at).toLocaleDateString()}
                    </div>
                    {profile.total_invested > 0 && (
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {formatCurrency(profile.total_invested)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          {!selectedProfile ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a profile to review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{selectedProfile.users?.full_name || 'Unknown User'}</CardTitle>
                    <Badge variant="outline" className="text-base">
                      {selectedProfile.profile_completion_percentage}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{selectedProfile.users?.email || 'No email'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">{selectedProfile.users?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">KYC Status</p>
                      <Badge variant={selectedProfile.kyc_status === 'verified' ? 'default' : 'secondary'}>
                        {selectedProfile.kyc_status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Invested</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(selectedProfile.total_invested)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Preferences */}
              {selectedProfile.investment_preferences && Object.keys(selectedProfile.investment_preferences).length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Investment Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProfile.investment_preferences.investor_type && (
                        <div>
                          <p className="text-sm text-gray-600">Investor Type</p>
                          <p className="font-semibold capitalize">
                            {selectedProfile.investment_preferences.investor_type.replace('_', ' ')}
                          </p>
                        </div>
                      )}
                      
                      {selectedProfile.investment_preferences.experience_level && (
                        <div>
                          <p className="text-sm text-gray-600">Experience Level</p>
                          <p className="font-semibold capitalize">
                            {selectedProfile.investment_preferences.experience_level}
                          </p>
                        </div>
                      )}

                      {selectedProfile.investment_preferences.risk_appetite && (
                        <div>
                          <p className="text-sm text-gray-600">Risk Appetite</p>
                          <Badge variant="outline" className="capitalize">
                            {selectedProfile.investment_preferences.risk_appetite}
                          </Badge>
                        </div>
                      )}

                      {selectedProfile.investment_preferences.preferred_stages && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 mb-2">Preferred Stages</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedProfile.investment_preferences.preferred_stages.map((stage: string) => (
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

                      {selectedProfile.investment_preferences.preferred_sectors && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 mb-2">Preferred Sectors</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedProfile.investment_preferences.preferred_sectors.map((sector: string) => (
                              <Badge key={sector} variant="default">
                                {sector}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedProfile.investment_preferences.min_investment && selectedProfile.investment_preferences.max_investment && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Investment Range</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(selectedProfile.investment_preferences.min_investment)} - {formatCurrency(selectedProfile.investment_preferences.max_investment)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="pt-6">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No investment preferences provided yet
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              {/* Verification Checklist */}
              <Card className={
                selectedProfile.investment_preferences && Object.keys(selectedProfile.investment_preferences).length > 0
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
              }>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    {selectedProfile.investment_preferences && Object.keys(selectedProfile.investment_preferences).length > 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">Investment Preferences</p>
                      <p className="text-sm text-gray-600">
                        {selectedProfile.investment_preferences && Object.keys(selectedProfile.investment_preferences).length > 0
                          ? 'Complete'
                          : 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {selectedProfile.profile_completion_percentage >= 80 ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">Profile Completion</p>
                      <p className="text-sm text-gray-600">
                        {selectedProfile.profile_completion_percentage}% complete
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {selectedProfile.users?.email && selectedProfile.users.email.includes('@') ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-gray-600">Valid email address</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              {filter === 'pending' && (
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {(!selectedProfile.investment_preferences || Object.keys(selectedProfile.investment_preferences).length === 0) && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Investor has not provided investment preferences. Consider reaching out before approval.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={handleApprove}
                        disabled={processing}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        {processing ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Verify
                      </Button>
                      <Button
                        onClick={() => setRejectionReason('')}
                        disabled={processing}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>

                    {rejectionReason !== null && (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Reason for rejection (will be sent to investor)"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          rows={4}
                        />
                        <div className="flex gap-3">
                          <Button
                            onClick={handleReject}
                            disabled={processing || !rejectionReason}
                            variant="destructive"
                            className="flex-1"
                          >
                            Confirm Rejection
                          </Button>
                          <Button
                            onClick={() => setRejectionReason('')}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
