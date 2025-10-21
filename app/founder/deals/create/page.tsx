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
import { 
  FileText, 
  Save, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react'
import { toast } from 'sonner'

interface DealForm {
  deal_title: string
  problem_statement: string
  solution: string
  market_size: string
  business_model: string
  fundraising_goal: number
  min_investment: number
  max_investment: number
  instrument_type: 'safe' | 'ccd' | 'equity'
  traction_metrics: {
    users?: number
    revenue?: number
    customers?: number
    mrr?: number
    arr?: number
  }
}

export default function CreateDealPage() {
  const [formData, setFormData] = useState<DealForm>({
    deal_title: '',
    problem_statement: '',
    solution: '',
    market_size: '',
    business_model: '',
    fundraising_goal: 0,
    min_investment: 0,
    max_investment: 0,
    instrument_type: 'safe',
    traction_metrics: {}
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [founderProfile, setFounderProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchFounderProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: profile } = await supabase
          .from('founder_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        setFounderProfile(profile)

        if (!profile) {
          toast.error('Please complete your startup profile first')
          router.push('/founder/profile')
          return
        }

        if (profile.admin_approval_status !== 'approved') {
          toast.error('Your startup profile is still under review')
          router.push('/founder')
          return
        }
      } catch (error) {
        logger.error('Failed to fetch founder profile for deal creation', error as Error, {
          component: 'FOUNDER_CREATE_DEAL',
          action: 'FETCH'
        })
      }
    }

    fetchFounderProfile()
  }, [supabase, router])

  const handleSave = async () => {
    setSaving(true)
    setError('')

    // Validation
    if (!formData.deal_title || !formData.problem_statement || !formData.solution) {
      setError('Please fill in all required fields')
      setSaving(false)
      return
    }

    if (formData.fundraising_goal <= 0 || formData.min_investment <= 0 || formData.max_investment <= 0) {
      setError('Please enter valid financial amounts')
      setSaving(false)
      return
    }

    if (formData.max_investment < formData.min_investment) {
      setError('Maximum investment must be greater than minimum investment')
      setSaving(false)
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user || !founderProfile) {
        setError('Not authenticated')
        return
      }

      const { error } = await supabase
        .from('startup_deals')
        .insert({
          founder_profile_id: founderProfile.id,
          deal_title: formData.deal_title,
          problem_statement: formData.problem_statement,
          solution: formData.solution,
          market_size: formData.market_size,
          business_model: formData.business_model,
          traction_metrics: formData.traction_metrics,
          fundraising_goal: formData.fundraising_goal,
          min_investment: formData.min_investment,
          max_investment: formData.max_investment,
          instrument_type: formData.instrument_type,
          investor_count: 0,
          investor_limit: 200,
          is_active: true
        })

      if (error) throw error

      toast.success('Deal created successfully! It will be reviewed by our team.')
      router.push('/founder/deals')
    } catch (error: any) {
      setError(error.message || 'Failed to create deal')
    } finally {
      setSaving(false)
    }
  }

  if (!founderProfile) {
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Deal</h1>
          <p className="text-gray-600">Set up your fundraising deal to attract investors</p>
        </div>
      </div>

      {/* Compliance notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Compliance Notice:</strong> This deal will be subject to Section 42 of the Companies Act 2013. 
          The platform will automatically enforce the 200-investor limit per deal to ensure compliance.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Deal Information</span>
              </CardTitle>
              <CardDescription>
                Basic information about your fundraising deal
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
                <Label htmlFor="deal_title">Deal Title *</Label>
                <Input
                  id="deal_title"
                  placeholder="e.g., Series A Funding for AI-Powered Healthcare Platform"
                  value={formData.deal_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, deal_title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="problem_statement">Problem Statement *</Label>
                <Textarea
                  id="problem_statement"
                  placeholder="Describe the problem your startup is solving..."
                  value={formData.problem_statement}
                  onChange={(e) => setFormData(prev => ({ ...prev, problem_statement: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solution *</Label>
                <Textarea
                  id="solution"
                  placeholder="Explain how your startup solves this problem..."
                  value={formData.solution}
                  onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="market_size">Market Size</Label>
                <Textarea
                  id="market_size"
                  placeholder="Describe your target market and its size..."
                  value={formData.market_size}
                  onChange={(e) => setFormData(prev => ({ ...prev, market_size: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_model">Business Model</Label>
                <Textarea
                  id="business_model"
                  placeholder="Explain how your startup generates revenue..."
                  value={formData.business_model}
                  onChange={(e) => setFormData(prev => ({ ...prev, business_model: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>
                Set your fundraising goals and investment terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fundraising_goal">Fundraising Goal (₹) *</Label>
                  <Input
                    id="fundraising_goal"
                    type="number"
                    placeholder="5000000"
                    value={formData.fundraising_goal || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fundraising_goal: Number(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instrument_type">Investment Instrument *</Label>
                  <Select
                    value={formData.instrument_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, instrument_type: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select instrument" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safe">SAFE (Simple Agreement for Future Equity)</SelectItem>
                      <SelectItem value="ccd">CCD (Compulsorily Convertible Debentures)</SelectItem>
                      <SelectItem value="equity">Equity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min_investment">Minimum Investment (₹) *</Label>
                  <Input
                    id="min_investment"
                    type="number"
                    placeholder="50000"
                    value={formData.min_investment || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, min_investment: Number(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_investment">Maximum Investment (₹) *</Label>
                  <Input
                    id="max_investment"
                    type="number"
                    placeholder="500000"
                    value={formData.max_investment || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_investment: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traction Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Traction Metrics</CardTitle>
              <CardDescription>
                Share your key performance indicators (optional but recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="users">Number of Users</Label>
                  <Input
                    id="users"
                    type="number"
                    placeholder="1000"
                    value={formData.traction_metrics.users || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      traction_metrics: { 
                        ...prev.traction_metrics, 
                        users: Number(e.target.value) 
                      } 
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customers">Number of Customers</Label>
                  <Input
                    id="customers"
                    type="number"
                    placeholder="100"
                    value={formData.traction_metrics.customers || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      traction_metrics: { 
                        ...prev.traction_metrics, 
                        customers: Number(e.target.value) 
                      } 
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="mrr">Monthly Recurring Revenue (₹)</Label>
                  <Input
                    id="mrr"
                    type="number"
                    placeholder="50000"
                    value={formData.traction_metrics.mrr || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      traction_metrics: { 
                        ...prev.traction_metrics, 
                        mrr: Number(e.target.value) 
                      } 
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arr">Annual Recurring Revenue (₹)</Label>
                  <Input
                    id="arr"
                    type="number"
                    placeholder="600000"
                    value={formData.traction_metrics.arr || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      traction_metrics: { 
                        ...prev.traction_metrics, 
                        arr: Number(e.target.value) 
                      } 
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Compliance reminder */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Compliance Notice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-orange-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Maximum 200 investors per deal</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Private placement only</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>No public advertising</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Registered users only</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deal preview */}
          <Card>
            <CardHeader>
              <CardTitle>Deal Preview</CardTitle>
              <CardDescription>
                How your deal will appear to investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-900">
                    {formData.deal_title || 'Deal Title'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formData.instrument_type?.toUpperCase() || 'SAFE'} • {formData.fundraising_goal ? `₹${formData.fundraising_goal.toLocaleString()}` : 'Goal not set'}
                  </p>
                </div>
                
                {formData.problem_statement && (
                  <div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {formData.problem_statement}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Investment Range:</span>
                  <span className="font-medium">
                    {formData.min_investment && formData.max_investment 
                      ? `₹${formData.min_investment.toLocaleString()} - ₹${formData.max_investment.toLocaleString()}`
                      : 'Not set'
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push('/founder/deals')}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Deal...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Create Deal
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
