import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AuthForm from '../components/auth/AuthForm'
import AuthHeader from '../components/auth/AuthHeader'
import { useAuth } from '../context/AuthContext'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, isLoading, session } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Handle routing after OAuth redirect (e.g., Google sign-in)
  useEffect(() => {
    // Only proceed if:
    // 1. User is authenticated
    // 2. Not still loading
    // 3. This is likely an OAuth redirect (checking search params)
    if (user && !isLoading && window.location.hash.includes('access_token')) {
      // Get current timestamp
      const now = new Date()
      // Get user creation timestamp
      const userCreatedAt = new Date(user.created_at)
      // Calculate time difference in seconds
      const accountAge = (now.getTime() - userCreatedAt.getTime()) / 1000

      // If account was created in the last 60 seconds, treat as new sign up
      // Otherwise, treat as existing user sign in
      if (accountAge < 60) {
        // New sign up - route to onboarding
        navigate('/onboarding', { replace: true })
      } else {
        // Existing sign in - route to subjects
        navigate('/subjects', { replace: true })
      }
    }
  }, [user, isLoading, navigate])

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-4"></div>
        <p className="ml-3 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-16 pb-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <AuthHeader isLogin={isLogin} />
              <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Auth
