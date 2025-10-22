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
import { Checkbox } from '@/components/ui/checkbox'
import { 
  User,
  Briefcase,
  Target,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface InvestorOnboardingData {
  // Personal Information
  investor_type: 'individual' | 'hni' | 'experienced_professional'
  linkedin_url: string
  professional_background: string
  current_occupation: string
  years_of_experience: string
  
  // Investment Preferences
  preferred_sectors: string[]
  preferred_stages: string[]
  geographic_preference: string
  min_investment_amount: string
  max_investment_amount: string
  typical_check_size: string
  
  // Investment Criteria
  investment_philosophy: string
  risk_appetite: string
  risk_acknowledgment: boolean
  expected_return: string
  investment_horizon: string
  value_add: string
  
  // Experience & Track Record
  previous_investments: string
  number_of_investments: string
  successful_exits: string
  portfolio_companies: string
  
  // Preferences & Goals
  involvement_level: string
  decision_timeline: string
  co_investment_interest: string
  investment_goals: string
}

const STEPS = [
  { id: 1, title: 'Profile', icon: User, description: 'Tell us about yourself' },
  { id: 2, title: 'Preferences', icon: Target, description: 'Investment preferences' },
  { id: 3, title: 'Criteria', icon: Briefcase, description: 'Investment criteria' },
  { id: 4, title: 'Experience', icon: TrendingUp, description: 'Your track record' },
  { id: 5, title: 'Goals', icon: Shield, description: 'Investment goals' },
]

export default function InvestorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()
  
  const [data, setData] = useState<InvestorOnboardingData>({
    investor_type: 'individual',
    linkedin_url: '',
    professional_background: '',
    current_occupation: '',
    years_of_experience: '',
    preferred_sectors: [],
    preferred_stages: [],
    geographic_preference: '',
    min_investment_amount: '',
    max_investment_amount: '',
    typical_check_size: '',
    investment_philosophy: '',
    risk_appetite: '',
    risk_acknowledgment: false,
    expected_return: '',
    investment_horizon: '',
    value_add: '',
    previous_investments: '',
    number_of_investments: '',
    successful_exits: '',
    portfolio_companies: '',
    involvement_level: '',
    decision_timeline: '',
    co_investment_interest: '',
    investment_goals: ''
  })

  const industrySectors = [
    'Technology', 'Healthcare', 'Fintech', 'Edtech', 'E-commerce',
    'SaaS', 'AI/ML', 'Blockchain', 'CleanTech', 'AgriTech',
    'Food & Beverage', 'Manufacturing', 'Real Estate', 'Travel',
    'Entertainment', 'Sports', 'Fashion', 'Beauty', 'Other'
  ]

  const stages = ['Idea Stage', 'MVP Stage', 'Early Revenue', 'Growth Stage', 'Series A+']

  useEffect(() => {
    const checkExistingProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          router.push('/login')
          return
        }

        // Check if profile already exists and is complete
        const { data: profile } = await supabase
          .from('investor_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        // If profile exists and has preferences, redirect to dashboard
        if (profile && profile.investment_preferences && Object.keys(profile.investment_preferences).length > 0) {
          router.push('/investor')
          return
        }
      } catch (error) {
        logger.error('Failed to check existing profile', error as Error, {
          component: 'INVESTOR_ONBOARDING',
          action: 'CHECK_PROFILE'
        })
      } finally {
        setLoading(false)
      }
    }

    checkExistingProfile()
  }, [supabase, router])

  const updateField = (field: keyof InvestorOnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const toggleSector = (sector: string) => {
    setData(prev => ({
      ...prev,
      preferred_sectors: prev.preferred_sectors.includes(sector)
        ? prev.preferred_sectors.filter(s => s !== sector)
        : [...prev.preferred_sectors, sector]
    }))
  }

  const toggleStage = (stage: string) => {
    setData(prev => ({
      ...prev,
      preferred_stages: prev.preferred_stages.includes(stage)
        ? prev.preferred_stages.filter(s => s !== stage)
        : [...prev.preferred_stages, stage]
    }))
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
      if (!data.investor_type || data.preferred_sectors.length === 0) {
        setError('Please complete all required fields')
        return
      }

      // Validate risk acknowledgment
      if (!data.risk_acknowledgment) {
        setError('You must acknowledge the investment risks to continue')
        return
      }

      // Prepare investment preferences as JSONB
      const investmentPreferences = {
        preferred_sectors: data.preferred_sectors,
        preferred_stages: data.preferred_stages,
        geographic_preference: data.geographic_preference,
        min_investment_amount: data.min_investment_amount,
        max_investment_amount: data.max_investment_amount,
        typical_check_size: data.typical_check_size,
        investment_philosophy: data.investment_philosophy,
        risk_appetite: data.risk_appetite,
        expected_return: data.expected_return,
        investment_horizon: data.investment_horizon,
        value_add: data.value_add,
        previous_investments: data.previous_investments,
        number_of_investments: data.number_of_investments,
        successful_exits: data.successful_exits,
        portfolio_companies: data.portfolio_companies,
        involvement_level: data.involvement_level,
        decision_timeline: data.decision_timeline,
        co_investment_interest: data.co_investment_interest,
        investment_goals: data.investment_goals,
        professional_background: data.professional_background,
        current_occupation: data.current_occupation,
        years_of_experience: data.years_of_experience
      }

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('investor_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from('investor_profiles')
          .update({
            investor_type: data.investor_type,
            linkedin_url: data.linkedin_url || null,
            investment_preferences: investmentPreferences
          })
          .eq('user_id', session.user.id)

        if (updateError) throw updateError
      } else {
        // Create new profile
        const { error: insertError } = await supabase
          .from('investor_profiles')
          .insert({
            user_id: session.user.id,
            investor_type: data.investor_type,
            linkedin_url: data.linkedin_url || null,
            investment_preferences: investmentPreferences,
            kyc_status: 'pending'
          })

        if (insertError) throw insertError
      }

      toast.success('Profile completed successfully! Start exploring deals.')
      router.push('/investor')
    } catch (error: any) {
      logger.error('Failed to save investor profile', error, {
        component: 'INVESTOR_ONBOARDING',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, Investor! 💼</h1>
          <p className="text-lg text-gray-600">Help us understand your investment preferences to show you the best deals</p>
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

        {/* Step 1: Personal Profile */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Personal Profile
              </CardTitle>
              <CardDescription>Tell us about your professional background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Investor Type *</Label>
                <RadioGroup
                  value={data.investor_type}
                  onValueChange={(value) => updateField('investor_type', value)}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="individual" id="individual" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="individual" className="font-semibold text-base cursor-pointer">
                        Individual Investor
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">Angel investor or individual investing personal funds</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="hni" id="hni" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="hni" className="font-semibold text-base cursor-pointer">
                        High Net Worth Individual (HNI)
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">Accredited investor with significant investment capacity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="experienced_professional" id="experienced_professional" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="experienced_professional" className="font-semibold text-base cursor-pointer">
                        Experienced Professional
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">Industry expert or experienced angel investor</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={data.linkedin_url}
                  onChange={(e) => updateField('linkedin_url', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_occupation">Current Occupation/Role</Label>
                <Input
                  id="current_occupation"
                  placeholder="e.g., CEO, CTO, Business Owner, Retired Executive"
                  value={data.current_occupation}
                  onChange={(e) => updateField('current_occupation', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_of_experience">Years of Professional Experience</Label>
                <Select
                  value={data.years_of_experience}
                  onValueChange={(value) => updateField('years_of_experience', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5">0-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10-15">10-15 years</SelectItem>
                    <SelectItem value="15-20">15-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="professional_background">Professional Background</Label>
                <Textarea
                  id="professional_background"
                  placeholder="Brief overview of your professional experience, expertise, and achievements"
                  value={data.professional_background}
                  onChange={(e) => updateField('professional_background', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Investment Preferences */}
        {currentStep === 2 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6" />
                Investment Preferences
              </CardTitle>
              <CardDescription>What types of startups are you interested in?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Preferred Sectors * (Select multiple)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industrySectors.map((sector) => (
                    <div key={sector} className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
                      <Checkbox
                        id={`sector-${sector}`}
                        checked={data.preferred_sectors.includes(sector)}
                        onCheckedChange={() => toggleSector(sector)}
                      />
                      <Label htmlFor={`sector-${sector}`} className="cursor-pointer text-sm">
                        {sector}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Selected: {data.preferred_sectors.length} sectors</p>
              </div>

              <div className="space-y-3">
                <Label>Preferred Stages (Select multiple)</Label>
                <div className="grid grid-cols-1 gap-3">
                  {stages.map((stage) => (
                    <div key={stage} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <Checkbox
                        id={`stage-${stage}`}
                        checked={data.preferred_stages.includes(stage)}
                        onCheckedChange={() => toggleStage(stage)}
                      />
                      <Label htmlFor={`stage-${stage}`} className="cursor-pointer flex-1">
                        {stage}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="geographic_preference">Geographic Preference</Label>
                <Select
                  value={data.geographic_preference}
                  onValueChange={(value) => updateField('geographic_preference', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local (same city/state)</SelectItem>
                    <SelectItem value="national">National (anywhere in India)</SelectItem>
                    <SelectItem value="no-preference">No Preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min_investment_amount">Minimum Investment Amount</Label>
                  <Input
                    id="min_investment_amount"
                    placeholder="e.g., ₹2 Lakhs"
                    value={data.min_investment_amount}
                    onChange={(e) => updateField('min_investment_amount', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_investment_amount">Maximum Investment Amount</Label>
                  <Input
                    id="max_investment_amount"
                    placeholder="e.g., ₹25 Lakhs"
                    value={data.max_investment_amount}
                    onChange={(e) => updateField('max_investment_amount', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="typical_check_size">Typical Check Size</Label>
                <Select
                  value={data.typical_check_size}
                  onValueChange={(value) => updateField('typical_check_size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select typical investment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5L">₹1-5 Lakhs</SelectItem>
                    <SelectItem value="5-10L">₹5-10 Lakhs</SelectItem>
                    <SelectItem value="10-25L">₹10-25 Lakhs</SelectItem>
                    <SelectItem value="25-50L">₹25-50 Lakhs</SelectItem>
                    <SelectItem value="50L+">₹50 Lakhs+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Investment Criteria */}
        {currentStep === 3 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Investment Criteria
              </CardTitle>
              <CardDescription>What do you look for in startups?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="investment_philosophy">Investment Philosophy</Label>
                <Textarea
                  id="investment_philosophy"
                  placeholder="Describe your investment approach, what you look for in startups, and your decision-making process"
                  value={data.investment_philosophy}
                  onChange={(e) => updateField('investment_philosophy', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk_appetite">Risk Appetite</Label>
                <Select
                  value={data.risk_appetite}
                  onValueChange={(value) => updateField('risk_appetite', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk appetite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative - Prefer proven business models</SelectItem>
                    <SelectItem value="moderate">Moderate - Balance of risk and stability</SelectItem>
                    <SelectItem value="aggressive">Aggressive - High risk, high return</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected_return">Expected Return</Label>
                <Select
                  value={data.expected_return}
                  onValueChange={(value) => updateField('expected_return', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected return" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10x">5-10x in 5-7 years</SelectItem>
                    <SelectItem value="10-20x">10-20x in 5-7 years</SelectItem>
                    <SelectItem value="20x+">20x+ in 5-7 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment_horizon">Investment Horizon</Label>
                <Select
                  value={data.investment_horizon}
                  onValueChange={(value) => updateField('investment_horizon', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-7">5-7 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value_add">Value You Can Add</Label>
                <Textarea
                  id="value_add"
                  placeholder="What can you bring to startups beyond capital? (e.g., mentorship, network, expertise, industry connections)"
                  value={data.value_add}
                  onChange={(e) => updateField('value_add', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Experience & Track Record */}
        {currentStep === 4 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Experience & Track Record
              </CardTitle>
              <CardDescription>Share your investment experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="number_of_investments">Number of Previous Investments</Label>
                <Select
                  value={data.number_of_investments}
                  onValueChange={(value) => updateField('number_of_investments', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">First time investor</SelectItem>
                    <SelectItem value="1-3">1-3 investments</SelectItem>
                    <SelectItem value="4-10">4-10 investments</SelectItem>
                    <SelectItem value="10+">10+ investments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previous_investments">Previous Investments (if any)</Label>
                <Textarea
                  id="previous_investments"
                  placeholder="List companies you've invested in, their sectors, and current status"
                  value={data.previous_investments}
                  onChange={(e) => updateField('previous_investments', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="successful_exits">Successful Exits (if any)</Label>
                <Textarea
                  id="successful_exits"
                  placeholder="Mention any successful exits from your portfolio (acquisitions, IPOs, etc.)"
                  value={data.successful_exits}
                  onChange={(e) => updateField('successful_exits', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio_companies">Notable Portfolio Companies</Label>
                <Textarea
                  id="portfolio_companies"
                  placeholder="Companies you're proud to be associated with"
                  value={data.portfolio_companies}
                  onChange={(e) => updateField('portfolio_companies', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Goals & Preferences */}
        {currentStep === 5 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Investment Goals & Style
              </CardTitle>
              <CardDescription>How do you like to invest?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="involvement_level">Level of Involvement</Label>
                <Select
                  value={data.involvement_level}
                  onValueChange={(value) => updateField('involvement_level', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select involvement level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hands-off">Hands-off - Capital only</SelectItem>
                    <SelectItem value="advisory">Advisory - Quarterly meetings</SelectItem>
                    <SelectItem value="active">Active - Regular involvement</SelectItem>
                    <SelectItem value="board">Board seat preferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="decision_timeline">Decision-Making Timeline</Label>
                <Select
                  value={data.decision_timeline}
                  onValueChange={(value) => updateField('decision_timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-2months">1-2 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="co_investment_interest">Co-Investment Interest</Label>
                <Select
                  value={data.co_investment_interest}
                  onValueChange={(value) => updateField('co_investment_interest', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Open to co-investing</SelectItem>
                    <SelectItem value="prefer">Prefer co-investing</SelectItem>
                    <SelectItem value="solo">Prefer solo investing</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment_goals">Investment Goals</Label>
                <Textarea
                  id="investment_goals"
                  placeholder="What are you hoping to achieve through angel investing? (e.g., portfolio diversification, giving back, staying connected to innovation)"
                  value={data.investment_goals}
                  onChange={(e) => updateField('investment_goals', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Risk Acknowledgment */}
              <div className="mt-6 p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="risk_acknowledgment"
                    checked={data.risk_acknowledgment}
                    onCheckedChange={(checked) => updateField('risk_acknowledgment', checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="risk_acknowledgment"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-900 font-semibold">Risk Acknowledgment (Required)</span>
                      </div>
                      <p className="text-red-800 leading-relaxed">
                        I understand and acknowledge that startup investments carry substantial risk, including the potential loss of my entire investment. Past performance is not indicative of future results. I confirm that I will conduct my own due diligence and consult with financial, legal, and tax advisors before making any investment decisions.
                      </p>
                    </label>
                  </div>
                </div>
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
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete Profile
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

