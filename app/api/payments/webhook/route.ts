import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createRazorpayService } from '@/lib/integrations/razorpay'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Initialize Razorpay service
    const razorpayService = createRazorpayService({
      keyId: process.env.RAZORPAY_KEY_ID!,
      keySecret: process.env.RAZORPAY_KEY_SECRET!,
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET!
    })

    // Verify webhook signature
    const isValidSignature = razorpayService.verifyWebhookSignature(body, signature)
    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const supabase = createClient()

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event, supabase)
        break

      case 'payment.failed':
        await handlePaymentFailed(event, supabase)
        break

      case 'subscription.activated':
        await handleSubscriptionActivated(event, supabase)
        break

      case 'subscription.charged':
        await handleSubscriptionCharged(event, supabase)
        break

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event, supabase)
        break

      case 'subscription.paused':
        await handleSubscriptionPaused(event, supabase)
        break

      case 'subscription.resumed':
        await handleSubscriptionResumed(event, supabase)
        break

      default:
        logger.warn('Unhandled webhook event received', {
          component: 'PAYMENTS_WEBHOOK',
          action: 'UNHANDLED_EVENT',
          eventType: event.event
        })
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    logger.error('Webhook processing failed', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'PROCESS'
    })
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentCaptured(event: any, supabase: any) {
  try {
    const payment = event.payload.payment.entity
    const orderId = payment.order_id

    // Update payment status in database
    await supabase
      .from('subscription_payments')
      .update({
        status: 'completed',
        razorpay_payment_id: payment.id
      })
      .eq('razorpay_payment_id', payment.id)

    // Update user subscription if this is a subscription payment
    if (payment.notes?.plan_type) {
      const planType = payment.notes.plan_type
      const userId = payment.notes.user_id

      // Calculate expiry date (1 year from now)
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      // Update user's subscription
      if (planType.startsWith('founder_')) {
        await supabase
          .from('founder_profiles')
          .update({
            subscription_tier: planType === 'founder_basic' ? 'free' : 'pro',
            subscription_expires_at: expiryDate.toISOString()
          })
          .eq('user_id', userId)
      } else if (planType.startsWith('investor_')) {
        await supabase
          .from('investor_profiles')
          .update({
            subscription_tier: planType === 'investor_pro' ? 'pro' : 'free',
            subscription_expires_at: expiryDate.toISOString()
          })
          .eq('user_id', userId)
      }
    }

    logger.info('Payment captured successfully', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'PAYMENT_CAPTURED',
      paymentId: payment.id
    })
  } catch (error) {
    logger.error('Failed to handle payment captured event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'PAYMENT_CAPTURED'
    })
  }
}

async function handlePaymentFailed(event: any, supabase: any) {
  try {
    const payment = event.payload.payment.entity

    // Update payment status in database
    await supabase
      .from('subscription_payments')
      .update({
        status: 'failed',
        razorpay_payment_id: payment.id
      })
      .eq('razorpay_payment_id', payment.id)

    logger.info('Payment failure recorded', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'PAYMENT_FAILED',
      paymentId: payment.id
    })
  } catch (error) {
    logger.error('Failed to handle payment failed event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'PAYMENT_FAILED'
    })
  }
}

async function handleSubscriptionActivated(event: any, supabase: any) {
  try {
    const subscription = event.payload.subscription.entity
    const userId = subscription.notes?.user_id
    const planType = subscription.notes?.plan_type

    if (userId && planType) {
      // Update user's subscription status
      if (planType.startsWith('founder_')) {
        await supabase
          .from('founder_profiles')
          .update({
            subscription_tier: planType === 'founder_basic' ? 'free' : 'pro',
            subscription_expires_at: new Date(subscription.current_start * 1000).toISOString()
          })
          .eq('user_id', userId)
      } else if (planType.startsWith('investor_')) {
        await supabase
          .from('investor_profiles')
          .update({
            subscription_tier: planType === 'investor_pro' ? 'pro' : 'free',
            subscription_expires_at: new Date(subscription.current_start * 1000).toISOString()
          })
          .eq('user_id', userId)
      }
    }

    logger.info('Subscription activated successfully', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_ACTIVATED',
      subscriptionId: subscription.id,
      userId
    })
  } catch (error) {
    logger.error('Failed to handle subscription activated event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_ACTIVATED'
    })
  }
}

async function handleSubscriptionCharged(event: any, supabase: any) {
  try {
    const subscription = event.payload.subscription.entity
    const payment = event.payload.payment.entity

    // Record the subscription payment
    await supabase
      .from('subscription_payments')
      .insert({
        user_id: subscription.notes?.user_id,
        razorpay_payment_id: payment.id,
        amount: payment.amount / 100, // Convert from paise to rupees
        plan_type: subscription.notes?.plan_type,
        status: 'completed'
      })

    logger.info('Subscription charged successfully', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_CHARGED',
      subscriptionId: subscription.id,
      paymentId: payment.id
    })
  } catch (error) {
    logger.error('Failed to handle subscription charged event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_CHARGED'
    })
  }
}

async function handleSubscriptionCancelled(event: any, supabase: any) {
  try {
    const subscription = event.payload.subscription.entity
    const userId = subscription.notes?.user_id

    if (userId) {
      // Downgrade user to free tier
      await supabase
        .from('founder_profiles')
        .update({
          subscription_tier: 'free',
          subscription_expires_at: null
        })
        .eq('user_id', userId)

      await supabase
        .from('investor_profiles')
        .update({
          subscription_tier: 'free',
          subscription_expires_at: null
        })
        .eq('user_id', userId)
    }

    logger.info('Subscription cancelled successfully', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_CANCELLED',
      subscriptionId: subscription.id,
      userId
    })
  } catch (error) {
    logger.error('Failed to handle subscription cancelled event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_CANCELLED'
    })
  }
}

async function handleSubscriptionPaused(event: any, supabase: any) {
  try {
    const subscription = event.payload.subscription.entity
    logger.info('Subscription paused', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_PAUSED',
      subscriptionId: subscription.id
    })
  } catch (error) {
    logger.error('Failed to handle subscription paused event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_PAUSED'
    })
  }
}

async function handleSubscriptionResumed(event: any, supabase: any) {
  try {
    const subscription = event.payload.subscription.entity
    logger.info('Subscription resumed', {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_RESUMED',
      subscriptionId: subscription.id
    })
  } catch (error) {
    logger.error('Failed to handle subscription resumed event', error as Error, {
      component: 'PAYMENTS_WEBHOOK',
      action: 'SUBSCRIPTION_RESUMED'
    })
  }
}
