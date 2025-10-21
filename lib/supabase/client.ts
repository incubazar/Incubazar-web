import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './types'

export const createClient = () => {
  const supabase = createClientComponentClient<Database>()
  
  // Set up auth state change listener to handle token refresh silently
  supabase.auth.onAuthStateChange((event, session) => {
    // Only log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      if (event === 'TOKEN_REFRESHED') {
        console.log('[Auth] Token refreshed successfully')
      } else if (event === 'SIGNED_OUT') {
        console.log('[Auth] User signed out')
      }
    }
  })
  
  return supabase
}
