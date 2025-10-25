"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LabelWithTooltip } from '@/components/ui/tooltip-info'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Building2, 
  Users, 
  Lightbulb,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface OnboardingData {
  // Basic Information
  startup_name: string
  incorporation_status: 'incorporated' | 'not_incorporated'
  incorporation_number: string
  industry_sector: string
  stage: 'idea' | 'mvp' | 'early_revenue'
  founded_date: string
  website: string
  
  // Team Information
  founder_names: string
  team_size: string
  key_team_members: string
  advisor_names: string
  
  // Product/Solution
  problem_statement: string
  solution_description: string
  unique_value_proposition: string
  target_customer: string
  product_status: string
  
  // Market & Competition
  market_size: string
  target_market: string
  competitors: string
  competitive_advantage: string
  
  // Traction & Metrics
  current_users: string
  monthly_revenue: string
  revenue_growth: string
  key_achievements: string
  
  // Fundraising
  fundraising_goal: string
  funds_use: string
  previous_funding: string
  equity_offered: string
  
  // Vision
  one_year_goal: string
  three_year_vision: string
  exit_strategy: string
}

const STEPS = [
  { id: 1, title: 'Basic Info', icon: Building2, description: 'Tell us about your startup' },
  { id: 2, title: 'Team', icon: Users, description: 'Who\'s building this?' },
  { id: 3, title: 'Product', icon: Lightbulb, description: 'What are you building?' },
  { id: 4, title: 'Market', icon: Target, description: 'Who are you serving?' },
  { id: 5, title: 'Traction', icon: TrendingUp, description: 'What\'s your progress?' },
  { id: 6, title: 'Fundraising', icon: DollarSign, description: 'Investment details' },
]

export default function FounderOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()
  
  const [data, setData] = useState<OnboardingData>({
    startup_name: '',
    incorporation_status: 'not_incorporated',
    incorporation_number: '',
    industry_sector: '',
    stage: 'idea',
    founded_date: '',
    website: '',
    founder_names: '',
    team_size: '',
    key_team_members: '',
    advisor_names: '',
    problem_statement: '',
    solution_description: '',
    unique_value_proposition: '',
    target_customer: '',
    product_status: '',
    market_size: '',
    target_market: '',
    competitors: '',
    competitive_advantage: '',
    current_users: '',
    monthly_revenue: '',
    revenue_growth: '',
    key_achievements: '',
    fundraising_goal: '',
    funds_use: '',
    previous_funding: '',
    equity_offered: '',
    one_year_goal: '',
    three_year_vision: '',
    exit_strategy: ''
  })

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
    const checkExistingProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          router.push('/login')
          return
        }

        // Check if profile already exists
        const { data: profile } = await supabase
          .from('founder_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        // If profile exists and is complete, redirect to dashboard
        if (profile && profile.profile_completion_percentage >= 100) {
          router.push('/founder')
          return
        }
      } catch (error) {
        logger.error('Failed to check existing profile', error as Error, {
          component: 'ONBOARDING',
          action: 'CHECK_PROFILE'
        })
      } finally {
        setLoading(false)
      }
    }

    checkExistingProfile()
  }, [supabase, router])

  const updateField = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setSaving(true)
    setError('')

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        setError('Not authenticated')
        return
      }

      // Validate required fields
      if (!data.startup_name || !data.industry_sector || !data.founder_names) {
        setError('Please fill in all required fields marked with *')
        return
      }

      // Create founder profile with basic data
      const profileData = {
        user_id: session.user.id,
        startup_name: data.startup_name,
        incorporation_status: data.incorporation_status,
        incorporation_number: data.incorporation_number || null,
        industry_sector: data.industry_sector,
        stage: data.stage,
        profile_completion_percentage: 100,
        admin_approval_status: 'pending' as const
      }

      const { data: newProfile, error: profileError } = await supabase
        .from('founder_profiles')
        .insert(profileData)
        .select()
        .single()

      if (profileError) throw profileError

      // Store comprehensive details in startup_details table
      const detailsData = {
        founder_profile_id: newProfile.id,
        founded_date: data.founded_date,
        website: data.website,
        founder_names: data.founder_names,
        team_size: data.team_size,
        key_team_members: data.key_team_members,
        advisor_names: data.advisor_names,
        problem_statement: data.problem_statement,
        solution_description: data.solution_description,
        unique_value_proposition: data.unique_value_proposition,
        target_customer: data.target_customer,
        product_status: data.product_status,
        market_size: data.market_size,
        target_market: data.target_market,
        competitors: data.competitors,
        competitive_advantage: data.competitive_advantage,
        current_users: data.current_users,
        monthly_revenue: data.monthly_revenue,
        revenue_growth: data.revenue_growth,
        key_achievements: data.key_achievements,
        fundraising_goal: data.fundraising_goal,
        funds_use: data.funds_use,
        previous_funding: data.previous_funding,
        equity_offered: data.equity_offered,
        one_year_goal: data.one_year_goal,
        three_year_vision: data.three_year_vision,
        exit_strategy: data.exit_strategy
      }

      const { error: detailsError } = await supabase
        .from('startup_details')
        .insert(detailsData)

      if (detailsError) {
        logger.error('Failed to save startup details', detailsError, {
          component: 'ONBOARDING',
          action: 'SAVE_DETAILS'
        })
        // Continue even if details fail, as basic profile is created
      }
      
      toast.success('Profile created successfully! Your profile is pending admin approval. You can start creating deals once approved.')
      router.push('/founder')
    } catch (error: any) {
      logger.error('Failed to save profile', error, {
        component: 'ONBOARDING',
        action: 'SUBMIT'
      })
      setError(error.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Incubazar! 🚀</h1>
          <p className="text-lg text-gray-600">Let&apos;s set up your startup profile to connect with investors</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mb-8">
          {STEPS.map((step) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center ${
                step.id === currentStep ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                step.id < currentStep 
                  ? 'bg-green-500 text-white' 
                  : step.id === currentStep 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.id < currentStep ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              <span className="text-xs font-medium text-center hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Basic Information
              </CardTitle>
              <CardDescription>Tell us about your startup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="startup_name">Startup Name *</Label>
                <Input
                  id="startup_name"
                  placeholder="e.g., Acme Corp"
                  value={data.startup_name}
                  onChange={(e) => updateField('startup_name', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry_sector">Industry Sector *</Label>
                  <Select
                    value={data.industry_sector}
                    onValueChange={(value) => updateField('industry_sector', value)}
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

                <div className="space-y-2">
                  <Label htmlFor="founded_date">Founded Date</Label>
                  <Input
                    id="founded_date"
                    type="month"
                    value={data.founded_date}
                    onChange={(e) => updateField('founded_date', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={data.website}
                  onChange={(e) => updateField('website', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Current Stage *</Label>
                <RadioGroup
                  value={data.stage}
                  onValueChange={(value) => updateField('stage', value)}
                  className="grid grid-cols-1 gap-4"
                >
                  {stages.map((stage) => (
                    <div key={stage.value} className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value={stage.value} id={`stage-${stage.value}`} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={`stage-${stage.value}`} className="font-semibold text-base cursor-pointer">
                          {stage.label}
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Incorporation Status *</Label>
                <RadioGroup
                  value={data.incorporation_status}
                  onValueChange={(value) => updateField('incorporation_status', value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="incorporated" id="incorporated" />
                    <Label htmlFor="incorporated" className="cursor-pointer">Incorporated</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="not_incorporated" id="not_incorporated" />
                    <Label htmlFor="not_incorporated" className="cursor-pointer">Not Incorporated</Label>
                  </div>
                </RadioGroup>
              </div>

              {data.incorporation_status === 'incorporated' && (
                <div className="space-y-2">
                  <Label htmlFor="incorporation_number">Incorporation Number (CIN)</Label>
                  <Input
                    id="incorporation_number"
                    placeholder="e.g., U74999DL2020PTC123456"
                    value={data.incorporation_number}
                    onChange={(e) => updateField('incorporation_number', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Team Information */}
        {currentStep === 2 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Team Information
              </CardTitle>
              <CardDescription>Tell us about your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="founder_names">Founder Name(s) *</Label>
                <Input
                  id="founder_names"
                  placeholder="e.g., John Doe, Jane Smith"
                  value={data.founder_names}
                  onChange={(e) => updateField('founder_names', e.target.value)}
                />
                <p className="text-sm text-gray-500">Separate multiple founders with commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team_size">Team Size</Label>
                <Select
                  value={data.team_size}
                  onValueChange={(value) => updateField('team_size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 members</SelectItem>
                    <SelectItem value="6-10">6-10 members</SelectItem>
                    <SelectItem value="11-20">11-20 members</SelectItem>
                    <SelectItem value="21+">21+ members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="key_team_members">Key Team Members & Roles</Label>
                <Textarea
                  id="key_team_members"
                  placeholder="e.g., John Doe - CEO (Ex-Google, 10 years in tech)&#10;Jane Smith - CTO (MIT, Full-stack developer)"
                  value={data.key_team_members}
                  onChange={(e) => updateField('key_team_members', e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-gray-500">Include their background and expertise</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="advisor_names">Advisors (if any)</Label>
                <Textarea
                  id="advisor_names"
                  placeholder="e.g., Dr. Robert Johnson - Healthcare Expert, Professor at Stanford"
                  value={data.advisor_names}
                  onChange={(e) => updateField('advisor_names', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Product/Solution */}
        {currentStep === 3 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6" />
                Product & Solution
              </CardTitle>
              <CardDescription>What problem are you solving?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="problem_statement">Problem Statement *</Label>
                <Textarea
                  id="problem_statement"
                  placeholder="What problem are you solving? Why is it important?"
                  value={data.problem_statement}
                  onChange={(e) => updateField('problem_statement', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution_description">Your Solution *</Label>
                <Textarea
                  id="solution_description"
                  placeholder="How does your product/service solve this problem?"
                  value={data.solution_description}
                  onChange={(e) => updateField('solution_description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unique_value_proposition">Unique Value Proposition *</Label>
                <Textarea
                  id="unique_value_proposition"
                  placeholder="What makes your solution unique? Why will customers choose you?"
                  value={data.unique_value_proposition}
                  onChange={(e) => updateField('unique_value_proposition', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_customer">Target Customer</Label>
                <Input
                  id="target_customer"
                  placeholder="e.g., SMBs in healthcare, B2C millennials"
                  value={data.target_customer}
                  onChange={(e) => updateField('target_customer', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product_status">Product Status</Label>
                <Select
                  value={data.product_status}
                  onValueChange={(value) => updateField('product_status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concept">Concept/Idea only</SelectItem>
                    <SelectItem value="prototype">Working prototype</SelectItem>
                    <SelectItem value="beta">Beta version</SelectItem>
                    <SelectItem value="launched">Launched & live</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Market & Competition */}
        {currentStep === 4 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6" />
                Market & Competition
              </CardTitle>
              <CardDescription>Who are you serving and competing with?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="target_market">Target Market</Label>
                <Textarea
                  id="target_market"
                  placeholder="Describe your target market in detail"
                  value={data.target_market}
                  onChange={(e) => updateField('target_market', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <LabelWithTooltip 
                  label="Market Size (TAM/SAM/SOM)"
                  htmlFor="market_size"
                  tooltip={
                    <div>
                      <p className="font-semibold mb-1">Market Size Definitions:</p>
                      <p><strong>TAM (Total Addressable Market):</strong> The total revenue opportunity if you achieved 100% market share</p>
                      <p className="mt-1"><strong>SAM (Serviceable Addressable Market):</strong> The portion of TAM you can realistically reach</p>
                      <p className="mt-1"><strong>SOM (Serviceable Obtainable Market):</strong> The realistic market share you can capture in the near term</p>
                    </div>
                  }
                />
                <Textarea
                  id="market_size"
                  placeholder="e.g., TAM: $10B, SAM: $1B, SOM: $100M in Year 1"
                  value={data.market_size}
                  onChange={(e) => updateField('market_size', e.target.value)}
                  rows={3}
                />
                <p className="text-sm text-gray-500">Total Addressable Market / Serviceable Available Market / Serviceable Obtainable Market</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitors">Main Competitors</Label>
                <Textarea
                  id="competitors"
                  placeholder="List your main competitors and how they compare"
                  value={data.competitors}
                  onChange={(e) => updateField('competitors', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitive_advantage">Your Competitive Advantage</Label>
                <Textarea
                  id="competitive_advantage"
                  placeholder="What gives you an edge over competitors?"
                  value={data.competitive_advantage}
                  onChange={(e) => updateField('competitive_advantage', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Traction & Metrics */}
        {currentStep === 5 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Traction & Metrics
              </CardTitle>
              <CardDescription>Show us your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current_users">Current Users/Customers</Label>
                  <Input
                    id="current_users"
                    placeholder="e.g., 1000 users, 50 paying customers"
                    value={data.current_users}
                    onChange={(e) => updateField('current_users', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly_revenue">Monthly Revenue (if any)</Label>
                  <Input
                    id="monthly_revenue"
                    placeholder="e.g., ₹50,000"
                    value={data.monthly_revenue}
                    onChange={(e) => updateField('monthly_revenue', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue_growth">Revenue Growth Rate</Label>
                <Input
                  id="revenue_growth"
                  placeholder="e.g., 20% MoM growth"
                  value={data.revenue_growth}
                  onChange={(e) => updateField('revenue_growth', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="key_achievements">Key Achievements & Milestones</Label>
                <Textarea
                  id="key_achievements"
                  placeholder="List your major achievements, awards, partnerships, press coverage, etc."
                  value={data.key_achievements}
                  onChange={(e) => updateField('key_achievements', e.target.value)}
                  rows={5}
                />
                <p className="text-sm text-gray-500">Include partnerships, awards, press mentions, user testimonials, etc.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Fundraising */}
        {currentStep === 6 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Fundraising Details
              </CardTitle>
              <CardDescription>Tell investors about your fundraising needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fundraising_goal">Fundraising Goal *</Label>
                  <Input
                    id="fundraising_goal"
                    placeholder="e.g., ₹50 Lakhs"
                    value={data.fundraising_goal}
                    onChange={(e) => updateField('fundraising_goal', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equity_offered">Equity Offered</Label>
                  <Input
                    id="equity_offered"
                    placeholder="e.g., 10-15%"
                    value={data.equity_offered}
                    onChange={(e) => updateField('equity_offered', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="funds_use">Use of Funds</Label>
                <Textarea
                  id="funds_use"
                  placeholder="How will you use the investment? Break down by percentage or amount"
                  value={data.funds_use}
                  onChange={(e) => updateField('funds_use', e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-gray-500">e.g., Product Development 40%, Marketing 30%, Team Hiring 20%, Operations 10%</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previous_funding">Previous Funding (if any)</Label>
                <Textarea
                  id="previous_funding"
                  placeholder="List any previous funding rounds, amounts, and investors"
                  value={data.previous_funding}
                  onChange={(e) => updateField('previous_funding', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="one_year_goal">1-Year Goal</Label>
                <Textarea
                  id="one_year_goal"
                  placeholder="Where do you see your startup in 1 year?"
                  value={data.one_year_goal}
                  onChange={(e) => updateField('one_year_goal', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="three_year_vision">3-Year Vision</Label>
                <Textarea
                  id="three_year_vision"
                  placeholder="What's your 3-year vision for the company?"
                  value={data.three_year_vision}
                  onChange={(e) => updateField('three_year_vision', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exit_strategy">Exit Strategy (Optional)</Label>
                <Textarea
                  id="exit_strategy"
                  placeholder="e.g., Acquisition, IPO, etc."
                  value={data.exit_strategy}
                  onChange={(e) => updateField('exit_strategy', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep < STEPS.length ? (
            <Button onClick={nextStep} className="gradient-primary">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={saving} className="gradient-primary">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Profile
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

