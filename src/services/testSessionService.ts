
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'
import { Question, Subject } from './questionService'

export interface QuestionResult {
  id: number
  text: string
  userAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
  timeTaken: number // in seconds
  tags: string[]
}

export interface TestSession {
  id: string
  userId: string | null
  subject: Subject
  startTime: string
  endTime: string | null
  score: number | null
  totalQuestions: number
  questions: QuestionResult[]
}

// Create a new test session when a test starts
export const createTestSession = async (
  subject: Subject,
  questions: Question[]
): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null

    const newSession = {
      user_id: userId,
      subject,
      start_time: new Date().toISOString(),
      end_time: null,
      score: null,
      total_questions: questions.length,
      questions_data: questions.map((q) => ({
        id: q.id,
        text: q.text,
        correctAnswer: q.correctAnswer || '',
        userAnswer: null,
        isCorrect: false,
        timeTaken: 0,
        tags: [],
      })),
    }

    const { data, error } = await supabase
      .from('test_sessions')
      .insert(newSession)
      .select('id')
      .single()

    if (error) {
      console.error('Error creating test session:', error)
      toast.error('Failed to create test session')
      return null
    }

    console.log('Test session created with ID:', data.id)
    return data.id
  } catch (err) {
    console.error('Unexpected error creating test session:', err)
    return null
  }
}

// Update a question answer in the test session
export const updateQuestionAnswer = async (
  sessionId: string,
  questionId: number,
  userAnswer: string | null,
  timeTaken: number
): Promise<boolean> => {
  try {
    // First get the current session data
    const { data: sessionData, error: fetchError } = await supabase
      .from('test_sessions')
      .select('questions_data')
      .eq('id', sessionId)
      .single()

    if (fetchError) {
      console.error('Error fetching test session:', fetchError)
      return false
    }

    // Update the specific question in the questions_data array
    const updatedQuestionsData = sessionData.questions_data.map(
      (q: QuestionResult) => {
        if (q.id === questionId) {
          const isCorrect = userAnswer === q.correctAnswer
          return {
            ...q,
            userAnswer,
            isCorrect,
            timeTaken,
          }
        }
        return q
      }
    )

    // Update the session with the modified questions_data
    const { error: updateError } = await supabase
      .from('test_sessions')
      .update({ questions_data: updatedQuestionsData })
      .eq('id', sessionId)

    if (updateError) {
      console.error('Error updating question answer:', updateError)
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error updating question answer:', err)
    return false
  }
}

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

// Update question tags
export const updateQuestionTags = async (
  sessionId: string,
  questionId: number,
  tags: string[]
): Promise<boolean> => {
  try {
    // First get the current session data
    const { data: sessionData, error: fetchError } = await supabase
      .from('test_sessions')
      .select('questions_data')
      .eq('id', sessionId)
      .single()

    if (fetchError) {
      console.error('Error fetching test session:', fetchError)
      return false
    }

    // Update the specific question in the questions_data array
    const updatedQuestionsData = sessionData.questions_data.map(
      (q: QuestionResult) => {
        if (q.id === questionId) {
          return {
            ...q,
            tags,
          }
        }
        return q
      }
    )

    // Update the session with the modified questions_data
    const { error: updateError } = await supabase
      .from('test_sessions')
      .update({ questions_data: updatedQuestionsData })
      .eq('id', sessionId)

    if (updateError) {
      console.error('Error updating question tags:', updateError)
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error updating question tags:', err)
    return false
  }
}
