
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AuthForm from '../components/auth/AuthForm'
import AuthHeader from '../components/auth/AuthHeader'
import { useAuth } from '../context/AuthContext'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, isLoading, bypassAuth, isDevelopmentBypass } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Check if coming from a specific page that requires auth
  const from = location.state?.from || '/'

  // If the user is already logged in, redirect to home page or the page they came from
  useEffect(() => {
    if ((user || isDevelopmentBypass) && !isLoading) {
      navigate(from, { replace: true })
    }
  }, [user, isLoading, navigate, from, isDevelopmentBypass])

  // Show loading state while checking authentication
  if (isLoading) {
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

          {/* Development bypass button - commented out for production */}
          {/* <div className="mt-8 text-center">
            <button
              onClick={bypassAuth}
              className="text-sm text-gray-500 hover:text-learnzy-purple"
            >
              [DEV] Bypass Authentication
            </button>
          </div> */}
        </div>
      </main>
    </div>
  )
}

export default Auth
