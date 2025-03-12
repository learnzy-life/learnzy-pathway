
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import AuthHeader from '../components/auth/AuthHeader'
import AuthForm from '../components/auth/AuthForm'
import { useAuth } from '../context/AuthContext'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if coming from a specific page that requires auth
  const from = location.state?.from?.pathname || '/'
  
  // If the user is already logged in, redirect to home page
  useEffect(() => {
    if (user && !isLoading) {
      navigate(from, { replace: true })
    }
  }, [user, isLoading, navigate, from])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 max-w-md mx-auto">
          <AuthHeader isLogin={isLogin} />
          <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </section>
      </main>
    </div>
  )
}

export default Auth
