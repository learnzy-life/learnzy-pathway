
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'

const Onboarding: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [isFirstAttempt, setIsFirstAttempt] = useState<boolean | null>(null)
  const [previousAttempts, setPreviousAttempts] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { user } = useAuth()
  const navigate = useNavigate()

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
      const { error } = await supabase
        .from('user_details')
        .insert({
          user_id: user.id,
          full_name: fullName,
          mobile_number: mobileNumber,
          is_first_attempt: isFirstAttempt,
          previous_attempts: isFirstAttempt ? null : parseInt(previousAttempts),
        })

      if (error) throw error

      toast.success('Details saved successfully!')
      navigate('/')
    } catch (error) {
      console.error('Error saving user details:', error)
      toast.error('Failed to save details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Complete Your Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              type="tel"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Is this your first NEET attempt?</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={isFirstAttempt === true ? "default" : "outline"}
                onClick={() => setIsFirstAttempt(true)}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={isFirstAttempt === false ? "default" : "outline"}
                onClick={() => setIsFirstAttempt(false)}
              >
                No
              </Button>
            </div>
          </div>

          {isFirstAttempt === false && (
            <div className="space-y-2">
              <Label htmlFor="previousAttempts">Number of Previous Attempts</Label>
              <Input
                id="previousAttempts"
                type="number"
                min="1"
                value={previousAttempts}
                onChange={(e) => setPreviousAttempts(e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
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
