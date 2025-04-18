
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export const useOnboardingStatus = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false) // Start with false instead of true
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

        if (error) {
          // If error is 'not found', it means user hasn't completed onboarding
          if (error.code === 'PGRST116') {
            console.log('User has not completed onboarding yet.')
            setHasCompletedOnboarding(false)
          } else {
            throw error
          }
        } else {
          // Data exists, onboarding was completed
          console.log('User has completed onboarding:', data)
          setHasCompletedOnboarding(true)
        }
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
