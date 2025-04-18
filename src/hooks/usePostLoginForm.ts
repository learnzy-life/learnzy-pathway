
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

export type UserDetails = {
  fullName: string
  mobileNumber: string
  isFirstAttempt: 'yes' | 'no'
  previousAttempts?: string
}

export function usePostLoginForm() {
  const [showForm, setShowForm] = useState(false)

  const hasUserDetails = async () => {
    try {
      const user = await supabase.auth.getUser()
      if (!user.data.user) return false

      const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', user.data.user.id)
        .single()

      if (error || !data) return false
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (data: UserDetails) => {
    try {
      console.log('Submitting form data:', data)
      const user = await supabase.auth.getUser()
      
      if (!user.data.user) {
        throw new Error('User not authenticated')
      }
      
      const userId = user.data.user.id
      console.log('Current user ID:', userId)
      
      const { error } = await supabase
        .from('user_details')
        .upsert([
          {
            user_id: userId,
            full_name: data.fullName,
            mobile_number: data.mobileNumber,
            is_first_attempt: data.isFirstAttempt === 'yes',
            previous_attempts: data.isFirstAttempt === 'no' ? parseInt(data.previousAttempts || '0') : null,
          },
        ])

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Profile updated successfully')
      setShowForm(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    }
  }

  return {
    showForm,
    setShowForm,
    handleSubmit,
    hasUserDetails
  }
}
