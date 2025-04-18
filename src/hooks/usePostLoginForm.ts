
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

  const handleSubmit = async (data: UserDetails) => {
    try {
      const { error } = await supabase
        .from('user_details')
        .upsert([
          {
            user_id: (await supabase.auth.getUser()).data.user?.id,
            full_name: data.fullName,
            mobile_number: data.mobileNumber,
            is_first_attempt: data.isFirstAttempt === 'yes',
            previous_attempts: data.isFirstAttempt === 'no' ? parseInt(data.previousAttempts || '0') : 0,
          },
        ])

      if (error) throw error

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
  }
}
