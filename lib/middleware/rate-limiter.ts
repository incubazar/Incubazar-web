// ============================================================================
// RATE LIMITING MIDDLEWARE
// ============================================================================
// Purpose: Protect API routes from abuse and DDoS attacks
// Features: IP-based limiting, sliding window, configurable limits per route
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

interface RateLimitEntry {
  count: number
  resetAt: number
  blocked: boolean
  blockUntil?: number
}

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  blockDurationMs?: number // How long to block after exceeding limit
  skipSuccessfulRequests?: boolean // Only count failed requests
  keyGenerator?: (request: NextRequest) => string // Custom key generation
}

class RateLimiter {
  private store: Map<string, RateLimitEntry>
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    this.store = new Map()
    this.startCleanup()
  }

  /**
   * Start periodic cleanup of expired entries
   */
  private startCleanup(): void {
    // Clean up every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now()
      let cleaned = 0

      this.store.forEach((entry, key) => {
        if (entry.resetAt < now && (!entry.blocked || (entry.blockUntil && entry.blockUntil < now))) {
          this.store.delete(key)
          cleaned++
        }
      })

      if (cleaned > 0) {
        logger.debug('Rate limiter cleanup', { cleaned, remaining: this.store.size })
      }
    }, 5 * 60 * 1000)
  }

  /**
   * Generate rate limit key from request
   */
  private getKey(request: NextRequest, keyPrefix: string, config: RateLimitConfig): string {
    if (config.keyGenerator) {
      return `${keyPrefix}:${config.keyGenerator(request)}`
    }

    // Use IP address as default key
    const ip = this.getClientIp(request)
    return `${keyPrefix}:${ip}`
  }

  /**
   * Extract client IP from request
   */
  private getClientIp(request: NextRequest): string {
    // Try various headers in order of preference
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }

    const realIp = request.headers.get('x-real-ip')
    if (realIp) {
      return realIp
    }

    // Fallback to connection info or unknown
    return 'unknown'
  }

  /**
   * Check if request should be rate limited
   */
  check(
    request: NextRequest,
    keyPrefix: string,
    config: RateLimitConfig
  ): {
    allowed: boolean
    remaining: number
    resetAt: number
    retryAfter?: number
  } {
    const key = this.getKey(request, keyPrefix, config)
    const now = Date.now()
    const entry = this.store.get(key)

    // If blocked, check if block has expired
    if (entry?.blocked && entry.blockUntil && entry.blockUntil > now) {
      const retryAfter = Math.ceil((entry.blockUntil - now) / 1000)
      
      logger.warn('Rate limit block active', {
        component: 'RATE_LIMITER',
        key: keyPrefix,
        ip: this.getClientIp(request),
        retryAfter
      })

      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockUntil,
        retryAfter
      }
    }

    // If no entry or window expired, create new entry
    if (!entry || entry.resetAt < now) {
      this.store.set(key, {
        count: 1,
        resetAt: now + config.windowMs,
        blocked: false
      })

      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetAt: now + config.windowMs
      }
    }

    // Increment count
    entry.count++

    // Check if limit exceeded
    if (entry.count > config.maxRequests) {
      // Apply block if configured
      if (config.blockDurationMs) {
        entry.blocked = true
        entry.blockUntil = now + config.blockDurationMs
      }

      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)

      logger.warn('Rate limit exceeded', {
        component: 'RATE_LIMITER',
        key: keyPrefix,
        ip: this.getClientIp(request),
        count: entry.count,
        limit: config.maxRequests,
        retryAfter
      })

      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
        retryAfter
      }
    }

    return {
      allowed: true,
      remaining: config.maxRequests - entry.count,
      resetAt: entry.resetAt
    }
  }

  /**
   * Reset rate limit for a specific key (useful for testing or manual overrides)
   */
  reset(request: NextRequest, keyPrefix: string, config: RateLimitConfig): void {
    const key = this.getKey(request, keyPrefix, config)
    this.store.delete(key)
    
    logger.info('Rate limit reset', {
      component: 'RATE_LIMITER',
      key: keyPrefix,
      ip: this.getClientIp(request)
    })
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.store.clear()
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

// ============================================================================
// PREDEFINED RATE LIMIT CONFIGS
// ============================================================================

/**
 * Standard API rate limit (100 requests per minute)
 */
export const standardRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  blockDurationMs: 5 * 60 * 1000 // Block for 5 minutes after exceeding
}

/**
 * Strict rate limit for sensitive endpoints (10 requests per minute)
 */
export const strictRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10,
  blockDurationMs: 15 * 60 * 1000 // Block for 15 minutes after exceeding
}

/**
 * Authentication rate limit (5 attempts per 15 minutes)
 */
export const authRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  blockDurationMs: 60 * 60 * 1000 // Block for 1 hour after exceeding
}

/**
 * Payment rate limit (3 requests per minute)
 */
export const paymentRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 3,
  blockDurationMs: 30 * 60 * 1000 // Block for 30 minutes after exceeding
}

/**
 * Lenient rate limit for public endpoints (200 requests per minute)
 */
export const lenientRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 200
}

// ============================================================================
// HELPER FUNCTION FOR ROUTE HANDLERS
// ============================================================================

/**
 * Apply rate limiting to a route handler
 * 
 * @example
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await withRateLimit(request, 'api:signup', authRateLimit)
 *   if (!rateLimitResult.allowed) {
 *     return rateLimitResult.response
 *   }
 * 
 *   // Your route logic here
 * }
 * ```
 */
export async function withRateLimit(
  request: NextRequest,
  keyPrefix: string,
  config: RateLimitConfig = standardRateLimit
): Promise<{
  allowed: boolean
  remaining: number
  resetAt: number
  response?: NextResponse
}> {
  const result = rateLimiter.check(request, keyPrefix, config)

  if (!result.allowed) {
    const response = NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter: result.retryAfter
      },
      {
        status: 429,
        headers: {
          'Retry-After': result.retryAfter?.toString() || '60',
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(result.resetAt).toISOString()
        }
      }
    )

    return {
      allowed: false,
      remaining: 0,
      resetAt: result.resetAt,
      response
    }
  }

  return {
    allowed: true,
    remaining: result.remaining,
    resetAt: result.resetAt
  }
}

// Export types
export type { RateLimitConfig, RateLimitEntry }
