import Razorpay from 'razorpay'

export interface RazorpayConfig {
  keyId: string
  keySecret: string
  webhookSecret: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  duration: number // in months
  features: string[]
}

export interface PaymentRequest {
  amount: number
  currency: string
  receipt: string
  notes: {
    plan_type: string
    user_id: string
  }
}

export interface PaymentResponse {
  id: string
  amount: number
  currency: string
  status: string
  order_id: string
  receipt?: string
  created_at: number
}

export class RazorpayService {
  private razorpay: Razorpay
  private config: RazorpayConfig

  constructor(config: RazorpayConfig) {
    this.config = config
    this.razorpay = new Razorpay({
      key_id: config.keyId,
      key_secret: config.keySecret,
    })
  }

  /**
   * Create a payment order
   */
  async createOrder(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const order = await this.razorpay.orders.create({
        amount: paymentRequest.amount * 100, // Convert to paise
        currency: paymentRequest.currency,
        receipt: paymentRequest.receipt,
        notes: paymentRequest.notes,
      })

      return {
        id: order.id,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        status: 'created',
        order_id: order.id,
        receipt: paymentRequest.receipt,
        created_at: Date.now(),
      }
    } catch (error) {
      console.error('Razorpay order creation error:', error)
      throw new Error('Failed to create payment order')
    }
  }

  /**
   * Verify payment signature
   */
  verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', this.config.keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex')

    return expectedSignature === razorpaySignature
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(body: string, signature: string): boolean {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', this.config.webhookSecret)
      .update(body)
      .digest('hex')

    return expectedSignature === signature
  }

  /**
   * Get payment details
   */
  async getPayment(paymentId: string): Promise<any> {
    try {
      return await this.razorpay.payments.fetch(paymentId)
    } catch (error) {
      console.error('Razorpay payment fetch error:', error)
      throw new Error('Failed to fetch payment details')
    }
  }

  /**
   * Refund a payment
   */
  async refundPayment(paymentId: string, amount?: number): Promise<any> {
    try {
      const refundData: any = {
        payment_id: paymentId,
      }

      if (amount) {
        refundData.amount = amount * 100 // Convert to paise
      }

      return await this.razorpay.payments.refund(paymentId, refundData)
    } catch (error) {
      console.error('Razorpay refund error:', error)
      throw new Error('Failed to process refund')
    }
  }

  /**
   * Get subscription plans
   */
  getSubscriptionPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'founder_basic',
        name: 'Founder Basic',
        description: 'Essential tools for startup founders',
        price: 5000, // ₹5,000 per month
        duration: 1,
        features: [
          'Startup profile creation',
          'Deal creation and management',
          'Investor interest tracking',
          'Basic document generation',
          'Email support'
        ]
      },
      {
        id: 'founder_pro',
        name: 'Founder Pro',
        description: 'Advanced features for growing startups',
        price: 10000, // ₹10,000 per month
        duration: 1,
        features: [
          'Everything in Basic',
          'Advanced analytics',
          'Priority investor matching',
          'Custom document templates',
          'Phone support',
          'Quarterly strategy sessions'
        ]
      },
      {
        id: 'investor_pro',
        name: 'Investor Pro',
        description: 'Premium features for serious investors',
        price: 15000, // ₹15,000 per month
        duration: 1,
        features: [
          'Advanced deal filtering',
          'Portfolio analytics',
          'Priority deal access',
          'Direct founder communication',
          'Investment tracking tools',
          'Market insights'
        ]
      }
    ]
  }

  /**
   * Calculate subscription amount
   */
  calculateSubscriptionAmount(planId: string, duration: number): number {
    const plans = this.getSubscriptionPlans()
    const plan = plans.find(p => p.id === planId)
    
    if (!plan) {
      throw new Error('Invalid subscription plan')
    }

    return plan.price * duration
  }

  /**
   * Generate receipt ID
   */
  generateReceiptId(userId: string, planId: string): string {
    const timestamp = Date.now()
    return `receipt_${userId}_${planId}_${timestamp}`
  }
}

/**
 * Initialize Razorpay service with environment variables
 */
export function initializeRazorpay(): RazorpayService {
  const config: RazorpayConfig = {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || ''
  }

  if (!config.keyId || !config.keySecret) {
    throw new Error('Razorpay configuration is incomplete')
  }

  return new RazorpayService(config)
}

/**
 * Create Razorpay service with provided config
 */
export function createRazorpayService(config: RazorpayConfig): RazorpayService {
  return new RazorpayService(config)
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): boolean {
  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex')

  return expectedSignature === signature
}