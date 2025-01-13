'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from "@/components/ui/use-toast"

export function useNotifications() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    if (!user) return

    const connectWebSocket = async () => {
      try {
        // Get WebSocket URL from your backend
        const response = await fetch('/api/notifications/negotiate')
        const { url } = await response.json()
        
        const ws = new WebSocket(url)
        
        ws.onmessage = (event) => {
          const notification = JSON.parse(event.data)
          
          toast({
            title: notification.title,
            description: notification.message
          })
        }

        ws.onclose = () => {
          setTimeout(connectWebSocket, 5000)
        }

        setWebSocket(ws)
      } catch (error) {
        console.error('WebSocket connection failed:', error)
      }
    }

    connectWebSocket()

    return () => {
      webSocket?.close()
    }
  }, [user, toast])

  return { webSocket }
} 