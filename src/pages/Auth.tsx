
import React, { useState } from 'react'
import { ArrowRight, Mail, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        await signIn(email, password)
        navigate('/')
      } else {
        await signUp(email, password)
        // Stay on page so user can check email
      }
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      // Redirect happens automatically after OAuth
    } catch (error) {
      console.error('Google sign-in error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {isLogin ? 'Welcome Back!' : 'Join Learnzy'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'Sign in to continue your learning journey' : 'Create an account to start learning'}
            </p>
          </div>

          <div className="card-glass p-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="flex rounded-lg overflow-hidden border border-gray-100">
                <button
                  className={`px-4 py-2 ${isLogin ? 'bg-learnzy-purple text-white' : 'bg-white text-muted-foreground'}`}
                  onClick={() => {
                    setIsLogin(true)
                  }}
                >
                  Login
                </button>
                <button
                  className={`px-4 py-2 ${!isLogin ? 'bg-learnzy-purple text-white' : 'bg-white text-muted-foreground'}`}
                  onClick={() => {
                    setIsLogin(false)
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-learnzy-purple"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-learnzy-purple"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-learnzy-purple text-white rounded-md hover:bg-learnzy-dark transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                ) : null}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-200 w-full"></div>
                <div className="absolute bg-white px-3 text-sm text-muted-foreground">or continue with</div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <LogIn className="w-5 h-5 mr-2 text-red-500" />
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false)
                    }}
                    className="text-learnzy-purple hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true)
                    }}
                    className="text-learnzy-purple hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Auth
