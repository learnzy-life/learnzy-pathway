import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { sendSignupEmail } from '../services/emailService'

const Onboarding: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [isFirstAttempt, setIsFirstAttempt] = useState<boolean | null>(null)
  const [previousAttempts, setPreviousAttempts] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { user, isLoading: isAuthLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserDetails = async () => {
      if (!isAuthLoading && user) {
        try {
          const { data, error, count } = await supabase
            .from('user_details')
            .select('user_id', { count: 'exact', head: true })
            .eq('user_id', user.id)

          if (error) {
            console.error('Error checking user details:', error)
            return
          }

          if (count && count > 0) {
            navigate('/subjects', { replace: true })
          }
        } catch (err) {
          console.error('Unexpected error checking user details:', err)
        }
      }
    }

    checkUserDetails()
  }, [user, isAuthLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('User not authenticated')
      return
    }

    if (!fullName || !mobileNumber || isFirstAttempt === null) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!isFirstAttempt && !previousAttempts) {
      toast.error('Please enter the number of previous attempts')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.from('user_details').insert({
        user_id: user.id,
        full_name: fullName,
        mobile_number: mobileNumber,
        is_first_attempt: isFirstAttempt,
        previous_attempts: isFirstAttempt ? null : parseInt(previousAttempts),
      })

      if (error) throw error

      // Send signup email after successful signup
      try {
        await sendSignupEmail(user.email, fullName)
      } catch (emailError) {
        console.error('Failed to send signup email:', emailError)
      }

      toast.success('Details saved successfully!')
      navigate('/subjects')
    } catch (error) {
      console.error('Error saving user details:', error)
      toast.error('Failed to save details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[450px] max-w-[95vw] p-0 overflow-hidden bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-0">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-5 text-white">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-semibold text-center">Complete Your Profile</DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-3">
            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="mobileNumber" className="text-gray-700 font-medium">Mobile Number</Label>
            <Input
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              type="tel"
              required
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Is this your first NEET attempt?</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={isFirstAttempt === true ? "default" : "outline"}
                onClick={() => setIsFirstAttempt(true)}
                className={`flex-1 py-2 ${
                  isFirstAttempt === true
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "border-gray-200 text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
                }`}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={isFirstAttempt === false ? "default" : "outline"}
                onClick={() => setIsFirstAttempt(false)}
                className={`flex-1 py-2 ${
                  isFirstAttempt === false
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "border-gray-200 text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
                }`}
              >
                No
              </Button>
            </div>
          </div>

          {isFirstAttempt === false && (
            <div className="space-y-3">
              <Label htmlFor="previousAttempts" className="text-gray-700 font-medium">Number of Previous Attempts</Label>
              <Input
                id="previousAttempts"
                type="number"
                min="1"
                value={previousAttempts}
                onChange={(e) => setPreviousAttempts(e.target.value)}
                required
                placeholder="Enter number of attempts"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-3 mt-2 text-base font-medium bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white shadow-md rounded-lg transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Onboarding
