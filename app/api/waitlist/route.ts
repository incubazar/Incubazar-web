import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// POST - Join waitlist
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    
    const {
      email,
      full_name,
      phone_number,
      user_type,
      // Founder fields
      startup_name,
      business_idea,
      startup_stage,
      industry,
      funding_target,
      team_size,
      website_url,
      // Investor fields
      investor_type,
      investment_range_min,
      investment_range_max,
      sectors_of_interest,
      investment_experience,
      linkedin_url
    } = body;

    // Validate required fields
    if (!email || !full_name || !user_type) {
      return NextResponse.json(
        { error: 'Email, full name, and user type are required' },
        { status: 400 }
      );
    }

    // Check if email already exists in waitlist
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('id, status, email')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { 
          error: 'This email is already on the waitlist',
          status: existing.status
        },
        { status: 409 }
      );
    }

    // Prepare waitlist entry based on user type
    const waitlistData: any = {
      email,
      full_name,
      phone_number,
      user_type,
      status: 'pending'
    };

    // Add type-specific fields
    if (user_type === 'founder') {
      waitlistData.startup_name = startup_name;
      waitlistData.business_idea = business_idea;
      waitlistData.startup_stage = startup_stage;
      waitlistData.industry = industry;
      waitlistData.funding_target = funding_target;
      waitlistData.team_size = team_size;
      waitlistData.website_url = website_url;
    } else if (user_type === 'investor') {
      waitlistData.investor_type = investor_type;
      waitlistData.investment_range_min = investment_range_min;
      waitlistData.investment_range_max = investment_range_max;
      waitlistData.sectors_of_interest = sectors_of_interest;
      waitlistData.investment_experience = investment_experience;
      waitlistData.linkedin_url = linkedin_url;
    }

    // Insert into waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert([waitlistData])
      .select()
      .single();

    if (error) {
      console.error('Error adding to waitlist:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    try {
      const { sendWaitlistConfirmationEmail } = await import('@/lib/email/sendOTP');
      await sendWaitlistConfirmationEmail({
        to: data.email,
        name: data.full_name,
        userType: data.user_type
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the signup if email fails
    }

    // Send notification to admin
    try {
      const { sendAdminWaitlistNotification } = await import('@/lib/email/sendOTP');
      await sendAdminWaitlistNotification({
        waitlistEntry: {
          full_name: data.full_name,
          email: data.email,
          user_type: data.user_type,
          startup_name: data.startup_name,
          business_idea: data.business_idea
        }
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      message: 'Successfully joined the waitlist! Check your email for confirmation.',
      data
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Check waitlist status by email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from('waitlist')
      .select('id, email, full_name, user_type, status, created_at, otp_verified')
      .eq('email', email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'No waitlist entry found for this email' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Waitlist status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

