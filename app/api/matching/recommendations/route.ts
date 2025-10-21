import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { matchStartupsForInvestor, getRecommendedStartups } from '@/lib/matching/algorithm'
import { logger } from '@/lib/logger'

/**
 * GET /api/matching/recommendations
 * Get personalized startup recommendations for the logged-in investor
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get current user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get investor profile with preferences
    const { data: investorProfile, error: profileError } = await supabase
      .from('investor_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (profileError) {
      logger.error('Failed to fetch investor profile', profileError, {
        component: 'MATCHING_API',
        action: 'GET_PROFILE'
      })
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Check if preferences are set
    if (!investorProfile.investment_preferences) {
      return NextResponse.json(
        { 
          error: 'Preferences not set',
          message: 'Please complete your investment preferences first'
        },
        { status: 400 }
      )
    }

    // Get all approved startups with their details
    const { data: startups, error: startupsError } = await supabase
      .from('founder_profiles')
      .select(`
        id,
        startup_name,
        industry_sector,
        stage,
        admin_approval_status,
        created_at
      `)
      .eq('admin_approval_status', 'approved')

    if (startupsError) {
      logger.error('Failed to fetch startups', startupsError, {
        component: 'MATCHING_API',
        action: 'GET_STARTUPS'
      })
      return NextResponse.json(
        { error: 'Failed to fetch startups' },
        { status: 500 }
      )
    }

    // Get startup details for fundraising goals
    const startupIds = startups?.map(s => s.id) || []
    const { data: startupDetails } = await supabase
      .from('startup_details')
      .select('founder_profile_id, fundraising_goal')
      .in('founder_profile_id', startupIds)

    // Merge fundraising goals with startup data
    const enrichedStartups = startups?.map(startup => ({
      ...startup,
      fundraising_goal: startupDetails?.find(d => d.founder_profile_id === startup.id)?.fundraising_goal
    })) || []

    // Run matching algorithm
    const matchedStartups = matchStartupsForInvestor(
      enrichedStartups,
      investorProfile.investment_preferences
    )

    // Get recommended startups (score >= 50)
    const recommendations = getRecommendedStartups(matchedStartups, 50)

    // Get full details for top recommendations
    const topRecommendationIds = recommendations.slice(0, 20).map(r => r.startup_id)
    
    const { data: fullStartupDetails } = await supabase
      .from('founder_profiles')
      .select(`
        id,
        startup_name,
        industry_sector,
        stage,
        logo_url,
        created_at
      `)
      .in('id', topRecommendationIds)

    // Combine match scores with full details
    const detailedRecommendations = recommendations.slice(0, 20).map(match => {
      const startup = fullStartupDetails?.find(s => s.id === match.startup_id)
      return {
        ...match,
        startup
      }
    })

    return NextResponse.json({
      success: true,
      total_startups: startups?.length || 0,
      matched_startups: matchedStartups.length,
      recommended_startups: recommendations.length,
      recommendations: detailedRecommendations,
      preferences: {
        sectors: investorProfile.investment_preferences.preferred_sectors,
        stages: investorProfile.investment_preferences.preferred_stages,
        investment_range: {
          min: investorProfile.investment_preferences.min_investment_amount,
          max: investorProfile.investment_preferences.max_investment_amount
        }
      }
    })

  } catch (error) {
    logger.error('Failed to generate recommendations', error as Error, {
      component: 'MATCHING_API',
      action: 'GET_RECOMMENDATIONS'
    })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

