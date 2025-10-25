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
];

// Learning platform routes accessible to all authenticated users
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
];

// Premium/gated learning content (requires verified user, investor, or admin)
const learningPremiumRoutes = [
  '/learn/toolkits',
  '/learn/advanced',
];

// Investor-only routes
const investorRoutes = [
  '/investor',
  '/investor/dashboard',
  '/investor/deals',
  '/investor/startups',
];

// Founder-only routes (verified founders)
const founderRoutes = [
  '/founder',
  '/founder/dashboard',
  '/founder/data-room',
  '/founder/investors',
];

// Admin-only routes
const adminRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/deals',
  '/admin/waitlist',
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

  // Redirect unauthenticated users to login
  if (!user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(redirectUrl);
  }

  // Fetch user profile to check role and verification status
  const { data: profile } = await supabase
    .from('users')
    .select('role, verification_status')
    .eq('id', user.id)
    .single();

  if (!profile) {
    // User exists in auth but not in users table - redirect to complete profile
    return NextResponse.redirect(new URL('/register?step=profile', request.url));
  }

  const { role, verification_status } = profile;

  // Check admin routes
  if (adminRoutes.some(route => path.startsWith(route))) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }

  // Check investor routes
  if (investorRoutes.some(route => path.startsWith(route))) {
    if (role !== 'investor' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }

  // Check founder routes (requires verified founder)
  if (founderRoutes.some(route => path.startsWith(route))) {
    if (role !== 'founder' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (verification_status !== 'verified' && role === 'founder') {
      // Redirect to waitlist - founder not verified yet
      return NextResponse.redirect(new URL('/waitlist', request.url));
    }
    return response;
  }

  // Learning platform access control
  if (path.startsWith('/learn')) {
    // Public learning routes - accessible to all authenticated users (waitlist, verified, investors, admin)
    if (learningPublicRoutes.some(route => path === route || path.startsWith(route))) {
      return response;
    }

    // Premium learning routes - require verified user, investor, or admin
    if (learningPremiumRoutes.some(route => path === route || path.startsWith(route))) {
      const hasAccess =
        role === 'admin' ||
        role === 'investor' ||
        (role === 'founder' && verification_status === 'verified');

      if (!hasAccess) {
        // Redirect to upgrade/waitlist page with message
        const redirectUrl = new URL('/learn', request.url);
        redirectUrl.searchParams.set('premium', 'true');
        redirectUrl.searchParams.set('from', path);
        return NextResponse.redirect(redirectUrl);
      }
    }

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

  // Check investor routes
  if (investorRoutes.some(route => path.startsWith(route))) {
    return userRole === 'investor';
  }

  // Check founder routes
  if (founderRoutes.some(route => path.startsWith(route))) {
    return userRole === 'founder' && verificationStatus === 'verified';
  }

  // Check learning premium routes
  if (learningPremiumRoutes.some(route => path.startsWith(route))) {
    return (
      userRole === 'investor' ||
      (userRole === 'founder' && verificationStatus === 'verified')
    );
  }

  // Learning public routes accessible to all authenticated users
  if (learningPublicRoutes.some(route => path === route || path.startsWith(route))) {
    return true;
  }

  return false;
}
