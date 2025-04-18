
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AuthForm from '../components/auth/AuthForm'
import AuthHeader from '../components/auth/AuthHeader'
import { useAuth } from '../context/AuthContext'
import { PostLoginForm } from '../components/auth/PostLoginForm'
import { usePostLoginForm } from '../hooks/usePostLoginForm'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, isLoading, isDevelopmentBypass } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { showForm, setShowForm, handleSubmit } = usePostLoginForm()

  // Check if coming from a specific page that requires auth
  const from = location.state?.from || '/'

  // Show the form when user logs in
  useEffect(() => {
    if (user && !isLoading) {
      setShowForm(true)
    }
  }, [user, isLoading])

  // Only redirect after form is submitted or if in development bypass
  useEffect(() => {
    if (isDevelopmentBypass || (user && !showForm && !isLoading)) {
      navigate(from, { replace: true })
    }
  }, [user, isLoading, navigate, from, isDevelopmentBypass, showForm])

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
        </div>
      </main>

      <PostLoginForm isOpen={showForm} onSubmit={handleSubmit} />
    </div>
  )
}

export default Auth
