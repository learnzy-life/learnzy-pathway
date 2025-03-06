
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { QuestionResult, TestSession } from './types'

// Complete a test session
export const completeTestSession = async (
  sessionId: string,
  questions: QuestionResult[]
): Promise<boolean> => {
  try {
    // Calculate score
    const answeredQuestions = questions.filter((q) => q.userAnswer !== null)
    const correctAnswers = questions.filter((q) => q.isCorrect)
    const score = (correctAnswers.length / questions.length) * 100

    const { error } = await supabase
      .from('test_sessions')
      .update({
        end_time: new Date().toISOString(),
        score,
        questions_data: questions,
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Error completing test session:', error)
      toast.error('Failed to save test results')
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error completing test session:', err)
    return false
  }
}

// Get a test session by ID
export const getTestSession = async (
  sessionId: string
): Promise<TestSession | null> => {
  try {
    const { data, error } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (error) {
      console.error('Error fetching test session:', error)
      return null
    }

    if (!data) return null

    return {
      id: data.id,
      userId: data.user_id,
      subject: data.subject,
      startTime: data.start_time,
      endTime: data.end_time,
      score: data.score,
      totalQuestions: data.total_questions,
      questions: data.questions_data,
    }
  } catch (err) {
    console.error('Unexpected error fetching test session:', err)
    return null
  }
}
