"use client"

export const dynamic = 'force-dynamic'

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
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface FounderProfile {
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
}

interface StartupDetails {
  founder_names: string
  founded_date: string
  website: string
  team_size: string
  problem_statement: string
  solution_description: string
  fundraising_goal: string
  current_users: string
  monthly_revenue: string
}

export default function FounderReviewPage() {
  const [profiles, setProfiles] = useState<FounderProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<FounderProfile | null>(null)
  const [startupDetails, setStartupDetails] = useState<StartupDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending')
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

      // Fetch founder profiles
      const { data: founderProfiles, error } = await supabase
        .from('founder_profiles')
        .select(`
          *,
          users!user_id (
            full_name,
            email,
            phone
          )
        `)
        .eq('admin_approval_status', filter)
        .order('created_at', { ascending: false })

      if (error) throw error

      setProfiles(founderProfiles || [])
    } catch (error) {
      logger.error('Failed to fetch founder profiles', error as Error, {
        component: 'ADMIN_REVIEW',
        action: 'FETCH'
      })
      toast.error('Failed to load profiles')
    } finally {
      setLoading(false)
    }
  }

  const fetchStartupDetails = async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from('startup_details')
        .select('*')
        .eq('founder_profile_id', profileId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setStartupDetails(data)
    } catch (error) {
      logger.error('Failed to fetch startup details', error as Error, {
        component: 'ADMIN_REVIEW',
        action: 'FETCH_DETAILS'
      })
    }
  }

  const handleSelectProfile = async (profile: FounderProfile) => {
    setSelectedProfile(profile)
    await fetchStartupDetails(profile.id)
  }

  const handleApprove = async () => {
    if (!selectedProfile) return

    setProcessing(true)
    try {
      const { error } = await supabase
        .from('founder_profiles')
        .update({ admin_approval_status: 'approved' })
        .eq('id', selectedProfile.id)

      if (error) throw error

      toast.success(`${selectedProfile.startup_name} approved!`)
      setSelectedProfile(null)
      setStartupDetails(null)
      fetchProfiles()
    } catch (error) {
      logger.error('Failed to approve profile', error as Error, {
        component: 'ADMIN_REVIEW',
        action: 'APPROVE'
      })
      toast.error('Failed to approve profile')
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
      const { error } = await supabase
        .from('founder_profiles')
        .update({ 
          admin_approval_status: 'rejected'
        })
        .eq('id', selectedProfile.id)

      if (error) throw error

      // TODO: Send email with rejection reason

      toast.success('Profile rejected')
      setSelectedProfile(null)
      setStartupDetails(null)
      setRejectionReason('')
      fetchProfiles()
    } catch (error) {
      logger.error('Failed to reject profile', error as Error, {
        component: 'ADMIN_REVIEW',
        action: 'REJECT'
      })
      toast.error('Failed to reject profile')
    } finally {
      setProcessing(false)
    }
  }

  const getVerificationRequirements = (stage: string, incorporationStatus: string) => {
    const requirements = []

    if (stage === 'early_revenue') {
      requirements.push({
        icon: ShieldCheck,
        text: 'Registration details required (Revenue-generating startup)',
        required: true,
        met: incorporationStatus === 'incorporated'
      })
    } else {
      requirements.push({
        icon: ShieldAlert,
        text: 'Registration preferred but not mandatory (Idea/MVP stage)',
        required: false,
        met: incorporationStatus === 'incorporated'
      })
    }

    return requirements
  }

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      'idea': 'Idea Stage',
      'mvp': 'MVP Stage',
      'early_revenue': 'Early Revenue'
    }
    return labels[stage] || stage
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
            <h1 className="text-4xl font-bold text-gray-900">Founder Approvals</h1>
            <p className="text-lg text-gray-600">Review and approve startup profiles</p>
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
              variant={filter === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilter('approved')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approved
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
                onClick={() => handleSelectProfile(profile)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg line-clamp-1">{profile.startup_name}</h3>
                      <p className="text-sm text-gray-600">{profile.users.full_name}</p>
                    </div>
                    <Badge variant={profile.stage === 'early_revenue' ? 'default' : 'secondary'}>
                      {getStageLabel(profile.stage)}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      {profile.industry_sector}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(profile.created_at).toLocaleDateString()}
                    </div>
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
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a profile to review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{selectedProfile.startup_name}</CardTitle>
                    <Badge variant="outline" className="text-base">
                      {selectedProfile.profile_completion_percentage}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Founder</p>
                      <p className="font-semibold">{selectedProfile.users.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{selectedProfile.users.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Industry</p>
                      <p className="font-semibold">{selectedProfile.industry_sector}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stage</p>
                      <p className="font-semibold">{getStageLabel(selectedProfile.stage)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Incorporation Status</p>
                      <p className="font-semibold capitalize">{selectedProfile.incorporation_status.replace('_', ' ')}</p>
                    </div>
                    {selectedProfile.incorporation_number && (
                      <div>
                        <p className="text-sm text-gray-600">CIN</p>
                        <p className="font-semibold">{selectedProfile.incorporation_number}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Verification Requirements */}
              <Card className={
                selectedProfile.stage === 'early_revenue' && selectedProfile.incorporation_status !== 'incorporated'
                  ? 'border-red-200 bg-red-50'
                  : 'border-green-200 bg-green-50'
              }>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {selectedProfile.stage === 'early_revenue' && selectedProfile.incorporation_status !== 'incorporated' ? (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Verification Requirements
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Verification Status
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getVerificationRequirements(selectedProfile.stage, selectedProfile.incorporation_status).map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <req.icon className={`h-5 w-5 mt-0.5 ${
                        req.met ? 'text-green-500' : req.required ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium ${
                          req.met ? 'text-green-700' : req.required ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {req.text}
                        </p>
                        {req.required && !req.met && (
                          <p className="text-sm text-red-600 mt-1">
                            ⚠️ Must be incorporated to approve (Revenue-generating startup)
                          </p>
                        )}
                        {!req.required && !req.met && (
                          <p className="text-sm text-yellow-600 mt-1">
                            ℹ️ Can be approved without registration (Idea/MVP stage)
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Startup Details */}
              {startupDetails && (
                <Card>
                  <CardHeader>
                    <CardTitle>Startup Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {startupDetails.problem_statement && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Problem Statement</p>
                        <p className="text-gray-800">{startupDetails.problem_statement}</p>
                      </div>
                    )}
                    {startupDetails.solution_description && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Solution</p>
                        <p className="text-gray-800">{startupDetails.solution_description}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {startupDetails.founded_date && (
                        <div>
                          <p className="text-sm text-gray-600">Founded</p>
                          <p className="font-semibold">{startupDetails.founded_date}</p>
                        </div>
                      )}
                      {startupDetails.team_size && (
                        <div>
                          <p className="text-sm text-gray-600">Team Size</p>
                          <p className="font-semibold">{startupDetails.team_size}</p>
                        </div>
                      )}
                      {startupDetails.current_users && (
                        <div>
                          <p className="text-sm text-gray-600">Current Users</p>
                          <p className="font-semibold">{startupDetails.current_users}</p>
                        </div>
                      )}
                      {startupDetails.monthly_revenue && (
                        <div>
                          <p className="text-sm text-gray-600">Monthly Revenue</p>
                          <p className="font-semibold">{startupDetails.monthly_revenue}</p>
                        </div>
                      )}
                      {startupDetails.fundraising_goal && (
                        <div>
                          <p className="text-sm text-gray-600">Fundraising Goal</p>
                          <p className="font-semibold text-primary">{startupDetails.fundraising_goal}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              {filter === 'pending' && (
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {selectedProfile.stage === 'early_revenue' && selectedProfile.incorporation_status !== 'incorporated' && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          This startup is generating revenue but not incorporated. Registration details are required for approval.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={handleApprove}
                        disabled={processing || (selectedProfile.stage === 'early_revenue' && selectedProfile.incorporation_status !== 'incorporated')}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        {processing ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Approve
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
                          placeholder="Reason for rejection (will be sent to founder)"
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
