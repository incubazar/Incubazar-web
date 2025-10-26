import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { applySecurityHeaders, validateOrigin, isTrustedSource } from '@/lib/middleware/security'
import { rateLimiter, standardRateLimit, strictRateLimit, authRateLimit } from '@/lib/middleware/rate-limiter'
import { learnMiddleware } from '@/lib/middleware/learn-access'
import { logger } from '@/lib/logger'

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const pathname = request.nextUrl.pathname
  
  // ============================================================================
  // 0. LEARNING PLATFORM ACCESS CONTROL (before security checks)
  // ============================================================================
  
  if (pathname.startsWith('/learn')) {
    const learnResponse = await learnMiddleware(request)
    if (learnResponse.status !== 200 && learnResponse.headers.get('location')) {
      // Redirect response from learning middleware
      return learnResponse
    }
    // Continue with security checks if access granted
  }
  
  // ============================================================================
  // 1. SECURITY VALIDATION
  // ============================================================================
  
  // Validate request origin for CSRF protection
  if (!validateOrigin(request)) {
    logger.warn('Origin validation failed', {
      component: 'MIDDLEWARE',
      path: request.nextUrl.pathname,
      origin: request.headers.get('origin')
    })
    
    return NextResponse.json(
      { success: false, error: 'Invalid request origin' },
      { status: 403 }
    )
  }

  // Check if request is from trusted source
  if (!isTrustedSource(request)) {
    // Just log for now, don't block
    logger.warn('Potentially untrusted source', {
      component: 'MIDDLEWARE',
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent')
    })
  }

  // ============================================================================
  // 2. RATE LIMITING
  // ============================================================================
  
  let rateLimitConfig = standardRateLimit
  let rateLimitKey = 'api:general'

  // Apply stricter limits to sensitive endpoints
  if (pathname.startsWith('/api/auth')) {
    rateLimitConfig = authRateLimit
    rateLimitKey = 'api:auth'
  } else if (pathname.startsWith('/api/payments')) {
    rateLimitConfig = strictRateLimit
    rateLimitKey = 'api:payments'
  } else if (pathname.startsWith('/api/documents')) {
    rateLimitConfig = strictRateLimit
    rateLimitKey = 'api:documents'
  } else if (pathname.startsWith('/api')) {
    rateLimitKey = `api:${pathname.split('/')[2] || 'unknown'}`
  }

  // Check rate limit
  const rateLimitResult = rateLimiter.check(request, rateLimitKey, rateLimitConfig)
  
  if (!rateLimitResult.allowed) {
    const response = NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      },
      {
        status: 429,
        headers: {
          'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
          'X-RateLimit-Limit': rateLimitConfig.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimitResult.resetAt).toISOString()
        }
      }
    )
    
    return applySecurityHeaders(request, response)
  }

  // ============================================================================
  // 3. CREATE RESPONSE WITH SECURITY HEADERS
  // ============================================================================
  
  const response = NextResponse.next()
  
  // Add rate limit info to response headers
  response.headers.set('X-RateLimit-Limit', rateLimitConfig.maxRequests.toString())
  response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
  response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetAt).toISOString())
  
  // Apply comprehensive security headers
  const securedResponse = applySecurityHeaders(request, response)
  
  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    const duration = Date.now() - startTime
    logger.debug('Request processed', {
      component: 'MIDDLEWARE',
      method: request.method,
      path: pathname,
      duration,
      rateLimitRemaining: rateLimitResult.remaining
    })
  }
  
  return securedResponse
}

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
