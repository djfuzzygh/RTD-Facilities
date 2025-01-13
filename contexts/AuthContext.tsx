'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: `https://${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_B2C_POLICY}`,
    knownAuthorities: [`${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT}.b2clogin.com`],
    redirectUri: typeof window !== 'undefined' ? window.location.origin : ''
  }
}

const msalInstance = new PublicClientApplication(msalConfig)

interface AuthContextType {
  user: AccountInfo | null
  login: () => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AccountInfo | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        setUser(accounts[0])
      }
    }

    initializeAuth()
  }, [])

  const login = async () => {
    try {
      const response = await msalInstance.loginPopup({
        scopes: ['openid', 'profile']
      })
      
      if (response.account) {
        setUser(response.account)
        const token = response.accessToken
        localStorage.setItem('token', token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const logout = () => {
    msalInstance.logout()
    setUser(null)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

