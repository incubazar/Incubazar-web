import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './types'
import { logger } from '@/lib/logger'

export const createClient = () => {
  const supabase = createClientComponentClient<Database>()
  
  // Set up auth state change listener to handle token refresh silently
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'TOKEN_REFRESHED') {
      logger.debug('Auth token refreshed successfully', {
        component: 'SUPABASE_CLIENT',
        action: 'TOKEN_REFRESH'
      })
    } else if (event === 'SIGNED_OUT') {
      logger.info('User signed out', {
        component: 'SUPABASE_CLIENT',
        action: 'SIGN_OUT'
      })
    }
  })
  
  return supabase
}
