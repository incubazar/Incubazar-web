import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, fullName, phone } = await request.json()

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate role
    if (!['founder', 'investor'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role
        }
      }
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (authData.user) {
      // Create user record in our database
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          role,
          full_name: fullName,
          phone,
          verification_status: 'pending'
        })

      if (userError) {
        return NextResponse.json(
          { error: 'Failed to create user record' },
          { status: 500 }
        )
      }

      // Create profile based on role
      if (role === 'founder') {
        await supabase.from('founder_profiles').insert({
          user_id: authData.user.id,
          startup_name: '',
          incorporation_status: 'not_incorporated',
          industry_sector: '',
          stage: 'idea',
          admin_approval_status: 'pending'
        })
      } else if (role === 'investor') {
        await supabase.from('investor_profiles').insert({
          user_id: authData.user.id,
          investor_type: 'individual',
          kyc_status: 'pending',
          subscription_tier: 'free',
          investment_preferences: {}
        })
      }

      return NextResponse.json({
        success: true,
        user: authData.user
      })
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  } catch (error) {
    logger.error('User signup failed', error as Error, {
      component: 'AUTH',
      action: 'SIGNUP'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
