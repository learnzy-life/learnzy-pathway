
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

// Define the User type
type User = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  id: string // Add id property to fix type errors
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
  // Add these properties to fix type errors
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
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

// Mock firebase auth functions for development
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (auth: any, callback: any) => {
    // Mock implementation
    callback(null);
    return () => {};
  },
  createUserWithEmailAndPassword: async () => ({
    user: { uid: 'mock-uid', email: 'mock@example.com', emailVerified: false, id: 'mock-uid' }
  }),
  signInWithEmailAndPassword: async () => ({}),
  signOut: async () => ({}),
  sendPasswordResetEmail: async () => ({}),
  updateProfile: async () => ({})
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isDevelopmentBypass = process.env.NODE_ENV === 'development' && process.env.REACT_APP_AUTH_BYPASS === 'true'

  useEffect(() => {
    // Mock auth state change to prevent errors
    const unsubscribe = () => {};
    setIsLoading(false);
    return unsubscribe;
  }, [])

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      // Mock signup functionality
      const mockUser = {
        uid: 'mock-uid',
        email: email,
        displayName: null,
        photoURL: null,
        emailVerified: false,
        id: 'mock-uid', // Add id property
      };
      setUser(mockUser);
    } catch (error: any) {
      console.error('Signup failed:', error.message)
      throw error
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Mock login functionality
      const mockUser = {
        uid: 'mock-uid',
        email: email,
        displayName: null,
        photoURL: null,
        emailVerified: false,
        id: 'mock-uid', // Add id property
      };
      setUser(mockUser);
    } catch (error: any) {
      console.error('Login failed:', error.message)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Mock logout functionality
      setUser(null)
    } catch (error: any) {
      console.error('Logout failed:', error.message)
      throw error
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    try {
      // Mock reset password functionality
    } catch (error: any) {
      console.error('Reset password failed:', error.message)
      throw error
    }
  }

  const updateUserProfile = async (userData: any): Promise<void> => {
    try {
      // Mock update profile functionality
      if (user) {
        setUser({
          ...user,
          ...userData
        });
      }
    } catch (error: any) {
      console.error('Update profile failed:', error.message)
      throw error
    }
  }

  // Additional methods to fix type errors
  const signOut = logout;
  const signIn = login;
  const signUp = signup;
  const signInWithGoogle = async () => {
    // Mock implementation
    const mockUser = {
      uid: 'google-mock-uid',
      email: 'google-mock@example.com',
      displayName: 'Google User',
      photoURL: null,
      emailVerified: true,
      id: 'google-mock-uid', // Add id property
    };
    setUser(mockUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
    updateUserProfile,
    isDevelopmentBypass,
    signOut,
    signIn,
    signUp,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
