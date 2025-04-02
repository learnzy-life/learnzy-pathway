import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { Question, Subject } from '../question'
import { QuestionResult } from './types'

// Create a new test session when a test starts
export const createTestSession = async (
  subject: Subject,
  questions: Question[],
  sourceSessionId?: string
): Promise<string | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const userId = user?.id || null

    // Ensure we have a valid user ID
    if (!userId) {
      console.error('No user ID available. User must be authenticated.')
      toast.error('Please log in to start a test')
      return null
    }

    // Get metadata from the first question
    const firstQuestion = questions.length > 0 ? questions[0] : null

    const newSession = {
      user_id: userId,
      subject,
      start_time: new Date().toISOString(),
      end_time: null,
      score: null,
      total_questions: questions.length,
      // Add metadata at the session level
      chapter_name: firstQuestion?.Chapter_name || null,
      topic: firstQuestion?.Topic || null,
      subtopic: firstQuestion?.Subtopic || null,
      difficulty_level: firstQuestion?.Difficulty_Level || null,
      question_structure: firstQuestion?.Question_Structure || null,
      bloom_taxonomy: firstQuestion?.Bloom_Taxonomy || null,
      priority_level: firstQuestion?.Priority_Level || null,
      time_to_solve: firstQuestion?.Time_to_Solve || null,
      key_concept_tested: firstQuestion?.Key_Concept_Tested || null,
      common_pitfalls: firstQuestion?.Common_Pitfalls || null,
      source_session_id: sourceSessionId || null,
      // Save all question data including metadata
      questions_data: questions.map((q) => ({
        id: q.id,
        text: q.text,
        correctAnswer: q.correctAnswer || '',
        userAnswer: null,
        isCorrect: false,
        timeTaken: 0,
        tags: [],
        Subject: q.Subject || '',
        Chapter_name: q.Chapter_name || '',
        Topic: q.Topic || '',
        Subtopic: q.Subtopic || '',
        Difficulty_Level: q.Difficulty_Level || '',
        Question_Structure: q.Question_Structure || '',
        Bloom_Taxonomy: q.Bloom_Taxonomy || '',
        Priority_Level: q.Priority_Level || '',
        Time_to_Solve: q.Time_to_Solve || 0,
        Key_Concept_Tested: q.Key_Concept_Tested || '',
        Common_Pitfalls: q.Common_Pitfalls || '',
        // Include options for better review later - handle both uppercase and lowercase variants
        Option_A: q.Option_A || q.option_a || '',
        Option_B: q.Option_B || q.option_b || '',
        Option_C: q.Option_C || q.option_c || '',
        Option_D: q.Option_D || q.option_d || '',
        options: q.options || [],
      })),
    }

    console.log('Creating test session with metadata:', newSession)

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
