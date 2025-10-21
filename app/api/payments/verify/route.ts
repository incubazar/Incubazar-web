import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createRazorpayService } from '@/lib/integrations/razorpay'
import crypto from 'crypto'
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
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature 
    } = body

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // Verify signature
    const razorpayService = createRazorpayService({
      keyId: process.env.RAZORPAY_KEY_ID!,
      keySecret: process.env.RAZORPAY_KEY_SECRET!,
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET!
    })

    // Get payment details from Razorpay
    const payment = await razorpayService.getPayment(razorpay_payment_id)

    if (payment.status !== 'captured') {
      return NextResponse.json({ error: 'Payment not captured' }, { status: 400 })
    }

    // Update payment record
    const { data: paymentRecord, error: updateError } = await supabase
      .from('subscription_payments')
      .update({
        status: 'completed',
        razorpay_payment_id: razorpay_payment_id
      })
      .eq('razorpay_payment_id', razorpay_payment_id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
    }

    // Update user subscription
    if (paymentRecord.plan_type.startsWith('founder_')) {
      const subscriptionTier = paymentRecord.plan_type === 'founder_basic' ? 'free' : 'pro'
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      await supabase
        .from('founder_profiles')
        .update({
          subscription_tier: subscriptionTier,
          subscription_expires_at: expiryDate.toISOString()
        })
        .eq('user_id', paymentRecord.user_id)
    } else if (paymentRecord.plan_type.startsWith('investor_')) {
      const subscriptionTier = paymentRecord.plan_type === 'investor_pro' ? 'pro' : 'free'
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      await supabase
        .from('investor_profiles')
        .update({
          subscription_tier: subscriptionTier,
          subscription_expires_at: expiryDate.toISOString()
        })
        .eq('user_id', paymentRecord.user_id)
    }

    return NextResponse.json({ 
      success: true,
      payment: {
        id: paymentRecord.id,
        status: 'completed',
        plan_type: paymentRecord.plan_type
      }
    })

  } catch (error) {
    logger.error('Payment verification failed', error as Error, {
      component: 'PAYMENTS',
      action: 'VERIFY'
    })
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
