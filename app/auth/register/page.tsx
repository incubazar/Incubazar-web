"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Logo } from '@/components/ui/logo'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2, CheckCircle, X } from 'lucide-react'

function RegisterForm() {
  const [step, setStep] = useState<'email' | 'otp' | 'register'>('email')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: 'founder' as 'founder' | 'investor',
    otp: ''
  })
  const [waitlistData, setWaitlistData] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const role = searchParams.get('role')
    if (role === 'founder' || role === 'investor') {
      setFormData(prev => ({ ...prev, role }))
    }
  }, [searchParams])

  // Check email in waitlist
  const checkWaitlistStatus = async (email: string) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/waitlist?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (!response.ok) {
        setError('This email is not on the waitlist. Please join the waitlist first.')
        setLoading(false)
        return false
      }

      if (data.data.status !== 'approved') {
        setError('Your application is still pending admin approval. Please wait for approval.')
        setLoading(false)
        return false
      }

      if (data.data.otp_verified) {
        setError('This email has already been verified. Please proceed to login.')
        setLoading(false)
        return false
      }

      setWaitlistData(data.data)
      setFormData(prev => ({
        ...prev,
        fullName: data.data.full_name,
        phone: data.data.phone_number || '',
        role: data.data.user_type
      }))
      setStep('otp')
      setLoading(false)
      return true
    } catch (err) {
      setError('Failed to check waitlist status. Please try again.')
      setLoading(false)
      return false
    }
  }

  // Verify OTP
  const verifyOTP = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp
        })
      })

      const data = await response.json()

      if (!response.ok || !data.verified) {
        setError(data.error || 'Invalid OTP. Please try again.')
        setLoading(false)
        return
      }

      setStep('register')
      setError('')
      setLoading(false)
    } catch (err) {
      setError('Failed to verify OTP. Please try again.')
      setLoading(false)
    }
  }

  // Resend OTP
  const resendOTP = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/waitlist/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      })

      const data = await response.json()

      if (response.ok) {
        setError('')
        alert('OTP has been resent to your email!')
      } else {
        setError(data.error || 'Failed to resend OTP')
      }
    } catch (err) {
      setError('Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await checkWaitlistStatus(formData.email)
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await verifyOTP()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          }
        }
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (authData.user) {
        // Create user record in our database
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            role: formData.role,
            full_name: formData.fullName,
            phone: formData.phone,
            verification_status: 'verified' // Auto-verify since they&apos;re from waitlist
          })

        if (userError) {
          console.error('User insert error:', userError)
          setError('Failed to create user record: ' + userError.message)
          return
        }

        setSuccess(true)
        // Redirect to appropriate dashboard
        setTimeout(() => {
          router.push(formData.role === 'founder' ? '/founder' : '/investor')
        }, 2000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-ink mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-ink mb-2 font-serif">
                  Account Created Successfully!
                </h2>
                <p className="text-graphite-600 mb-6 font-body">
                  Redirecting you to your dashboard...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Email verification step
  if (step === 'email') {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Logo size="lg" href="/" />
          </div>
          <p className="text-graphite-600 font-body">Join India&apos;s trusted startup investment platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
                Enter your email to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    This email must be approved on the waitlist
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Not on the waitlist?{' '}
                  <Link href="/waitlist" className="text-blue-600 hover:underline">
                    Join waitlist
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // OTP verification step
  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Logo size="lg" href="/" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>
                Enter the OTP sent to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOTPSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password (OTP)</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                    maxLength={6}
                    required
                    className="text-center text-2xl tracking-widest"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading || formData.otp.length !== 6}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={resendOTP}
                    disabled={loading}
                    className="text-sm"
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="text-sm"
                >
                  ← Back to email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Registration step (after OTP verification)
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Logo size="lg" href="/" />
          </div>
          <p className="text-graphite-600 font-body">Complete your registration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Password</CardTitle>
            <CardDescription>
              Set up your password to complete registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Display pre-filled info */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">Email:</span>{' '}
                  <span className="font-medium">{formData.email}</span>
                  </div>
                <div className="text-sm">
                  <span className="text-gray-500">Name:</span>{' '}
                  <span className="font-medium">{formData.fullName}</span>
                  </div>
                <div className="text-sm">
                  <span className="text-gray-500">Role:</span>{' '}
                  <span className="font-medium capitalize">{formData.role}</span>
                </div>
                {formData.phone && (
                  <div className="text-sm">
                    <span className="text-gray-500">Phone:</span>{' '}
                    <span className="font-medium">{formData.phone}</span>
              </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
