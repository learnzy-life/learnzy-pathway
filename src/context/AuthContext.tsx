import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'
import { addUserToFirestore, updateUserProfileInFirestore } from '../firebase/utils'

type User = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
}

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (userData: any) => Promise<void>
  isDevelopmentBypass?: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isDevelopmentBypass = process.env.NODE_ENV === 'development' && process.env.REACT_APP_AUTH_BYPASS === 'true'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        const newUser = {
          uid: userCredential.user.uid,
          email: email,
          displayName: null,
          photoURL: null,
          emailVerified: userCredential.user.emailVerified,
        }
        setUser(newUser)
        await addUserToFirestore(newUser)
      }
    } catch (error: any) {
      console.error('Signup failed:', error.message)
      throw error
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error('Login failed:', error.message)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error: any) {
      console.error('Logout failed:', error.message)
      throw error
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      console.error('Reset password failed:', error.message)
      throw error
    }
  }

  const updateUserProfile = async (userData: any): Promise<void> => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, userData)
        await updateUserProfileInFirestore(auth.currentUser.uid, userData)

        setUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          emailVerified: auth.currentUser.emailVerified,
        })
      }
    } catch (error: any) {
      console.error('Update profile failed:', error.message)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
    updateUserProfile,
    isDevelopmentBypass,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
