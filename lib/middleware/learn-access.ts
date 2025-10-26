import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/auth/login',
  '/auth/register',
  '/auth/verify',
  '/waitlist',
  '/about',
  '/legal',
  '/showcase',
];

// Learning platform routes accessible to all authenticated users (including waitlisted)
const learningPublicRoutes = [
  '/learn',
  '/learn/incorporation',
  '/learn/finance',
  '/learn/product',
  '/learn/pitching',
  '/learn/brand',
  '/learn/trends',
  '/learn/case-studies',
  '/learn/case-studies/razorpay',
  '/learn/case-studies/zomato',
  '/learn/case-studies/flipkart',
  '/learn/toolkits',
  '/calculator', // Calculator accessible to all authenticated users
];

// Investor-only routes (require waitlist approval/verification)
const investorRoutes = [
  '/investor',
  '/investor/deals',
  '/investor/startups',
  '/investor/portfolio',
  '/investor/settings',
  '/investor/kyc',
  '/investor/analytics',
];

// Founder-only routes (verified founders)
const founderRoutes = [
  '/founder',
  '/founder/data-room',
  '/founder/investors',
  '/founder/deals',
  '/founder/documents',
  '/founder/updates',
  '/founder/profile',
  '/founder/subscription',
];

// Admin-only routes
const adminRoutes = [
  '/admin',
  '/admin/users',
  '/admin/deals',
  '/admin/waitlist',
  '/admin/startups',
  '/admin/investors',
  '/admin/review',
  '/admin/invites',
  '/admin/analytics',
];

export async function learnMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.some(route => path === route || path.startsWith(route))) {
    return response;
  }

  // If no user and trying to access protected routes (not learning), redirect to login
  if (!user) {
    const protectedPaths = [...investorRoutes, ...founderRoutes, ...adminRoutes];
    if (protectedPaths.some(route => path.startsWith(route))) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }
    
    // For learning and calculator routes, redirect to login
    if (path.startsWith('/learn') || path.startsWith('/calculator')) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Allow other public routes
    return response;
  }

  // User is authenticated, fetch profile
  const { data: profile } = await supabase
    .from('users')
    .select('role, verification_status')
    .eq('id', user.id)
    .single();

  if (!profile) {
    // User exists in auth but not in users table - redirect to complete profile
    return NextResponse.redirect(new URL('/auth/register?step=profile', request.url));
  }

  const { role, verification_status } = profile;

  // Check admin routes
  if (adminRoutes.some(route => path.startsWith(route))) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }

  // Check investor routes - require verification OR waitlist approval
  if (investorRoutes.some(route => path.startsWith(route))) {
    if (role !== 'investor' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Investor must be verified to access investment features
    if (role === 'investor' && verification_status !== 'verified') {
      return NextResponse.redirect(new URL('/waitlist?message=approval-required', request.url));
    }
    return response;
  }

  // Check founder routes - require verification for investment features
  if (founderRoutes.some(route => path.startsWith(route))) {
    if (role !== 'founder' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Founder must be verified to access investment/fundraising features
    if (verification_status !== 'verified' && role === 'founder') {
      return NextResponse.redirect(new URL('/waitlist?message=approval-required', request.url));
    }
    return response;
  }

  // Learning platform access control
  // ALL AUTHENTICATED USERS can access learning materials (including waitlisted)
  if (path.startsWith('/learn') || path.startsWith('/calculator')) {
    // All learning routes and calculator are accessible to any authenticated user
    // No verification required for learning materials or calculator
    return response;
  }

  return response;
}

// Helper function to check if user has access to a specific route
export function hasRouteAccess(
  path: string,
  userRole: 'founder' | 'investor' | 'admin' | null,
  verificationStatus: 'pending' | 'verified' | 'rejected' | null
): boolean {
  if (!userRole) return false;

  // Admin has access to everything
  if (userRole === 'admin') return true;

  // Check investor routes - require verification
  if (investorRoutes.some(route => path.startsWith(route))) {
    return userRole === 'investor' && verificationStatus === 'verified';
  }

  // Check founder routes - require verification
  if (founderRoutes.some(route => path.startsWith(route))) {
    return userRole === 'founder' && verificationStatus === 'verified';
  }

  // Learning routes accessible to ALL authenticated users (including waitlisted)
  if (learningPublicRoutes.some(route => path === route || path.startsWith(route))) {
    return true;
  }

  return false;
}
