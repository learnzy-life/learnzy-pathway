import { LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'

interface AuthFormProps {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
        // Navigate only if sign-in was successful
        navigate('/')
      } else {
        await signUp(email, password)
        // Show success message but don't navigate - let user check email or sign in
        toast.success('Account created successfully! You can now sign in.')
        // Switch to login view after successful registration
        setIsLogin(true)
      }
    } catch (error) {
      console.error('Authentication error:', error)
      // Error handling already in signIn/signUp methods in AuthContext
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      await resetPassword(email)
      toast.success('Check your email for password reset instructions')
      setShowForgotPassword(false)
    } catch (error) {
      console.error('Password reset error:', error)
      toast.error(error.message || 'Error resetting password')
    } finally {
      setLoading(false)
    }
  }

  if (showForgotPassword) {
    return (
      <div className="card-glass p-8 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="text-muted-foreground">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="reset-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowForgotPassword(false)}
            className="text-learnzy-purple hover:underline"
          >
            Back to sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-glass p-8 animate-fade-in">
      <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          {isLogin && (
            <div className="mt-1 text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-learnzy-purple hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}
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
          <div className="absolute bg-white px-3 text-sm text-muted-foreground">
            or continue with
          </div>
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
  )
}

export default AuthForm

// Internal component that's only used within AuthForm
const AuthToggle: React.FC<AuthFormProps> = ({ isLogin, setIsLogin }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex rounded-lg overflow-hidden border border-gray-100">
        <button
          className={`px-4 py-2 ${
            isLogin
              ? 'bg-learnzy-purple text-white'
              : 'bg-white text-muted-foreground'
          }`}
          onClick={() => {
            setIsLogin(true)
          }}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${
            !isLogin
              ? 'bg-learnzy-purple text-white'
              : 'bg-white text-muted-foreground'
          }`}
          onClick={() => {
            setIsLogin(false)
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}
