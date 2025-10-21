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
    const investorId = searchParams.get('investor_id')
    const dealId = searchParams.get('deal_id')
    const status = searchParams.get('status')

    // Build query
    let query = supabase
      .from('investor_interests')
      .select(`
        *,
        startup_deals (
          deal_title,
          fundraising_goal,
          min_investment,
          max_investment,
          instrument_type,
          founder_profiles (
            startup_name,
            industry_sector
          )
        ),
        investor_profiles (
          investor_type,
          investment_preferences
        )
      `)

    // Apply filters
    if (investorId) {
      query = query.eq('investor_profile_id', investorId)
    }

    if (dealId) {
      query = query.eq('startup_deal_id', dealId)
    }

    if (status) {
      query = query.eq('interest_status', status)
    }

    const { data: interests, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch interests' }, { status: 500 })
    }

    return NextResponse.json({ interests })

  } catch (error) {
    logger.error('Failed to fetch investor interests', error as Error, {
      component: 'INVESTOR_INTERESTS',
      action: 'FETCH'
    })
    return NextResponse.json(
      { error: 'Failed to fetch interests' },
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
      investor_profile_id,
      startup_deal_id,
      interest_status,
      investment_amount,
      notes
    } = body

    // Validate required fields
    if (!investor_profile_id || !startup_deal_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if interest already exists
    const { data: existingInterest } = await supabase
      .from('investor_interests')
      .select('id')
      .eq('investor_profile_id', investor_profile_id)
      .eq('startup_deal_id', startup_deal_id)
      .single()

    if (existingInterest) {
      return NextResponse.json({ error: 'Interest already exists' }, { status: 400 })
    }

    // Check 200-investor limit for the deal
    if (interest_status === 'invested') {
      const { data: deal } = await supabase
        .from('startup_deals')
        .select('investor_count, investor_limit')
        .eq('id', startup_deal_id)
        .single()

      if (deal && deal.investor_count >= deal.investor_limit) {
        return NextResponse.json({ 
          error: 'Deal has reached the 200-investor limit' 
        }, { status: 400 })
      }
    }

    // Create the interest
    const { data: interest, error } = await supabase
      .from('investor_interests')
      .insert({
        investor_profile_id,
        startup_deal_id,
        interest_status: interest_status || 'viewed',
        investment_amount,
        notes
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create interest' }, { status: 500 })
    }

    // Update investor count if status is 'invested'
    if (interest_status === 'invested') {
      await supabase.rpc('increment_investor_count', {
        deal_id: startup_deal_id
      })
    }

    return NextResponse.json({ interest })

  } catch (error) {
    logger.error('Failed to create investor interest', error as Error, {
      component: 'INVESTOR_INTERESTS',
      action: 'CREATE'
    })
    return NextResponse.json(
      { error: 'Failed to create interest' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      id,
      interest_status,
      investment_amount,
      notes
    } = body

    if (!id) {
      return NextResponse.json({ error: 'Interest ID is required' }, { status: 400 })
    }

    // Get current interest status
    const { data: currentInterest } = await supabase
      .from('investor_interests')
      .select('interest_status, startup_deal_id')
      .eq('id', id)
      .single()

    if (!currentInterest) {
      return NextResponse.json({ error: 'Interest not found' }, { status: 404 })
    }

    // Check 200-investor limit if changing to 'invested'
    if (interest_status === 'invested' && currentInterest.interest_status !== 'invested') {
      const { data: deal } = await supabase
        .from('startup_deals')
        .select('investor_count, investor_limit')
        .eq('id', currentInterest.startup_deal_id)
        .single()

      if (deal && deal.investor_count >= deal.investor_limit) {
        return NextResponse.json({ 
          error: 'Deal has reached the 200-investor limit' 
        }, { status: 400 })
      }
    }

    // Update the interest
    const { data: interest, error } = await supabase
      .from('investor_interests')
      .update({
        interest_status,
        investment_amount,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to update interest' }, { status: 500 })
    }

    // Update investor count if status changed to/from 'invested'
    if (interest_status === 'invested' && currentInterest.interest_status !== 'invested') {
      await supabase.rpc('increment_investor_count', {
        deal_id: currentInterest.startup_deal_id
      })
    } else if (interest_status !== 'invested' && currentInterest.interest_status === 'invested') {
      await supabase.rpc('decrement_investor_count', {
        deal_id: currentInterest.startup_deal_id
      })
    }

    return NextResponse.json({ interest })

  } catch (error) {
    logger.error('Failed to update investor interest', error as Error, {
      component: 'INVESTOR_INTERESTS',
      action: 'UPDATE'
    })
    return NextResponse.json(
      { error: 'Failed to update interest' },
      { status: 500 }
    )
  }
}
