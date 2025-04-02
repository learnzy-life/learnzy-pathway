import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Question, Subject } from '../../services/question'
import { fetchMockQuestions } from '../../services/question/fetchMockQuestions'
import { createTestSession } from '../../services/testSession'

export const useMockTestQuestions = (
  cycle: string,
  testNumber: string
): [Question[], boolean, string | null, number] => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const { user } = useAuth()

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)

      try {
        // Check if user is authenticated
        if (!user) {
          console.error('User not authenticated')
          toast.error('Please log in to take mock tests')
          return
        }

        // Load the questions with full metadata
        const loadedQuestions = await fetchMockQuestions(cycle, testNumber)

        // Sort questions by their ID to ensure numerical ascending order
        const sortedQuestions = [...loadedQuestions].sort((a, b) => a.id - b.id)

        // Get subject from the first question or use 'mixed' as default for mock tests
        const subjectValue =
          sortedQuestions.length > 0
            ? sortedQuestions[0].subject || 'mixed'
            : 'mixed'

        // Ensure the subject is a valid Subject type
        const subject =
          subjectValue === 'physics' ||
          subjectValue === 'chemistry' ||
          subjectValue === 'biology'
            ? (subjectValue as Subject)
            : ('biology' as Subject)

        // Get user mood and ritual data from localStorage
        const mood = localStorage.getItem('selected_mood') || 'unknown'
        const ritual = localStorage.getItem('selected_ritual') || 'none'

        // Generate a unique session ID for this mock test
        const mockSessionId = `mock-${cycle}-${testNumber}`

        // Create a new test session with the loaded questions
        const newSessionId = await createTestSession(
          subject,
          sortedQuestions,
          mockSessionId
        )
        setSessionId(newSessionId || mockSessionId)

        if (newSessionId) {
          // Save the preparation data
          const { error } = await supabase
            .from('user_test_preparations')
            .insert({
              user_id: user.id,
              test_session_id: newSessionId,
              subject,
              mood,
              ritual,
              test_type: 'mock',
              mock_cycle: cycle,
              mock_number: testNumber,
            })
            .select()
            .single()

          if (error) {
            console.error('Error saving test preparation data:', error)
          }
        }

        setStartTime(Date.now())
        setQuestions(sortedQuestions)
      } catch (error) {
        console.error('Error loading mock test:', error)
        toast.error(
          'Failed to load mock test questions. Using sample questions instead.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [cycle, testNumber, user])

  return [questions, isLoading, sessionId, startTime]
}
