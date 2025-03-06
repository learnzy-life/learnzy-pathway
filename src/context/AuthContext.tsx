
import React, { createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Provide dummy auth values
  const dummyAuthValues: AuthContextType = {
    user: null,
    session: null,
    isLoading: false,
    signIn: async () => {
      console.log('Sign in functionality removed temporarily')
    },
    signUp: async () => {
      console.log('Sign up functionality removed temporarily')
    },
    signOut: async () => {
      console.log('Sign out functionality removed temporarily')
    }
  }

  return (
    <AuthContext.Provider value={dummyAuthValues}>
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
