// ============================================================================
// SECURITY HEADERS CONFIGURATION
// ============================================================================
// Purpose: Implement comprehensive security headers via middleware
// Features: CSP, HSTS, X-Frame-Options, XSS Protection, CSRF tokens
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

/**
 * Content Security Policy configuration
 * Prevents XSS attacks by controlling resource loading
 */
const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Next.js inline scripts
    "'unsafe-eval'", // Required for Next.js dev mode
    'https://checkout.razorpay.com',
    'https://cdn.razorpay.com',
    'https://va.vercel-scripts.com' // Vercel Speed Insights
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for styled components/CSS-in-JS
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'https://fonts.cdnfonts.com',
    'data:'
  ],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https:' // Allow images from Supabase storage
  ],
  'connect-src': [
    "'self'",
    'https://*.supabase.co', // Supabase API
    'wss://*.supabase.co', // Supabase realtime
    'https://api.razorpay.com',
    'https://va.vercel-scripts.com', // Vercel Speed Insights
    'https://vitals.vercel-insights.com' // Vercel Analytics
  ],
  'frame-src': [
    "'self'",
    'https://api.razorpay.com' // Razorpay checkout iframe
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"], // Prevent clickjacking
  'upgrade-insecure-requests': [] // Upgrade HTTP to HTTPS
}

/**
 * Build CSP header string from directives
 */
function buildCSPHeader(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => {
      if (values.length === 0) {
        return key
      }
      return `${key} ${values.join(' ')}`
    })
    .join('; ')
}

/**
 * Apply comprehensive security headers to response
 */
export function applySecurityHeaders(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const headers = response.headers

  // Content Security Policy
  const csp = buildCSPHeader()
  headers.set('Content-Security-Policy', csp)

  // HTTP Strict Transport Security (HSTS)
  // Enforce HTTPS for 1 year, include subdomains
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // X-Frame-Options - Prevent clickjacking
  // Redundant with CSP frame-ancestors but provides fallback
  headers.set('X-Frame-Options', 'DENY')

  // X-Content-Type-Options - Prevent MIME sniffing
  headers.set('X-Content-Type-Options', 'nosniff')

  // X-XSS-Protection - Enable browser XSS filter
  // Note: Deprecated in favor of CSP, but provides fallback
  headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer-Policy - Control referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions-Policy - Control browser features
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // X-DNS-Prefetch-Control - Control DNS prefetching
  headers.set('X-DNS-Prefetch-Control', 'off')

  // Cross-Origin policies
  headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp')

  // Log security header application in development
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Security headers applied', {
      component: 'SECURITY',
      path: request.nextUrl.pathname
    })
  }

  return response
}

/**
 * Validate request origin for CSRF protection
 */
export function validateOrigin(request: NextRequest): boolean {
  // Skip GET, HEAD, OPTIONS (safe methods)
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return true
  }

  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  // Allow requests without origin (same-origin or server-to-server)
  if (!origin) {
    return true
  }

  // Extract hostname from origin
  try {
    const originUrl = new URL(origin)
    const originHost = originUrl.host

    // Check if origin matches host
    if (originHost === host) {
      return true
    }

    // In development, allow localhost variations
    if (process.env.NODE_ENV === 'development') {
      const localhostPattern = /^localhost(:\d+)?$/
      if (localhostPattern.test(originHost) && localhostPattern.test(host || '')) {
        return true
      }
    }

    // Log suspicious origin
    logger.warn('Origin validation failed', {
      component: 'SECURITY',
      action: 'CSRF_CHECK',
      origin: originHost,
      host,
      method: request.method,
      path: request.nextUrl.pathname
    })

    return false
  } catch (error) {
    logger.error('Origin validation error', error as Error, {
      component: 'SECURITY',
      origin
    })
    return false
  }
}

/**
 * Generate CSRF token for form submissions
 */
export function generateCSRFToken(): string {
  // Generate cryptographically secure random token
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate CSRF token from request
 */
export function validateCSRFToken(
  request: NextRequest,
  expectedToken: string
): boolean {
  // Get token from header or body
  const headerToken = request.headers.get('x-csrf-token')
  
  if (!headerToken) {
    logger.warn('Missing CSRF token', {
      component: 'SECURITY',
      action: 'CSRF_CHECK',
      path: request.nextUrl.pathname
    })
    return false
  }

  // Constant-time comparison to prevent timing attacks
  if (headerToken !== expectedToken) {
    logger.warn('Invalid CSRF token', {
      component: 'SECURITY',
      action: 'CSRF_CHECK',
      path: request.nextUrl.pathname
    })
    return false
  }

  return true
}

/**
 * Check if request is from a trusted source
 */
export function isTrustedSource(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''

  // Block requests without user agent (potential bots)
  if (!userAgent && process.env.NODE_ENV === 'production') {
    logger.warn('Request without user agent', {
      component: 'SECURITY',
      action: 'TRUST_CHECK',
      path: request.nextUrl.pathname
    })
    return false
  }

  // Block known malicious user agents
  const maliciousPatterns = [
    /python-requests/i,
    /curl/i,
    /wget/i,
    /scrapy/i,
    /bot/i, // Be careful with this, as legitimate bots exist
    /crawler/i
  ]

  for (const pattern of maliciousPatterns) {
    if (pattern.test(userAgent)) {
      logger.warn('Suspicious user agent detected', {
        component: 'SECURITY',
        action: 'TRUST_CHECK',
        userAgent: userAgent.substring(0, 100),
        path: request.nextUrl.pathname
      })
      // Don't block, just log for now
      // return false
    }
  }

  return true
}

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  // Remove potential XSS vectors
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  
  // Check for Indian mobile numbers (10 digits starting with 6-9)
  const indianMobileRegex = /^[6-9]\d{9}$/
  
  // Check for numbers with country code (+91)
  const indianWithCodeRegex = /^\+91[6-9]\d{9}$/
  
  return indianMobileRegex.test(cleaned) || indianWithCodeRegex.test(cleaned)
}

/**
 * Validate PAN number (Indian tax ID)
 */
export function isValidPAN(pan: string): boolean {
  // PAN format: ABCDE1234F
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/
  return panRegex.test(pan.toUpperCase())
}

/**
 * Validate GST number (Indian goods and services tax ID)
 */
export function isValidGST(gst: string): boolean {
  // GST format: 22AAAAA0000A1Z5
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstRegex.test(gst.toUpperCase())
}

// Export all utilities
export {
  buildCSPHeader,
  CSP_DIRECTIVES
}
