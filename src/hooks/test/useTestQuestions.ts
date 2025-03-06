
import { useState, useEffect } from 'react'
import { Question, Subject, fetchQuestions } from '../../services/questionService'
import { createTestSession } from '../../services/testSession'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'

export const useTestQuestions = (
  subject: Subject
): [Question[], boolean, string | null, number] => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)

      try {
        // Load the questions first
        const loadedQuestions = await fetchQuestions(subject)
        
        // Get user mood and ritual data from localStorage
        const mood = localStorage.getItem('selected_mood') || 'unknown'
        const ritual = localStorage.getItem('selected_ritual') || 'none'
        
        // Then create a new test session with the loaded questions
        const newSessionId = await createTestSession(subject, loadedQuestions)
        setSessionId(newSessionId)
        
        if (newSessionId) {
          // Save the preparation data
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            const { error } = await supabase.from('user_test_preparations').insert({
              user_id: user.id,
              test_session_id: newSessionId,
              subject,
              mood,
              ritual
            })
            
            if (error) {
              console.error('Error saving test preparation data:', error)
            }
          }
        }
        
        setStartTime(Date.now())
        setQuestions(loadedQuestions)
      } catch (error) {
        console.error('Error loading test:', error)
        toast.error('Failed to load questions. Using sample questions instead.')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [subject])

  return [questions, isLoading, sessionId, startTime]
}
