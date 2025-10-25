import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { initFirebase, firebaseHelpers } from '../firebase'

interface UserData {
  email: string
  nfsUsername: string
  createdAt: any
  lastLoginAt: any
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUserData(null)
        }
      } else {
        setUserData(null)
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
