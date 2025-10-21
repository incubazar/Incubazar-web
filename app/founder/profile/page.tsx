"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Building2, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Save,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface FounderProfile {
  id?: string
  startup_name: string
  incorporation_status: 'incorporated' | 'not_incorporated'
  incorporation_number?: string
  industry_sector: string
  stage: 'idea' | 'mvp' | 'early_revenue'
  pitch_deck_url?: string
  logo_url?: string
  profile_completion_percentage: number
  admin_approval_status: 'pending' | 'approved' | 'rejected'
}

export default function FounderProfilePage() {
  const [profile, setProfile] = useState<FounderProfile>({
    startup_name: '',
    incorporation_status: 'not_incorporated',
    incorporation_number: '',
    industry_sector: '',
    stage: 'idea',
    pitch_deck_url: '',
    logo_url: '',
    profile_completion_percentage: 0,
    admin_approval_status: 'pending'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const industrySectors = [
    'Technology', 'Healthcare', 'Fintech', 'Edtech', 'E-commerce',
    'SaaS', 'AI/ML', 'Blockchain', 'CleanTech', 'AgriTech',
    'Food & Beverage', 'Manufacturing', 'Real Estate', 'Travel',
    'Entertainment', 'Sports', 'Fashion', 'Beauty', 'Other'
  ]

  const stages = [
    { value: 'idea', label: 'Idea Stage', description: 'Just an idea, no product yet' },
    { value: 'mvp', label: 'MVP Stage', description: 'Have a working prototype/MVP' },
    { value: 'early_revenue', label: 'Early Revenue', description: 'Generating some revenue' }
  ]

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: founderProfile } = await supabase
          .from('founder_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (founderProfile) {
          setProfile(founderProfile)
        }
      } catch (error) {
        logger.error('Failed to fetch founder profile', error as Error, {
          component: 'FOUNDER_PROFILE',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase])

  const calculateCompletion = (profile: FounderProfile) => {
    let completion = 0
    const fields = [
      'startup_name', 'incorporation_status', 'industry_sector', 'stage'
    ]
    
    fields.forEach(field => {
      if (profile[field as keyof FounderProfile]) completion += 25
    })
    
    return completion
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        setError('Not authenticated')
        return
      }

      const completion = calculateCompletion(profile)
      const profileData = {
        ...profile,
        profile_completion_percentage: completion
      }

      if (profile.id) {
        // Update existing profile
        const { error } = await supabase
          .from('founder_profiles')
          .update(profileData)
          .eq('id', profile.id)

        if (error) throw error
      } else {
        // Create new profile
        const { error } = await supabase
          .from('founder_profiles')
          .insert({
            ...profileData,
            user_id: session.user.id
          })

        if (error) throw error
      }

      toast.success('Profile saved successfully!')
      router.push('/founder')
    } catch (error: any) {
      setError(error.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Startup Profile</h1>
          <p className="text-gray-600">Complete your startup information to get approved faster.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={profile.admin_approval_status === 'approved' ? 'default' : 'secondary'}>
            {profile.admin_approval_status === 'approved' ? 'Approved' : 'Pending Review'}
          </Badge>
        </div>
      </div>

      {/* Profile completion */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Profile Completion</h3>
              <p className="text-sm text-gray-500">
                Complete all required fields to get approved
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{calculateCompletion(profile)}%</div>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          <Progress value={calculateCompletion(profile)} className="h-2" />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
          <CardDescription>
            Tell us about your startup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startup_name">Startup Name *</Label>
              <Input
                id="startup_name"
                placeholder="Enter your startup name"
                value={profile.startup_name}
                onChange={(e) => setProfile(prev => ({ ...prev, startup_name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry_sector">Industry Sector *</Label>
              <Select
                value={profile.industry_sector}
                onValueChange={(value) => setProfile(prev => ({ ...prev, industry_sector: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industrySectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Current Stage *</Label>
            <RadioGroup
              value={profile.stage}
              onValueChange={(value) => setProfile(prev => ({ ...prev, stage: value as any }))}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {stages.map((stage) => (
                <div key={stage.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={stage.value} id={stage.value} />
                  <div className="flex-1">
                    <Label htmlFor={stage.value} className="font-medium">
                      {stage.label}
                    </Label>
                    <p className="text-sm text-gray-500">{stage.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Incorporation Status *</Label>
            <RadioGroup
              value={profile.incorporation_status}
              onValueChange={(value) => setProfile(prev => ({ ...prev, incorporation_status: value as any }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="incorporated" id="incorporated" />
                <Label htmlFor="incorporated">Incorporated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_incorporated" id="not_incorporated" />
                <Label htmlFor="not_incorporated">Not Incorporated</Label>
              </div>
            </RadioGroup>
          </div>

          {profile.incorporation_status === 'incorporated' && (
            <div className="space-y-2">
              <Label htmlFor="incorporation_number">Incorporation Number</Label>
              <Input
                id="incorporation_number"
                placeholder="Enter your incorporation number"
                value={profile.incorporation_number}
                onChange={(e) => setProfile(prev => ({ ...prev, incorporation_number: e.target.value }))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Upload your pitch deck and logo (optional but recommended)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Pitch Deck</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {profile.pitch_deck_url ? 'Pitch deck uploaded' : 'Upload your pitch deck'}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {profile.logo_url ? 'Logo uploaded' : 'Upload your logo'}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push('/founder')}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
