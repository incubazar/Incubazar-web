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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Save,
  Loader2,
  FileText,
  User
} from 'lucide-react'
import { toast } from 'sonner'

interface KYCForm {
  investor_type: 'individual' | 'hni' | 'experienced_professional'
  linkedin_url: string
  kyc_document_url: string
  investment_preferences: {
    sectors: string[]
    stages: string[]
    min_ticket_size: number
    max_ticket_size: number
    investment_horizon: string
  }
}

export default function KYCPage() {
  const [formData, setFormData] = useState<KYCForm>({
    investor_type: 'individual',
    linkedin_url: '',
    kyc_document_url: '',
    investment_preferences: {
      sectors: [],
      stages: [],
      min_ticket_size: 0,
      max_ticket_size: 0,
      investment_horizon: ''
    }
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  const sectors = [
    'Technology', 'Healthcare', 'Fintech', 'Edtech', 'E-commerce',
    'SaaS', 'AI/ML', 'Blockchain', 'CleanTech', 'AgriTech',
    'Food & Beverage', 'Manufacturing', 'Real Estate', 'Travel',
    'Entertainment', 'Sports', 'Fashion', 'Beauty', 'Other'
  ]

  const stages = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP Stage' },
    { value: 'early_revenue', label: 'Early Revenue' }
  ]

  const horizons = [
    { value: 'short', label: 'Short-term (1-2 years)' },
    { value: 'medium', label: 'Medium-term (3-5 years)' },
    { value: 'long', label: 'Long-term (5+ years)' }
  ]

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: investorProfile } = await supabase
          .from('investor_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (investorProfile) {
          setProfile(investorProfile)
          setFormData({
            investor_type: investorProfile.investor_type,
            linkedin_url: investorProfile.linkedin_url || '',
            kyc_document_url: investorProfile.kyc_document_url || '',
            investment_preferences: investorProfile.investment_preferences || {
              sectors: [],
              stages: [],
              min_ticket_size: 0,
              max_ticket_size: 0,
              investment_horizon: ''
            }
          })
        }
      } catch (error) {
        logger.error('Failed to fetch investor KYC profile', error as Error, {
          component: 'INVESTOR_KYC',
          action: 'FETCH'
        })
      }
    }

    fetchProfile()
  }, [supabase])

  const handleSave = async () => {
    setSaving(true)
    setError('')

    // Validation
    if (!formData.linkedin_url) {
      setError('LinkedIn URL is required for verification')
      setSaving(false)
      return
    }

    if (formData.investment_preferences.sectors.length === 0) {
      setError('Please select at least one sector of interest')
      setSaving(false)
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        setError('Not authenticated')
        return
      }

      const { error } = await supabase
        .from('investor_profiles')
        .upsert({
          user_id: session.user.id,
          investor_type: formData.investor_type,
          linkedin_url: formData.linkedin_url,
          kyc_document_url: formData.kyc_document_url,
          investment_preferences: formData.investment_preferences,
          kyc_status: 'pending'
        })

      if (error) throw error

      toast.success('KYC information submitted successfully! We will review it shortly.')
      router.push('/investor')
    } catch (error: any) {
      setError(error.message || 'Failed to save KYC information')
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = () => {
    if (!profile) return null
    
    switch (profile.kyc_status) {
      case 'verified':
        return <Badge variant="default" className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3" />
          <span>Verified</span>
        </Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary" className="flex items-center space-x-1">
          <AlertCircle className="h-3 w-3" />
          <span>Pending</span>
        </Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
          <p className="text-gray-600">Complete your investor verification to access all deals</p>
        </div>
        {profile && getStatusBadge()}
      </div>

      {/* Status alert */}
      {profile?.kyc_status === 'verified' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>KYC Verified!</strong> Your identity has been verified. You now have access to all deals and investment opportunities.
          </AlertDescription>
        </Alert>
      )}

      {profile?.kyc_status === 'rejected' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your KYC verification was rejected. Please review your information and resubmit.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>
                Tell us about your investment background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>Investor Type *</Label>
                <RadioGroup
                  value={formData.investor_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, investor_type: value as any }))}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual Investor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hni" id="hni" />
                    <Label htmlFor="hni">High Net Worth Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="experienced_professional" id="experienced_professional" />
                    <Label htmlFor="experienced_professional">Experienced Professional</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn Profile *</Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                />
                <p className="text-xs text-gray-500">
                  We use LinkedIn to verify your professional background
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Investment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>
                Help us match you with relevant deals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Sectors *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {sectors.map((sector) => (
                    <div key={sector} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={sector}
                        checked={formData.investment_preferences.sectors.includes(sector)}
                        onChange={(e) => {
                          const sectors = formData.investment_preferences.sectors
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              investment_preferences: {
                                ...prev.investment_preferences,
                                sectors: [...sectors, sector]
                              }
                            }))
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              investment_preferences: {
                                ...prev.investment_preferences,
                                sectors: sectors.filter(s => s !== sector)
                              }
                            }))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={sector} className="text-sm">{sector}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Stages</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {stages.map((stage) => (
                    <div key={stage.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={stage.value}
                        checked={formData.investment_preferences.stages.includes(stage.value)}
                        onChange={(e) => {
                          const stages = formData.investment_preferences.stages
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              investment_preferences: {
                                ...prev.investment_preferences,
                                stages: [...stages, stage.value]
                              }
                            }))
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              investment_preferences: {
                                ...prev.investment_preferences,
                                stages: stages.filter(s => s !== stage.value)
                              }
                            }))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={stage.value} className="text-sm">{stage.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min_ticket_size">Minimum Ticket Size (₹)</Label>
                  <Input
                    id="min_ticket_size"
                    type="number"
                    placeholder="50000"
                    value={formData.investment_preferences.min_ticket_size || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      investment_preferences: {
                        ...prev.investment_preferences,
                        min_ticket_size: Number(e.target.value)
                      }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_ticket_size">Maximum Ticket Size (₹)</Label>
                  <Input
                    id="max_ticket_size"
                    type="number"
                    placeholder="500000"
                    value={formData.investment_preferences.max_ticket_size || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      investment_preferences: {
                        ...prev.investment_preferences,
                        max_ticket_size: Number(e.target.value)
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment_horizon">Investment Horizon</Label>
                <Select
                  value={formData.investment_preferences.investment_horizon}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    investment_preferences: {
                      ...prev.investment_preferences,
                      investment_horizon: value
                    }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    {horizons.map((horizon) => (
                      <SelectItem key={horizon.value} value={horizon.value}>
                        {horizon.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Document Upload</span>
              </CardTitle>
              <CardDescription>
                Upload your identity verification documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Identity Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    {formData.kyc_document_url ? 'Document uploaded' : 'Upload your PAN card or Aadhaar card'}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Accepted formats: PDF, JPG, PNG. Maximum size: 5MB
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* KYC Status */}
          <Card>
            <CardHeader>
              <CardTitle>KYC Status</CardTitle>
              <CardDescription>
                Your verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Identity Verification</span>
                  {getStatusBadge()}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">LinkedIn Profile</span>
                  <Badge variant={formData.linkedin_url ? "default" : "secondary"}>
                    {formData.linkedin_url ? "Added" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Investment Preferences</span>
                  <Badge variant={formData.investment_preferences.sectors.length > 0 ? "default" : "secondary"}>
                    {formData.investment_preferences.sectors.length > 0 ? "Set" : "Pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>KYC Benefits</CardTitle>
              <CardDescription>
                What you get after verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Access to all active deals</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Priority deal notifications</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Direct communication with founders</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Portfolio tracking tools</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Your documents are encrypted and stored securely</p>
                <p>• Information is only used for verification purposes</p>
                <p>• We comply with all data protection regulations</p>
                <p>• Documents are deleted after verification</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push('/investor')}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving || profile?.kyc_status === 'verified'}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {profile?.kyc_status === 'verified' ? 'Already Verified' : 'Submit KYC'}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
