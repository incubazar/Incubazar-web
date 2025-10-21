"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'

function VerifyContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const email = searchParams.get('email')

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setStatus('error')
          setMessage('Failed to verify email. Please try again.')
          return
        }

        if (data.session?.user?.email_confirmed_at) {
          setStatus('success')
          setMessage('Email verified successfully!')
          
          // Update user verification status
          await supabase
            .from('users')
            .update({ verification_status: 'verified' })
            .eq('id', data.session.user.id)
          
          // Redirect to appropriate dashboard after 2 seconds
          setTimeout(() => {
            const role = searchParams.get('role') || 'founder'
            const redirectPath = role === 'admin' ? '/admin' : `/${role}`
            router.push(redirectPath)
          }, 2000)
        } else {
          setStatus('pending')
          setMessage('Please check your email and click the verification link.')
        }
      } catch (err) {
        setStatus('error')
        setMessage('An unexpected error occurred.')
      }
    }

    handleVerification()
  }, [supabase, router, searchParams])

  const resendVerification = async () => {
    if (!email) return
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })

      if (error) {
        setMessage('Failed to resend verification email.')
        return
      }

      setMessage('Verification email sent! Please check your inbox.')
    } catch (err) {
      setMessage('Failed to resend verification email.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Incubazar</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
              {status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
              {status === 'pending' && <Mail className="h-5 w-5 text-blue-500" />}
              <span>
                {status === 'loading' && 'Verifying Email...'}
                {status === 'success' && 'Email Verified!'}
                {status === 'error' && 'Verification Failed'}
                {status === 'pending' && 'Check Your Email'}
              </span>
            </CardTitle>
            <CardDescription>
              {status === 'loading' && 'Please wait while we verify your email address.'}
              {status === 'success' && 'Your email has been successfully verified.'}
              {status === 'error' && 'There was an issue verifying your email.'}
              {status === 'pending' && 'We\'ve sent a verification link to your email address.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert className={status === 'error' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {status === 'pending' && email && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={resendVerification}
                    className="text-blue-600 hover:underline"
                  >
                    resend verification email
                  </button>
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Redirecting you to your dashboard...
                </p>
                <Link href="/auth/login">
                  <Button variant="outline">
                    Continue to Login
                  </Button>
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <Link href="/auth/register">
                  <Button className="w-full">
                    Try Again
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            )}

            {status === 'pending' && (
              <div className="space-y-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
