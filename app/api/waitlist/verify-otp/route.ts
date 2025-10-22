import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// POST - Verify OTP
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Call the verify function
    const { data, error } = await supabase.rpc('verify_waitlist_otp', {
      waitlist_email: email,
      otp: otp
    });

    if (error) {
      console.error('OTP verification error:', error);
      return NextResponse.json(
        { error: 'Failed to verify OTP' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { 
          error: 'Invalid or expired OTP. Please request a new one.',
          verified: false
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'OTP verified successfully! You can now complete your registration.',
      verified: true
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

