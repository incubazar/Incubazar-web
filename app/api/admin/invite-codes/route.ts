import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

// Generate a random invite code
function generateInviteCode(length: number = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Excluding similar looking characters
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// GET - Fetch all invite codes
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch all invite codes with usage stats
    const { data: codes, error } = await supabase
      .from('invite_codes')
      .select(`
        *,
        created_by_user:users!created_by(full_name, email)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ codes })
  } catch (error) {
    logger.error('Failed to fetch invite codes', error as Error, {
      component: 'INVITE_CODES_API',
      action: 'GET'
    })
    return NextResponse.json(
      { error: 'Failed to fetch invite codes' },
      { status: 500 }
    )
  }
}

// POST - Create new invite code
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request body
    const body = await request.json()
    const {
      code_type,
      usage_limit = 1,
      expires_in_days = null,
      custom_code = null,
      batch_size = 1
    } = body

    if (!code_type || !['founder', 'investor', 'both'].includes(code_type)) {
      return NextResponse.json(
        { error: 'Invalid code_type. Must be founder, investor, or both' },
        { status: 400 }
      )
    }

    // Generate codes
    const codes = []
    const createdCodes = []

    for (let i = 0; i < batch_size; i++) {
      const code = custom_code || generateInviteCode()
      
      const codeData: any = {
        code,
        code_type,
        usage_limit,
        created_by: user.id,
        is_active: true
      }

      // Set expiration if specified
      if (expires_in_days) {
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + expires_in_days)
        codeData.expires_at = expiresAt.toISOString()
      }

      codes.push(codeData)
    }

    // Insert codes into database
    const { data: insertedCodes, error } = await supabase
      .from('invite_codes')
      .insert(codes)
      .select()

    if (error) throw error

    logger.info(`Created ${batch_size} invite code(s)`, {
      component: 'INVITE_CODES_API',
      action: 'CREATE',
      code_type,
      count: batch_size
    })

    return NextResponse.json({
      success: true,
      codes: insertedCodes
    })
  } catch (error: any) {
    logger.error('Failed to create invite code', error as Error, {
      component: 'INVITE_CODES_API',
      action: 'POST'
    })
    
    // Handle duplicate code error
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'This invite code already exists. Please try a different code.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create invite code' },
      { status: 500 }
    )
  }
}

// PATCH - Update invite code (activate/deactivate)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request body
    const body = await request.json()
    const { code_id, is_active } = body

    if (!code_id) {
      return NextResponse.json(
        { error: 'code_id is required' },
        { status: 400 }
      )
    }

    // Update code
    const { data: updatedCode, error } = await supabase
      .from('invite_codes')
      .update({ is_active })
      .eq('id', code_id)
      .select()
      .single()

    if (error) throw error

    logger.info(`Updated invite code status`, {
      component: 'INVITE_CODES_API',
      action: 'PATCH',
      code_id,
      is_active
    })

    return NextResponse.json({
      success: true,
      code: updatedCode
    })
  } catch (error) {
    logger.error('Failed to update invite code', error as Error, {
      component: 'INVITE_CODES_API',
      action: 'PATCH'
    })
    return NextResponse.json(
      { error: 'Failed to update invite code' },
      { status: 500 }
    )
  }
}

// DELETE - Delete invite code
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get code_id from URL search params
    const { searchParams } = new URL(request.url)
    const code_id = searchParams.get('code_id')

    if (!code_id) {
      return NextResponse.json(
        { error: 'code_id is required' },
        { status: 400 }
      )
    }

    // Check if code has been used
    const { data: code } = await supabase
      .from('invite_codes')
      .select('times_used')
      .eq('id', code_id)
      .single()

    if (code && code.times_used > 0) {
      return NextResponse.json(
        { error: 'Cannot delete a code that has been used. You can deactivate it instead.' },
        { status: 400 }
      )
    }

    // Delete code
    const { error } = await supabase
      .from('invite_codes')
      .delete()
      .eq('id', code_id)

    if (error) throw error

    logger.info(`Deleted invite code`, {
      component: 'INVITE_CODES_API',
      action: 'DELETE',
      code_id
    })

    return NextResponse.json({
      success: true,
      message: 'Invite code deleted successfully'
    })
  } catch (error) {
    logger.error('Failed to delete invite code', error as Error, {
      component: 'INVITE_CODES_API',
      action: 'DELETE'
    })
    return NextResponse.json(
      { error: 'Failed to delete invite code' },
      { status: 500 }
    )
  }
}

