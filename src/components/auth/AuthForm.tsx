import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { useAuth } from '../../context/AuthContext'

interface AuthFormProps {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

// Create schema for form validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(values.email, values.password)
        // Navigate after successful sign-in
        const from = location.state?.from || '/subjects'
        navigate(from, { replace: true })
      } else {
        await signUp(values.email, values.password)
        // Navigate after successful sign-up
        navigate('/onboarding', { replace: true })
        toast.success('Account created successfully!')
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
      setLoading(true)
      toast.info('Redirecting to Google for authentication...')
      await signInWithGoogle()
      // Redirect happens automatically after OAuth
      // Navigation after successful redirect is handled in Auth.tsx
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Failed to connect with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    const email = form.getValues('email')
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

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              value={form.getValues('email')}
              onChange={(e) => form.setValue('email', e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            ) : null}
            Send Reset Link
          </Button>

          <div className="text-center pt-2">
            <Button
              type="button"
              variant="link"
              onClick={() => setShowForgotPassword(false)}
              className="text-learnzy-purple"
            >
              Back to sign in
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="card-glass p-8 animate-fade-in">
      <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    type="email"
                    autoComplete="email"
                    className="bg-background"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      className="bg-background pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                {isLogin && (
                  <div className="text-right mt-1">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setShowForgotPassword(true)}
                      className="p-0 h-auto text-sm text-learnzy-purple"
                    >
                      Forgot password?
                    </Button>
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            ) : null}
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </Form>

      <div className="mt-6">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <div className="absolute bg-white px-3 text-sm text-muted-foreground">
            or continue with
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full"
        >
          <LogIn className="w-5 h-5 mr-2 text-red-500" />
          Continue with Google
        </Button>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(false)}
              className="p-0 h-auto text-learnzy-purple"
            >
              Sign up
            </Button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(true)}
              className="p-0 h-auto text-learnzy-purple"
            >
              Sign in
            </Button>
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
          type="button"
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
          type="button"
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
