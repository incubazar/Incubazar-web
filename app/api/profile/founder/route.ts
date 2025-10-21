import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error } = await supabase
      .from('founder_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    logger.error('Failed to fetch founder profile', error as Error, {
      component: 'PROFILE',
      action: 'GET_FOUNDER'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      startup_name,
      incorporation_status,
      incorporation_number,
      industry_sector,
      stage,
      pitch_deck_url,
      logo_url
    } = body

    // Calculate profile completion percentage
    let completion = 0
    if (startup_name) completion += 20
    if (incorporation_status) completion += 15
    if (industry_sector) completion += 15
    if (stage) completion += 15
    if (pitch_deck_url) completion += 20
    if (logo_url) completion += 15

    const { data: profile, error } = await supabase
      .from('founder_profiles')
      .update({
        startup_name,
        incorporation_status,
        incorporation_number,
        industry_sector,
        stage,
        pitch_deck_url,
        logo_url,
        profile_completion_percentage: completion
      })
      .eq('user_id', session.user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    logger.error('Failed to update founder profile', error as Error, {
      component: 'PROFILE',
      action: 'UPDATE_FOUNDER'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
