import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sector = searchParams.get('sector')
    const stage = searchParams.get('stage')
    const instrument = searchParams.get('instrument')

    // Build query
    let query = supabase
      .from('startup_deals')
      .select(`
        *,
        founder_profiles (
          startup_name,
          industry_sector,
          stage,
          logo_url
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    // Apply filters
    if (sector) {
      query = query.eq('founder_profiles.industry_sector', sector)
    }

    if (stage) {
      query = query.eq('founder_profiles.stage', stage)
    }

    if (instrument) {
      query = query.eq('instrument_type', instrument)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: deals, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 })
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('startup_deals')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    return NextResponse.json({
      deals,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    logger.error('Failed to fetch deals', error as Error, {
      component: 'DEALS',
      action: 'FETCH_ALL'
    })
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      founder_profile_id,
      deal_title,
      problem_statement,
      solution,
      market_size,
      business_model,
      traction_metrics,
      fundraising_goal,
      min_investment,
      max_investment,
      instrument_type
    } = body

    // Validate required fields
    if (!founder_profile_id || !deal_title || !problem_statement || !solution) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate investment amounts
    if (fundraising_goal <= 0 || min_investment <= 0 || max_investment <= 0) {
      return NextResponse.json({ error: 'Invalid investment amounts' }, { status: 400 })
    }

    if (max_investment < min_investment) {
      return NextResponse.json({ error: 'Maximum investment must be greater than minimum' }, { status: 400 })
    }

    // Create the deal
    const { data: deal, error } = await supabase
      .from('startup_deals')
      .insert({
        founder_profile_id,
        deal_title,
        problem_statement,
        solution,
        market_size,
        business_model,
        traction_metrics: traction_metrics || {},
        fundraising_goal,
        min_investment,
        max_investment,
        instrument_type,
        investor_count: 0,
        investor_limit: 200,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 })
    }

    return NextResponse.json({ deal })

  } catch (error) {
    logger.error('Failed to create deal', error as Error, {
      component: 'DEALS',
      action: 'CREATE'
    })
    return NextResponse.json(
      { error: 'Failed to create deal' },
      { status: 500 }
    )
  }
}
