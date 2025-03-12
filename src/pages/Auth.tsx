
import React, { useState } from 'react'
import { ArrowRight, Mail, Phone, Google } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isPhoneAuth, setIsPhoneAuth] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { signIn, signUp, signInWithGoogle, signInWithOTP, verifyOTP } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isPhoneAuth) {
        if (isVerifying) {
          await verifyOTP(phone, verificationCode)
          navigate('/')
        } else {
          await signInWithOTP(phone)
          setIsVerifying(true)
        }
      } else {
        if (isLogin) {
          await signIn(email, password)
          navigate('/')
        } else {
          await signUp(email, password)
          // Stay on page so user can check email
        }
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
                    setIsPhoneAuth(false)
                    setIsVerifying(false)
                  }}
                >
                  Login
                </button>
                <button
                  className={`px-4 py-2 ${!isLogin ? 'bg-learnzy-purple text-white' : 'bg-white text-muted-foreground'}`}
                  onClick={() => {
                    setIsLogin(false)
                    setIsPhoneAuth(false)
                    setIsVerifying(false)
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-center space-x-3 mb-4">
                <button
                  type="button"
                  className={`flex items-center justify-center px-3 py-2 rounded-md border ${!isPhoneAuth ? 'border-learnzy-purple bg-learnzy-purple/10' : 'border-gray-200'}`}
                  onClick={() => {
                    setIsPhoneAuth(false)
                    setIsVerifying(false)
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center px-3 py-2 rounded-md border ${isPhoneAuth ? 'border-learnzy-purple bg-learnzy-purple/10' : 'border-gray-200'}`}
                  onClick={() => {
                    setIsPhoneAuth(true)
                    setIsVerifying(false)
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {isPhoneAuth ? (
                <>
                  {!isVerifying ? (
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1234567890"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-learnzy-purple"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter your phone number with country code (e.g., +1 for US)
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                        Verification Code
                      </label>
                      <input
                        id="otp"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="123456"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-learnzy-purple"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the verification code sent to your phone
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
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
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-learnzy-purple text-white rounded-md hover:bg-learnzy-dark transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                ) : null}
                {isPhoneAuth 
                  ? (isVerifying ? 'Verify Code' : 'Send Verification Code') 
                  : (isLogin ? 'Sign In' : 'Create Account')}
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
                <Google className="w-5 h-5 mr-2 text-red-500" />
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
                      setIsPhoneAuth(false)
                      setIsVerifying(false)
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
                      setIsPhoneAuth(false)
                      setIsVerifying(false)
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
