
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export const useOnboardingStatus = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('user_details')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) throw error

        setHasCompletedOnboarding(!!data)
      } catch (error) {
        console.error('Error checking onboarding status:', error)
        setHasCompletedOnboarding(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkOnboardingStatus()
  }, [user])

  return { hasCompletedOnboarding, isLoading }
}
