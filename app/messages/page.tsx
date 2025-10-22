'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ConversationList } from '@/components/messaging/ConversationList'
import { MessageThread } from '@/components/messaging/MessageThread'
import { MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'

interface Conversation {
  id: string
  other_party: {
    id: string
    name: string
    role: 'founder' | 'investor'
    startup_name?: string
  }
  last_message: {
    content: string
    created_at: string
    is_read: boolean
  }
  unread_count: number
  deal_title?: string
}

function MessagingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const [userRole, setUserRole] = useState<'founder' | 'investor' | null>(null)

  useEffect(() => {
    initializeMessaging()
  }, [])

  useEffect(() => {
    const conversationId = searchParams.get('conversation')
    if (conversationId) {
      setActiveConversationId(conversationId)
    }
  }, [searchParams])

  const initializeMessaging = async () => {
    try {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      setCurrentUserId(session.user.id)

      // Get user role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (userError) throw userError

      setUserRole(userData.role as 'founder' | 'investor')

      // Fetch conversations based on role
      await fetchConversations(session.user.id, userData.role)

    } catch (error: any) {
      logger.error('Failed to initialize messaging', error, {
        component: 'MESSAGES_PAGE',
        action: 'INITIALIZE'
      })
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const fetchConversations = async (userId: string, role: string) => {
    try {
      // Fetch investor interests with status 'invested' to get allowed conversations
      let query = supabase
        .from('investor_interests')
        .select(`
          id,
          deal:startup_deals(
            id,
            deal_title,
            founder_profile:founder_profiles(
              id,
              startup_name,
              user:users!founder_profiles_user_id_fkey(id, full_name)
            )
          ),
          investor:investor_profiles(
            id,
            user:users!investor_profiles_user_id_fkey(id, full_name)
          )
        `)
        .eq('status', 'invested')

      const { data: interests, error: interestsError } = await query

      if (interestsError) throw interestsError

      if (!interests || interests.length === 0) {
        setConversations([])
        return
      }

      // For each interest, create a conversation entry
      const conversationPromises = interests.map(async (interest: any) => {
        const isFounder = role === 'founder'
        const otherPartyId = isFounder 
          ? interest.investor.user.id 
          : interest.deal.founder_profile.user.id

        // Get last message for this conversation
        const { data: lastMessage } = await supabase
          .from('messages')
          .select('content, created_at, is_read, sender_id')
          .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherPartyId}),and(sender_id.eq.${otherPartyId},receiver_id.eq.${userId})`)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        // Get unread count
        const { count: unreadCount } = await supabase
          .from('messages')
          .select('id', { count: 'exact', head: true })
          .eq('receiver_id', userId)
          .eq('sender_id', otherPartyId)
          .eq('is_read', false)

        return {
          id: `${interest.id}`,
          other_party: {
            id: otherPartyId,
            name: isFounder ? interest.investor.user.full_name : interest.deal.founder_profile.user.full_name,
            role: isFounder ? 'investor' as const : 'founder' as const,
            startup_name: isFounder ? undefined : interest.deal.founder_profile.startup_name
          },
          last_message: lastMessage || {
            content: 'No messages yet',
            created_at: interest.created_at,
            is_read: true
          },
          unread_count: unreadCount || 0,
          deal_title: interest.deal.deal_title
        }
      })

      const conversationsData = await Promise.all(conversationPromises)
      
      // Sort by last message time
      conversationsData.sort((a, b) => 
        new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime()
      )

      setConversations(conversationsData)

    } catch (error: any) {
      logger.error('Failed to fetch conversations', error, {
        component: 'MESSAGES_PAGE',
        action: 'FETCH_CONVERSATIONS'
      })
    }
  }

  const getActiveConversation = () => {
    return conversations.find(c => c.id === activeConversationId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          </div>
          <p className="text-gray-600">
            Communicate securely with your investment partners
          </p>
        </div>

        {/* Messaging Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>
                  {conversations.length} active conversation{conversations.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <div className="p-4 pt-0 max-h-[600px] overflow-y-auto">
                <ConversationList
                  conversations={conversations}
                  activeConversationId={activeConversationId || undefined}
                  onSelectConversation={setActiveConversationId}
                />
              </div>
            </Card>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            {activeConversationId && getActiveConversation() ? (
              <MessageThread
                conversationId={activeConversationId}
                currentUserId={currentUserId}
                otherParty={getActiveConversation()!.other_party}
                dealTitle={getActiveConversation()!.deal_title}
              />
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[600px]">
                <div className="text-center p-8">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    {conversations.length > 0 
                      ? 'Choose a conversation from the list to start messaging'
                      : 'Messages will appear here after you invest in a startup'}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Info Notice */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Messaging Guidelines
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Messaging is only available after completing an investment</li>
                  <li>• All communications are logged for compliance and security</li>
                  <li>• Keep discussions professional and investment-related</li>
                  <li>• Do not share sensitive personal or financial information</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <MessagingContent />
    </Suspense>
  )
}
