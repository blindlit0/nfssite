'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { initFirebase, firebaseHelpers } from '../firebase'

interface UserData {
  email: string
  nfsUsername: string
  firstName?: string
  lastName?: string
  fullName?: string
  createdAt: any
  lastLoginAt: any
  bio?: string
  department?: string
  year?: string
  interests?: string[]
  phone?: string
  linkedin?: string
  github?: string
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    console.log('AuthProvider effect running');
    const firebase = initFirebase()
    if (!firebase) {
      setLoading(false)
      return
    }

    const unsubscribe = firebaseHelpers.onAuth(firebase.auth, async (user) => {
      setUser(user)
      if (user) {
        try {
          const data = await firebaseHelpers.getUserData(firebase.db, user.uid)
          setUserData(data as UserData)
          // Check if user is admin. Support multiple admin emails via comma-separated env.
          // You can set NEXT_PUBLIC_ADMIN_EMAILS="admin1@example.com,admin2@example.com"
          const adminEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAIL || ''
          const adminList = adminEnv
            .split(',')
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
          const isAdminCheck = user?.email ? adminList.includes(user.email.toLowerCase()) : false
          console.log('Admin check:', { email: user?.email, adminList, isAdminCheck })
          setIsAdmin(isAdminCheck)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUserData(null)
          setIsAdmin(false)
        }
      } else {
        setUserData(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    const firebase = initFirebase()
    if (firebase) {
      await firebaseHelpers.signOut(firebase.auth)
    }
  }

  const value = {
    user,
    userData,
    loading,
    signOut,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
