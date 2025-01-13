'use client'

import React, { createContext, useContext, useState } from 'react'

interface Notification {
  id: string
  message: string
  read: boolean
  createdAt: Date
}

interface NotificationContextType {
  notifications: Notification[]
  markAsRead: (id: string) => void
  addNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const addNotification = (message: string) => {
    setNotifications(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        message,
        read: false,
        createdAt: new Date()
      }
    ])
  }

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

