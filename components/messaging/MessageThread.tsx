'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Building2, User, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  sender_id: string
  is_sender: boolean
  created_at: string
  is_read: boolean
}

interface MessageThreadProps {
  conversationId: string
  currentUserId: string
  otherParty: {
    id: string
    name: string
    role: 'founder' | 'investor'
    startup_name?: string
  }
  dealTitle?: string
}

export function MessageThread({ 
  conversationId, 
  currentUserId,
  otherParty, 
  dealTitle 
}: MessageThreadProps) {
  const supabase = createClient()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchMessages()

    // Subscribe to new messages using Supabase Realtime
    const channel = supabase
      .channel(`conversation_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const newMsg = payload.new as any
          setMessages(prev => [...prev, {
            id: newMsg.id,
            content: newMsg.content,
            sender_id: newMsg.sender_id,
            is_sender: newMsg.sender_id === currentUserId,
            created_at: newMsg.created_at,
            is_read: newMsg.is_read
          }])
          scrollToBottom()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
    markMessagesAsRead()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchMessages = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error

      const messagesData = (data || []).map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        is_sender: msg.sender_id === currentUserId,
        created_at: msg.created_at,
        is_read: msg.is_read
      }))

      setMessages(messagesData)
    } catch (error: any) {
      logger.error('Failed to fetch messages', error, {
        component: 'MESSAGE_THREAD',
        action: 'FETCH'
      })
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const markMessagesAsRead = async () => {
    try {
      const unreadMessageIds = messages
        .filter(msg => !msg.is_sender && !msg.is_read)
        .map(msg => msg.id)

      if (unreadMessageIds.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessageIds)
      }
    } catch (error: any) {
      logger.error('Failed to mark messages as read', error, {
        component: 'MESSAGE_THREAD',
        action: 'MARK_READ'
      })
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      setSending(true)

      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: currentUserId,
          content: newMessage.trim(),
          is_read: false
        })

      if (error) throw error

      setNewMessage('')
      
      logger.info('Message sent', {
        component: 'MESSAGE_THREAD',
        action: 'SEND',
        conversationId
      })
    } catch (error: any) {
      logger.error('Failed to send message', error, {
        component: 'MESSAGE_THREAD',
        action: 'SEND'
      })
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups: any, message) => {
    const date = new Date(message.created_at).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-blue-100 flex items-center justify-center">
            {otherParty.role === 'founder' ? (
              <Building2 className="h-5 w-5 text-blue-600" />
            ) : (
              <User className="h-5 w-5 text-blue-600" />
            )}
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">
              {otherParty.role === 'founder' ? otherParty.startup_name : otherParty.name}
            </CardTitle>
            {dealTitle && (
              <p className="text-sm text-gray-500">{dealTitle}</p>
            )}
          </div>
          <Badge variant="outline">
            {otherParty.role === 'founder' ? 'Founder' : 'Investor'}
          </Badge>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : Object.keys(groupedMessages).length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No messages yet</p>
              <p className="text-sm text-gray-400">Start the conversation!</p>
            </div>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, msgs]: [string, any]) => (
            <div key={date}>
              <div className="flex items-center justify-center my-4">
                <Badge variant="secondary" className="text-xs">
                  {formatDate(date)}
                </Badge>
              </div>
              {msgs.map((message: Message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex mb-4",
                    message.is_sender ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      message.is_sender
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.is_sender ? "text-blue-100" : "text-gray-500"
                      )}
                    >
                      {formatTime(message.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] resize-none"
            disabled={sending}
          />
          <Button
            onClick={sendMessage}
            disabled={sending || !newMessage.trim()}
            className="self-end"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </Card>
  )
}


