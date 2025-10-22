import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// POST - Resend OTP
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user is approved and eligible for OTP
    const { data: waitlistEntry, error: fetchError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .eq('status', 'approved')
      .single();

    if (fetchError || !waitlistEntry) {
      return NextResponse.json(
        { error: 'Your application is not yet approved or does not exist' },
        { status: 404 }
      );
    }

    if (waitlistEntry.otp_verified) {
      return NextResponse.json(
        { error: 'OTP already verified. Please proceed with registration.' },
        { status: 400 }
      );
    }

    // Generate new OTP
    const { data, error } = await supabase.rpc('generate_waitlist_otp', {
      waitlist_email: email
    });

    if (error) {
      console.error('Error generating OTP:', error);
      return NextResponse.json(
        { error: 'Failed to generate OTP' },
        { status: 500 }
      );
    }

    // TODO: Send OTP via email
    // For now, we'll just return success
    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    
    console.log(`OTP for ${email}: ${data[0]?.otp_code}`);
    
    return NextResponse.json({
      message: 'OTP sent to your email successfully!',
      // In production, remove this - only for development
      dev_otp: process.env.NODE_ENV === 'development' ? data[0]?.otp_code : undefined
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

