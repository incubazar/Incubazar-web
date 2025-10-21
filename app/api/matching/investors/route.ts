import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { matchStartupsForInvestor } from '@/lib/matching/algorithm'
import { logger } from '@/lib/logger'

/**
 * GET /api/matching/investors?startup_id=xxx
 * Get investors that match a specific startup (for founders)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const startupId = searchParams.get('startup_id')

    // Get current user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get founder profile
    const { data: founderProfile, error: profileError } = await supabase
      .from('founder_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (profileError) {
      return NextResponse.json(
        { error: 'Founder profile not found' },
        { status: 404 }
      )
    }

    // Use provided startup_id or founder's own profile
    const targetStartupId = startupId || founderProfile.id

    // Get startup details
    const { data: startup, error: startupError } = await supabase
      .from('founder_profiles')
      .select('*')
      .eq('id', targetStartupId)
      .single()

    if (startupError) {
      return NextResponse.json(
        { error: 'Startup not found' },
        { status: 404 }
      )
    }

    // Get startup details for fundraising goal
    const { data: startupDetails } = await supabase
      .from('startup_details')
      .select('fundraising_goal')
      .eq('founder_profile_id', targetStartupId)
      .single()

    // Get all investors with preferences
    const { data: investors, error: investorsError } = await supabase
      .from('investor_profiles')
      .select(`
        id,
        user_id,
        investor_type,
        investment_preferences
      `)
      .not('investment_preferences', 'is', null)

    if (investorsError) {
      logger.error('Failed to fetch investors', investorsError, {
        component: 'MATCHING_API',
        action: 'GET_INVESTORS'
      })
      return NextResponse.json(
        { error: 'Failed to fetch investors' },
        { status: 500 }
      )
    }

    // Create startup array for matching algorithm
    const startupForMatching = [{
      id: startup.id,
      startup_name: startup.startup_name,
      industry_sector: startup.industry_sector,
      stage: startup.stage,
      admin_approval_status: startup.admin_approval_status,
      fundraising_goal: startupDetails?.fundraising_goal
    }]

    // Match each investor against this startup
    const matchedInvestors = investors?.map(investor => {
      const matches = matchStartupsForInvestor(
        startupForMatching,
        investor.investment_preferences || {}
      )
      
      return {
        investor_id: investor.id,
        user_id: investor.user_id,
        investor_type: investor.investor_type,
        match_score: matches[0]?.total_score || 0,
        match_breakdown: matches[0]?.breakdown,
        match_reasons: matches[0]?.match_reasons || [],
        preferences: {
          sectors: investor.investment_preferences.preferred_sectors,
          stages: investor.investment_preferences.preferred_stages,
          check_size: investor.investment_preferences.typical_check_size
        }
      }
    }).filter(match => match.match_score >= 40) // Only show reasonable matches
      .sort((a, b) => b.match_score - a.match_score) || []

    // Get user details for matched investors
    const userIds = matchedInvestors.map(inv => inv.user_id)
    const { data: users } = await supabase
      .from('users')
      .select('id, full_name, email')
      .in('id', userIds)

    // Combine investor data with user info
    const detailedMatches = matchedInvestors.map(match => {
      const user = users?.find(u => u.id === match.user_id)
      return {
        ...match,
        investor_name: user?.full_name,
        investor_email: user?.email
      }
    })

    return NextResponse.json({
      success: true,
      startup: {
        id: startup.id,
        name: startup.startup_name,
        sector: startup.industry_sector,
        stage: startup.stage
      },
      total_investors: investors?.length || 0,
      matched_investors: matchedInvestors.length,
      matches: detailedMatches.slice(0, 50) // Return top 50 matches
    })

  } catch (error) {
    logger.error('Failed to match investors', error as Error, {
      component: 'MATCHING_API',
      action: 'GET_MATCHED_INVESTORS'
    })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

