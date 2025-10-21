import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createRazorpayService } from '@/lib/integrations/razorpay'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { plan_id, user_id } = body

    if (!plan_id || !user_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get plan details
    const razorpayService = createRazorpayService({
      keyId: process.env.RAZORPAY_KEY_ID!,
      keySecret: process.env.RAZORPAY_KEY_SECRET!,
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET!
    })

    const plans = razorpayService.getSubscriptionPlans()
    const plan = plans.find(p => p.id === plan_id)

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Create Razorpay order
    const order = await razorpayService.createOrder({
      amount: plan.price,
      currency: 'INR',
      receipt: `subscription_${plan_id}_${Date.now()}`,
      notes: {
        plan_type: plan_id,
        user_id: user_id
      }
    })

    // Save payment record
    const { data: paymentRecord } = await supabase
      .from('subscription_payments')
      .insert({
        user_id: user_id,
        razorpay_payment_id: order.id,
        amount: plan.price,
        plan_type: plan_id,
        status: 'pending'
      })
      .select()
      .single()

    return NextResponse.json({ 
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    })

  } catch (error) {
    logger.error('Failed to create payment order', error as Error, {
      component: 'PAYMENTS',
      action: 'CREATE_ORDER'
    })
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
