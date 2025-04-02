import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

/**
 * Hook to fetch completed tests for a user
 * @param userId The current user's ID
 * @returns Array of completed test IDs and loading state
 */
export const useCompletedTests = (userId: string | undefined) => {
  const [completedTests, setCompletedTests] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompletedTests = async () => {
      if (!userId) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)

        // First, get all completed test sessions
        const { data: completedSessions, error } = await supabase
          .from('test_sessions')
          .select('id, source_session_id')
          .eq('user_id', userId)
          .not('end_time', 'is', null)

        if (error) throw error

        // Include both the actual session IDs and source session IDs
        const completedIds = new Set<string>()
        completedSessions.forEach((session) => {
          if (session.id) completedIds.add(session.id)
          if (session.source_session_id)
            completedIds.add(session.source_session_id)
        })

        setCompletedTests(Array.from(completedIds))
      } catch (error) {
        console.error('Error fetching completed tests:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompletedTests()
  }, [userId])

  return { completedTests, isLoading }
}
