"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  XCircle, 
  Crown, 
  Star,
  Zap,
  Shield,
  Users,
  FileText,
  TrendingUp
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  popular?: boolean
  current?: boolean
}

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [currentPlan, setCurrentPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        // Get current subscription
        const { data: founderProfile } = await supabase
          .from('founder_profiles')
          .select('subscription_tier, subscription_expires_at')
          .eq('user_id', session.user.id)
          .single()

        if (founderProfile) {
          setCurrentPlan(founderProfile.subscription_tier)
        }

        // Define subscription plans
        const subscriptionPlans: SubscriptionPlan[] = [
          {
            id: 'free',
            name: 'Free',
            price: 0,
            interval: 'forever',
            features: [
              'Create 1 active deal',
              'Basic profile setup',
              'Limited investor access',
              'Email support'
            ],
            current: founderProfile?.subscription_tier === 'free'
          },
          {
            id: 'founder_basic',
            name: 'Founder Basic',
            price: 5000,
            interval: 'per year',
            features: [
              'Create up to 2 active deals',
              'Basic document generation',
              'Investor network access',
              'Priority support',
              'Basic analytics'
            ],
            current: founderProfile?.subscription_tier === 'free' && founderProfile?.subscription_expires_at
          },
          {
            id: 'founder_pro',
            name: 'Founder Pro',
            price: 15000,
            interval: 'per year',
            features: [
              'Unlimited active deals',
              'Advanced document automation',
              'DocuSign integration',
              'Priority investor matching',
              'Advanced analytics dashboard',
              'Phone support',
              'Custom branding'
            ],
            popular: true,
            current: founderProfile?.subscription_tier === 'pro'
          }
        ]

        setPlans(subscriptionPlans)
      } catch (error) {
        logger.error('Failed to fetch subscription data', error as Error, {
          component: 'FOUNDER_SUBSCRIPTION',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionData()
  }, [supabase])

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      // Create payment order
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          user_id: session.user.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create payment order')
      }

      const { order } = await response.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Incubazar',
        description: `Subscription: ${plans.find(p => p.id === planId)?.name}`,
        order_id: order.id,
        handler: async (response: any) => {
          // Verify payment
          const verifyResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          })

          if (verifyResponse.ok) {
            // Payment successful, refresh page
            window.location.reload()
          } else {
            alert('Payment verification failed')
          }
        },
        prefill: {
          name: session.user.user_metadata?.full_name || '',
          email: session.user.email || ''
        },
        theme: {
          color: '#3B82F6'
        }
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      logger.error('Subscription payment failed', error as Error, {
        component: 'FOUNDER_SUBSCRIPTION',
        action: 'PAYMENT'
      })
      alert('Failed to initiate subscription')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-600 mt-2">
          Select the perfect plan for your startup's fundraising journey
        </p>
      </div>

      {/* Current Plan Status */}
      {currentPlan !== 'free' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Active Subscription
                </h3>
                <p className="text-sm text-green-700">
                  You are currently on the {plans.find(p => p.id === currentPlan)?.name} plan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''} ${plan.current ? 'border-green-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            {plan.current && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Current Plan
                </Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                {plan.id === 'founder_pro' && <Crown className="h-5 w-5 text-yellow-500" />}
                {plan.id === 'founder_basic' && <Zap className="h-5 w-5 text-blue-500" />}
                {plan.id === 'free' && <Shield className="h-5 w-5 text-gray-500" />}
                <span>{plan.name}</span>
              </CardTitle>
              <div className="mt-4">
                <div className="text-4xl font-bold">
                  {plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString()}`}
                </div>
                <div className="text-sm text-gray-500">{plan.interval}</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                {plan.current ? (
                  <Button className="w-full" disabled>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Current Plan
                  </Button>
                ) : plan.id === 'free' ? (
                  <Button variant="outline" className="w-full" disabled>
                    <Shield className="mr-2 h-4 w-4" />
                    Free Forever
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.popular ? (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>
            Compare features across all subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Features</th>
                  <th className="text-center py-3">Free</th>
                  <th className="text-center py-3">Basic</th>
                  <th className="text-center py-3">Pro</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-3">Active Deals</td>
                  <td className="text-center py-3">1</td>
                  <td className="text-center py-3">2</td>
                  <td className="text-center py-3">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Document Generation</td>
                  <td className="text-center py-3">Basic</td>
                  <td className="text-center py-3">Basic</td>
                  <td className="text-center py-3">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">DocuSign Integration</td>
                  <td className="text-center py-3">
                    <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center py-3">
                    <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center py-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Analytics Dashboard</td>
                  <td className="text-center py-3">Basic</td>
                  <td className="text-center py-3">Basic</td>
                  <td className="text-center py-3">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Support</td>
                  <td className="text-center py-3">Email</td>
                  <td className="text-center py-3">Email</td>
                  <td className="text-center py-3">Phone + Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Can I change my plan anytime?</h4>
            <p className="text-sm text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">What happens if I cancel my subscription?</h4>
            <p className="text-sm text-gray-600">
              You&apos;ll retain access to paid features until your current billing period ends, then revert to the free plan.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Do you offer refunds?</h4>
            <p className="text-sm text-gray-600">
              We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
