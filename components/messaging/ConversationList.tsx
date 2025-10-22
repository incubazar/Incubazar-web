'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Building2, User, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

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

interface ConversationListProps {
  conversations: Conversation[]
  activeConversationId?: string
  onSelectConversation: (conversationId: string) => void
}

export function ConversationList({ 
  conversations, 
  activeConversationId, 
  onSelectConversation 
}: ConversationListProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="space-y-2">
      {conversations.length === 0 ? (
        <Card className="p-8">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No conversations yet</h3>
            <p className="text-sm text-gray-500">
              Your messages will appear here once you start investing
            </p>
          </div>
        </Card>
      ) : (
        conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-gray-50 transition-colors",
              activeConversationId === conversation.id && "bg-blue-50 border-blue-300"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12 bg-blue-100 flex items-center justify-center">
                {conversation.other_party.role === 'founder' ? (
                  <Building2 className="h-6 w-6 text-blue-600" />
                ) : (
                  <User className="h-6 w-6 text-blue-600" />
                )}
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {conversation.other_party.role === 'founder' 
                        ? conversation.other_party.startup_name 
                        : conversation.other_party.name}
                    </h3>
                    {conversation.deal_title && (
                      <p className="text-xs text-gray-500 truncate">
                        {conversation.deal_title}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    {conversation.unread_count > 0 && (
                      <Badge variant="default" className="bg-blue-600">
                        {conversation.unread_count}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 whitespace-nowrap flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(conversation.last_message.created_at)}
                    </span>
                  </div>
                </div>

                <p className={cn(
                  "text-sm truncate",
                  conversation.last_message.is_read ? "text-gray-500" : "text-gray-900 font-medium"
                )}>
                  {conversation.last_message.content}
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}


